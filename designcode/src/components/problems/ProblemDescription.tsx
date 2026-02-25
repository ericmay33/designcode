'use client'

interface ProblemDescriptionProps {
  slug: string
}

export function ProblemDescription({ slug }: ProblemDescriptionProps) {
  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Title + metadata */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-xl font-semibold text-white">
            {slug
              .split('-')
              .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
              .join(' ')}
          </h1>
          <span className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-yellow-500/20 text-yellow-400">
            Medium
          </span>
        </div>
        <p className="text-xs text-white/50">Estimated: 45 minutes</p>
      </div>

      {/* Description placeholder */}
      <div className="space-y-3">
        <h2 className="text-sm font-medium text-white/80">Description</h2>
        <p className="text-sm text-white/60 leading-relaxed">
          Design a system that meets the requirements and success criteria
          listed below. Drag components from the sidebar onto the canvas,
          connect them to form your architecture, then run the simulation
          to validate your design.
        </p>
      </div>

      {/* Requirements placeholder */}
      <div className="space-y-3">
        <h2 className="text-sm font-medium text-white/80">Requirements</h2>
        <ul className="space-y-2 text-sm text-white/60">
          <li className="flex gap-2">
            <span className="text-white/30">1.</span>
            Handle at least 10,000 RPS at peak
          </li>
          <li className="flex gap-2">
            <span className="text-white/30">2.</span>
            P99 latency under 200ms
          </li>
          <li className="flex gap-2">
            <span className="text-white/30">3.</span>
            Survive at least 1 node failure
          </li>
        </ul>
      </div>

      {/* Success criteria placeholder */}
      <div className="space-y-3">
        <h2 className="text-sm font-medium text-white/80">Success Criteria</h2>
        <div className="rounded-lg border border-white/10 overflow-hidden">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-white/5">
                <th className="text-left px-3 py-2 text-white/50 font-medium">Metric</th>
                <th className="text-left px-3 py-2 text-white/50 font-medium">Required</th>
              </tr>
            </thead>
            <tbody className="text-white/60">
              <tr className="border-t border-white/5">
                <td className="px-3 py-2">P99 Latency</td>
                <td className="px-3 py-2">&lt; 200ms</td>
              </tr>
              <tr className="border-t border-white/5">
                <td className="px-3 py-2">Min RPS</td>
                <td className="px-3 py-2">&gt; 10,000</td>
              </tr>
              <tr className="border-t border-white/5">
                <td className="px-3 py-2">Error Rate</td>
                <td className="px-3 py-2">&lt; 1%</td>
              </tr>
              <tr className="border-t border-white/5">
                <td className="px-3 py-2">Monthly Cost</td>
                <td className="px-3 py-2">&lt; $5,000</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Hints accordion placeholder */}
      <div className="space-y-3">
        <h2 className="text-sm font-medium text-white/80">Hints</h2>
        <div className="space-y-2">
          {['Think about caching strategy', 'Consider read replicas', 'Don\'t forget a CDN'].map(
            (hint, i) => (
              <button
                key={i}
                className="w-full text-left px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-white/40 hover:text-white/60 hover:bg-white/10 transition-colors"
              >
                Hint {i + 1}: Click to reveal
              </button>
            ),
          )}
        </div>
      </div>
    </div>
  )
}
