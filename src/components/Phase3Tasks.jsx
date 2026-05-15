import { useState, useRef, useEffect } from 'react'

const TABS = [
  {
    id: 'dayOne',
    label: 'Day One',
    items: [
      'Meet Hatty Choudhury (People Ops & Workspace Manager) at reception — 9:00am ✦',
      'Office tour with the team',
      'Collect your welcome kit ✦',
      'Complete your Right to Work verification via Deel',
      'Set up payroll with the People Ops & Workspace Manager — bank details and tax code ✦',
      'Get set up on all systems',
      'Laptop and equipment setup',
      'Lunch with your manager',
      'Meet the London team',
      'End of day check-in — any questions, anything you need?',
    ],
  },
  {
    id: 'weekOne',
    label: 'First Week',
    items: [
      'Intro call with Abhi (CEO) — all new joiners get this ✦',
      "Get properly set up and onboarded on the tools you'll be using for your role",
      'Learn about the Fleek operations up close',
      'Shadow a team member outside your immediate function',
      'Join your first All Hands and introduce yourself ✦',
      'Submit your tax code if you have it',
      'Your first team lunch ✦',
    ],
  },
  {
    id: 'monthOne',
    label: 'First Month',
    items: [
      '30 day check-in with your manager',
      'Identify one thing you will change, build, or improve — and share it ✦',
      'Speak to all the leaders and your key colleagues',
      'People Ops & Workspace briefing with Hatty ✦',
      'Get properly set up and trained — then start making your mark. ✦',
      'Define your 90 day goals with your manager',
    ],
  },
]

// ── Confetti canvas ────────────────────────────────────────────────────────────
function ConfettiCanvas({ onDone }) {
  const canvasRef = useRef(null)
  const onDoneRef = useRef(onDone)
  useEffect(() => { onDoneRef.current = onDone }, [onDone])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const COLORS = ['#FFD400', '#FFD400', '#FFD400', '#1D1A0E', '#F6F1E7', '#FFD400']
    const particles = Array.from({ length: 220 }, () => ({
      x: Math.random() * window.innerWidth,
      y: -20 - Math.random() * 120,
      w: 6 + Math.random() * 10,
      h: 3 + Math.random() * 6,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      angle: Math.random() * Math.PI,
      spin: (Math.random() - 0.5) * 0.18,
      vx: (Math.random() - 0.5) * 5,
      vy: 1.8 + Math.random() * 4,
      alpha: 1,
    }))

    const DURATION_MS = 3500
    const start = performance.now()
    let rafId

    function draw(now) {
      const elapsed = now - start
      const progress = Math.min(elapsed / DURATION_MS, 1)

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        p.angle += p.spin
        p.vy += 0.07

        p.alpha = progress > 0.65 ? Math.max(0, 1 - (progress - 0.65) / 0.35) : 1

        ctx.save()
        ctx.globalAlpha = p.alpha
        ctx.translate(p.x, p.y)
        ctx.rotate(p.angle)
        ctx.fillStyle = p.color
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h)
        ctx.restore()
      })

      if (progress < 1) {
        rafId = requestAnimationFrame(draw)
      } else {
        onDoneRef.current()
      }
    }

    rafId = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 998,
      }}
    />
  )
}

// ── Completion overlay ─────────────────────────────────────────────────────────
function CompletionOverlay({ onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center px-6 py-12 fade-in"
      style={{ backgroundColor: '#FFD400' }}
    >
      <div className="w-full max-w-lg flex flex-col items-center gap-8 text-center">
        <img
          src="/logoblack.webp"
          alt="Fleek"
          className="h-12 object-contain"
          onError={(e) => { e.target.style.display = 'none' }}
        />

        <h1
          className="leading-none"
          style={{
            color: '#1D1A0E',
            fontFamily: '"Bebas Neue", sans-serif',
            fontSize: 'clamp(3rem, 10vw, 6rem)',
          }}
        >
          You've nailed it. ✦
        </h1>

        <p
          className="text-base md:text-lg max-w-md leading-relaxed"
          style={{ color: '#1D1A0E', fontFamily: '"DM Sans", sans-serif' }}
        >
          Seriously. You've completed every step of your onboarding. The team is lucky to have you.
        </p>

        <div
          className="w-full p-6 rounded-xl border-2"
          style={{ borderColor: '#1D1A0E', backgroundColor: 'rgba(29,26,14,0.06)' }}
        >
          <p
            className="text-base leading-relaxed"
            style={{ color: '#1D1A0E', fontFamily: '"DM Sans", sans-serif' }}
          >
            What's next? Keep showing up, keep owning it, keep asking questions. The rest writes itself. ✦
          </p>
        </div>

        <button
          onClick={onClose}
          className="py-4 px-10 rounded-lg font-bold text-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          style={{
            backgroundColor: '#1D1A0E',
            color: '#FFD400',
            fontFamily: '"DM Sans", sans-serif',
          }}
        >
          Back to my tasks ✦
        </button>
      </div>
    </div>
  )
}

// ── Reset confirmation modal ───────────────────────────────────────────────────
function ResetConfirmModal({ onConfirm, onCancel }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-6"
      style={{ backgroundColor: 'rgba(0,0,0,0.45)' }}
      onClick={onCancel}
    >
      <div
        className="w-full max-w-sm rounded-2xl p-6 flex flex-col gap-5 shadow-2xl"
        style={{ backgroundColor: 'white' }}
        onClick={(e) => e.stopPropagation()}
      >
        <p
          className="text-base leading-relaxed"
          style={{ color: '#0F0F0F', fontFamily: '"DM Sans", sans-serif' }}
        >
          This will clear all your progress and start from the beginning. Are you sure?
        </p>
        <div className="flex flex-col gap-2">
          <button
            onClick={onConfirm}
            className="w-full py-3 px-6 rounded-lg font-bold text-sm transition-all duration-200 hover:opacity-90"
            style={{
              backgroundColor: '#1D1A0E',
              color: '#FFD400',
              fontFamily: '"DM Sans", sans-serif',
            }}
          >
            Yes, clear everything
          </button>
          <button
            onClick={onCancel}
            className="w-full py-3 px-6 rounded-lg font-bold text-sm border-2 transition-all duration-200 hover:opacity-70"
            style={{
              borderColor: 'rgba(51,51,51,0.2)',
              color: '#333333',
              backgroundColor: 'transparent',
              fontFamily: '"DM Sans", sans-serif',
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Checklist item ─────────────────────────────────────────────────────────────
function ChecklistItem({ text, checked, onToggle }) {
  return (
    <li>
      <button
        onClick={onToggle}
        className="w-full flex items-start gap-3 py-3 text-left transition-all duration-200 hover:opacity-80"
        style={{ minHeight: '44px' }}
        aria-pressed={checked}
      >
        <span
          className="flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center mt-0.5 transition-all duration-200"
          style={{
            borderColor: checked ? '#FFD400' : 'rgba(51,51,51,0.3)',
            backgroundColor: checked ? '#FFD400' : 'transparent',
          }}
        >
          {checked && (
            <span className="text-xs font-bold tick-anim" style={{ color: '#1D1A0E' }}>
              ✓
            </span>
          )}
        </span>
        <span
          className="text-sm leading-relaxed transition-all duration-200"
          style={{
            color: checked ? 'rgba(51,51,51,0.4)' : '#0F0F0F',
            fontFamily: '"DM Sans", sans-serif',
            textDecoration: checked ? 'line-through' : 'none',
          }}
        >
          {text}
        </span>
      </button>
    </li>
  )
}

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

// ── Main component ─────────────────────────────────────────────────────────────
export default function Phase3Tasks({ appState, updateState, startFresh }) {
  const { phase3Progress } = appState
  const [activeTab, setActiveTab] = useState('dayOne')
  const [showResetConfirm, setShowResetConfirm] = useState(false)

  // Celebration state machine: 'idle' → 'confetti' → 'overlay' → 'closed'
  const [celebrationState, setCelebrationState] = useState('idle')
  const initialTotalDone = useRef(null)

  const getChecked = (tabId) => phase3Progress[tabId] || []

  const toggleItem = (tabId, idx) => {
    const current = getChecked(tabId)
    const updated = current.includes(idx)
      ? current.filter((i) => i !== idx)
      : [...current, idx]
    updateState({ phase3Progress: { ...phase3Progress, [tabId]: updated } })
  }

  const totalItems = TABS.reduce((acc, tab) => acc + tab.items.length, 0)
  const totalDone = TABS.reduce((acc, tab) => acc + getChecked(tab.id).length, 0)

  // Initialise the "done at mount" ref once
  if (initialTotalDone.current === null) {
    initialTotalDone.current = totalDone
  }

  // Trigger confetti only when the last item is checked during this session
  useEffect(() => {
    if (
      totalDone === totalItems &&
      totalItems > 0 &&
      initialTotalDone.current < totalItems &&
      celebrationState === 'idle'
    ) {
      setCelebrationState('confetti')
    }
  }, [totalDone, totalItems, celebrationState])

  const isTabComplete = (tab) => getChecked(tab.id).length === tab.items.length

  const handleReset = () => {
    startFresh()
    setShowResetConfirm(false)
  }

  return (
    <div className="min-h-screen flex flex-col fade-in" style={{ backgroundColor: '#F6F1E7' }}>

      {/* Confetti */}
      {celebrationState === 'confetti' && (
        <ConfettiCanvas onDone={() => setCelebrationState('overlay')} />
      )}

      {/* Completion overlay */}
      {celebrationState === 'overlay' && (
        <CompletionOverlay onClose={() => setCelebrationState('closed')} />
      )}

      {/* Reset confirmation modal */}
      {showResetConfirm && (
        <ResetConfirmModal
          onConfirm={handleReset}
          onCancel={() => setShowResetConfirm(false)}
        />
      )}

      {/* Header with logo */}
      <header className="px-4 md:px-8 py-4 border-b flex items-center" style={{ borderColor: 'rgba(51,51,51,0.12)' }}>
        <Logo />
      </header>

      {/* Banner */}
      <div className="px-4 md:px-8 py-8 text-center" style={{ backgroundColor: '#FFD400' }}>
        <h1
          className="font-display leading-none mb-2"
          style={{
            color: '#1D1A0E',
            fontFamily: '"Bebas Neue", sans-serif',
            fontSize: 'clamp(3rem, 10vw, 6rem)',
          }}
        >
          Let's Get to Work ✦
        </h1>
        <p
          className="text-sm md:text-base"
          style={{ color: 'rgba(29,26,14,0.8)', fontFamily: '"DM Sans", sans-serif' }}
        >
          Here's your roadmap. Take it one tick at a time.
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 px-4 md:px-8 py-8 max-w-3xl mx-auto w-full">

        {/* Tabs */}
        <div className="flex gap-1 mb-6 border-b" style={{ borderColor: 'rgba(51,51,51,0.12)' }}>
          {TABS.map((tab) => {
            const done = isTabComplete(tab)
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="px-4 py-3 text-sm font-semibold transition-all duration-200 border-b-2 -mb-px"
                style={{
                  borderColor: isActive ? '#FFD400' : 'transparent',
                  color: isActive ? '#0F0F0F' : 'rgba(51,51,51,0.5)',
                  fontFamily: '"DM Sans", sans-serif',
                  minHeight: '44px',
                }}
              >
                {tab.label}
                {done && <span className="ml-1" style={{ color: '#FFD400' }}>✦</span>}
              </button>
            )
          })}
        </div>

        {/* Active tab checklist */}
        {TABS.filter((t) => t.id === activeTab).map((tab) => (
          <div key={tab.id} className="fade-in">
            <ul className="flex flex-col divide-y" style={{ borderColor: 'rgba(51,51,51,0.08)' }}>
              {tab.items.map((item, idx) => (
                <ChecklistItem
                  key={idx}
                  text={item}
                  checked={getChecked(tab.id).includes(idx)}
                  onToggle={() => toggleItem(tab.id, idx)}
                />
              ))}
            </ul>
          </div>
        ))}

        {/* Progress summary */}
        <div className="mt-8 pt-6 border-t" style={{ borderColor: 'rgba(51,51,51,0.12)' }}>
          <p
            className="text-sm font-semibold"
            style={{ color: '#333333', fontFamily: '"DM Sans", sans-serif' }}
          >
            {totalDone} of {totalItems} tasks complete ✦
          </p>
          <div className="w-full h-2 rounded-full mt-2 overflow-hidden" style={{ backgroundColor: 'rgba(51,51,51,0.12)' }}>
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                backgroundColor: '#FFD400',
                width: `${totalItems > 0 ? (totalDone / totalItems) * 100 : 0}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Reset button — subtle, bottom-left */}
      <button
        onClick={() => setShowResetConfirm(true)}
        className="fixed bottom-4 left-4 text-xs transition-opacity hover:opacity-70"
        style={{
          color: 'rgba(51,51,51,0.4)',
          fontFamily: '"DM Sans", sans-serif',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '8px',
        }}
        aria-label="Reset all progress"
      >
        ↺ Start over
      </button>
    </div>
  )
}
