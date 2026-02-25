'use client'

import { useCallback, useRef } from 'react'
import { type Node, type Edge, useReactFlow } from 'reactflow'
import { Maximize2, Upload, Download, Trash2 } from 'lucide-react'

interface CanvasToolbarProps {
  nodes: Node[]
  edges: Edge[]
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>
}

export function CanvasToolbar({
  nodes,
  edges,
  setNodes,
  setEdges,
}: CanvasToolbarProps) {
  const reactFlowInstance = useReactFlow()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFitView = useCallback(() => {
    reactFlowInstance.fitView()
  }, [reactFlowInstance])

  const handleImport = useCallback(() => {
    fileInputRef.current?.click()
  }, [])

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (!file) return

      const reader = new FileReader()
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target?.result as string) as {
            nodes: Node[]
            edges: Edge[]
          }
          setNodes(data.nodes)
          setEdges(data.edges)
        } catch {
          // silently ignore invalid JSON
        }
      }
      reader.readAsText(file)

      // reset so the same file can be re-imported
      e.target.value = ''
    },
    [setNodes, setEdges],
  )

  const handleExport = useCallback(() => {
    const data = JSON.stringify({ nodes, edges }, null, 2)
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)

    const a = document.createElement('a')
    a.href = url
    a.download = 'topology.json'
    a.click()

    URL.revokeObjectURL(url)
  }, [nodes, edges])

  const handleClear = useCallback(() => {
    const confirmed = window.confirm(
      'Are you sure you want to clear the canvas? This cannot be undone.',
    )
    if (confirmed) {
      setNodes([])
      setEdges([])
    }
  }, [setNodes, setEdges])

  return (
    <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10 flex items-center bg-[#1a1d27]/90 backdrop-blur-sm rounded-full border border-white/10">
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleFileChange}
        className="hidden"
      />

      <button
        onClick={handleFitView}
        className="flex items-center gap-1 px-3 py-1.5 text-xs text-white/70 hover:text-white transition-colors"
      >
        <Maximize2 className="w-3.5 h-3.5" />
        Fit View
      </button>

      <div className="border-r border-white/10 h-5" />

      <button
        onClick={handleImport}
        className="flex items-center gap-1 px-3 py-1.5 text-xs text-white/70 hover:text-white transition-colors"
      >
        <Upload className="w-3.5 h-3.5" />
        Import
      </button>

      <div className="border-r border-white/10 h-5" />

      <button
        onClick={handleExport}
        className="flex items-center gap-1 px-3 py-1.5 text-xs text-white/70 hover:text-white transition-colors"
      >
        <Download className="w-3.5 h-3.5" />
        Export
      </button>

      <div className="border-r border-white/10 h-5" />

      <button
        onClick={handleClear}
        className="flex items-center gap-1 px-3 py-1.5 text-xs text-white/70 hover:text-white transition-colors"
      >
        <Trash2 className="w-3.5 h-3.5" />
        Clear
      </button>
    </div>
  )
}
