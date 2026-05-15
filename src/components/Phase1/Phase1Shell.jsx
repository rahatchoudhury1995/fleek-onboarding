import { useEffect, useState } from 'react'
import ProgressBar from '../ProgressBar.jsx'
import Section1Mission from './Section1Mission.jsx'
import Section2Values from './Section2Values.jsx'
import Section3Intro from './Section3Intro.jsx'
import Section4Equipment from './Section4Equipment.jsx'
import Section5WelcomeKit from './Section5WelcomeKit.jsx'
import Section6OfficeProp from './Section6OfficeProp.jsx'
import { getCountdown } from '../../utils/countdown.js'

function Logo() {
  return (
    <div className="flex items-center">
      <img
        src="/logo.webp"
        alt="Fleek"
        className="h-8 md:h-10 object-contain"
        onError={(e) => { e.target.style.display = 'none' }}
      />
    </div>
  )
}

function CountdownTimer({ startDate }) {
  const [countdown, setCountdown] = useState(getCountdown(startDate))

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(getCountdown(startDate))
    }, 1000)
    return () => clearInterval(timer)
  }, [startDate])

  const { days, hours, minutes } = countdown

  return (
    <div
      className="text-xs font-mono tabular-nums"
      style={{ color: '#333333', fontFamily: '"DM Sans", sans-serif' }}
      aria-live="polite"
    >
      {countdown.total <= 0 ? (
        <span className="font-semibold" style={{ color: '#FFD400' }}>Day one is here ✦</span>
      ) : (
        <span>
          {days}d {String(hours).padStart(2, '0')}h {String(minutes).padStart(2, '0')}m
        </span>
      )}
    </div>
  )
}

const SECTION_COMPONENTS = {
  1: Section1Mission,
  2: Section2Values,
  3: Section3Intro,
  4: Section4Equipment,
  5: Section5WelcomeKit,
  6: Section6OfficeProp,
}

export default function Phase1Shell({
  appState,
  updateState,
  updateFormData,
  completeSection,
  goToSection,
  goToPhase,
}) {
  const { currentSection, phase1Progress, formData, startDate } = appState

  const handleBack = () => {
    if (currentSection > 1) {
      goToSection(currentSection - 1)
    } else {
      goToPhase('phase0')
    }
  }

  const SectionComponent = SECTION_COMPONENTS[currentSection] || Section1Mission

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#F6F1E7' }}>
      {/* Header */}
      <header className="sticky top-0 z-10 px-4 md:px-8 py-3 border-b" style={{ backgroundColor: '#F6F1E7', borderColor: 'rgba(51,51,51,0.12)' }}>
        <div className="max-w-4xl mx-auto flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={handleBack}
                className="text-sm font-medium transition-opacity hover:opacity-70 flex items-center gap-1"
                style={{ color: '#333333', fontFamily: '"DM Sans", sans-serif', minHeight: '44px' }}
                aria-label="Go back"
              >
                ← Back
              </button>
              <Logo />
            </div>
            <CountdownTimer startDate={startDate} />
          </div>
          <ProgressBar
            progress={phase1Progress}
            currentSection={currentSection}
            onSectionClick={goToSection}
          />
        </div>
      </header>

      {/* Section content */}
      <main className="flex-1 px-4 md:px-8 py-8 fade-in" key={currentSection}>
        <div className="max-w-4xl mx-auto">
          <SectionComponent
            formData={formData}
            updateFormData={updateFormData}
            onComplete={() => completeSection(currentSection)}
            phase1Progress={phase1Progress}
            firstName={appState.firstName}
          />
        </div>
      </main>
    </div>
  )
}
