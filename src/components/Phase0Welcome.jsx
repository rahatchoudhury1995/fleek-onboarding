import { useState } from 'react'

function Logo({ variant = 'light' }) {
  const src = variant === 'light' ? '/logo.webp' : '/logoblack.webp'
  return (
    <img
      src={src}
      alt="Fleek"
      className="h-10 md:h-12 object-contain"
      onError={(e) => {
        e.target.style.display = 'none'
        e.target.nextSibling.style.display = 'block'
      }}
    />
  )
}

export default function Phase0Welcome({ appState, updateState, startFresh }) {
  const isReturning = Boolean(appState.firstName && appState.startDate)

  const [firstName, setFirstName] = useState(appState.firstName || '')
  const [startDate, setStartDate] = useState(appState.startDate || '')
  const [error, setError] = useState('')
  const [showOptions, setShowOptions] = useState(isReturning)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!firstName.trim()) {
      setError('Please enter your first name.')
      return
    }
    if (!startDate) {
      setError('Please select your start date.')
      return
    }
    setError('')
    updateState({ firstName: firstName.trim(), startDate, currentPhase: 'phase1', currentSection: 1 })
  }

  const handleContinue = () => {
    updateState({ currentPhase: appState.currentPhase === 'phase0' ? 'phase1' : appState.currentPhase })
  }

  const handleStartFresh = () => {
    startFresh()
    setFirstName('')
    setStartDate('')
    setShowOptions(false)
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-6 py-12 fade-in"
         style={{ backgroundColor: '#FFD400' }}>
      <div className="w-full max-w-md flex flex-col items-center gap-8">

        {/* Logo */}
        <div className="flex items-center">
          <img
            src="/logoblack.webp"
            alt="Fleek"
            className="h-10 md:h-12 object-contain"
            onError={(e) => { e.target.style.display = 'none' }}
          />
        </div>

        {showOptions ? (
          /* Returning user */
          <div className="w-full flex flex-col items-center gap-6 text-center">
            <h1
              className="font-display text-5xl md:text-7xl leading-none tracking-wide"
              style={{ color: '#1D1A0E', fontFamily: '"Bebas Neue", sans-serif' }}
            >
              Welcome back, {appState.firstName}. ✦
            </h1>
            <p className="text-lg md:text-xl" style={{ color: '#1D1A0E', fontFamily: '"DM Sans", sans-serif' }}>
              Pick up where you left off.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <button
                onClick={handleContinue}
                className="flex-1 py-4 px-8 rounded-lg font-bold text-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                style={{ backgroundColor: '#1D1A0E', color: '#FFD400', fontFamily: '"DM Sans", sans-serif' }}
              >
                Continue ✦
              </button>
              <button
                onClick={handleStartFresh}
                className="flex-1 py-4 px-8 rounded-lg font-bold text-lg transition-all duration-200 border-2 hover:scale-[1.02] active:scale-[0.98]"
                style={{ borderColor: '#1D1A0E', color: '#1D1A0E', backgroundColor: 'transparent', fontFamily: '"DM Sans", sans-serif' }}
              >
                Start fresh
              </button>
            </div>
          </div>
        ) : (
          /* New user */
          <div className="w-full flex flex-col items-center gap-6">
            <div className="text-center">
              <h1
                className="font-display leading-none tracking-wide mb-2"
                style={{
                  color: '#1D1A0E',
                  fontFamily: '"Bebas Neue", sans-serif',
                  fontSize: 'clamp(3rem, 10vw, 5.5rem)',
                }}
              >
                Welcome to Fleek. ✦
              </h1>
              <p
                className="text-lg md:text-xl"
                style={{ color: '#1D1A0E', fontFamily: '"DM Sans", sans-serif' }}
              >
                You made the right call. Let's get you ready.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label
                  className="font-semibold text-sm"
                  style={{ color: '#1D1A0E', fontFamily: '"DM Sans", sans-serif' }}
                  htmlFor="firstName"
                >
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Your first name"
                  required
                  className="w-full px-4 py-3 rounded-lg text-base border-2 outline-none focus:border-pitch-black transition-colors"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.7)',
                    borderColor: 'transparent',
                    color: '#1D1A0E',
                    fontFamily: '"DM Sans", sans-serif',
                    minHeight: '44px',
                  }}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label
                  className="font-semibold text-sm"
                  style={{ color: '#1D1A0E', fontFamily: '"DM Sans", sans-serif' }}
                  htmlFor="startDate"
                >
                  Start Date
                </label>
                <input
                  id="startDate"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg text-base border-2 outline-none focus:border-pitch-black transition-colors"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.7)',
                    borderColor: 'transparent',
                    color: '#1D1A0E',
                    fontFamily: '"DM Sans", sans-serif',
                    minHeight: '44px',
                  }}
                />
              </div>

              {error && (
                <p className="text-sm font-medium" style={{ color: '#1D1A0E' }}>
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="w-full py-4 px-8 rounded-lg font-bold text-lg mt-2 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  backgroundColor: '#1D1A0E',
                  color: '#FFD400',
                  fontFamily: '"DM Sans", sans-serif',
                }}
              >
                Let's go ✦
              </button>
            </form>

            <p
              className="text-xs text-center opacity-70"
              style={{ color: '#1D1A0E', fontFamily: '"DM Sans", sans-serif' }}
            >
              Reviewing this experience? Enter today's date as your start date to explore all phases.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
