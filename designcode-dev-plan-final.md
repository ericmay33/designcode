# DesignCode — Development Plan

---

## Stack

```
Framework:     Next.js 14 (App Router, TypeScript strict)
Styling:       Tailwind CSS + shadcn/ui
Canvas:        React Flow
Editor:        Monaco Editor
Charts:        Recharts
State:         Zustand
Database:      Supabase (Postgres + Auth + RLS)
Auth:          NextAuth.js (Google + GitHub OAuth)
Execution:     Piston API
Payments:      Stripe
Testing:       Vitest
```

---

## Scaffold

```bash
npx create-next-app@latest designcode \
  --typescript --tailwind --eslint --app \
  --src-dir --import-alias "@/*"

cd designcode

npm install \
  @monaco-editor/react \
  reactflow \
  recharts \
  zustand \
  @supabase/supabase-js \
  @supabase/auth-helpers-nextjs \
  next-auth \
  @auth/supabase-adapter \
  stripe \
  @stripe/stripe-js \
  lucide-react \
  clsx \
  tailwind-merge \
  date-fns \
  zod \
  react-markdown \
  remark-gfm

npm install -D vitest @vitest/ui @types/node
```

`tsconfig.json`:
```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true
  }
}
```

`next.config.js`:
```js
module.exports = {
  output: 'standalone',
  images: {
    domains: ['avatars.githubusercontent.com', 'lh3.googleusercontent.com']
  }
}
```

`vitest.config.ts`:
```ts
import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  test: { environment: 'node' },
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') }
  }
})
```

---

## Folder Structure

```
src/
├── app/
│   ├── page.tsx                          # Landing page
│   ├── login/page.tsx
│   ├── problems/
│   │   ├── page.tsx                      # Problem browser
│   │   ├── coding/[slug]/page.tsx        # 3-pane code editor
│   │   └── system/[slug]/page.tsx        # Canvas simulator
│   ├── dashboard/page.tsx
│   ├── leaderboard/page.tsx
│   ├── profile/[username]/page.tsx
│   ├── mock-interview/
│   │   ├── page.tsx
│   │   └── report/[sessionId]/page.tsx
│   ├── admin/
│   │   ├── page.tsx
│   │   ├── problem-sets/page.tsx
│   │   └── assessments/page.tsx
│   └── api/
│       ├── auth/[...nextauth]/route.ts
│       ├── execute/route.ts
│       ├── submissions/route.ts
│       ├── leaderboard/route.ts
│       └── stripe/
│           ├── checkout/route.ts
│           ├── portal/route.ts
│           └── webhook/route.ts
│
├── components/
│   ├── canvas/
│   │   ├── SimulationCanvas.tsx
│   │   ├── ComponentSidebar.tsx
│   │   ├── ConfigPanel.tsx
│   │   ├── AnimatedEdge.tsx
│   │   ├── CanvasToolbar.tsx
│   │   └── nodes/
│   │       ├── LoadBalancerNode.tsx
│   │       ├── ApiServerNode.tsx
│   │       ├── SqlDatabaseNode.tsx
│   │       ├── NoSqlDatabaseNode.tsx
│   │       ├── CacheNode.tsx
│   │       ├── CdnNode.tsx
│   │       ├── MessageQueueNode.tsx
│   │       ├── ObjectStorageNode.tsx
│   │       ├── ApiGatewayNode.tsx
│   │       ├── SearchIndexNode.tsx
│   │       ├── DnsNode.tsx
│   │       └── WafNode.tsx
│   ├── simulation/
│   │   ├── MetricsPanel.tsx
│   │   ├── MetricsChart.tsx
│   │   ├── ChaosControls.tsx
│   │   ├── ValidationResult.tsx
│   │   └── RunControls.tsx
│   ├── editor/
│   │   ├── CodeEditor.tsx
│   │   ├── LanguageSelector.tsx
│   │   ├── TestResults.tsx
│   │   └── SubmissionHistory.tsx
│   ├── problems/
│   │   ├── ProblemBrowser.tsx
│   │   ├── ProblemCard.tsx
│   │   ├── ProblemDescription.tsx
│   │   ├── HintPanel.tsx
│   │   └── ReferenceSolution.tsx
│   └── ui/
│       ├── Timer.tsx
│       ├── ProgressBar.tsx
│       ├── DifficultyBadge.tsx
│       └── UpgradePrompt.tsx
│
├── lib/
│   ├── simulation/
│   │   ├── SimulationEngine.ts
│   │   ├── latency-models.ts
│   │   ├── cost-models.ts
│   │   ├── validators.ts
│   │   └── SimulationEngine.test.ts
│   ├── execution/
│   │   ├── piston.ts
│   │   ├── runner.ts
│   │   └── harnesses/
│   │       ├── python.ts
│   │       ├── javascript.ts
│   │       ├── typescript.ts
│   │       ├── java.ts
│   │       ├── cpp.ts
│   │       ├── go.ts
│   │       ├── csharp.ts
│   │       ├── rust.ts
│   │       ├── ruby.ts
│   │       ├── swift.ts
│   │       ├── kotlin.ts
│   │       └── php.ts
│   ├── supabase/
│   │   ├── client.ts
│   │   ├── server.ts
│   │   ├── problems.ts
│   │   ├── submissions.ts
│   │   ├── progress.ts
│   │   ├── leaderboard.ts
│   │   └── enterprise.ts
│   ├── stripe/
│   │   ├── client.ts
│   │   └── webhooks.ts
│   └── access.ts
│
├── store/
│   ├── simulation.store.ts
│   ├── editor.store.ts
│   └── session.store.ts
│
├── types/
│   ├── simulation.ts
│   ├── problems.ts
│   ├── submissions.ts
│   ├── user.ts
│   └── enterprise.ts
│
├── data/
│   ├── coding-problems/
│   │   ├── index.ts
│   │   ├── lru-cache.ts
│   │   ├── consistent-hashing.ts
│   │   ├── rate-limiter-token-bucket.ts
│   │   ├── bloom-filter.ts
│   │   ├── top-k-elements.ts
│   │   └── ... (all problems)
│   └── system-problems/
│       ├── index.ts
│       ├── url-shortener.ts
│       ├── twitter-feed.ts
│       ├── rate-limiter.ts
│       └── ... (all challenges)
│
├── middleware.ts
└── scripts/
    └── seed.ts
```

---

## Types — Define These First

`src/types/simulation.ts`:
```typescript
export type NodeType =
  | 'loadBalancer' | 'apiServer' | 'sqlDatabase' | 'nosqlDatabase'
  | 'cache' | 'cdn' | 'messageQueue' | 'objectStorage'
  | 'apiGateway' | 'searchIndex' | 'dns' | 'waf'

export type NodeStatus = 'idle' | 'healthy' | 'degraded' | 'down'

export interface NodeConfig {
  // Load Balancer
  algorithm?: 'round-robin' | 'least-connections' | 'ip-hash'
  // API Server
  instanceCount?: number
  cpuUnits?: number
  memoryGB?: number
  maxConnections?: number
  // SQL Database
  readReplicas?: number
  connectionPoolSize?: number
  storageType?: 'ssd' | 'hdd'
  // NoSQL Database
  partitionCount?: number
  replicationFactor?: number
  consistency?: 'eventual' | 'strong'
  // Cache
  maxMemoryGB?: number
  evictionPolicy?: 'lru' | 'lfu' | 'ttl'
  clusterMode?: boolean
  hitRatePercent?: number
  // CDN
  cacheRatioPercent?: number
  ttlSeconds?: number
  // Message Queue
  consumerCount?: number
  batchSize?: number
  maxQueueDepth?: number
  // API Gateway
  rateLimitRps?: number
  authMethod?: 'jwt' | 'api-key' | 'oauth'
  // Search Index
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
```

`src/types/problems.ts`:
```typescript
export type Difficulty = 'easy' | 'medium' | 'hard'
export type ProblemType = 'coding' | 'system_design'
export type Tier = 'free' | 'pro' | 'enterprise'
export type Language =
  | 'python' | 'javascript' | 'typescript' | 'java'
  | 'cpp' | 'go' | 'csharp' | 'rust' | 'ruby' | 'swift' | 'kotlin' | 'php'

export interface TestCase {
  id: string
  input: string
  expected: string
  explanation?: string
}

export interface CodingProblem {
  slug: string
  title: string
  difficulty: Difficulty
  tags: string[]
  tier: Tier
  estimatedMinutes: number
  description: string
  examples: { input: string; output: string; explanation?: string }[]
  constraints: string[]
  hints: string[]
  companyTags?: string[]
  starterCode: Record<Language, string>
  testCasesVisible: TestCase[]
  testCasesHidden: TestCase[]
  testHarnesses: Record<Language, string>
}

export interface SystemDesignProblem {
  slug: string
  title: string
  difficulty: Difficulty
  tags: string[]
  tier: Tier
  estimatedMinutes: number
  description: string
  requirements: string[]
  successCriteria: SuccessCriteria
  hints: string[]
  referenceTopology: { nodes: any[]; edges: any[] }
  explanation: string
  companyContext?: string
}

export interface ProblemMeta {
  slug: string
  title: string
  type: ProblemType
  difficulty: Difficulty
  tags: string[]
  tier: Tier
  estimatedMinutes: number
  acceptanceRate?: number
}
```

---

## Block 1 — Canvas & System Design UI

### 1.1 — System Design Problem Page Shell

`src/app/problems/system/[slug]/page.tsx`

Two-pane layout, full viewport height, dark theme:

```tsx
import { ReactFlowProvider } from 'reactflow'
import { SimulationCanvas } from '@/components/canvas/SimulationCanvas'
import { ProblemDescription } from '@/components/problems/ProblemDescription'

export default function SystemProblemPage({ params }: { params: { slug: string } }) {
  return (
    <div className="flex h-screen bg-[#0f1117] text-white overflow-hidden">
      {/* Left pane — problem */}
      <div className="w-[38%] flex flex-col border-r border-white/10 overflow-y-auto">
        <ProblemDescription slug={params.slug} />
      </div>

      {/* Right pane — canvas */}
      <div className="flex-1 flex flex-col">
        <ReactFlowProvider>
          <SimulationCanvas />
        </ReactFlowProvider>
      </div>
    </div>
  )
}
```

Left pane sections (top to bottom):
- Problem title + difficulty badge + estimated time
- Description (markdown)
- Requirements list
- Success criteria table: Metric / Required Value
- Hints accordion (3 hints, progressive reveal — click to unlock next)
- Run Controls (Start, Pause, Reset, RPS slider)

---

### 1.2 — Component Sidebar

`src/components/canvas/ComponentSidebar.tsx`

Pinned to the left edge of the canvas. 12 draggable components:

```
NETWORKING
  └─ Load Balancer    API Gateway    DNS    WAF

COMPUTE
  └─ API Server

STORAGE
  └─ SQL Database    NoSQL Database    Object Storage    Search Index

CACHING
  └─ Cache (Redis)    CDN

MESSAGING
  └─ Message Queue
```

Each item:
```tsx
const ComponentItem = ({ type, label, icon: Icon, color }: ComponentItemProps) => (
  <div
    draggable
    onDragStart={(e) => {
      e.dataTransfer.setData('application/reactflow-type', type)
      e.dataTransfer.effectAllowed = 'move'
    }}
    className={`
      flex items-center gap-2 px-3 py-2 rounded-lg cursor-grab
      bg-white/5 hover:bg-white/10 border border-white/10
      hover:border-${color}-500/50 transition-all select-none
    `}
  >
    <Icon size={16} className={`text-${color}-400`} />
    <span className="text-xs text-white/80">{label}</span>
  </div>
)
```

Color coding: networking=blue, compute=green, storage=orange, caching=purple, messaging=yellow.

---

### 1.3 — Custom Node Components

`src/components/canvas/nodes/ApiServerNode.tsx` (template — repeat for all 12):

```tsx
import { Handle, Position, NodeProps } from 'reactflow'
import { ServerIcon } from 'lucide-react'
import { useSimulationStore } from '@/store/simulation.store'
import { StatusDot } from '../StatusDot'

export function ApiServerNode({ id, data, selected }: NodeProps) {
  const nodeMetrics = useSimulationStore(s => s.metrics?.nodes[id])

  return (
    <div className={`
      min-w-[140px] rounded-xl border bg-[#1a1d27]
      ${selected ? 'border-blue-400 shadow-lg shadow-blue-400/20' : 'border-white/15'}
      transition-all
    `}>
      <Handle type="target" position={Position.Left} className="!bg-white/30" />

      <div className="flex items-center gap-2 px-3 py-2 border-b border-white/10">
        <ServerIcon size={14} className="text-green-400" />
        <span className="text-xs font-medium text-white truncate">{data.label}</span>
        <StatusDot status={nodeMetrics?.status ?? 'idle'} />
      </div>

      {nodeMetrics && nodeMetrics.status !== 'idle' && (
        <div className="px-3 py-2 space-y-1">
          <MetricRow label="RPS" value={`${nodeMetrics.throughput.toFixed(0)}`} />
          <MetricRow label="Latency" value={`${nodeMetrics.avgLatencyMs.toFixed(0)}ms`} />
          <MetricRow label="CPU" value={`${nodeMetrics.cpu.toFixed(0)}%`}
            warn={nodeMetrics.cpu > 80} />
        </div>
      )}

      <Handle type="source" position={Position.Right} className="!bg-white/30" />
    </div>
  )
}
```

All 12 node types follow this exact template. The differences are:
- Icon (lucide-react)
- Accent color
- Which metrics to display
- Handle positions (some nodes have top/bottom handles too)

Register all node types once:
```tsx
// src/components/canvas/nodeTypes.ts
export const NODE_TYPES = {
  loadBalancer: LoadBalancerNode,
  apiServer: ApiServerNode,
  sqlDatabase: SqlDatabaseNode,
  nosqlDatabase: NoSqlDatabaseNode,
  cache: CacheNode,
  cdn: CdnNode,
  messageQueue: MessageQueueNode,
  objectStorage: ObjectStorageNode,
  apiGateway: ApiGatewayNode,
  searchIndex: SearchIndexNode,
  dns: DnsNode,
  waf: WafNode,
} as const
```

---

### 1.4 — SimulationCanvas

`src/components/canvas/SimulationCanvas.tsx`

```tsx
'use client'
import ReactFlow, {
  Background, BackgroundVariant, Controls, MiniMap,
  useNodesState, useEdgesState, addEdge,
  Connection, ReactFlowInstance
} from 'reactflow'
import 'reactflow/dist/style.css'
import { NODE_TYPES } from './nodeTypes'
import { EDGE_TYPES } from './edgeTypes'
import { ComponentSidebar } from './ComponentSidebar'
import { ConfigPanel } from './ConfigPanel'
import { CanvasToolbar } from './CanvasToolbar'
import { useSimulationStore } from '@/store/simulation.store'
import { useCallback, useRef, useState } from 'react'

export function SimulationCanvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null)
  const [rfInstance, setRfInstance] = useState<ReactFlowInstance | null>(null)
  const reactFlowWrapper = useRef<HTMLDivElement>(null)
  const initEngine = useSimulationStore(s => s.initEngine)

  const onConnect = useCallback(
    (connection: Connection) => setEdges(eds => addEdge({
      ...connection,
      type: 'animated',
      animated: false,
    }, eds)),
    [setEdges]
  )

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    const type = e.dataTransfer.getData('application/reactflow-type')
    if (!type || !rfInstance || !reactFlowWrapper.current) return

    const bounds = reactFlowWrapper.current.getBoundingClientRect()
    const position = rfInstance.project({
      x: e.clientX - bounds.left,
      y: e.clientY - bounds.top,
    })

    const newNode = {
      id: `${type}-${Date.now()}`,
      type,
      position,
      data: {
        label: DEFAULT_LABELS[type as NodeType],
        config: DEFAULT_CONFIGS[type as NodeType],
      },
    }
    setNodes(nds => [...nds, newNode])
  }, [rfInstance, setNodes])

  // Re-init engine whenever topology changes
  const onNodesChangeWithSync = useCallback((changes: any) => {
    onNodesChange(changes)
    initEngine(nodes, edges)
  }, [nodes, edges, onNodesChange, initEngine])

  return (
    <div className="relative flex-1 flex">
      <ComponentSidebar />

      <div ref={reactFlowWrapper} className="flex-1">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChangeWithSync}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={e => e.preventDefault()}
          onInit={setRfInstance}
          onNodeClick={(_, node) => setSelectedNodeId(node.id)}
          onPaneClick={() => setSelectedNodeId(null)}
          nodeTypes={NODE_TYPES}
          edgeTypes={EDGE_TYPES}
          fitView
          snapToGrid
          snapGrid={[16, 16]}
          deleteKeyCode="Backspace"
          className="bg-[#0f1117]"
        >
          <Background
            variant={BackgroundVariant.Dots}
            gap={24}
            size={1}
            color="#ffffff15"
          />
          <Controls className="!bg-[#1a1d27] !border-white/10" />
          <MiniMap
            nodeColor={() => '#3b82f6'}
            maskColor="rgb(15,17,23,0.8)"
            className="!bg-[#1a1d27] !border-white/10"
          />
          <CanvasToolbar nodes={nodes} edges={edges} setNodes={setNodes} setEdges={setEdges} />
        </ReactFlow>
      </div>

      {selectedNodeId && (
        <ConfigPanel
          nodeId={selectedNodeId}
          nodes={nodes}
          setNodes={setNodes}
          onClose={() => setSelectedNodeId(null)}
        />
      )}
    </div>
  )
}
```

---

### 1.5 — Config Panel

`src/components/canvas/ConfigPanel.tsx`

Slide-in panel from the right edge of the canvas. Reads/writes `node.data.config`.

```tsx
export function ConfigPanel({ nodeId, nodes, setNodes, onClose }: ConfigPanelProps) {
  const node = nodes.find(n => n.id === nodeId)
  if (!node) return null

  const updateConfig = (key: string, value: any) => {
    setNodes(nds => nds.map(n =>
      n.id === nodeId
        ? { ...n, data: { ...n.data, config: { ...n.data.config, [key]: value } } }
        : n
    ))
  }

  const updateLabel = (label: string) => {
    setNodes(nds => nds.map(n => n.id === nodeId ? { ...n, data: { ...n.data, label } } : n))
  }

  return (
    <div className="w-72 bg-[#1a1d27] border-l border-white/10 flex flex-col">
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
        <span className="text-sm font-medium">Configure Node</span>
        <button onClick={onClose}><X size={16} /></button>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <ConfigField label="Label">
          <input
            value={node.data.label}
            onChange={e => updateLabel(e.target.value)}
            className="config-input"
          />
        </ConfigField>
        {/* Render config fields based on node.type */}
        <NodeConfigFields type={node.type} config={node.data.config} onChange={updateConfig} />
      </div>
    </div>
  )
}
```

`NodeConfigFields` switches on node type and renders the appropriate inputs:

```tsx
function NodeConfigFields({ type, config, onChange }: NodeConfigFieldsProps) {
  switch (type) {
    case 'apiServer':
      return (
        <>
          <ConfigSlider label="Instances" min={1} max={20}
            value={config.instanceCount ?? 1} onChange={v => onChange('instanceCount', v)} />
          <ConfigSelect label="CPU" options={['0.25', '0.5', '1', '2', '4']}
            value={String(config.cpuUnits ?? 1)} onChange={v => onChange('cpuUnits', Number(v))} />
          <ConfigSelect label="Memory" options={['0.5GB', '1GB', '2GB', '4GB', '8GB', '16GB']}
            value={`${config.memoryGB ?? 1}GB`} onChange={v => onChange('memoryGB', parseFloat(v))} />
        </>
      )
    case 'sqlDatabase':
      return (
        <>
          <ConfigSlider label="Read Replicas" min={0} max={5}
            value={config.readReplicas ?? 0} onChange={v => onChange('readReplicas', v)} />
          <ConfigSelect label="Storage" options={['ssd', 'hdd']}
            value={config.storageType ?? 'ssd'} onChange={v => onChange('storageType', v)} />
        </>
      )
    case 'cache':
      return (
        <>
          <ConfigSlider label="Hit Rate %" min={0} max={100}
            value={config.hitRatePercent ?? 80} onChange={v => onChange('hitRatePercent', v)} />
          <ConfigSelect label="Eviction" options={['lru', 'lfu', 'ttl']}
            value={config.evictionPolicy ?? 'lru'} onChange={v => onChange('evictionPolicy', v)} />
          <ConfigToggle label="Cluster Mode"
            value={config.clusterMode ?? false} onChange={v => onChange('clusterMode', v)} />
        </>
      )
    // ... all 12 node types
  }
}
```

---

### 1.6 — Animated Edge

`src/components/canvas/AnimatedEdge.tsx`

Dots travel along the bezier path during simulation. The number and speed of dots reflects RPS.

```tsx
import { EdgeProps, getBezierPath, useStore } from 'reactflow'
import { useSimulationStore } from '@/store/simulation.store'
import { useEffect, useRef } from 'react'

export function AnimatedEdge({
  id, sourceX, sourceY, targetX, targetY,
  sourcePosition, targetPosition, style
}: EdgeProps) {
  const status = useSimulationStore(s => s.status)
  const metrics = useSimulationStore(s => s.metrics)
  const svgRef = useRef<SVGGElement>(null)
  const animRef = useRef<number>()
  const dotsRef = useRef<{ progress: number; hasError: boolean }[]>([])

  const [edgePath] = getBezierPath({ sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition })

  useEffect(() => {
    if (status !== 'running' || !metrics) {
      dotsRef.current = []
      return
    }

    const rps = metrics.rps
    const errorRate = metrics.errorRate
    const spawnInterval = Math.max(50, 1000 / (rps / 10))
    let lastSpawn = 0

    const animate = (time: number) => {
      if (time - lastSpawn > spawnInterval) {
        dotsRef.current.push({
          progress: 0,
          hasError: Math.random() < errorRate,
        })
        lastSpawn = time
      }

      dotsRef.current = dotsRef.current
        .map(d => ({ ...d, progress: d.progress + 0.012 }))
        .filter(d => d.progress < 1)

      // Render dots as SVG circles along the path
      if (svgRef.current) {
        svgRef.current.innerHTML = dotsRef.current.map(dot => {
          const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
          path.setAttribute('d', edgePath)
          const length = path.getTotalLength()
          const point = path.getPointAtLength(length * dot.progress)
          const color = dot.hasError ? '#ef4444' : metrics.latency.p99 > 200 ? '#f59e0b' : '#3b82f6'
          return `<circle cx="${point.x}" cy="${point.y}" r="3" fill="${color}" opacity="0.9"/>`
        }).join('')
      }

      animRef.current = requestAnimationFrame(animate)
    }

    animRef.current = requestAnimationFrame(animate)
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current) }
  }, [status, metrics, edgePath])

  return (
    <g>
      <path d={edgePath} fill="none" stroke="#ffffff20" strokeWidth={2} />
      <g ref={svgRef} />
    </g>
  )
}
```

---

### 1.7 — Canvas Toolbar

`src/components/canvas/CanvasToolbar.tsx`

Floating pill above the canvas:

```
[Fit View] [↑ Import] [↓ Export] [🗑 Clear]
```

Export serializes current nodes + edges to JSON and triggers download.
Import reads a JSON file and loads topology into React Flow state.
Clear shows a confirmation dialog before wiping the canvas.

---

## Block 2 — Simulation Engine

### 2.1 — Core Engine

`src/lib/simulation/SimulationEngine.ts`

**Zero UI dependencies. Pure TypeScript. Fully unit testable.**

```typescript
import type {
  SimComponentNode, SimConnection, SimConfig,
  RealTimeMetrics, NodeMetrics, SuccessCriteria, ValidationResult
} from '@/types/simulation'
import { LATENCY_MODELS } from './latency-models'
import { COST_MODELS } from './cost-models'
import { evaluate } from './validators'

interface RequestResult {
  latencyMs: number
  failed: boolean
}

export class SimulationEngine {
  private nodes = new Map<string, SimComponentNode>()
  private connections: SimConnection[] = []

  private running = false
  private tickHandle: ReturnType<typeof setInterval> | null = null

  private elapsedMs = 0
  private totalRequests = 0
  private totalErrors = 0
  private latencyWindow: number[] = []   // sliding 10s window of latencies

  private killedNodes = new Set<string>()
  private slowedNodes = new Map<string, number>()
  private saturatedNodes = new Set<string>()

  private metricsHistory: RealTimeMetrics[] = []
  private onMetricsCbs = new Set<(m: RealTimeMetrics) => void>()

  // ── Setup ────────────────────────────────────────────────────────────

  loadTopology(nodes: SimComponentNode[], connections: SimConnection[]) {
    this.nodes.clear()
    nodes.forEach(n => this.nodes.set(n.id, n))
    this.connections = connections
  }

  // ── Lifecycle ────────────────────────────────────────────────────────

  start(config: SimConfig) {
    this.config = config
    this.running = true
    this.tickHandle = setInterval(() => this.tick(), 16)
  }

  pause() { this.running = false }
  resume() { this.running = true }

  reset() {
    if (this.tickHandle) clearInterval(this.tickHandle)
    this.running = false
    this.elapsedMs = 0
    this.totalRequests = 0
    this.totalErrors = 0
    this.latencyWindow = []
    this.metricsHistory = []
    this.killedNodes.clear()
    this.slowedNodes.clear()
    this.saturatedNodes.clear()
  }

  // ── Chaos ────────────────────────────────────────────────────────────

  killNode(id: string) { this.killedNodes.add(id) }
  slowNode(id: string, multiplier: number) { this.slowedNodes.set(id, multiplier) }
  saturateNode(id: string) { this.saturatedNodes.add(id) }
  restoreNode(id: string) {
    this.killedNodes.delete(id)
    this.slowedNodes.delete(id)
    this.saturatedNodes.delete(id)
  }
  restoreAll() {
    this.killedNodes.clear()
    this.slowedNodes.clear()
    this.saturatedNodes.clear()
  }

  // ── Output ───────────────────────────────────────────────────────────

  onMetrics(cb: (m: RealTimeMetrics) => void) { this.onMetricsCbs.add(cb) }
  offMetrics(cb: (m: RealTimeMetrics) => void) { this.onMetricsCbs.delete(cb) }

  getHistory() { return [...this.metricsHistory] }

  evaluate(criteria: SuccessCriteria): ValidationResult {
    const recentWindow = this.metricsHistory.slice(-20)
    return evaluate(recentWindow, criteria)
  }

  // ── Core Loop ────────────────────────────────────────────────────────

  private config: SimConfig | null = null

  private tick() {
    if (!this.running || !this.config) return
    this.elapsedMs += 16

    const elapsed = this.elapsedMs / 1000
    const rampFactor = this.config.rampSeconds > 0
      ? Math.min(elapsed / this.config.rampSeconds, 1)
      : 1
    const currentRPS = this.config.targetRPS * rampFactor

    // How many requests to fire this 16ms tick
    const requestCount = Math.round((currentRPS * 16) / 1000)

    const entries = this.findEntryNodes()
    if (entries.length === 0) return

    for (let i = 0; i < requestCount; i++) {
      const entry = entries[i % entries.length]!
      const result = this.processRequest(entry.id)
      this.totalRequests++

      if (result.failed) {
        this.totalErrors++
      } else {
        this.latencyWindow.push(result.latencyMs)
      }
    }

    // Emit snapshot every 500ms
    if (this.elapsedMs % 500 < 16) {
      // Trim window to ~10 seconds of data
      const maxWindow = currentRPS * 10
      if (this.latencyWindow.length > maxWindow) {
        this.latencyWindow = this.latencyWindow.slice(-maxWindow)
      }

      const snapshot = this.buildMetrics(currentRPS)
      this.metricsHistory.push(snapshot)
      if (this.metricsHistory.length > 600) this.metricsHistory.shift()
      this.onMetricsCbs.forEach(cb => cb(snapshot))
    }

    // Stop when duration exceeded
    if (this.config.durationSeconds > 0 && elapsed >= this.config.durationSeconds) {
      this.running = false
      clearInterval(this.tickHandle!)
    }
  }

  private findEntryNodes(): SimComponentNode[] {
    const hasIncoming = new Set(this.connections.map(c => c.targetId))
    return Array.from(this.nodes.values())
      .filter(n => !hasIncoming.has(n.id) && !this.killedNodes.has(n.id))
  }

  private processRequest(nodeId: string, depth = 0): RequestResult {
    if (depth > 20) return { latencyMs: 9999, failed: true }

    const node = this.nodes.get(nodeId)
    if (!node || this.killedNodes.has(nodeId)) {
      return { latencyMs: 0, failed: true }
    }

    const nodeLatency = this.calcNodeLatency(node)
    const outgoing = this.connections.filter(c => c.sourceId === nodeId)

    if (outgoing.length === 0) {
      return { latencyMs: nodeLatency, failed: false }
    }

    // Fan-out: pick next node (alive only)
    const aliveOutgoing = outgoing.filter(c => !this.killedNodes.has(c.targetId))
    if (aliveOutgoing.length === 0) return { latencyMs: nodeLatency, failed: true }

    const next = aliveOutgoing[this.totalRequests % aliveOutgoing.length]!
    const downstream = this.processRequest(next.targetId, depth + 1)

    return {
      latencyMs: nodeLatency + downstream.latencyMs,
      failed: downstream.failed,
    }
  }

  private calcNodeLatency(node: SimComponentNode): number {
    const model = LATENCY_MODELS[node.type]
    let latency = model.base + Math.random() * model.variance

    // Slow multiplier
    const slowMult = this.slowedNodes.get(node.id) ?? 1
    latency *= slowMult

    // Saturation penalty
    if (this.saturatedNodes.has(node.id)) {
      latency += model.queuePenalty * 15
    }

    // Cache/CDN miss penalty
    if (node.type === 'cache') {
      const hitRate = (node.config.hitRatePercent ?? 80) / 100
      if (Math.random() > hitRate) latency += 40
    }
    if (node.type === 'cdn') {
      const hitRate = (node.config.cacheRatioPercent ?? 70) / 100
      if (Math.random() > hitRate) latency += 80
    }

    return latency
  }

  private buildMetrics(currentRPS: number): RealTimeMetrics {
    const sorted = [...this.latencyWindow].sort((a, b) => a - b)
    const len = sorted.length
    const pct = (p: number) => len > 0 ? (sorted[Math.floor(len * p)] ?? 0) : 0

    const errorRate = this.totalRequests > 0 ? this.totalErrors / this.totalRequests : 0

    const monthlyCost = Array.from(this.nodes.values())
      .filter(n => !this.killedNodes.has(n.id))
      .reduce((sum, n) => sum + COST_MODELS[n.type](n.config), 0)

    return {
      rps: currentRPS,
      latency: { p50: pct(0.5), p95: pct(0.95), p99: pct(0.99), p999: pct(0.999) },
      errorRate,
      estimatedMonthlyCostUSD: monthlyCost,
      elapsedSeconds: this.elapsedMs / 1000,
      nodes: this.buildNodeMetrics(currentRPS),
    }
  }

  private buildNodeMetrics(currentRPS: number): Record<string, NodeMetrics> {
    const result: Record<string, NodeMetrics> = {}
    this.nodes.forEach((node, id) => {
      const isDown = this.killedNodes.has(id)
      const isSlow = this.slowedNodes.has(id)
      const isSaturated = this.saturatedNodes.has(id)

      result[id] = {
        cpu: isDown ? 0 : Math.min(100, currentRPS / 50),
        throughput: isDown ? 0 : currentRPS,
        queueDepth: isSaturated ? 9999 : 0,
        errorRate: isDown ? 1 : 0,
        avgLatencyMs: isDown ? 0 : this.calcNodeLatency(node),
        status: isDown ? 'down' : (isSlow || isSaturated) ? 'degraded' : 'healthy',
      }
    })
    return result
  }
}
```

---

### 2.2 — Latency & Cost Models

`src/lib/simulation/latency-models.ts`:
```typescript
import type { NodeType } from '@/types/simulation'

export const LATENCY_MODELS: Record<NodeType, {
  base: number
  variance: number
  queuePenalty: number
}> = {
  loadBalancer:  { base: 1,   variance: 2,   queuePenalty: 0.5  },
  apiServer:     { base: 10,  variance: 10,  queuePenalty: 3.0  },
  sqlDatabase:   { base: 15,  variance: 35,  queuePenalty: 8.0  },
  nosqlDatabase: { base: 5,   variance: 10,  queuePenalty: 3.0  },
  cache:         { base: 1,   variance: 1,   queuePenalty: 0.2  },
  cdn:           { base: 3,   variance: 4,   queuePenalty: 0    },
  messageQueue:  { base: 5,   variance: 5,   queuePenalty: 12.0 },
  objectStorage: { base: 30,  variance: 70,  queuePenalty: 2.0  },
  apiGateway:    { base: 5,   variance: 8,   queuePenalty: 1.5  },
  searchIndex:   { base: 15,  variance: 20,  queuePenalty: 5.0  },
  dns:           { base: 2,   variance: 3,   queuePenalty: 0    },
  waf:           { base: 3,   variance: 5,   queuePenalty: 0.5  },
}
```

`src/lib/simulation/cost-models.ts`:
```typescript
import type { NodeType, NodeConfig } from '@/types/simulation'

export const COST_MODELS: Record<NodeType, (config: NodeConfig) => number> = {
  loadBalancer:  (_) => 16,
  apiServer:     (c) => (c.instanceCount ?? 1) * (c.cpuUnits ?? 1) * 14,
  sqlDatabase:   (c) => (1 + (c.readReplicas ?? 0)) * 50,
  nosqlDatabase: (c) => (c.partitionCount ?? 3) * 8,
  cache:         (c) => (c.clusterMode ? 90 : 25),
  cdn:           (_) => 12,
  messageQueue:  (_) => 5,
  objectStorage: (_) => 5,
  apiGateway:    (_) => 15,
  searchIndex:   (c) => (c.shardCount ?? 1) * 20,
  dns:           (_) => 1,
  waf:           (_) => 10,
}
```

---

### 2.3 — Validator

`src/lib/simulation/validators.ts`:
```typescript
import type { RealTimeMetrics, SuccessCriteria, ValidationResult, CriterionResult } from '@/types/simulation'

export function evaluate(
  recentMetrics: RealTimeMetrics[],
  criteria: SuccessCriteria
): ValidationResult {
  if (recentMetrics.length === 0) {
    return { passed: false, score: 0, criteria: [] }
  }

  const avg = (fn: (m: RealTimeMetrics) => number) =>
    recentMetrics.reduce((s, m) => s + fn(m), 0) / recentMetrics.length

  const results: CriterionResult[] = []

  if (criteria.maxLatencyP99Ms != null) {
    const actual = avg(m => m.latency.p99)
    const passed = actual <= criteria.maxLatencyP99Ms
    results.push({
      label: 'p99 Latency',
      passed,
      required: `< ${criteria.maxLatencyP99Ms}ms`,
      actual: `${actual.toFixed(0)}ms`,
      hint: !passed ? findLatencyBottleneck(recentMetrics) : undefined,
    })
  }

  if (criteria.minRPS != null) {
    const actual = avg(m => m.rps)
    results.push({
      label: 'Throughput',
      passed: actual >= criteria.minRPS,
      required: `≥ ${criteria.minRPS.toLocaleString()} RPS`,
      actual: `${actual.toFixed(0).toLocaleString()} RPS`,
    })
  }

  if (criteria.maxErrorRate != null) {
    const actual = avg(m => m.errorRate)
    results.push({
      label: 'Error Rate',
      passed: actual <= criteria.maxErrorRate,
      required: `< ${(criteria.maxErrorRate * 100).toFixed(2)}%`,
      actual: `${(actual * 100).toFixed(2)}%`,
      hint: !passed ? 'Check for dead or saturated nodes.' : undefined,
    })
  }

  if (criteria.maxMonthlyCostUSD != null) {
    const actual = recentMetrics.at(-1)?.estimatedMonthlyCostUSD ?? 0
    results.push({
      label: 'Monthly Cost',
      passed: actual <= criteria.maxMonthlyCostUSD,
      required: `< $${criteria.maxMonthlyCostUSD.toLocaleString()}`,
      actual: `$${actual.toFixed(0)}`,
      hint: !passed ? 'Right-size your instances. Reduce read replicas.' : undefined,
    })
  }

  const passCount = results.filter(r => r.passed).length
  const score = results.length > 0 ? Math.round((passCount / results.length) * 100) : 0

  return { passed: results.every(r => r.passed), score, criteria: results }
}

function findLatencyBottleneck(metrics: RealTimeMetrics[]): string {
  const last = metrics.at(-1)
  if (!last) return 'Check your topology for bottlenecks.'

  const worst = Object.entries(last.nodes)
    .sort(([, a], [, b]) => b.avgLatencyMs - a.avgLatencyMs)[0]

  if (!worst) return 'Check your topology for bottlenecks.'
  return `Node "${worst[0]}" has the highest latency (${worst[1].avgLatencyMs.toFixed(0)}ms). Consider scaling it out or adding a cache in front.`
}
```

---

### 2.4 — Unit Tests

`src/lib/simulation/SimulationEngine.test.ts`:
```typescript
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { SimulationEngine } from './SimulationEngine'

describe('SimulationEngine', () => {
  let engine: SimulationEngine

  beforeEach(() => {
    engine = new SimulationEngine()
    vi.useFakeTimers()
  })

  afterEach(() => vi.useRealTimers())

  it('builds metrics from a 3-node topology', () => {
    engine.loadTopology(
      [
        { id: 'lb',  type: 'loadBalancer', label: 'LB',  config: {} },
        { id: 'api', type: 'apiServer',    label: 'API', config: { instanceCount: 2 } },
        { id: 'db',  type: 'sqlDatabase',  label: 'DB',  config: {} },
      ],
      [
        { id: 'e1', sourceId: 'lb',  targetId: 'api' },
        { id: 'e2', sourceId: 'api', targetId: 'db'  },
      ]
    )

    engine.start({ targetRPS: 100, rampSeconds: 0, durationSeconds: 10 })
    vi.advanceTimersByTime(5000)

    const history = engine.getHistory()
    expect(history.length).toBeGreaterThan(0)

    const last = history.at(-1)!
    expect(last.rps).toBeCloseTo(100, 0)
    expect(last.latency.p99).toBeLessThan(300)
    expect(last.errorRate).toBeLessThan(0.01)
  })

  it('returns 100% errors when entry node is killed', () => {
    engine.loadTopology(
      [{ id: 'api', type: 'apiServer', label: 'API', config: {} }],
      []
    )
    engine.start({ targetRPS: 100, rampSeconds: 0, durationSeconds: 10 })
    engine.killNode('api')

    vi.advanceTimersByTime(3000)

    const history = engine.getHistory()
    const last = history.at(-1)!
    expect(last.errorRate).toBeGreaterThan(0.95)
  })

  it('reports lower latency with cache than without', () => {
    const withCache = new SimulationEngine()
    const withoutCache = new SimulationEngine()

    const baseNodes = [
      { id: 'api', type: 'apiServer' as const, label: 'API', config: {} },
      { id: 'db',  type: 'sqlDatabase' as const, label: 'DB', config: {} },
    ]

    withCache.loadTopology(
      [...baseNodes, { id: 'cache', type: 'cache' as const, label: 'Cache', config: { hitRatePercent: 95 } }],
      [{ id: 'e1', sourceId: 'api', targetId: 'cache' }, { id: 'e2', sourceId: 'cache', targetId: 'db' }]
    )
    withoutCache.loadTopology(
      baseNodes,
      [{ id: 'e1', sourceId: 'api', targetId: 'db' }]
    )

    withCache.start({ targetRPS: 100, rampSeconds: 0, durationSeconds: 5 })
    withoutCache.start({ targetRPS: 100, rampSeconds: 0, durationSeconds: 5 })

    vi.advanceTimersByTime(5000)

    const cacheP99 = withCache.getHistory().at(-1)!.latency.p99
    const noCacheP99 = withoutCache.getHistory().at(-1)!.latency.p99

    // Cache should reduce average latency (more cache hits bypass the DB)
    expect(cacheP99).toBeLessThanOrEqual(noCacheP99)
  })

  it('validation passes when criteria met', () => {
    engine.loadTopology(
      [
        { id: 'lb',  type: 'loadBalancer', label: 'LB',  config: {} },
        { id: 'api', type: 'apiServer',    label: 'API', config: { instanceCount: 3 } },
        { id: 'cache', type: 'cache',      label: 'Cache', config: { hitRatePercent: 99 } },
      ],
      [
        { id: 'e1', sourceId: 'lb',    targetId: 'api'   },
        { id: 'e2', sourceId: 'api',   targetId: 'cache' },
      ]
    )

    engine.start({ targetRPS: 200, rampSeconds: 0, durationSeconds: 10 })
    vi.advanceTimersByTime(10000)

    const result = engine.evaluate({ maxLatencyP99Ms: 500, minRPS: 150, maxErrorRate: 0.05 })
    expect(result.passed).toBe(true)
    expect(result.score).toBe(100)
  })

  it('monthly cost increases with more instances', () => {
    const cheap = new SimulationEngine()
    const expensive = new SimulationEngine()

    cheap.loadTopology(
      [{ id: 'api', type: 'apiServer', label: 'API', config: { instanceCount: 1 } }], []
    )
    expensive.loadTopology(
      [{ id: 'api', type: 'apiServer', label: 'API', config: { instanceCount: 10 } }], []
    )

    cheap.start({ targetRPS: 10, rampSeconds: 0, durationSeconds: 2 })
    expensive.start({ targetRPS: 10, rampSeconds: 0, durationSeconds: 2 })

    vi.advanceTimersByTime(2000)

    const cheapCost = cheap.getHistory().at(-1)!.estimatedMonthlyCostUSD
    const expCost = expensive.getHistory().at(-1)!.estimatedMonthlyCostUSD

    expect(expCost).toBeGreaterThan(cheapCost)
  })
})
```

Run: `npx vitest run`

---

### 2.5 — Simulation Zustand Store

`src/store/simulation.store.ts`:
```typescript
import { create } from 'zustand'
import { SimulationEngine } from '@/lib/simulation/SimulationEngine'
import type { SimConfig, RealTimeMetrics, ValidationResult, SuccessCriteria } from '@/types/simulation'
import type { Node, Edge } from 'reactflow'

type SimStatus = 'idle' | 'running' | 'paused' | 'complete'

interface SimulationStore {
  engine: SimulationEngine | null
  status: SimStatus
  metrics: RealTimeMetrics | null
  history: RealTimeMetrics[]
  validationResult: ValidationResult | null

  initEngine: (nodes: Node[], edges: Edge[]) => void
  start: (config: SimConfig) => void
  pause: () => void
  resume: () => void
  reset: () => void
  killNode: (id: string) => void
  slowNode: (id: string, multiplier: number) => void
  saturateNode: (id: string) => void
  restoreAll: () => void
  validate: (criteria: SuccessCriteria) => void
}

export const useSimulationStore = create<SimulationStore>((set, get) => ({
  engine: null,
  status: 'idle',
  metrics: null,
  history: [],
  validationResult: null,

  initEngine: (nodes, edges) => {
    const prev = get().engine
    if (prev) prev.reset()

    const engine = new SimulationEngine()
    engine.loadTopology(
      nodes.map(n => ({ id: n.id, type: n.type as any, label: n.data.label, config: n.data.config ?? {} })),
      edges.map(e => ({ id: e.id, sourceId: e.source, targetId: e.target }))
    )
    engine.onMetrics(metrics => {
      set(s => ({
        metrics,
        history: [...s.history, metrics].slice(-600),
      }))
    })

    set({ engine, status: 'idle', metrics: null, history: [], validationResult: null })
  },

  start: (config) => {
    get().engine?.start(config)
    set({ status: 'running' })
  },

  pause: () => {
    get().engine?.pause()
    set({ status: 'paused' })
  },

  resume: () => {
    get().engine?.resume()
    set({ status: 'running' })
  },

  reset: () => {
    get().engine?.reset()
    set({ status: 'idle', metrics: null, history: [], validationResult: null })
  },

  killNode: (id) => get().engine?.killNode(id),
  slowNode: (id, m) => get().engine?.slowNode(id, m),
  saturateNode: (id) => get().engine?.saturateNode(id),
  restoreAll: () => get().engine?.restoreAll(),

  validate: (criteria) => {
    const result = get().engine?.evaluate(criteria)
    if (result) set({ validationResult: result, status: 'complete' })
  },
}))
```

---

### 2.6 — Metrics Panel

`src/components/simulation/MetricsPanel.tsx`:

```
┌─────────────────────────────────────────────────────────────┐
│  ● RUNNING  2,340 RPS  $186/mo  00:45                       │
├──────────┬──────────┬──────────┬────────────────────────────┤
│   p50    │   p95    │   p99    │   Error Rate               │
│   18ms   │   67ms   │  142ms   │   0.3%                     │
├──────────┴──────────┴──────────┴────────────────────────────┤
│  [Recharts LineChart — 60s rolling window]                  │
│   p50 ─── p95 ─── p99 ───                                   │
└─────────────────────────────────────────────────────────────┘
```

Color thresholds applied to p99 value: < 100ms green, 100–300ms yellow, > 300ms red.

The chart uses `history.slice(-120)` for a 60-second rolling window at 500ms snapshots.

```tsx
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

export function MetricsChart() {
  const history = useSimulationStore(s => s.history.slice(-120))

  return (
    <ResponsiveContainer width="100%" height={80}>
      <LineChart data={history} margin={{ top: 4, right: 8, bottom: 0, left: 0 }}>
        <XAxis dataKey="elapsedSeconds" hide />
        <YAxis hide domain={['auto', 'auto']} />
        <Tooltip
          contentStyle={{ background: '#1a1d27', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8 }}
          formatter={(v: number) => [`${v.toFixed(0)}ms`]}
        />
        <Line dataKey="latency.p50" stroke="#22c55e" dot={false} strokeWidth={1.5} />
        <Line dataKey="latency.p95" stroke="#f59e0b" dot={false} strokeWidth={1.5} />
        <Line dataKey="latency.p99" stroke="#ef4444" dot={false} strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  )
}
```

---

### 2.7 — Run Controls

`src/components/simulation/RunControls.tsx`:

Pinned to the bottom of the left pane:

```
RPS: [───●────────────] 1,000
Duration: [30s] [60s] [∞]
Ramp: [●──] 0s  [───●─] 5s  [───────●] 30s

[▶ Run Simulation]     ← idle state
[⏸ Pause] [↺ Reset]  ← running state
```

---

### 2.8 — Chaos Controls

`src/components/simulation/ChaosControls.tsx`:

Bottom toolbar on the canvas, visible only during simulation:

```
[☠ Kill ▼]  [🐢 Slow 3x ▼]  [🔥 Saturate ▼]  [↺ Restore All]
```

Each dropdown lists current canvas nodes by their label. Selecting one immediately calls the engine. The node's status dot changes color within one render cycle.

---

### 2.9 — Validation Result

`src/components/simulation/ValidationResult.tsx`:

Shown after user clicks "Validate" or simulation ends:

```
PASSED  ✅   Score: 94/100

  ✅  Throughput    ≥ 5,000 RPS      5,240 RPS
  ✅  p99 Latency   < 200ms          187ms
  ❌  Error Rate    < 0.1%           0.4%
       └─ Check for dead or saturated nodes
  ✅  Monthly Cost  < $500           $312

[View Reference Solution]     [Try Again]
```

Failed criteria surface the hint from the validator. Reference solution button is locked until score ≥ 60.

---

## Block 3 — Coding Problems

### 3.1 — Piston API Route

`src/app/api/execute/route.ts`:
```typescript
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { getServerSession } from 'next-auth'
import { runCode } from '@/lib/execution/runner'
import { getProblem } from '@/lib/supabase/problems'
import { saveSubmission } from '@/lib/supabase/submissions'

const schema = z.object({
  code: z.string().max(50_000),
  language: z.enum([
    'python', 'javascript', 'typescript', 'java',
    'cpp', 'go', 'csharp', 'rust', 'ruby', 'swift', 'kotlin', 'php'
  ]),
  problemSlug: z.string(),
  mode: z.enum(['run', 'submit']),
})

export async function POST(req: NextRequest) {
  const session = await getServerSession()
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = schema.safeParse(await req.json())
  if (!body.success) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const { code, language, problemSlug, mode } = body.data
  const problem = await getProblem(problemSlug)
  if (!problem || problem.type !== 'coding') {
    return NextResponse.json({ error: 'Problem not found' }, { status: 404 })
  }

  // Hidden tests never sent to client — only accessed server-side here
  const testCases = mode === 'run'
    ? problem.testCasesVisible
    : [...problem.testCasesVisible, ...problem.testCasesHidden]

  const result = await runCode({
    code,
    language,
    testCases,
    harness: problem.testHarnesses[language],
  })

  if (mode === 'submit') {
    await saveSubmission({
      userId: session.user.id,
      problemId: problem.id,
      type: 'coding',
      language,
      code,
      passed: result.passed,
      runtimeMs: result.runtimeMs,
      testResults: result.results,
    })
  }

  return NextResponse.json(result)
}
```

Test it with curl before touching UI:
```bash
curl -X POST http://localhost:3000/api/execute \
  -H "Content-Type: application/json" \
  -d '{
    "code": "def solution(nums, target):\n    seen = {}\n    for i, n in enumerate(nums):\n        if target - n in seen: return [seen[target-n], i]\n        seen[n] = i",
    "language": "python",
    "problemSlug": "two-sum",
    "mode": "run"
  }'
```

---

### 3.2 — Piston Client

`src/lib/execution/piston.ts`:
```typescript
const PISTON_URL = process.env.PISTON_API_URL ?? 'https://emkc.org/api/v2/piston'

const LANGUAGE_MAP: Record<Language, { language: string; version: string }> = {
  python:     { language: 'python',     version: '3.10.0'  },
  javascript: { language: 'javascript', version: '18.15.0' },
  typescript: { language: 'typescript', version: '5.0.3'   },
  java:       { language: 'java',       version: '15.0.2'  },
  cpp:        { language: 'c++',        version: '10.2.0'  },
  go:         { language: 'go',         version: '1.16.2'  },
  csharp:     { language: 'c#',         version: '6.12.0'  },
  rust:       { language: 'rust',       version: '1.50.0'  },
  ruby:       { language: 'ruby',       version: '3.0.1'   },
  swift:      { language: 'swift',      version: '5.3.3'   },
  kotlin:     { language: 'kotlin',     version: '1.4.31'  },
  php:        { language: 'php',        version: '8.0.2'   },
}

export async function pistonExecute(language: Language, code: string, stdin = '') {
  const lang = LANGUAGE_MAP[language]
  const res = await fetch(`${PISTON_URL}/execute`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      language: lang.language,
      version: lang.version,
      files: [{ name: 'solution', content: code }],
      stdin,
    }),
  })

  if (!res.ok) throw new Error(`Piston error: ${res.status}`)
  return res.json() as Promise<PistonResponse>
}
```

---

### 3.3 — Test Runner

`src/lib/execution/runner.ts`:
```typescript
import { pistonExecute } from './piston'
import type { Language } from '@/types/problems'
import type { TestCase } from '@/types/problems'

interface RunCodeArgs {
  code: string
  language: Language
  testCases: TestCase[]
  harness: string
}

export async function runCode({ code, language, testCases, harness }: RunCodeArgs) {
  // Inject user code into the test harness template
  const wrappedCode = harness.replace('{{USER_CODE}}', code)

  const results = await Promise.allSettled(
    testCases.map(async (tc) => {
      const pistonResult = await pistonExecute(language, wrappedCode, tc.input)
      const stdout = pistonResult.run.stdout.trim()
      const stderr = pistonResult.run.stderr.trim()
      const passed = stdout === tc.expected.trim()

      return {
        id: tc.id,
        passed,
        expected: tc.expected,
        actual: stdout,
        stderr,
        runtimeMs: Math.round((pistonResult.run.cpu_time ?? 0) * 1000),
      }
    })
  )

  const settled = results.map((r, i) =>
    r.status === 'fulfilled'
      ? r.value
      : { id: testCases[i]!.id, passed: false, expected: testCases[i]!.expected, actual: '', stderr: 'Execution error', runtimeMs: 0 }
  )

  return {
    results: settled,
    passed: settled.every(r => r.passed),
    passCount: settled.filter(r => r.passed).length,
    totalCount: settled.length,
    runtimeMs: Math.max(...settled.map(r => r.runtimeMs)),
  }
}
```

---

### 3.4 — Test Harnesses

Every problem defines how to call user code and serialize the output. The harness is a code template injected with user's solution before execution.

`src/lib/execution/harnesses/python.ts` (generic wrapper — each problem overrides the test runner section):
```typescript
export function buildPythonHarness(userCode: string, testRunner: string): string {
  return `
import sys
import json

${userCode}

${testRunner}
`.trim()
}
```

Example test runner for LRU Cache (stored in `problem.testHarnesses.python`):
```python
data = json.loads(sys.stdin.read())
cache = LRUCache(data['capacity'])
results = []
for op, args in zip(data['ops'], data['args']):
    if op == 'put':
        cache.put(*args)
        results.append(None)
    elif op == 'get':
        results.append(cache.get(args[0]))
print(json.dumps(results))
```

Same structure for all 12 languages — the wrapping differs, the test runner logic stays identical.

---

### 3.5 — Monaco Editor Component

`src/components/editor/CodeEditor.tsx`:
```tsx
'use client'
import Editor, { useMonaco } from '@monaco-editor/react'
import { useEffect } from 'react'
import type { Language } from '@/types/problems'

const MONACO_LANG: Record<Language, string> = {
  python: 'python', javascript: 'javascript', typescript: 'typescript',
  java: 'java', cpp: 'cpp', go: 'go', csharp: 'csharp',
  rust: 'rust', ruby: 'ruby', swift: 'swift', kotlin: 'kotlin', php: 'php',
}

interface CodeEditorProps {
  language: Language
  value: string
  onChange: (v: string) => void
  readOnly?: boolean
}

export function CodeEditor({ language, value, onChange, readOnly = false }: CodeEditorProps) {
  const monaco = useMonaco()

  useEffect(() => {
    if (!monaco) return
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.ES2020,
      strict: true,
    })
  }, [monaco])

  return (
    <Editor
      height="100%"
      language={MONACO_LANG[language]}
      value={value}
      onChange={v => onChange(v ?? '')}
      theme="vs-dark"
      options={{
        fontSize: 14,
        tabSize: ['java', 'csharp', 'kotlin'].includes(language) ? 4 : 2,
        minimap: { enabled: false },
        lineNumbers: 'on',
        wordWrap: 'on',
        scrollBeyondLastLine: false,
        readOnly,
        padding: { top: 16, bottom: 16 },
        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
        fontLigatures: true,
      }}
    />
  )
}
```

---

### 3.6 — Coding Problem Page

`src/app/problems/coding/[slug]/page.tsx`:

Three-pane layout:

```
┌──────────────────┬─────────────────────────┬─────────────────────┐
│ Problem          │ [Language ▼]            │ Output              │
│ Description      │ [▶ Run] [⬆ Submit]      │ ─────────────────   │
│ (markdown)       │ [Reset]                 │ ✅ Case 1: Passed   │
│                  │                         │ ✅ Case 2: Passed   │
│ Examples         │                         │ ❌ Case 3: Failed   │
│                  │  // write your code     │    Expected: [1,0]  │
│ Constraints      │                         │    Got: [0,1]       │
│                  │                         │ ─────────────────   │
│ [Hints ▼]        │                         │ Runtime: 48ms       │
│ [Submissions ▼]  │                         │ Status: 2/3 passed  │
└──────────────────┴─────────────────────────┴─────────────────────┘
```

State in `src/store/editor.store.ts`:
```typescript
interface EditorStore {
  language: Language
  code: Record<Language, string>         // persists code per language
  isRunning: boolean
  isSubmitting: boolean
  lastResult: RunResult | null

  setLanguage: (lang: Language, starterCode: string) => void
  setCode: (lang: Language, code: string) => void
  run: (problemSlug: string) => Promise<void>
  submit: (problemSlug: string) => Promise<void>
  reset: (starterCode: string) => void
}
```

Keyboard shortcuts: `Cmd+Enter` = Run, `Cmd+Shift+Enter` = Submit.

Language switch warning: if user has edited the starter code, show a confirmation before switching ("Your code will be preserved — switching languages loads the starter code for the new language").

---

## Block 4 — Problem Content

### 4.1 — System Design Problem Format

`src/data/system-problems/url-shortener.ts`:
```typescript
import type { SystemDesignProblem } from '@/types/problems'

export const urlShortener: SystemDesignProblem = {
  slug: 'url-shortener',
  title: 'Design a URL Shortener',
  difficulty: 'easy',
  tags: ['hashing', 'databases', 'caching', 'cdn'],
  tier: 'free',
  estimatedMinutes: 30,

  description: `
Design a URL shortening service like TinyURL or bit.ly.

Given a long URL, the system generates a unique short alias (6–8 characters).
When a user visits the short URL, they are redirected to the original URL.

The read-to-write ratio is approximately **100:1** — optimize for fast redirects.
  `.trim(),

  requirements: [
    '100,000 new URLs shortened per day',
    '10,000,000 redirects per day (~115 RPS sustained)',
    'p99 redirect latency under 50ms',
    '99.99% availability',
    'Monthly infrastructure cost under $200',
  ],

  successCriteria: {
    maxLatencyP99Ms: 50,
    minRPS: 115,
    maxErrorRate: 0.0001,
    maxMonthlyCostUSD: 200,
  },

  hints: [
    'This is a 100:1 read-heavy workload. What can you add in front of the database to serve repeat reads without hitting it every time?',
    'A Redis cache with 99% hit rate means only ~1 database read per second instead of 115. Configure your cache node\'s hit rate slider.',
    'For global p99 under 50ms you need a CDN. CDN edge hits cost 2–5ms regardless of origin distance.',
  ],

  referenceTopology: {
    nodes: [
      { id: 'dns',   type: 'dns',          position: { x: 50,   y: 200 }, data: { label: 'DNS',          config: {} } },
      { id: 'cdn',   type: 'cdn',          position: { x: 220,  y: 200 }, data: { label: 'CDN',          config: { cacheRatioPercent: 80, ttlSeconds: 3600 } } },
      { id: 'lb',    type: 'loadBalancer', position: { x: 420,  y: 200 }, data: { label: 'Load Balancer', config: { algorithm: 'round-robin' } } },
      { id: 'api1',  type: 'apiServer',    position: { x: 620,  y: 120 }, data: { label: 'API Server 1', config: { instanceCount: 1, cpuUnits: 0.5 } } },
      { id: 'api2',  type: 'apiServer',    position: { x: 620,  y: 280 }, data: { label: 'API Server 2', config: { instanceCount: 1, cpuUnits: 0.5 } } },
      { id: 'cache', type: 'cache',        position: { x: 820,  y: 200 }, data: { label: 'Redis Cache',  config: { hitRatePercent: 99, evictionPolicy: 'lru' } } },
      { id: 'db',    type: 'sqlDatabase',  position: { x: 1020, y: 200 }, data: { label: 'Postgres',     config: { readReplicas: 1 } } },
    ],
    edges: [
      { id: 'e1', source: 'dns',   target: 'cdn'   },
      { id: 'e2', source: 'cdn',   target: 'lb'    },
      { id: 'e3', source: 'lb',    target: 'api1'  },
      { id: 'e4', source: 'lb',    target: 'api2'  },
      { id: 'e5', source: 'api1',  target: 'cache' },
      { id: 'e6', source: 'api2',  target: 'cache' },
      { id: 'e7', source: 'cache', target: 'db'    },
    ],
  },

  explanation: `
## Key Design Decisions

### Why a cache reduces cost dramatically
Short URLs follow a Zipf distribution — the top 20% of URLs account for ~80% of redirects.
A Redis cache with 99% hit rate means only 1.15 req/sec reach the database instead of 115.
Without the cache, your database needs 10x more resources to handle the read load.

### Why a CDN is essential for the latency requirement
Without a CDN, a user in Tokyo hitting a server in us-east-1 adds ~150ms of network latency
before your application even processes the request. CDN edge nodes cache the short→long mapping
at 200+ global locations. Cache hits return in 2–5ms. This is what makes p99 < 50ms achievable.

### Why not NoSQL?
URL shorteners are often used as a NoSQL argument. But this is a simple key-value lookup —
Postgres handles it easily at this scale with a single index on the short code column.
Add NoSQL when you need horizontal write scaling, not before.

### Failure modes worth understanding
- **Cache failure**: 100% of redirects hit the database. System degrades (higher latency) but stays alive.
- **Database primary failure**: Writes fail (no new URLs), reads serve from replicas. Zero downtime for redirects.
- **CDN outage**: Global latency spikes, but correctness is preserved.
  `.trim(),

  companyContext: 'TinyURL handles 2 billion URLs. bit.ly processes 31 million clicks/day across 600+ million tracked links.',
}
```

---

### 4.2 — Coding Problem Format

`src/data/coding-problems/lru-cache.ts`:
```typescript
import type { CodingProblem } from '@/types/problems'

export const lruCache: CodingProblem = {
  slug: 'lru-cache',
  title: 'LRU Cache',
  difficulty: 'medium',
  tags: ['data-structures', 'design', 'hash-map', 'linked-list'],
  tier: 'free',
  estimatedMinutes: 30,
  companyTags: ['Google', 'Amazon', 'Meta', 'Microsoft', 'Netflix'],

  description: `
Design a data structure that follows **Least Recently Used (LRU)** cache eviction.

Implement a \`LRUCache\` class:
- \`LRUCache(capacity)\` — initializes with positive capacity
- \`int get(key)\` — returns value if key exists, else \`-1\`
- \`void put(key, value)\` — insert/update; evict LRU key if at capacity

**Both operations must run in O(1) average time complexity.**

**Why this matters in the real world:** LRU caches power CDN layers, database buffer pools, DNS resolvers, and operating system page caches. Understanding the internals lets you reason about cache eviction during system design.
  `.trim(),

  examples: [
    {
      input: 'LRUCache(2)\nput(1,1) → null\nput(2,2) → null\nget(1) → 1\nput(3,3) → null  [evicts key 2]\nget(2) → -1\nput(4,4) → null  [evicts key 1]\nget(1) → -1\nget(3) → 3\nget(4) → 4',
      output: '[null,null,null,1,null,-1,null,-1,3,4]',
      explanation: 'After put(3,3), key 2 was evicted (LRU). get(1) had refreshed key 1\'s recency before that.',
    },
  ],

  constraints: [
    '1 ≤ capacity ≤ 3000',
    '0 ≤ key, value ≤ 10⁴',
    'At most 2 × 10⁵ calls to get and put',
    'Both operations must run in O(1) average time',
  ],

  hints: [
    'You need O(1) lookup AND O(1) delete from any position. Which two data structures give you both when combined?',
    'A HashMap gives O(1) lookup. A doubly linked list gives O(1) insert/delete at any position given a pointer. Store the list node pointer in the HashMap.',
    'Keep sentinel head and tail nodes to eliminate null checks. head.next = LRU item. tail.prev = MRU item.',
  ],

  starterCode: {
    python: `class LRUCache:
    def __init__(self, capacity: int):
        pass

    def get(self, key: int) -> int:
        pass

    def put(self, key: int, value: int) -> None:
        pass`,

    javascript: `/**
 * @param {number} capacity
 */
var LRUCache = function(capacity) {
    
};

/** @param {number} key @return {number} */
LRUCache.prototype.get = function(key) {
    
};

/** @param {number} key @param {number} value @return {void} */
LRUCache.prototype.put = function(key, value) {
    
};`,

    typescript: `class LRUCache {
    constructor(private capacity: number) {}

    get(key: number): number {
        return -1;
    }

    put(key: number, value: number): void {}
}`,

    java: `class LRUCache {
    public LRUCache(int capacity) {}
    
    public int get(int key) {
        return -1;
    }
    
    public void put(int key, int value) {}
}`,

    go: `type LRUCache struct {}

func Constructor(capacity int) LRUCache {
    return LRUCache{}
}

func (this *LRUCache) Get(key int) int {
    return -1
}

func (this *LRUCache) Put(key int, value int) {}`,

    cpp: `class LRUCache {
public:
    LRUCache(int capacity) {}
    
    int get(int key) {
        return -1;
    }
    
    void put(int key, int value) {}
};`,

    // csharp, rust, ruby, swift, kotlin, php follow same pattern
    csharp: `public class LRUCache {
    public LRUCache(int capacity) {}
    public int Get(int key) { return -1; }
    public void Put(int key, int value) {}
}`,
    rust: `struct LRUCache {}
impl LRUCache {
    fn new(capacity: i32) -> Self { LRUCache {} }
    fn get(&self, key: i32) -> i32 { -1 }
    fn put(&mut self, key: i32, value: i32) {}
}`,
    ruby: `class LRUCache
  def initialize(capacity); end
  def get(key) = -1
  def put(key, value); end
end`,
    swift: `class LRUCache {
    init(_ capacity: Int) {}
    func get(_ key: Int) -> Int { return -1 }
    func put(_ key: Int, _ value: Int) {}
}`,
    kotlin: `class LRUCache(capacity: Int) {
    fun get(key: Int): Int = -1
    fun put(key: Int, value: Int) {}
}`,
    php: `class LRUCache {
    function __construct($capacity) {}
    function get($key) { return -1; }
    function put($key, $value) {}
}`,
  },

  testCasesVisible: [
    {
      id: 'tc1',
      input: JSON.stringify({
        capacity: 2,
        ops: ['put','put','get','put','get','put','get','get','get'],
        args: [[1,1],[2,2],[1],[3,3],[2],[4,4],[1],[3],[4]],
      }),
      expected: JSON.stringify([null,null,1,null,-1,null,-1,3,4]),
      explanation: 'Standard LRU eviction sequence',
    },
    {
      id: 'tc2',
      input: JSON.stringify({ capacity: 1, ops: ['put','put','get'], args: [[2,1],[3,2],[2]] }),
      expected: JSON.stringify([null,null,-1]),
      explanation: 'Capacity 1 — first put is evicted by second',
    },
  ],

  testCasesHidden: [
    // Edge cases: all same key, get before any put, capacity 3000, mixed patterns
    // These are never sent to the client
  ],

  testHarnesses: {
    python: `import sys, json
{{USER_CODE}}
data = json.loads(sys.stdin.read())
cache = LRUCache(data['capacity'])
results = []
for op, args in zip(data['ops'], data['args']):
    if op == 'put': cache.put(*args); results.append(None)
    elif op == 'get': results.append(cache.get(args[0]))
print(json.dumps(results))`,

    javascript: `{{USER_CODE}}
const data = JSON.parse(require('fs').readFileSync('/dev/stdin','utf8'));
const cache = new LRUCache(data.capacity);
const out = data.ops.map((op, i) => {
  if (op === 'put') { cache.put(...data.args[i]); return null; }
  return cache.get(data.args[i][0]);
});
console.log(JSON.stringify(out));`,

    // Same pattern for all 12 languages
    typescript: `{{USER_CODE}}
const data = JSON.parse(require('fs').readFileSync('/dev/stdin','utf8'));
const cache = new LRUCache(data.capacity);
const out = data.ops.map((op: string, i: number) => {
  if (op === 'put') { cache.put(...data.args[i]); return null; }
  return cache.get(data.args[i][0]);
});
console.log(JSON.stringify(out));`,

    java: `import java.util.*;
{{USER_CODE}}
public class Main {
  public static void main(String[] args) throws Exception {
    Scanner sc = new Scanner(System.in);
    // parse JSON input, run ops, print JSON output
  }
}`,

    // go, cpp, csharp, rust, ruby, swift, kotlin, php follow same structure
    go: `package main
import ("encoding/json";"fmt";"os";"bufio")
{{USER_CODE}}
func main() {
  reader := bufio.NewReader(os.Stdin)
  // parse, run, output
}`,
    cpp: `#include <bits/stdc++.h>
using namespace std;
{{USER_CODE}}
int main() {
  // parse JSON, run ops, output
}`,
    csharp: `using System; using System.Text.Json;
{{USER_CODE}}
class Program { static void Main() { /* parse, run, output */ } }`,
    rust: `use std::io::{self,Read};
{{USER_CODE}}
fn main() { /* parse, run, output */ }`,
    ruby: `require 'json'
{{USER_CODE}}
data = JSON.parse($stdin.read)
cache = LRUCache.new(data['capacity'])
results = data['ops'].each_with_index.map do |op, i|
  op == 'put' ? (cache.put(*data['args'][i]); nil) : cache.get(data['args'][i][0])
end
puts results.to_json`,
    swift: `import Foundation
{{USER_CODE}}
// parse stdin JSON, run ops, output`,
    kotlin: `import java.util.Scanner
{{USER_CODE}}
fun main() { /* parse, run, output */ }`,
    php: `<?php
{{USER_CODE}}
$data = json_decode(file_get_contents('php://stdin'), true);
$cache = new LRUCache($data['capacity']);
$results = [];
foreach (array_map(null, $data['ops'], $data['args']) as [$op, $args]) {
    $results[] = $op === 'put' ? (call_user_func_array([$cache,'put'],$args) ?? null) : $cache->get($args[0]);
}
echo json_encode($results);`,
  },
}
```

---

### 4.3 — Full Problem Library

**System Design Challenges (50–60 total):**

Easy (15):
URL Shortener, Key-Value Store, Pastebin, Distributed Counter, Rate Limiter (Basic), Parking Lot System, Job Scheduler, Web Crawler, Leaderboard Service, News Feed (simple), Shopping Cart, Session Store, Email Delivery, File Metadata Store, Simple Chat

Medium (25):
Twitter Feed, Instagram Feed, YouTube Upload Pipeline, Notification System, Ride-Sharing Dispatch, Payment Processing, Search Autocomplete, Distributed Cache, Content Delivery Network, E-commerce Checkout, Real-Time Analytics, Log Aggregation, Ad Click Tracker, Location Tracking, Hotel Booking, Code Deployment Pipeline, Event Ticketing, Fraud Detection, Multi-Region Database, WhatsApp-scale Messaging, Video Streaming, Collaborative Doc Editor, IoT Data Ingestion, Recommendation Engine, Distributed Task Queue

Hard (15):
Google Search Index, Distributed Transaction System, Global Load Balancer, Multi-Region Active-Active DB, Real-Time Multiplayer Game, Cryptocurrency Exchange, Financial Clearing System, Global DNS, P2P File Sharing, Social Graph at Scale, ML Feature Store, Real-Time Bidding Platform, Distributed Consensus, Time-Series Database, Chaos Engineering Platform

**Coding Problems (50–80 total):**

Data Structures (20):
LRU Cache, LFU Cache, Consistent Hashing, Bloom Filter, Skip List, Trie (Autocomplete), Segment Tree, Disjoint Set Union, Priority Queue (Task Scheduler), Rate Limiter (Token Bucket), Rate Limiter (Sliding Window), Circular Buffer, Time-Series Storage, Sorted Set (Redis ZSet), Merkle Tree, Count-Min Sketch, HyperLogLog, B-Tree Operations, Inverted Index, Social Graph Adjacency

Algorithms (20):
Binary Search on Answer, Sliding Window (Request Rate), Merge K Sorted Streams, Top-K Elements, Consistent Hash Ring, Two-Phase Commit, Leader Election, Distributed BFS, Shortest Path (Network Routing), Topological Sort, Interval Merge, Reservoir Sampling, MapReduce Word Count, Distributed Sort, Load Shedding, Backpressure Calculation, Exponential Backoff, Circuit Breaker, Gossip Protocol, Raft Consensus (Simplified)

Systems (20):
Design a KV Store Interface, Implement Connection Pool, Write a Load Balancer, Build a Pub/Sub, Implement Consistent Hashing, Design an Event Bus, Write a Circuit Breaker, Implement Distributed Lock, Build a Job Queue, Write a Cache with TTL, Request Coalescing, Write-Ahead Log, Simple Message Broker, Health Checking, Retry with Backoff, Metrics Aggregator, Leader Election, API Rate Limiter, Streaming Pipeline, Simple Consensus

---

### 4.4 — Problem Browser

`src/app/problems/page.tsx`:

Two tabs, identical card layout:

```
┌──────────────────────────────────────────────────────────────────┐
│  [Coding] [System Design]                                        │
│                                                                  │
│  🔍 Search...   [All] [Easy] [Medium] [Hard]                    │
│  Tags: [Data Structures ×] [Systems ×] [+ Add filter]           │
├──────────────────────────────────────────────────────────────────┤
│  ✅  LRU Cache              Medium  30min  Hash Map              │
│  ──  Consistent Hashing     Medium  45min  Distributed  🔒 Pro  │
│  🟡  URL Shortener          Easy    30min  Caching               │
│  ──  Twitter Feed           Medium  60min  CDN, Scale   🔒 Pro  │
└──────────────────────────────────────────────────────────────────┘
```

Status: ✅ solved, 🟡 attempted, ── not started, 🔒 tier-locked.

All filtering is client-side on the loaded problem list.

---

## Block 5 — Auth & Database

### 5.1 — Supabase Schema

`supabase/migrations/001_initial.sql`:
```sql
create extension if not exists "uuid-ossp";

create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique,
  display_name text,
  avatar_url text,
  subscription_tier text default 'free' check (subscription_tier in ('free', 'pro', 'enterprise')),
  stripe_customer_id text,
  stripe_subscription_id text,
  created_at timestamptz default now()
);

create table problems (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  title text not null,
  type text not null check (type in ('coding', 'system_design')),
  difficulty text not null check (difficulty in ('easy', 'medium', 'hard')),
  tags text[] default '{}',
  tier text not null default 'free' check (tier in ('free', 'pro', 'enterprise')),
  estimated_minutes int,
  description_md text,
  starter_code jsonb,
  test_cases_visible jsonb,
  test_cases_hidden jsonb,
  test_harnesses jsonb,
  success_criteria jsonb,
  hints jsonb,
  reference_topology jsonb,
  explanation_md text,
  company_context text,
  company_tags text[] default '{}',
  acceptance_rate numeric default 0,
  created_at timestamptz default now()
);

create table submissions (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references profiles(id) on delete cascade,
  problem_id uuid references problems(id),
  type text not null check (type in ('coding', 'system_design')),
  submitted_at timestamptz default now(),
  -- Coding fields
  language text,
  code text,
  runtime_ms int,
  memory_kb int,
  test_results jsonb,
  -- System design fields
  topology_snapshot jsonb,
  simulation_metrics jsonb,
  failure_reasons text[],
  -- Shared
  passed boolean not null,
  score numeric default 0
);

create table user_progress (
  user_id uuid references profiles(id) on delete cascade,
  problem_id uuid references problems(id),
  status text default 'not_started' check (status in ('not_started', 'attempted', 'solved')),
  attempts int default 0,
  best_runtime_ms int,
  first_solved_at timestamptz,
  last_attempted_at timestamptz,
  primary key (user_id, problem_id)
);

create table mock_sessions (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references profiles(id) on delete cascade,
  session_type text not null check (session_type in ('coding', 'system_design', 'full_loop')),
  difficulty text,
  problem_ids uuid[],
  time_limit_minutes int not null,
  started_at timestamptz default now(),
  completed_at timestamptz,
  report jsonb
);

create table organizations (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text unique not null,
  seat_count int default 5,
  admin_user_id uuid references profiles(id),
  stripe_subscription_id text,
  branding jsonb,
  created_at timestamptz default now()
);

create table org_members (
  org_id uuid references organizations(id) on delete cascade,
  user_id uuid references profiles(id) on delete cascade,
  role text default 'member' check (role in ('admin', 'member')),
  joined_at timestamptz default now(),
  primary key (org_id, user_id)
);

create table org_problem_sets (
  id uuid primary key default uuid_generate_v4(),
  org_id uuid references organizations(id) on delete cascade,
  name text not null,
  problem_ids uuid[] default '{}',
  created_by uuid references profiles(id),
  created_at timestamptz default now()
);

create table assessments (
  id uuid primary key default uuid_generate_v4(),
  org_id uuid references organizations(id) on delete cascade,
  problem_set_id uuid references org_problem_sets(id),
  candidate_email text not null,
  invite_token text unique not null default encode(gen_random_bytes(32), 'hex'),
  time_limit_minutes int default 90,
  status text default 'pending' check (status in ('pending', 'started', 'completed', 'expired')),
  started_at timestamptz,
  completed_at timestamptz,
  report jsonb,
  created_at timestamptz default now()
);

-- RLS
alter table profiles       enable row level security;
alter table submissions    enable row level security;
alter table user_progress  enable row level security;
alter table mock_sessions  enable row level security;
alter table organizations  enable row level security;
alter table org_members    enable row level security;
alter table assessments    enable row level security;

-- Policies
create policy "Own profile" on profiles for all using (auth.uid() = id);
create policy "Own submissions" on submissions for all using (auth.uid() = user_id);
create policy "Own progress" on user_progress for all using (auth.uid() = user_id);
create policy "Own sessions" on mock_sessions for all using (auth.uid() = user_id);
create policy "Problems public" on problems for select using (true);
create policy "Org members read org" on organizations for select using (
  exists (select 1 from org_members where org_id = id and user_id = auth.uid())
);

-- Auto-create profile on signup
create or replace function handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into profiles (id, display_name, avatar_url)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();
```

---

### 5.2 — NextAuth

`src/app/api/auth/[...nextauth]/route.ts`:
```typescript
import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import GitHub from 'next-auth/providers/github'
import { SupabaseAdapter } from '@auth/supabase-adapter'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const handler = NextAuth({
  providers: [
    Google({ clientId: process.env.GOOGLE_CLIENT_ID!, clientSecret: process.env.GOOGLE_CLIENT_SECRET! }),
    GitHub({ clientId: process.env.GITHUB_ID!, clientSecret: process.env.GITHUB_SECRET! }),
  ],
  adapter: SupabaseAdapter({ url: process.env.NEXT_PUBLIC_SUPABASE_URL!, secret: process.env.SUPABASE_SERVICE_ROLE_KEY! }),
  callbacks: {
    async session({ session, user }) {
      const { data } = await supabase
        .from('profiles')
        .select('subscription_tier, username')
        .eq('id', user.id)
        .single()

      session.user.id = user.id
      session.user.tier = data?.subscription_tier ?? 'free'
      session.user.username = data?.username ?? null
      return session
    },
  },
  pages: { signIn: '/login' },
})

export { handler as GET, handler as POST }
```

---

### 5.3 — Middleware

`src/middleware.ts`:
```typescript
import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl
    const tier = req.nextauth.token?.tier as string | undefined

    const proOnly = ['/mock-interview', '/leaderboard']
    const enterpriseOnly = ['/admin']
    const authOnly = ['/dashboard', '/profile']

    if (proOnly.some(r => pathname.startsWith(r)) && tier === 'free') {
      return NextResponse.redirect(new URL(`/upgrade?from=${pathname}`, req.url))
    }
    if (enterpriseOnly.some(r => pathname.startsWith(r)) && tier !== 'enterprise') {
      return NextResponse.redirect(new URL('/', req.url))
    }

    return NextResponse.next()
  },
  { callbacks: { authorized: ({ token, req }) => {
    const authRequired = ['/dashboard', '/profile', '/mock-interview', '/admin']
    if (authRequired.some(r => req.nextUrl.pathname.startsWith(r))) return !!token
    return true
  }}}
)

export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*', '/mock-interview/:path*', '/admin/:path*', '/leaderboard/:path*']
}
```

---

### 5.4 — Seed Script

`src/scripts/seed.ts`:
```typescript
import { createClient } from '@supabase/supabase-js'
import { allCodingProblems } from '@/data/coding-problems'
import { allSystemProblems } from '@/data/system-problems'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function seed() {
  console.log(`Seeding ${allCodingProblems.length} coding problems...`)
  for (const p of allCodingProblems) {
    const { error } = await supabase.from('problems').upsert({
      slug: p.slug,
      title: p.title,
      type: 'coding',
      difficulty: p.difficulty,
      tags: p.tags,
      tier: p.tier,
      estimated_minutes: p.estimatedMinutes,
      description_md: p.description,
      starter_code: p.starterCode,
      test_cases_visible: p.testCasesVisible,
      test_cases_hidden: p.testCasesHidden,
      test_harnesses: p.testHarnesses,
      hints: p.hints,
      company_tags: p.companyTags ?? [],
    }, { onConflict: 'slug' })
    if (error) console.error(`Failed to seed ${p.slug}:`, error)
    else console.log(`✅ ${p.slug}`)
  }
  // Same for system problems
}

seed()
```

Run: `npx tsx src/scripts/seed.ts`

---

## Block 6 — User Features

### 6.1 — Dashboard

`src/app/dashboard/page.tsx` — server component, parallel data fetching:
```typescript
const [progress, recentSubmissions, streak] = await Promise.all([
  getUserProgress(session.user.id),
  getRecentSubmissions(session.user.id, 10),
  getUserStreak(session.user.id),
])
```

Layout:
```
┌────────────────────────────────────────────────────────────┐
│  Hey, Alex                              🔥 14 day streak   │
├────────────┬─────────────────┬──────────────────────────── │
│  47        │  12             │  Top 12%                    │
│  Solved    │  System Designs │  Global Rank                │
├────────────┴─────────────────┴──────────────────────────── │
│  DSA:              ████████░░  24/30  (80%)                │
│  System Design:    █████░░░░░  12/25  (48%)                │
│  Easy:             ████████████ 14/14 (100%) ✅            │
│  Medium:           ████████░░░  24/30 (80%)                │
│  Hard:             ██░░░░░░░░░  4/20  (20%)                │
├─────────────────────────────────────────────────────────── │
│  Activity Heatmap (GitHub-style, 1 year)                   │
├─────────────────────────────────────────────────────────── │
│  Recent                                                    │
│  ✅  LRU Cache          Python  2h ago                     │
│  ❌  Design Twitter     Attempt 3  yesterday               │
│  ✅  Consistent Hash    Go      2 days ago                 │
└────────────────────────────────────────────────────────────┘
```

---

### 6.2 — Submission History

On each problem page, "Submissions" tab shows:

```
#4  ✅ Accepted   Python   48ms    2h ago
#3  ❌ Wrong      Python   —       yesterday   [view code]
#2  ❌ TLE        Python   >2000ms 3 days ago  [view code]
#1  ❌ Wrong      Python   —       3 days ago  [view code]
```

[view code] loads that submission's code into a read-only Monaco editor in a modal.

For system design submissions: "Topology" tab shows the snapshot of their canvas at submission time (replay the React Flow nodes/edges from the stored JSON).

---

### 6.3 — Leaderboard

`src/app/leaderboard/page.tsx`

Cached Supabase query (`revalidate: 900`):
```sql
select
  p.username, p.display_name, p.avatar_url,
  count(distinct s.problem_id) filter (where s.passed) as solved,
  count(distinct s.problem_id) filter (
    where s.passed and pr.difficulty = 'hard'
  ) as hard_solved,
  count(distinct s.problem_id) filter (
    where s.passed and pr.type = 'system_design'
  ) as system_designs_passed,
  avg(s.score) filter (where s.passed) as avg_score
from profiles p
join submissions s on s.user_id = p.id
join problems pr on pr.id = s.problem_id
group by p.id
order by solved desc, hard_solved desc, system_designs_passed desc
limit 100
```

Tabs: Global / This Month / This Week.
Current user row always shown (separate rank query) even if outside top 100.

---

### 6.4 — Public Profile

`src/app/profile/[username]/page.tsx`:
- Avatar, name, join date, stats
- Solved problems grid (filterable by type/difficulty)
- Badges and achievements
- Activity heatmap

---

## Block 7 — Monetization

### 7.1 — Access Control

`src/lib/access.ts`:
```typescript
import type { Tier, ProblemMeta, ProblemType } from '@/types/problems'

const FREE_CODING = new Set([
  'lru-cache', 'bloom-filter', 'top-k-elements',
  'rate-limiter-token-bucket', 'consistent-hashing',
])

const FREE_SYSTEM = new Set([
  'url-shortener', 'key-value-store',
])

export function canAccessProblem(tier: Tier, problem: ProblemMeta): boolean {
  if (tier === 'pro' || tier === 'enterprise') return true
  if (problem.type === 'coding')        return FREE_CODING.has(problem.slug)
  if (problem.type === 'system_design') return FREE_SYSTEM.has(problem.slug)
  return false
}

export function canUseFeature(
  tier: Tier,
  feature:
    | 'mockInterview'
    | 'leaderboard'
    | 'submissionHistory'
    | 'referenceSolutions'
    | 'customProblems'
    | 'assessments'
): boolean {
  if (tier === 'enterprise') return true
  if (tier === 'pro') return !['customProblems', 'assessments'].includes(feature)
  return false
}
```

---

### 7.2 — Stripe

`src/app/api/stripe/checkout/route.ts`:
```typescript
export async function POST(req: NextRequest) {
  const session = await getServerSession()
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { plan } = await req.json()
  const priceId = plan === 'pro_annual'
    ? process.env.STRIPE_PRO_ANNUAL_PRICE_ID
    : process.env.STRIPE_PRO_MONTHLY_PRICE_ID

  const checkout = await stripe.checkout.sessions.create({
    mode: 'subscription',
    customer_email: session.user.email!,
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${process.env.NEXTAUTH_URL}/dashboard?upgraded=true`,
    cancel_url: `${process.env.NEXTAUTH_URL}/upgrade`,
    metadata: { userId: session.user.id },
  })

  return NextResponse.json({ url: checkout.url })
}
```

`src/app/api/stripe/webhook/route.ts`:
```typescript
export async function POST(req: NextRequest) {
  const sig = req.headers.get('stripe-signature')!
  const body = await req.text()

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  const supabase = createAdminClient()

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session
      await supabase.from('profiles').update({
        subscription_tier: 'pro',
        stripe_customer_id: session.customer as string,
        stripe_subscription_id: session.subscription as string,
      }).eq('id', session.metadata!.userId!)
      break
    }
    case 'customer.subscription.deleted': {
      const sub = event.data.object as Stripe.Subscription
      await supabase.from('profiles')
        .update({ subscription_tier: 'free' })
        .eq('stripe_subscription_id', sub.id)
      break
    }
  }

  return NextResponse.json({ received: true })
}
```

---

## Block 8 — Mock Interview Mode

`src/app/mock-interview/page.tsx` — config screen:
- Session type selector
- Difficulty filter
- Topic focus (optional tags)
- "Start Session" button — calls API to randomly assign problems, returns session ID

`src/store/session.store.ts`:
```typescript
interface SessionStore {
  sessionId: string | null
  timeLimit: number
  timeRemaining: number
  assignedProblems: ProblemMeta[]
  hintsDisabled: boolean
  scratchpad: string
  status: 'inactive' | 'active' | 'complete'

  startSession: (config: SessionConfig) => Promise<void>
  tick: () => void           // called every second by setInterval
  endSession: () => void
  setScratchpad: (text: string) => void
}
```

Problem pages check `session.store.hintsDisabled` to hide the hints panel. Timer component shown globally in the navbar during an active session.

`/mock-interview/report/[sessionId]` — post-session analysis:
- Time spent, problems attempted/solved
- For coding: test pass rate, runtime percentile vs. global average
- For system design: metrics snapshot, topology image (via `html2canvas` on the stored topology), score vs. criteria
- Weak area identification
- 3 recommended next problems based on what failed

---

## Block 9 — Enterprise

### 9.1 — Organization Admin Dashboard

`/admin` — accessible to enterprise users only (middleware enforced):

- **Team tab**: member list, invite by email, remove member, role management
- **Problem Sets tab**: create/edit/delete custom problem sets, drag problems in/out
- **Assessments tab**: create invite link, list active/completed assessments, view reports

### 9.2 — Custom Problem Upload

Form with:
- Type: Coding or System Design
- For coding: description (markdown editor), starter code per language (tabbed Monaco editors), visible test cases, hidden test cases, test harness per language
- For system design: description, requirements list, success criteria (JSON form fields), hints
- Preview renders the problem exactly as candidates will see it

Custom problems stored in `problems` table with `org_id` set — only visible to that org.

### 9.3 — Candidate Assessment

`/assess/[token]` — candidate-facing page:
- Company branding (logo, colors from `org.branding`)
- Problem set title and description
- Time limit displayed
- "Start Assessment" → session locks to this problem set, timer starts
- Standard problem pages render inside the locked session context

On completion:
- Auto-generate report (stored as JSON in `assessments.report`)
- Admin email notification
- Candidate sees "Assessment submitted — thank you"
- Candidate cannot view their own report

Report format:
```json
{
  "candidateEmail": "...",
  "completedAt": "...",
  "totalScore": 72,
  "problems": [
    {
      "slug": "lru-cache",
      "type": "coding",
      "timeSpentMinutes": 24,
      "passed": true,
      "passRate": "8/8",
      "runtimePercentile": 68,
      "language": "python"
    },
    {
      "slug": "url-shortener",
      "type": "system_design",
      "timeSpentMinutes": 38,
      "passed": false,
      "score": 75,
      "criteriaResults": [...],
      "topologySnapshot": {...}
    }
  ]
}
```

PDF export via `@react-pdf/renderer` — generates a clean printable report with topology diagram.

---

## Environment Variables

`.env.local`:
```bash
# App
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=                        # openssl rand -base64 32

# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=              # server-side only — never NEXT_PUBLIC

# OAuth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_ID=
GITHUB_SECRET=

# Stripe
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_PRO_MONTHLY_PRICE_ID=
STRIPE_PRO_ANNUAL_PRICE_ID=
STRIPE_ENTERPRISE_PRICE_ID=

# Piston (override to self-host later)
PISTON_API_URL=https://emkc.org/api/v2/piston
```

---

## Build Order

```
SETUP
  Scaffold Next.js project
  Define all types (simulation.ts, problems.ts, submissions.ts, user.ts)
  Create empty Zustand store shells

BLOCK 1 — Canvas UI
  1.1  System design page shell (two-pane layout)
  1.2  Component sidebar (12 draggable items, grouped, color-coded)
  1.3  Custom node components (all 12 types)
  1.4  SimulationCanvas (React Flow wired up with drop handler)
  1.5  Config panel (per-node form inputs, reads/writes node.data.config)
  1.6  Animated edge (request flow dots)
  1.7  Canvas toolbar (fit, export, import, clear)

BLOCK 2 — Simulation Engine
  2.1  SimulationEngine.ts (pure TypeScript, zero UI deps)
  2.2  Latency models
  2.3  Cost models
  2.4  Validator (pass/fail evaluation with hints)
  2.5  Unit tests — write these before wiring to UI
  2.6  Simulation Zustand store
  2.7  Wire engine to canvas (initEngine on topology change)
  2.8  Metrics panel + Recharts chart
  2.9  Run controls (RPS slider, ramp, duration)
  2.10 Chaos controls (kill, slow, saturate, restore all)
  2.11 Validation result UI

BLOCK 3 — Coding Problems
  3.1  Piston client (piston.ts)
  3.2  Test runner (runner.ts)
  3.3  Per-language harnesses (all 12 languages)
  3.4  /api/execute route — test with curl before UI
  3.5  Monaco editor component
  3.6  Editor Zustand store
  3.7  Coding problem page (3-pane layout)
  3.8  Run vs Submit flow (keyboard shortcuts too)

BLOCK 4 — Problem Content
  4.1  url-shortener.ts (first full system design problem)
  4.2  lru-cache.ts (first full coding problem, all 12 language harnesses)
  4.3  Problem browser page (static data, both tabs, filtering)
  4.4  All remaining problems (content work — follow the format)

BLOCK 5 — Auth & Database
  5.1  Supabase project + schema migrations
  5.2  NextAuth (Google + GitHub)
  5.3  Middleware (auth gates + tier gates)
  5.4  Supabase query functions (problems, submissions, progress)
  5.5  Replace static problem arrays with Supabase queries
  5.6  Seed script

BLOCK 6 — User Features
  6.1  Submission storage on Submit + Validate
  6.2  Progress upsert on solve
  6.3  Dashboard page
  6.4  Submission history tab on problem pages
  6.5  Public profile page
  6.6  Leaderboard

BLOCK 7 — Monetization
  7.1  access.ts (single source of truth)
  7.2  Apply gating in server components + API routes
  7.3  UpgradePrompt component (shown on locked content)
  7.4  Stripe checkout + webhook + portal routes
  7.5  Webhook updates subscription_tier in Supabase

BLOCK 8 — Mock Interview Mode
  8.1  Session Zustand store
  8.2  Session config page
  8.3  Timer component (shown in navbar during session)
  8.4  Problem pages check session context (disable hints)
  8.5  Session report page

BLOCK 9 — Enterprise
  9.1  Admin dashboard (seats, problem sets, assessments)
  9.2  Custom problem upload form
  9.3  Assessment invite + locked session flow
  9.4  Assessment report generation
  9.5  PDF export

FINAL PASS
  Landing page
  Mobile responsive (all pages)
  Error boundaries on every page
  Loading skeletons everywhere
  Empty states (no submissions yet, no progress yet)
  SEO (metadata, og:image per problem, sitemap)
  Accessibility (keyboard nav, focus rings, aria labels)
```

---

## First Claude Code Prompt

Run this in your scaffolded project directory:

```
Create the system design problem page at src/app/problems/system/[slug]/page.tsx.

Full-viewport dark layout (#0f1117 background). Two panes side by side:

LEFT PANE (38% width, border-r border-white/10, overflow-y-auto):
- Header with hardcoded title "Design a URL Shortener", an "Easy" badge in green, 
  "30 min" label
- Section: Requirements — a numbered list of 4 placeholder requirements
- Section: Success Criteria — a table with columns "Metric" and "Required", 
  3 placeholder rows
- Section: Hints — an accordion with 3 items that reveal on click (show first hint 
  text, second and third locked behind "Unlock hint 2" button)
- Section: Run Controls — an RPS slider (100 to 10000), duration selector (30s/60s/∞), 
  and a "Run Simulation" button

RIGHT PANE (flex-1):
- React Flow canvas with Background (dots, #ffffff15), Controls, MiniMap
- A ComponentSidebar component (create at src/components/canvas/ComponentSidebar.tsx)
  that renders as a vertical panel on the left edge of the canvas
  containing 12 draggable items in 5 groups: Networking (Load Balancer, API Gateway, 
  DNS, WAF), Compute (API Server), Storage (SQL Database, NoSQL Database, Object Storage, 
  Search Index), Caching (Cache/Redis, CDN), Messaging (Message Queue)
  Each item uses HTML5 drag API. onDragStart sets dataTransfer with the component type.
  Canvas onDrop creates a new React Flow node at the drop position.

Use lucide-react for icons. Tailwind for all styling. Everything dark themed.
Node bodies can be simple dark rounded rectangles for now.
Wrap the React Flow portion in ReactFlowProvider.
```

That single prompt completes Block 1.1 through 1.4. Work through the blocks in order from there, one block per session.
