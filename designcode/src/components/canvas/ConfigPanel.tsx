'use client'

import type { Node } from 'reactflow'
import { X } from 'lucide-react'
import type { NodeType, NodeConfig } from '@/types/simulation'

interface ConfigPanelProps {
  nodeId: string
  nodes: Node[]
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>
  onClose: () => void
}

/* ── Helper components ──────────────────────────────────────────── */

function ConfigField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs text-white/60">{label}</label>
      {children}
    </div>
  )
}

function ConfigSlider({
  label,
  min,
  max,
  value,
  onChange,
}: {
  label: string
  min: number
  max: number
  value: number
  onChange: (v: number) => void
}) {
  return (
    <ConfigField label={label}>
      <div className="flex items-center gap-2">
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="accent-blue-400 w-full"
        />
        <span className="text-xs text-white min-w-[3ch] text-right">{value}</span>
      </div>
    </ConfigField>
  )
}

function ConfigSelect({
  label,
  options,
  value,
  onChange,
}: {
  label: string
  options: string[]
  value: string
  onChange: (v: string) => void
}) {
  return (
    <ConfigField label={label}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-[#0f1117] border border-white/10 rounded-md text-xs text-white px-2 py-1.5 w-full focus:border-blue-400 focus:outline-none"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </ConfigField>
  )
}

function ConfigToggle({
  label,
  value,
  onChange,
}: {
  label: string
  value: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <ConfigField label={label}>
      <button
        type="button"
        onClick={() => onChange(!value)}
        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
          value ? 'bg-blue-500' : 'bg-white/20'
        }`}
      >
        <span
          className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
            value ? 'translate-x-4' : 'translate-x-0.5'
          }`}
        />
      </button>
    </ConfigField>
  )
}

/* ── Per-node-type config fields ────────────────────────────────── */

function NodeConfigFields({
  nodeType,
  config,
  updateConfig,
}: {
  nodeType: NodeType
  config: NodeConfig
  updateConfig: (patch: Partial<NodeConfig>) => void
}) {
  switch (nodeType) {
    case 'loadBalancer':
      return (
        <>
          <ConfigSelect
            label="Algorithm"
            options={['round-robin', 'least-connections', 'ip-hash']}
            value={config.algorithm ?? 'round-robin'}
            onChange={(v) => updateConfig({ algorithm: v as NodeConfig['algorithm'] })}
          />
        </>
      )

    case 'apiServer':
      return (
        <>
          <ConfigSlider
            label="Instances"
            min={1}
            max={20}
            value={config.instanceCount ?? 2}
            onChange={(v) => updateConfig({ instanceCount: v })}
          />
          <ConfigSelect
            label="CPU"
            options={['0.25', '0.5', '1', '2', '4']}
            value={String(config.cpuUnits ?? 1)}
            onChange={(v) => updateConfig({ cpuUnits: Number(v) })}
          />
          <ConfigSelect
            label="Memory"
            options={['0.5GB', '1GB', '2GB', '4GB', '8GB', '16GB']}
            value={`${config.memoryGB ?? 2}GB`}
            onChange={(v) => updateConfig({ memoryGB: parseFloat(v) })}
          />
        </>
      )

    case 'sqlDatabase':
      return (
        <>
          <ConfigSlider
            label="Read Replicas"
            min={0}
            max={5}
            value={config.readReplicas ?? 0}
            onChange={(v) => updateConfig({ readReplicas: v })}
          />
          <ConfigSelect
            label="Storage"
            options={['ssd', 'hdd']}
            value={config.storageType ?? 'ssd'}
            onChange={(v) => updateConfig({ storageType: v as NodeConfig['storageType'] })}
          />
          <ConfigSlider
            label="Pool Size"
            min={10}
            max={500}
            value={config.connectionPoolSize ?? 100}
            onChange={(v) => updateConfig({ connectionPoolSize: v })}
          />
        </>
      )

    case 'nosqlDatabase':
      return (
        <>
          <ConfigSlider
            label="Partitions"
            min={1}
            max={16}
            value={config.partitionCount ?? 4}
            onChange={(v) => updateConfig({ partitionCount: v })}
          />
          <ConfigSlider
            label="Replication Factor"
            min={1}
            max={5}
            value={config.replicationFactor ?? 3}
            onChange={(v) => updateConfig({ replicationFactor: v })}
          />
          <ConfigSelect
            label="Consistency"
            options={['eventual', 'strong']}
            value={config.consistency ?? 'eventual'}
            onChange={(v) => updateConfig({ consistency: v as NodeConfig['consistency'] })}
          />
        </>
      )

    case 'cache':
      return (
        <>
          <ConfigSlider
            label="Hit Rate %"
            min={0}
            max={100}
            value={config.hitRatePercent ?? 80}
            onChange={(v) => updateConfig({ hitRatePercent: v })}
          />
          <ConfigSelect
            label="Eviction"
            options={['lru', 'lfu', 'ttl']}
            value={config.evictionPolicy ?? 'lru'}
            onChange={(v) => updateConfig({ evictionPolicy: v as NodeConfig['evictionPolicy'] })}
          />
          <ConfigToggle
            label="Cluster Mode"
            value={config.clusterMode ?? false}
            onChange={(v) => updateConfig({ clusterMode: v })}
          />
          <ConfigSlider
            label="Max Memory GB"
            min={1}
            max={64}
            value={config.maxMemoryGB ?? 2}
            onChange={(v) => updateConfig({ maxMemoryGB: v })}
          />
        </>
      )

    case 'cdn':
      return (
        <>
          <ConfigSlider
            label="Cache Ratio %"
            min={0}
            max={100}
            value={config.cacheRatioPercent ?? 85}
            onChange={(v) => updateConfig({ cacheRatioPercent: v })}
          />
          <ConfigSlider
            label="TTL Seconds"
            min={60}
            max={86400}
            value={config.ttlSeconds ?? 3600}
            onChange={(v) => updateConfig({ ttlSeconds: v })}
          />
        </>
      )

    case 'messageQueue':
      return (
        <>
          <ConfigSlider
            label="Consumers"
            min={1}
            max={20}
            value={config.consumerCount ?? 2}
            onChange={(v) => updateConfig({ consumerCount: v })}
          />
          <ConfigSlider
            label="Batch Size"
            min={1}
            max={100}
            value={config.batchSize ?? 10}
            onChange={(v) => updateConfig({ batchSize: v })}
          />
          <ConfigSlider
            label="Max Queue Depth"
            min={100}
            max={100000}
            value={config.maxQueueDepth ?? 10000}
            onChange={(v) => updateConfig({ maxQueueDepth: v })}
          />
        </>
      )

    case 'objectStorage':
      return (
        <p className="text-xs text-white/40 italic">No configurable options</p>
      )

    case 'apiGateway':
      return (
        <>
          <ConfigSlider
            label="Rate Limit RPS"
            min={100}
            max={50000}
            value={config.rateLimitRps ?? 5000}
            onChange={(v) => updateConfig({ rateLimitRps: v })}
          />
          <ConfigSelect
            label="Auth Method"
            options={['jwt', 'api-key', 'oauth']}
            value={config.authMethod ?? 'jwt'}
            onChange={(v) => updateConfig({ authMethod: v as NodeConfig['authMethod'] })}
          />
        </>
      )

    case 'searchIndex':
      return (
        <>
          <ConfigSlider
            label="Shards"
            min={1}
            max={16}
            value={config.shardCount ?? 3}
            onChange={(v) => updateConfig({ shardCount: v })}
          />
          <ConfigSlider
            label="Replicas"
            min={0}
            max={5}
            value={config.replicaCount ?? 1}
            onChange={(v) => updateConfig({ replicaCount: v })}
          />
        </>
      )

    case 'dns':
      return (
        <p className="text-xs text-white/40 italic">No configurable options</p>
      )

    case 'waf':
      return (
        <p className="text-xs text-white/40 italic">No configurable options</p>
      )

    default:
      return null
  }
}

/* ── Main panel ─────────────────────────────────────────────────── */

export function ConfigPanel({ nodeId, nodes, setNodes, onClose }: ConfigPanelProps) {
  const node = nodes.find((n) => n.id === nodeId)
  if (!node) return null

  const nodeType = node.type as NodeType | undefined
  const config: NodeConfig = node.data?.config ?? {}
  const label: string = node.data?.label ?? ''

  const updateNodeData = (patch: Record<string, unknown>) => {
    setNodes((prev) =>
      prev.map((n) =>
        n.id === nodeId ? { ...n, data: { ...n.data, ...patch } } : n
      )
    )
  }

  const updateConfig = (patch: Partial<NodeConfig>) => {
    updateNodeData({ config: { ...config, ...patch } })
  }

  return (
    <div className="absolute right-0 top-0 h-full w-72 bg-[#1a1d27] border-l border-white/10 flex flex-col z-50">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
        <h3 className="text-sm font-medium text-white">Configure Node</h3>
        <button
          onClick={onClose}
          className="text-white/40 hover:text-white transition-colors"
        >
          <X size={16} />
        </button>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {/* Label */}
        <ConfigField label="Label">
          <input
            type="text"
            value={label}
            onChange={(e) => updateNodeData({ label: e.target.value })}
            className="bg-[#0f1117] border border-white/10 rounded-md text-xs text-white px-2 py-1.5 w-full focus:border-blue-400 focus:outline-none"
          />
        </ConfigField>

        {/* Type-specific fields */}
        {nodeType && (
          <NodeConfigFields
            nodeType={nodeType}
            config={config}
            updateConfig={updateConfig}
          />
        )}
      </div>
    </div>
  )
}
