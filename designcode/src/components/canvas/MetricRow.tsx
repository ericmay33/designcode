'use client'

export function MetricRow({
  label,
  value,
  warn = false,
}: {
  label: string
  value: string
  warn?: boolean
}) {
  return (
    <div className="flex items-center justify-between text-[10px]">
      <span className="text-white/50">{label}</span>
      <span className={warn ? 'text-red-400 font-medium' : 'text-white/80'}>
        {value}
      </span>
    </div>
  )
}
