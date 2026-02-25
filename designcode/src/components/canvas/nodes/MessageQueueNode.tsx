'use client'

import { Handle, Position, type NodeProps } from 'reactflow'
import { MessagesSquare } from 'lucide-react'
import { useSimulationStore } from '@/store/simulation.store'
import { StatusDot } from '../StatusDot'
import { MetricRow } from '../MetricRow'

export function MessageQueueNode({ id, data, selected }: NodeProps) {
  const nodeMetrics = useSimulationStore(s => s.metrics?.nodes[id])

  return (
    <div className={`
      min-w-[140px] rounded-xl border bg-[#1a1d27]
      ${selected ? 'border-blue-400 shadow-lg shadow-blue-400/20' : 'border-white/15'}
      transition-all
    `}>
      <Handle type="target" position={Position.Left} className="!bg-white/30" />

      <div className="flex items-center gap-2 px-3 py-2 border-b border-white/10">
        <MessagesSquare size={14} className="text-yellow-400" />
        <span className="text-xs font-medium text-white truncate">{data.label}</span>
        <StatusDot status={nodeMetrics?.status ?? 'idle'} />
      </div>

      {nodeMetrics && nodeMetrics.status !== 'idle' && (
        <div className="px-3 py-2 space-y-1">
          <MetricRow label="RPS" value={`${nodeMetrics.throughput.toFixed(0)}`} />
          <MetricRow label="Latency" value={`${nodeMetrics.avgLatencyMs.toFixed(0)}ms`} />
          <MetricRow label="Queue" value={`${nodeMetrics.queueDepth}`} />
        </div>
      )}

      <Handle type="source" position={Position.Right} className="!bg-white/30" />
    </div>
  )
}
