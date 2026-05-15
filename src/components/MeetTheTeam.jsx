const TEAM_PLACEHOLDERS = [
  'Head of Product',
  'Senior Engineer',
  'Operations Lead',
  'Growth Manager',
  'Data Scientist',
  'Designer',
  'Finance Lead',
  'People Ops',
]

function PlaceholderCard({ role }) {
  return (
    <div
      className="flex flex-col items-center text-center p-4 rounded-xl border"
      style={{ backgroundColor: 'white', borderColor: 'rgba(51,51,51,0.1)' }}
    >
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center text-xl mb-2"
        style={{ backgroundColor: 'rgba(51,51,51,0.08)' }}
      >
        ✦
      </div>
      <p
        className="text-xs font-semibold mb-1"
        style={{ color: '#333333', fontFamily: '"DM Sans", sans-serif' }}
      >
        {role}
      </p>
      <p
        className="text-xs"
        style={{ color: 'rgba(51,51,51,0.5)', fontFamily: '"DM Sans", sans-serif' }}
      >
        Coming soon
      </p>
    </div>
  )
}

export default function MeetTheTeam() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2
          className="font-display text-3xl"
          style={{ color: '#1D1A0E', fontFamily: '"Bebas Neue", sans-serif' }}
        >
          Meet the Team
        </h2>
        <p
          className="text-sm mt-1"
          style={{ color: '#333333', fontFamily: '"DM Sans", sans-serif' }}
        >
          Your teammates will appear here — full introductions coming on day one. ✦
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {TEAM_PLACEHOLDERS.map((role) => (
          <PlaceholderCard key={role} role={role} />
        ))}
      </div>

      <p
        className="text-xs italic"
        style={{ color: 'rgba(51,51,51,0.5)', fontFamily: '"DM Sans", sans-serif' }}
      >
        In a live implementation, this section pulls directly from Deel.
      </p>
    </div>
  )
}
