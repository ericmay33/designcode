import { create } from 'zustand'
import type { Node, Edge } from 'reactflow'
import type {
  RealTimeMetrics,
  SimConfig,
  NodeType,
  NodeConfig,
} from '@/types/simulation'

export type SimulationStatus = 'idle' | 'running' | 'paused' | 'finished'

interface SimulationState {
  status: SimulationStatus
  metrics: RealTimeMetrics | null
  metricsHistory: RealTimeMetrics[]
  config: SimConfig

  setStatus: (status: SimulationStatus) => void
  setMetrics: (metrics: RealTimeMetrics) => void
  pushMetrics: (metrics: RealTimeMetrics) => void
  setConfig: (config: Partial<SimConfig>) => void
  initEngine: (nodes: Node[], edges: Edge[]) => void
  reset: () => void
}

const DEFAULT_CONFIG: SimConfig = {
  targetRPS: 1000,
  rampSeconds: 10,
  durationSeconds: 60,
}

export const useSimulationStore = create<SimulationState>((set) => ({
  status: 'idle',
  metrics: null,
  metricsHistory: [],
  config: DEFAULT_CONFIG,

  setStatus: (status) => set({ status }),

  setMetrics: (metrics) => set({ metrics }),

  pushMetrics: (metrics) =>
    set((state) => ({
      metrics,
      metricsHistory: [...state.metricsHistory, metrics],
    })),

  setConfig: (config) =>
    set((state) => ({ config: { ...state.config, ...config } })),

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  initEngine: (_nodes, _edges) => {
    // Will be wired to SimulationEngine in Block 2
  },

  reset: () =>
    set({
      status: 'idle',
      metrics: null,
      metricsHistory: [],
    }),
}))

export const DEFAULT_LABELS: Record<NodeType, string> = {
  loadBalancer: 'Load Balancer',
  apiServer: 'API Server',
  sqlDatabase: 'SQL Database',
  nosqlDatabase: 'NoSQL Database',
  cache: 'Cache (Redis)',
  cdn: 'CDN',
  messageQueue: 'Message Queue',
  objectStorage: 'Object Storage',
  apiGateway: 'API Gateway',
  searchIndex: 'Search Index',
  dns: 'DNS',
  waf: 'WAF',
}

export const DEFAULT_CONFIGS: Record<NodeType, NodeConfig> = {
  loadBalancer: { algorithm: 'round-robin' },
  apiServer: { instanceCount: 2, cpuUnits: 1, memoryGB: 2, maxConnections: 1000 },
  sqlDatabase: { readReplicas: 0, connectionPoolSize: 100, storageType: 'ssd' },
  nosqlDatabase: { partitionCount: 4, replicationFactor: 3, consistency: 'eventual' },
  cache: { maxMemoryGB: 2, evictionPolicy: 'lru', clusterMode: false, hitRatePercent: 80 },
  cdn: { cacheRatioPercent: 85, ttlSeconds: 3600 },
  messageQueue: { consumerCount: 2, batchSize: 10, maxQueueDepth: 10000 },
  objectStorage: {},
  apiGateway: { rateLimitRps: 5000, authMethod: 'jwt' },
  searchIndex: { shardCount: 3, replicaCount: 1 },
  dns: {},
  waf: {},
}
