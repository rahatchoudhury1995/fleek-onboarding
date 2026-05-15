export default function ProgressBar({ progress, currentSection, onSectionClick }) {
  const sections = [1, 2, 3, 4, 5, 6]

  return (
    <div className="flex gap-1 w-full">
      {sections.map((num) => {
        const key = `section${num}`
        const isComplete = progress[key]
        const isCurrent = currentSection === num && !isComplete

        return (
          <button
            key={num}
            onClick={() => isComplete && onSectionClick(num)}
            disabled={!isComplete}
            className={[
              'flex-1 h-1.5 rounded-full transition-all duration-300',
              isComplete
                ? 'bg-gold cursor-pointer hover:opacity-80'
                : isCurrent
                ? 'bg-gold/40'
                : 'bg-graphite/20',
              !isComplete && 'cursor-default',
            ]
              .filter(Boolean)
              .join(' ')}
            aria-label={`Section ${num}${isComplete ? ' (complete, click to revisit)' : ''}`}
          />
        )
      })}
    </div>
  )
}
