const VALUES = [
  {
    id: 'dreamBig',
    icon: '⭐',
    name: 'Dream Big and Disrupt Yourself',
    description: "Push the most ambitious version of what you're building. Nothing is out of reach.",
  },
  {
    id: 'ownership',
    icon: '🎯',
    name: 'Absolute Ownership',
    description: 'Own your work end to end. Take it from problem to done, and take pride in the outcome.',
  },
  {
    id: 'curiosity',
    icon: '🔍',
    name: 'Curiosity Leads the Way',
    description: "Don't accept anything at face value. Ask questions you don't know the answer to.",
  },
  {
    id: 'customer',
    icon: '💬',
    name: 'Talk to the Customer',
    description: 'Every decision starts with the customer at the centre.',
  },
  {
    id: 'diversity',
    icon: '🌍',
    name: 'Embrace Diversity',
    description: 'A global team building for a global supply chain. London, India, Pakistan. Bring your authentic self.',
  },
]

function ValueCard({ value }) {
  return (
    <div
      className="rounded-xl border-2 p-5 transition-all duration-200 hover:-translate-y-0.5"
      style={{
        backgroundColor: 'white',
        borderColor: 'rgba(255,212,0,0.4)',
      }}
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl flex-shrink-0">{value.icon}</span>
        <div className="flex-1 min-w-0">
          <h3
            className="font-bold text-base"
            style={{ color: '#0F0F0F', fontFamily: '"DM Sans", sans-serif' }}
          >
            {value.name}
          </h3>
          <p
            className="text-sm mt-0.5"
            style={{ color: '#333333', fontFamily: '"DM Sans", sans-serif' }}
          >
            {value.description}
          </p>
        </div>
      </div>
    </div>
  )
}

function VideoPlaceholder() {
  return (
    <div
      className="rounded-xl p-8 flex flex-col items-center justify-center text-center gap-4"
      style={{ backgroundColor: '#1D1A0E', minHeight: '180px' }}
    >
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center border-2"
        style={{ borderColor: 'rgba(255,212,0,0.4)' }}
      >
        <span
          className="text-2xl"
          style={{ color: '#FFD400', paddingLeft: '3px' }}
        >
          ▶
        </span>
      </div>
      <div>
        <p
          className="font-display text-xl mb-1"
          style={{ color: '#FFD400', fontFamily: '"Bebas Neue", sans-serif' }}
        >
          Life at Fleek ✦
        </p>
        <p
          className="text-sm max-w-xs mx-auto leading-relaxed"
          style={{ color: 'rgba(246,241,231,0.6)', fontFamily: '"DM Sans", sans-serif' }}
        >
          Coming soon — hear from the team directly about what it's really like here. Real people, real stories.
        </p>
      </div>
    </div>
  )
}

export default function Section2Values({ onComplete }) {
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
          How We Work
        </h1>
        <p
          className="text-sm md:text-base"
          style={{ color: '#333333', fontFamily: '"DM Sans", sans-serif' }}
        >
          Five values that shape every decision at Fleek. Get familiar — you'll hear these a lot.
        </p>
      </div>

      {/* Value cards — 2-2-1 grid on desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {VALUES.map((value, index) => (
          <div
            key={value.id}
            className={index === 4 ? 'sm:col-span-2 sm:max-w-[50%]' : ''}
          >
            <ValueCard value={value} />
          </div>
        ))}
      </div>

      {/* Video placeholder */}
      <VideoPlaceholder />

      {/* CTA — no validation */}
      <div className="pb-4">
        <button
          onClick={onComplete}
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
