const LAPTOP_OPTIONS = [
  'MacBook Pro 14"',
  'MacBook Pro 16"',
  'Windows — Dell XPS 15',
  'Windows — ThinkPad X1',
]

const MONITOR_OPTIONS = [
  'Single 27" monitor',
  'Dual 24" monitors',
  'Ultrawide 34"',
  'No monitor needed',
]

const ADDITIONAL_NEEDS_OPTIONS = [
  'Keyboard and mouse',
  'Foot rest',
  'Screen privacy filter',
  'Noise-cancelling headphones',
]

function PillGroup({ label, options, selected, onSelect }) {
  return (
    <div className="flex flex-col gap-3">
      <h3
        className="font-semibold text-base"
        style={{ color: '#0F0F0F', fontFamily: '"DM Sans", sans-serif' }}
      >
        {label}
      </h3>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isSelected = selected === option
          return (
            <button
              key={option}
              onClick={() => onSelect(isSelected ? '' : option)}
              className="px-4 py-2.5 rounded-full text-sm font-medium border-2 transition-all duration-200 hover:border-gold"
              style={{
                backgroundColor: isSelected ? '#FFD400' : 'white',
                borderColor: isSelected ? '#FFD400' : 'rgba(51,51,51,0.25)',
                color: isSelected ? '#1D1A0E' : '#333333',
                fontFamily: '"DM Sans", sans-serif',
                minHeight: '44px',
              }}
            >
              {option}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default function Section4Equipment({ formData, updateFormData, onComplete }) {
  const equipment = formData.equipment || {}

  const update = (field, value) => {
    updateFormData('equipment', { ...equipment, [field]: value })
  }

  const canProceed = equipment.laptop?.trim() && equipment.monitor?.trim()

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
          Your Setup
        </h1>
        <p
          className="text-sm md:text-base"
          style={{ color: '#333333', fontFamily: '"DM Sans", sans-serif' }}
        >
          Your preferences go straight to IT so everything is ready before day one. Only the People Ops &amp; Workspace Manager sees this.
        </p>
      </div>

      {/* Selection groups */}
      <div className="flex flex-col gap-7">
        <PillGroup
          label="Laptop"
          options={LAPTOP_OPTIONS}
          selected={equipment.laptop || ''}
          onSelect={(v) => update('laptop', v)}
        />
        <PillGroup
          label="Monitor"
          options={MONITOR_OPTIONS}
          selected={equipment.monitor || ''}
          onSelect={(v) => update('monitor', v)}
        />
        <PillGroup
          label="Additional Needs"
          options={ADDITIONAL_NEEDS_OPTIONS}
          selected={equipment.peripherals || ''}
          onSelect={(v) => update('peripherals', v)}
        />

        {/* Anything else — open text, optional */}
        <div className="flex flex-col gap-3">
          <h3
            className="font-semibold text-base"
            style={{ color: '#0F0F0F', fontFamily: '"DM Sans", sans-serif' }}
          >
            Anything else?
            <span
              className="ml-2 text-xs font-normal"
              style={{ color: 'rgba(51,51,51,0.5)' }}
            >
              Optional
            </span>
          </h3>
          <textarea
            value={equipment.additionalNeeds || ''}
            onChange={(e) => update('additionalNeeds', e.target.value)}
            placeholder="Accessibility requirements, specific tools, strong opinions about chair height — let us know."
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
      </div>

      {/* CTA */}
      <div className="pb-4">
        <button
          onClick={onComplete}
          disabled={!canProceed}
          className="w-full sm:w-auto py-4 px-10 rounded-lg font-bold text-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98] disabled:hover:scale-100"
          style={{
            backgroundColor: '#FFD400',
            color: '#1D1A0E',
            fontFamily: '"DM Sans", sans-serif',
          }}
        >
          Sorted ✦
        </button>
      </div>
    </div>
  )
}
