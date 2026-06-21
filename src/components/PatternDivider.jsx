// A thin woven Kente-style strip used to separate sections.
export default function PatternDivider({ className = '' }) {
  return (
    <div className={`flex items-center gap-4 ${className}`} aria-hidden="true">
      <span className="h-px flex-1 bg-gradient-to-r from-transparent to-clay-200" />
      <span className="pattern-strip h-2 w-28 rounded-full opacity-90" />
      <span className="grid h-3 w-3 rotate-45 place-items-center bg-clay-400" />
      <span className="pattern-strip h-2 w-28 rounded-full opacity-90" />
      <span className="h-px flex-1 bg-gradient-to-l from-transparent to-clay-200" />
    </div>
  )
}
