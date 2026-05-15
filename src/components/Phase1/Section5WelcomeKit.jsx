const SNACK_OPTIONS = [
  { id: 'sweet', label: '🍫 Sweet tooth' },
  { id: 'savoury', label: '🧀 Savoury all the way' },
  { id: 'healthy', label: '🌱 Keep it healthy' },
  { id: 'caffeine', label: '⚡ Just give me caffeine' },
  { id: 'surprise', label: '🎲 Surprise me' },
]

const SIZE_OPTIONS = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

function Pill({ label, selected, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled && !selected}
      className="px-4 py-2.5 rounded-full text-sm font-medium border-2 transition-all duration-200 hover:border-gold"
      style={{
        backgroundColor: selected ? '#FFD400' : 'white',
        borderColor: selected ? '#FFD400' : 'rgba(51,51,51,0.25)',
        color: selected ? '#1D1A0E' : '#333333',
        fontFamily: '"DM Sans", sans-serif',
        minHeight: '44px',
        opacity: disabled && !selected ? 0.5 : 1,
        cursor: disabled && !selected ? 'not-allowed' : 'pointer',
      }}
    >
      {label}
    </button>
  )
}

export default function Section5WelcomeKit({ formData, updateFormData, onComplete }) {
  const kit = formData.welcomeKit || {}

  const update = (field, value) => {
    updateFormData('welcomeKit', { ...kit, [field]: value })
  }

  const toggleSnack = (id) => {
    const current = kit.snacks || []
    if (current.includes(id)) {
      update('snacks', current.filter((s) => s !== id))
    } else if (current.length < 2) {
      update('snacks', [...current, id])
    }
  }

  const snacks = kit.snacks || []
  const canProceed = snacks.length >= 1 && kit.size?.trim()

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
          A Little Something From Us
        </h1>
        <p
          className="text-sm md:text-base"
          style={{ color: '#333333', fontFamily: '"DM Sans", sans-serif' }}
        >
          This helps us put together your welcome kit. Only the People Ops &amp; Workspace Manager sees this.
        </p>
      </div>

      {/* Part A — Snacks */}
      <div className="flex flex-col gap-4">
        <div>
          <h3
            className="font-display text-2xl"
            style={{ color: '#1D1A0E', fontFamily: '"Bebas Neue", sans-serif' }}
          >
            What fuels you?
          </h3>
          <p
            className="text-xs mt-1"
            style={{ color: 'rgba(51,51,51,0.6)', fontFamily: '"DM Sans", sans-serif' }}
          >
            Pick up to 2. No strong opinions? Pick surprise me and we'll take our chances.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {SNACK_OPTIONS.map(({ id, label }) => (
            <Pill
              key={id}
              label={label}
              selected={snacks.includes(id)}
              onClick={() => toggleSnack(id)}
              disabled={snacks.length >= 2}
            />
          ))}
        </div>
      </div>

      {/* Part B — Merch size */}
      <div className="flex flex-col gap-4">
        <div>
          <h3
            className="font-display text-2xl"
            style={{ color: '#1D1A0E', fontFamily: '"Bebas Neue", sans-serif' }}
          >
            Your welcome kit includes something to wear.
          </h3>
          <p
            className="text-xs mt-1"
            style={{ color: 'rgba(51,51,51,0.6)', fontFamily: '"DM Sans", sans-serif' }}
          >
            For the thing you'll definitely wear to every party.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {SIZE_OPTIONS.map((size) => (
            <Pill
              key={size}
              label={size}
              selected={kit.size === size}
              onClick={() => update('size', kit.size === size ? '' : size)}
            />
          ))}
        </div>
      </div>

      {/* Part C — Allergies */}
      <div className="flex flex-col gap-3">
        <div>
          <h3
            className="font-semibold text-base"
            style={{ color: '#0F0F0F', fontFamily: '"DM Sans", sans-serif' }}
          >
            Allergies &amp; dietary requirements
            <span
              className="ml-2 text-xs font-normal"
              style={{ color: 'rgba(51,51,51,0.5)' }}
            >
              Optional
            </span>
          </h3>
        </div>
        <textarea
          value={kit.allergies || ''}
          onChange={(e) => update('allergies', e.target.value)}
          placeholder="Nuts, gluten, dairy, vegetarian, vegan — anything we need to know before we stock up. ✦"
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

      {/* Part D — Anything else */}
      <div className="flex flex-col gap-3">
        <div>
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
        </div>
        <textarea
          value={kit.anythingElse || ''}
          onChange={(e) => update('anythingElse', e.target.value)}
          placeholder="Anything else you'd like us to know before day one?"
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
          Continue ✦
        </button>
      </div>
    </div>
  )
}
