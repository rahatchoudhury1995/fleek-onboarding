import { useState } from 'react'

const WILDCARD_QUESTIONS = [
  'When does your energy shine brightest? Morning? Afternoon? Night? Tell us why.',
  "What's your biggest fashion regret — if you have one?",
  'Describe an outfit you would wear forever.',
  'What would be your Fleek catwalk theme tune?',
  'Food heaven or food hell — what is it?',
]

function WildcardCard({ question, cardData, onToggle, onAnswerChange }) {
  const isSelected = Boolean(cardData)
  const isAnswered = Boolean(cardData?.answer?.trim())

  return (
    <div>
      <button
        onClick={onToggle}
        className="w-full text-left px-5 py-4 rounded-xl border-2 transition-all duration-200 hover:-translate-y-0.5 flex items-start justify-between gap-3"
        style={{
          backgroundColor: isAnswered ? 'rgba(255,212,0,0.1)' : isSelected ? 'rgba(255,212,0,0.04)' : 'white',
          borderColor: isAnswered || isSelected ? '#FFD400' : 'rgba(51,51,51,0.2)',
          color: '#0F0F0F',
          fontFamily: '"DM Sans", sans-serif',
          fontSize: '0.875rem',
        }}
      >
        <span className="flex-1">{question}</span>
        {isAnswered && (
          <span className="flex-shrink-0 tick-anim" style={{ color: '#FFD400' }}>✦</span>
        )}
      </button>
      {isSelected && (
        <div className="mt-2 fade-in">
          <textarea
            value={cardData?.answer || ''}
            onChange={(e) => onAnswerChange(e.target.value)}
            placeholder="Go on then..."
            rows={3}
            className="w-full px-4 py-3 rounded-lg text-sm border resize-none outline-none focus:border-pitch-black transition-colors"
            style={{
              backgroundColor: 'white',
              borderColor: '#FFD400',
              color: '#0F0F0F',
              fontFamily: '"DM Sans", sans-serif',
            }}
          />
        </div>
      )}
    </div>
  )
}

export default function Section3Intro({ formData, updateFormData, onComplete }) {
  const intro = formData.intro || {}
  const [validationError, setValidationError] = useState('')

  const updateIntro = (field, value) => {
    updateFormData('intro', { ...intro, [field]: value })
  }

  const wildcardCards = intro.wildcardCards || []

  const getCardData = (idx) => wildcardCards.find((c) => c.idx === idx) || null

  const toggleCard = (idx) => {
    const existing = wildcardCards.find((c) => c.idx === idx)
    if (existing) {
      updateIntro('wildcardCards', wildcardCards.filter((c) => c.idx !== idx))
    } else {
      updateIntro('wildcardCards', [...wildcardCards, { idx, answer: '' }])
    }
  }

  const updateCardAnswer = (idx, answer) => {
    updateIntro(
      'wildcardCards',
      wildcardCards.map((c) => (c.idx === idx ? { ...c, answer } : c))
    )
  }

  const hasAnsweredCard = wildcardCards.some((c) => c.answer?.trim())
  const hasFreeForm = Boolean(intro.freeForm?.trim())
  const hasPartB = hasAnsweredCard || hasFreeForm
  const canProceed = Boolean(intro.thriftFind?.trim()) && hasPartB

  const handleContinue = () => {
    if (!intro.thriftFind?.trim() || !hasPartB) {
      setValidationError('Tell us a little about yourself to continue — the thrift find question is required, plus at least one other answer. ✦')
      return
    }
    setValidationError('')
    onComplete()
  }

  return (
    <div className="flex flex-col gap-8">

      {/* Page heading */}
      <div className="flex flex-col gap-2">
        <h1
          className="font-display leading-none"
          style={{
            color: '#1D1A0E',
            fontFamily: '"Bebas Neue", sans-serif',
            fontSize: 'clamp(2.5rem, 8vw, 5rem)',
          }}
        >
          Introduce Yourself in Style
        </h1>
        <p
          className="text-sm md:text-base"
          style={{ color: '#333333', fontFamily: '"DM Sans", sans-serif' }}
        >
          Your answers will be shared with the team before you arrive and featured in your introduction at All Hands. The more you share, the warmer the welcome — but as brief or as detailed as you like. Totally up to you. ✦
        </p>
      </div>

      {/* Part A — The Fleek Question */}
      <div className="flex flex-col gap-4">
        <div>
          <p
            className="text-sm font-semibold uppercase tracking-wide"
            style={{ color: 'rgba(51,51,51,0.5)', fontFamily: '"DM Sans", sans-serif' }}
          >
            Now tell us something...
          </p>
          <p
            className="font-bold text-lg mt-1"
            style={{ color: '#0F0F0F', fontFamily: '"DM Sans", sans-serif' }}
          >
            Your ultimate thrift find — what is it and where did you get it?
          </p>
        </div>
        <textarea
          value={intro.thriftFind || ''}
          onChange={(e) => updateIntro('thriftFind', e.target.value)}
          placeholder="Don't hold back."
          rows={3}
          className="w-full px-4 py-3 rounded-lg text-sm border resize-none outline-none focus:border-pitch-black transition-colors"
          style={{
            backgroundColor: 'white',
            borderColor: 'rgba(51,51,51,0.2)',
            color: '#0F0F0F',
            fontFamily: '"DM Sans", sans-serif',
          }}
        />
      </div>

      {/* Part B — Pick Your Question */}
      <div className="flex flex-col gap-4">
        <div>
          <p
            className="text-sm font-semibold uppercase tracking-wide"
            style={{ color: 'rgba(51,51,51,0.5)', fontFamily: '"DM Sans", sans-serif' }}
          >
            One more thing — pick the question you actually want to answer:
          </p>
          <p
            className="text-sm mt-1"
            style={{ color: '#333333', fontFamily: '"DM Sans", sans-serif' }}
          >
            Answer as many as you like — minimum one. ✦
          </p>
        </div>
        <div className="flex flex-col gap-3">
          {WILDCARD_QUESTIONS.map((q, idx) => (
            <WildcardCard
              key={idx}
              question={q}
              cardData={getCardData(idx)}
              onToggle={() => toggleCard(idx)}
              onAnswerChange={(answer) => updateCardAnswer(idx, answer)}
            />
          ))}
        </div>
      </div>

      {/* Part C — Free Form */}
      <div className="flex flex-col gap-4">
        <div>
          <p
            className="text-sm font-semibold uppercase tracking-wide"
            style={{ color: 'rgba(51,51,51,0.5)', fontFamily: '"DM Sans", sans-serif' }}
          >
            Or introduce yourself in your own way
          </p>
          <p
            className="text-sm mt-1"
            style={{ color: '#333333', fontFamily: '"DM Sans", sans-serif' }}
          >
            Rather tell us in your own words? Go for it — introduce yourself however feels right. ✦
          </p>
        </div>
        <textarea
          value={intro.freeForm || ''}
          onChange={(e) => updateIntro('freeForm', e.target.value)}
          placeholder="No rules here."
          rows={4}
          className="w-full px-4 py-3 rounded-lg text-sm border resize-none outline-none focus:border-pitch-black transition-colors"
          style={{
            backgroundColor: 'white',
            borderColor: 'rgba(51,51,51,0.2)',
            color: '#0F0F0F',
            fontFamily: '"DM Sans", sans-serif',
          }}
        />
      </div>

      {/* Validation error */}
      {validationError && (
        <p
          className="text-sm font-semibold"
          style={{ color: '#1D1A0E', fontFamily: '"DM Sans", sans-serif' }}
        >
          {validationError}
        </p>
      )}

      {/* CTA */}
      <div className="pb-4">
        <button
          onClick={handleContinue}
          className="w-full sm:w-auto py-4 px-10 rounded-lg font-bold text-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          style={{
            backgroundColor: '#FFD400',
            color: '#1D1A0E',
            fontFamily: '"DM Sans", sans-serif',
          }}
        >
          Continue ✦
        </button>
      </div>
    </div>
  )
}
