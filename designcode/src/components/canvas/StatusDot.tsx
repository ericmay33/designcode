'use client'

import type { NodeStatus } from '@/types/simulation'

const STATUS_COLORS: Record<NodeStatus, string> = {
  idle: 'bg-white/30',
  healthy: 'bg-green-400',
  degraded: 'bg-yellow-400',
  down: 'bg-red-400',
}

export function StatusDot({ status }: { status: NodeStatus }) {
  return (
    <span
      className={`ml-auto inline-block h-2 w-2 rounded-full ${STATUS_COLORS[status]}`}
      title={status}
    />
  )
}
