import { useState, useCallback } from 'react'
import { getState, setState } from './utils/storage.js'
import Phase0Welcome from './components/Phase0Welcome.jsx'
import Phase1Shell from './components/Phase1/Phase1Shell.jsx'
import Phase2Congratulations from './components/Phase2Congratulations.jsx'
import Phase3Tasks from './components/Phase3Tasks.jsx'
import QAAssistant from './components/QAAssistant.jsx'

const DEFAULT_STATE = {
  firstName: '',
  startDate: '',
  currentPhase: 'phase0',
  currentSection: 1,
  phase1Progress: {
    section1: false,
    section2: false,
    section3: false,
    section4: false,
    section5: false,
    section6: false,
  },
  phase3Progress: {
    dayOne: [],
    weekOne: [],
    monthOne: [],
  },
  formData: {
    intro: {
      thriftFind: '',
      wildcardCards: [],
      freeForm: '',
    },
    values: [],
    payroll: {
      nameOnAccount: '',
      accountNumber: '',
      sortCode: '',
      taxCode: '',
    },
    equipment: {
      laptop: '',
      monitor: '',
      peripherals: '',
      additionalNeeds: '',
    },
    welcomeKit: {
      snacks: [],
      size: '',
      allergies: '',
      anythingElse: '',
    },
    personalityAnswers: [],
  },
}

function mergeState(defaults, saved) {
  const merged = { ...defaults }
  for (const key of Object.keys(defaults)) {
    if (saved[key] !== undefined) {
      if (
        typeof defaults[key] === 'object' &&
        defaults[key] !== null &&
        !Array.isArray(defaults[key])
      ) {
        merged[key] = mergeState(defaults[key], saved[key] || {})
      } else {
        merged[key] = saved[key]
      }
    }
  }
  return merged
}

export default function App() {
  const [appState, setAppState] = useState(() => {
    const saved = getState()
    if (saved && saved.currentPhase) {
      return mergeState(DEFAULT_STATE, saved)
    }
    return DEFAULT_STATE
  })

  const updateState = useCallback((updates) => {
    setAppState((prev) => {
      const next = { ...prev, ...updates }
      setState(next)
      return next
    })
  }, [])

  const updateFormData = useCallback((key, value) => {
    setAppState((prev) => {
      const next = {
        ...prev,
        formData: { ...prev.formData, [key]: value },
      }
      setState(next)
      return next
    })
  }, [])

  const completeSection = useCallback((sectionNum) => {
    setAppState((prev) => {
      const sectionKey = `section${sectionNum}`
      const nextSection = sectionNum + 1
      const allDone = sectionNum === 6

      const next = {
        ...prev,
        phase1Progress: { ...prev.phase1Progress, [sectionKey]: true },
        currentSection: allDone ? prev.currentSection : nextSection,
        currentPhase: allDone ? 'phase2' : 'phase1',
      }
      setState(next)
      return next
    })
  }, [])

  const goToSection = useCallback((sectionNum) => {
    setAppState((prev) => {
      const next = { ...prev, currentSection: sectionNum }
      setState(next)
      return next
    })
  }, [])

  const goToPhase = useCallback((phase) => {
    setAppState((prev) => {
      const next = { ...prev, currentPhase: phase }
      setState(next)
      return next
    })
  }, [])

  const startFresh = useCallback(() => {
    setAppState(DEFAULT_STATE)
    setState(DEFAULT_STATE)
  }, [])

  const showQA = appState.currentPhase !== 'phase0'

  return (
    <div className="min-h-screen w-full">
      {appState.currentPhase === 'phase0' && (
        <Phase0Welcome
          appState={appState}
          updateState={updateState}
          startFresh={startFresh}
        />
      )}

      {appState.currentPhase === 'phase1' && (
        <Phase1Shell
          appState={appState}
          updateState={updateState}
          updateFormData={updateFormData}
          completeSection={completeSection}
          goToSection={goToSection}
          goToPhase={goToPhase}
        />
      )}

      {appState.currentPhase === 'phase2' && (
        <Phase2Congratulations
          appState={appState}
          goToPhase={goToPhase}
          goToSection={goToSection}
        />
      )}

      {appState.currentPhase === 'phase3' && (
        <Phase3Tasks
          appState={appState}
          updateState={updateState}
          startFresh={startFresh}
        />
      )}

      {showQA && <QAAssistant firstName={appState.firstName} />}
    </div>
  )
}
