import { useState, useEffect } from 'react'
import { getCountdown, isPhase3Unlocked } from '../utils/countdown.js'

function Logo() {
  return (
    <div className="flex items-center justify-center">
      <img
        src="/logoblack.webp"
        alt="Fleek"
        className="h-12 md:h-16 object-contain"
        onError={(e) => { e.target.style.display = 'none' }}
      />
    </div>
  )
}

function CountdownUnit({ value, label }) {
  return (
    <div className="flex flex-col items-center">
      <span
        className="font-display tabular-nums leading-none"
        style={{
          color: '#1D1A0E',
          fontFamily: '"Bebas Neue", sans-serif',
          fontSize: 'clamp(3rem, 10vw, 5rem)',
        }}
      >
        {String(value).padStart(2, '0')}
      </span>
      <span
        className="text-xs font-semibold uppercase tracking-widest mt-1"
        style={{ color: 'rgba(29,26,14,0.6)', fontFamily: '"DM Sans", sans-serif' }}
      >
        {label}
      </span>
    </div>
  )
}

function Separator() {
  return (
    <span
      className="font-display self-start pt-1"
      style={{
        color: '#1D1A0E',
        fontFamily: '"Bebas Neue", sans-serif',
        fontSize: 'clamp(2.5rem, 8vw, 4rem)',
      }}
    >
      :
    </span>
  )
}

export default function Phase2Congratulations({ appState, goToPhase, goToSection }) {
  const { startDate } = appState
  const [countdown, setCountdown] = useState(getCountdown(startDate))
  const [unlocked, setUnlocked] = useState(isPhase3Unlocked(startDate))

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(getCountdown(startDate))
      setUnlocked(isPhase3Unlocked(startDate))
    }, 1000)
    return () => clearInterval(timer)
  }, [startDate])

  const { days, hours, minutes, seconds } = countdown

  const handleUnlock = () => {
    if (unlocked) {
      goToPhase('phase3')
    }
  }

  const handleBack = () => {
    goToPhase('phase1')
    goToSection(6)
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 py-12 fade-in relative"
      style={{ backgroundColor: '#FFD400' }}
    >
      {/* Back button */}
      <button
        onClick={handleBack}
        className="absolute top-4 left-4 text-sm font-medium transition-opacity hover:opacity-70 flex items-center gap-1"
        style={{ color: '#1D1A0E', fontFamily: '"DM Sans", sans-serif', minHeight: '44px' }}
        aria-label="Go back to Section 6"
      >
        ← Back
      </button>

      <div className="w-full max-w-2xl flex flex-col items-center gap-10 text-center">

        <Logo />

        <div className="flex flex-col gap-2">
          <h1
            className="leading-none tracking-wide"
            style={{
              color: '#1D1A0E',
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: 'clamp(3.5rem, 12vw, 7rem)',
            }}
          >
            You're Ready ✦
          </h1>
          <p
            className="text-base md:text-lg max-w-lg mx-auto leading-relaxed"
            style={{ color: '#1D1A0E', fontFamily: '"DM Sans", sans-serif' }}
          >
            Seriously — you've smashed the pre-start checklist. We've got everything we need. Now the only thing left to do is show up.
          </p>
        </div>

        {/* Countdown */}
        {countdown.total > 0 ? (
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-end gap-2 md:gap-4">
              <CountdownUnit value={days} label="days" />
              <Separator />
              <CountdownUnit value={hours} label="hours" />
              <Separator />
              <CountdownUnit value={minutes} label="min" />
              <Separator />
              <CountdownUnit value={seconds} label="sec" />
            </div>
            <p
              className="text-sm font-semibold"
              style={{ color: 'rgba(29,26,14,0.7)', fontFamily: '"DM Sans", sans-serif' }}
            >
              until your first day ✦
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <p
              className="font-display text-4xl"
              style={{ color: '#1D1A0E', fontFamily: '"Bebas Neue", sans-serif' }}
            >
              Today's the day. ✦
            </p>
          </div>
        )}

        {/* CTA button */}
        {unlocked ? (
          <button
            onClick={handleUnlock}
            className="py-4 px-10 rounded-lg font-bold text-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] fade-in"
            style={{
              backgroundColor: '#1D1A0E',
              color: '#FFD400',
              fontFamily: '"DM Sans", sans-serif',
            }}
          >
            Your first day is here. Let's go. ✦
          </button>
        ) : (
          <button
            disabled
            className="py-4 px-10 rounded-lg font-bold text-lg cursor-not-allowed flex items-center gap-2"
            style={{
              backgroundColor: 'rgba(29,26,14,0.25)',
              color: 'rgba(29,26,14,0.6)',
              fontFamily: '"DM Sans", sans-serif',
            }}
          >
            <span>🔒</span>
            <span>
              Unlocks in {days}d {String(hours).padStart(2, '0')}h {String(minutes).padStart(2, '0')}m ✦
            </span>
          </button>
        )}

        <p
          className="text-xs"
          style={{ color: 'rgba(29,26,14,0.6)', fontFamily: '"DM Sans", sans-serif' }}
        >
          Bookmark this page — it'll unlock automatically on your first day. ✦
        </p>
      </div>
    </div>
  )
}
