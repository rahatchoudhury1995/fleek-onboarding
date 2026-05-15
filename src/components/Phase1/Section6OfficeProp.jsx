function InfoCard({ title, children }) {
  return (
    <div
      className="p-6 rounded-xl border flex flex-col gap-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-gold"
      style={{ backgroundColor: 'white', borderColor: 'rgba(51,51,51,0.15)' }}
    >
      <h3
        className="font-display text-2xl"
        style={{ color: '#1D1A0E', fontFamily: '"Bebas Neue", sans-serif' }}
      >
        {title}
      </h3>
      <div className="flex flex-col gap-2">
        {children}
      </div>
    </div>
  )
}

function InfoLine({ icon, text }) {
  return (
    <p
      className="text-sm flex gap-2"
      style={{ color: '#333333', fontFamily: '"DM Sans", sans-serif' }}
    >
      <span>{icon}</span>
      <span>{text}</span>
    </p>
  )
}

export default function Section6OfficeProp({ onComplete }) {
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
          Your First Day
        </h1>
        <p
          className="text-sm md:text-base"
          style={{ color: '#333333', fontFamily: '"DM Sans", sans-serif' }}
        >
          Everything you need to know before you walk through the door. No surprises.
        </p>
      </div>

      {/* Three info cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <InfoCard title="Getting Here ✦">
          <InfoLine icon="📍" text="Fleek HQ, Commercial Street, E1, London" />
          <InfoLine icon="🚇" text="Liverpool Street — 5 min walk" />
          <InfoLine icon="🚇" text="Aldgate — 7 min walk" />
          <InfoLine icon="🚇" text="Shoreditch High Street — 8 min walk" />
          <p
            className="text-sm italic mt-1"
            style={{ color: 'rgba(51,51,51,0.7)', fontFamily: '"DM Sans", sans-serif' }}
          >
            We're right in the heart of Shoreditch. Hard to miss, easy to love.
          </p>
        </InfoCard>

        <InfoCard title="What to Wear ✦">
          <p
            className="text-sm font-semibold"
            style={{ color: '#0F0F0F', fontFamily: '"DM Sans", sans-serif' }}
          >
            We don't have a dress code. We have taste.
          </p>
          <p
            className="text-sm leading-relaxed"
            style={{ color: '#333333', fontFamily: '"DM Sans", sans-serif' }}
          >
            Wear what feels like you. Just maybe not that one jacket you've been meaning to donate. Actually — scratch that. Wear it. We respect the commitment.
          </p>
        </InfoCard>

        <InfoCard title="Your First Morning ✦">
          <InfoLine icon="⏰" text="Arrive: 9:00am" />
          <InfoLine icon="👋" text="Ask for: Hatty Choudhury — People Ops & Workspace Manager (they'll be expecting you)" />
          <InfoLine icon="🪪" text="Bring: Photo ID for building access" />
          <p
            className="text-sm italic mt-1"
            style={{ color: 'rgba(51,51,51,0.7)', fontFamily: '"DM Sans", sans-serif' }}
          >
            Someone will meet you at the door. You won't be standing around looking lost — we promise.
          </p>
        </InfoCard>
      </div>

      {/* Admin tiles — Payroll + Right to Work */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {/* Payroll info tile */}
        <div
          className="p-6 rounded-xl border-2 flex flex-col gap-3"
          style={{ backgroundColor: 'white', borderColor: 'rgba(51,51,51,0.15)' }}
        >
          <div className="flex items-center gap-3">
            <span className="text-3xl">💰</span>
            <h3
              className="font-display text-2xl"
              style={{ color: '#1D1A0E', fontFamily: '"Bebas Neue", sans-serif' }}
            >
              Setting You Up for Payday ✦
            </h3>
          </div>
          <p
            className="text-sm leading-relaxed"
            style={{ color: '#333333', fontFamily: '"DM Sans", sans-serif' }}
          >
            We'll get your payroll set up securely on day one. The People Ops &amp; Workspace Manager will walk you through it in person and make sure everything is sorted. Nothing to do right now. ✦
          </p>
        </div>

        {/* Right to Work card */}
        <div
          className="p-6 rounded-xl border-2 flex flex-col gap-4"
          style={{ backgroundColor: 'white', borderColor: '#FFD400' }}
        >
          <div className="flex items-center gap-3">
            <span className="text-3xl">📋</span>
            <h3
              className="font-display text-2xl"
              style={{ color: '#1D1A0E', fontFamily: '"Bebas Neue", sans-serif' }}
            >
              Right to Work Verification ✦
            </h3>
          </div>
          <p
            className="text-sm leading-relaxed"
            style={{ color: '#333333', fontFamily: '"DM Sans", sans-serif' }}
          >
            You'll receive an email from Deel before your first day. Keep an eye out for it and complete it as soon as possible — it's required before you can officially start. ✦
          </p>
        </div>
      </div>

      {/* Day one teaser block */}
      <div
        className="p-6 md:p-8 rounded-xl"
        style={{ backgroundColor: '#FFD400' }}
      >
        <h3
          className="font-display text-3xl mb-3"
          style={{ color: '#1D1A0E', fontFamily: '"Bebas Neue", sans-serif' }}
        >
          What's waiting for you ✦
        </h3>
        <p
          className="text-base leading-relaxed mb-3"
          style={{ color: '#1D1A0E', fontFamily: '"DM Sans", sans-serif' }}
        >
          We've got a jam-packed day lined up. Expect introductions, an office tour, your welcome kit, and everything you need to hit the ground running. But we won't overload you now — you're already smashing it.
        </p>
        <p
          className="text-base leading-relaxed"
          style={{ color: '#1D1A0E', fontFamily: '"DM Sans", sans-serif' }}
        >
          Let us handle the rest. All you need to do is count down the days — and then we'll unlock the next phase of your onboarding right here. ✦
        </p>
      </div>

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
          I'm ready ✦
        </button>
      </div>
    </div>
  )
}
