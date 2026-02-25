'use client'

import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  type Connection,
  type ReactFlowInstance,
} from 'reactflow'
import 'reactflow/dist/style.css'
import { NODE_TYPES } from './nodeTypes'
import { EDGE_TYPES } from './edgeTypes'
import { ComponentSidebar } from './ComponentSidebar'
import { ConfigPanel } from './ConfigPanel'
import { CanvasToolbar } from './CanvasToolbar'
import { useSimulationStore, DEFAULT_LABELS, DEFAULT_CONFIGS } from '@/store/simulation.store'
import type { NodeType } from '@/types/simulation'
import { useCallback, useRef, useState } from 'react'

export function SimulationCanvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null)
  const [rfInstance, setRfInstance] = useState<ReactFlowInstance | null>(null)
  const reactFlowWrapper = useRef<HTMLDivElement>(null)
  const initEngine = useSimulationStore((s) => s.initEngine)

  const onConnect = useCallback(
    (connection: Connection) =>
      setEdges((eds) =>
        addEdge(
          {
            ...connection,
            type: 'animated',
            animated: false,
          },
          eds,
        ),
      ),
    [setEdges],
  )

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      const type = e.dataTransfer.getData('application/reactflow-type')
      if (!type || !rfInstance || !reactFlowWrapper.current) return

      const bounds = reactFlowWrapper.current.getBoundingClientRect()
      const position = rfInstance.screenToFlowPosition({
        x: e.clientX - bounds.left,
        y: e.clientY - bounds.top,
      })

      const newNode = {
        id: `${type}-${Date.now()}`,
        type,
        position,
        data: {
          label: DEFAULT_LABELS[type as NodeType],
          config: { ...DEFAULT_CONFIGS[type as NodeType] },
        },
      }
      setNodes((nds) => [...nds, newNode])
    },
    [rfInstance, setNodes],
  )

  const onNodesChangeWithSync = useCallback(
    (changes: Parameters<typeof onNodesChange>[0]) => {
      onNodesChange(changes)
      initEngine(nodes, edges)
    },
    [nodes, edges, onNodesChange, initEngine],
  )

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
          onDragOver={(e) => e.preventDefault()}
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
          <CanvasToolbar
            nodes={nodes}
            edges={edges}
            setNodes={setNodes}
            setEdges={setEdges}
          />
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
