import MeetTheTeam from '../MeetTheTeam.jsx'

const FOUNDERS = [
  {
    img: '/abhi.avif',
    name: 'Abhi Arora',
    title: 'CEO & Co-founder',
    bio: 'Early employee at Dubsmash — grew it to 300M users before Reddit acquired it. Scaled tech startups across San Francisco, Berlin, and London. UC Berkeley & Cambridge MBA. Fleek started on his doorstep on Brick Lane.',
  },
  {
    img: '/sanket.avif',
    name: 'Sanket Agarwal',
    title: 'CTO & Co-founder',
    bio: 'Veteran technologist with over a decade in Silicon Valley. Product and engineering at Google, Uber, Suki, and Postmates. Built the tech that powers Fleek from day one.',
  },
]

function StatCard({ stat, label }) {
  return (
    <div
      className="flex flex-col items-center justify-center p-6 rounded-xl border-2 text-center transition-all duration-200 hover:-translate-y-0.5"
      style={{ borderColor: '#FFD400', backgroundColor: 'white' }}
    >
      <span
        className="font-display text-4xl md:text-5xl"
        style={{ color: '#1D1A0E', fontFamily: '"Bebas Neue", sans-serif' }}
      >
        {stat}
      </span>
      <span
        className="text-sm mt-1"
        style={{ color: '#333333', fontFamily: '"DM Sans", sans-serif' }}
      >
        {label}
      </span>
    </div>
  )
}

function FounderCard({ founder }) {
  return (
    <div
      className="flex flex-col items-center text-center p-6 rounded-xl border transition-all duration-200 hover:-translate-y-0.5 hover:border-gold"
      style={{ backgroundColor: 'white', borderColor: 'rgba(51,51,51,0.15)' }}
    >
      <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2" style={{ borderColor: '#FFD400' }}>
        <img
          src={founder.img}
          alt={founder.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.style.display = 'none'
            e.target.parentElement.innerHTML = `<div style="width:100%;height:100%;background:#FFD400;display:flex;align-items:center;justify-content:center;font-size:2rem;">✦</div>`
          }}
        />
      </div>
      <h3
        className="font-bold text-lg mb-1"
        style={{ color: '#0F0F0F', fontFamily: '"DM Sans", sans-serif' }}
      >
        {founder.name}
      </h3>
      <p
        className="text-sm font-semibold mb-3"
        style={{ color: '#FFD400', fontFamily: '"DM Sans", sans-serif' }}
      >
        {founder.title}
      </p>
      <p
        className="text-sm leading-relaxed"
        style={{ color: '#333333', fontFamily: '"DM Sans", sans-serif' }}
      >
        {founder.bio}
      </p>
    </div>
  )
}


export default function Section1Mission({ onComplete }) {
  return (
    <div className="flex flex-col gap-10">

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
          The Fleek Mission
        </h1>
        <p
          className="text-sm md:text-base"
          style={{ color: '#333333', fontFamily: '"DM Sans", sans-serif' }}
        >
          This is what we're building and why it matters. Read it, absorb it — you're now part of the story.
        </p>
      </div>

      {/* Mission statement */}
      <div
        className="p-6 md:p-8 rounded-xl"
        style={{ backgroundColor: '#1D1A0E' }}
      >
        <p
          className="text-base md:text-lg leading-relaxed"
          style={{ color: '#F6F1E7', fontFamily: '"DM Sans", sans-serif' }}
        >
          The fashion industry produces over 100 billion garments a year. 60% end up in landfill — not because people don't want them, but because the supply chain getting secondhand fashion from donation to resale is completely offline, manual, and broken. Fleek is fixing this. Our mission is to make secondhand the first choice.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard stat="9M+" label="items saved from landfill since 2022" />
        <StatCard stat="$50M+" label="raised from a16z, YC, HV Capital and others" />
        <StatCard stat="3x" label="year-on-year growth" />
      </div>

      {/* The Story */}
      <div className="flex flex-col gap-4">
        <h2
          className="font-display text-3xl"
          style={{ color: '#1D1A0E', fontFamily: '"Bebas Neue", sans-serif' }}
        >
          The Story
        </h2>
        <p
          className="text-base leading-relaxed"
          style={{ color: '#333333', fontFamily: '"DM Sans", sans-serif' }}
        >
          Fleek was born on Brick Lane. During the pandemic, our CEO Abhi made friends with local resellers and learned how broken their world was — secretive, fragmented, mostly offline. Together with Sanket, he built Fleek to fix it. We sold our first bundle in November 2021. The rest is still being written — and you're now part of it.
        </p>

        {/* Founders image — 4:3 container, positioned at 30% to show faces + waist */}
        <div className="rounded-xl overflow-hidden" style={{ aspectRatio: '4/3' }}>
          <img
            src="/founders.jpg"
            alt="Abhi & Sanket"
            className="w-full h-full object-cover"
            style={{ objectPosition: 'center 30%' }}
            onError={(e) => {
              e.target.style.display = 'none'
            }}
          />
          <p
            className="text-xs mt-2 italic"
            style={{ color: '#333333', fontFamily: '"DM Sans", sans-serif' }}
          >
            Abhi &amp; Sanket — built by operators, not observers.
          </p>
        </div>
      </div>

      {/* FleekSort callout */}
      <div
        className="p-6 md:p-8 rounded-xl"
        style={{ backgroundColor: '#FFD400' }}
      >
        <p
          className="text-base md:text-lg font-semibold leading-relaxed"
          style={{ color: '#1D1A0E', fontFamily: '"DM Sans", sans-serif' }}
        >
          Our secret weapon is FleekSort — an AI model fine-tuned on secondhand fashion that can grade, price, and categorise items from a single photo. Turning an opaque, manual trade into a structured, searchable, global inventory layer. This is what you're helping build.
        </p>
      </div>

      {/* Meet the Founders */}
      <div className="flex flex-col gap-6">
        <h2
          className="font-display text-3xl"
          style={{ color: '#1D1A0E', fontFamily: '"Bebas Neue", sans-serif' }}
        >
          Meet the Founders
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {FOUNDERS.map((founder) => (
            <FounderCard key={founder.name} founder={founder} />
          ))}
        </div>
      </div>

      {/* Meet the Team */}
      <MeetTheTeam />

      {/* CTA */}
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
          I'm in. Let's keep going ✦
        </button>
      </div>
    </div>
  )
}
