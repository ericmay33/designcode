export type NodeType =
  | 'loadBalancer' | 'apiServer' | 'sqlDatabase' | 'nosqlDatabase'
  | 'cache' | 'cdn' | 'messageQueue' | 'objectStorage'
  | 'apiGateway' | 'searchIndex' | 'dns' | 'waf'

export type NodeStatus = 'idle' | 'healthy' | 'degraded' | 'down'

export interface NodeConfig {
  algorithm?: 'round-robin' | 'least-connections' | 'ip-hash'
  instanceCount?: number
  cpuUnits?: number
  memoryGB?: number
  maxConnections?: number
  readReplicas?: number
  connectionPoolSize?: number
  storageType?: 'ssd' | 'hdd'
  partitionCount?: number
  replicationFactor?: number
  consistency?: 'eventual' | 'strong'
  maxMemoryGB?: number
  evictionPolicy?: 'lru' | 'lfu' | 'ttl'
  clusterMode?: boolean
  hitRatePercent?: number
  cacheRatioPercent?: number
  ttlSeconds?: number
  consumerCount?: number
  batchSize?: number
  maxQueueDepth?: number
  rateLimitRps?: number
  authMethod?: 'jwt' | 'api-key' | 'oauth'
  shardCount?: number
  replicaCount?: number
}

export interface SimComponentNode {
  id: string
  type: NodeType
  label: string
  config: NodeConfig
}

export interface SimConnection {
  id: string
  sourceId: string
  targetId: string
}

export interface SimConfig {
  targetRPS: number
  rampSeconds: number
  durationSeconds: number
}

export interface NodeMetrics {
  cpu: number
  throughput: number
  queueDepth: number
  errorRate: number
  avgLatencyMs: number
  status: NodeStatus
}

export interface RealTimeMetrics {
  rps: number
  latency: { p50: number; p95: number; p99: number; p999: number }
  errorRate: number
  estimatedMonthlyCostUSD: number
  elapsedSeconds: number
  nodes: Record<string, NodeMetrics>
}

export interface SuccessCriteria {
  maxLatencyP99Ms?: number
  minRPS?: number
  maxErrorRate?: number
  maxMonthlyCostUSD?: number
  mustSurviveNodeFailures?: number
}

export interface CriterionResult {
  label: string
  passed: boolean
  required: string
  actual: string
  hint?: string
}

export interface ValidationResult {
  passed: boolean
  score: number
  criteria: CriterionResult[]
}
