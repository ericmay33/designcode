import { ReactFlowProvider } from 'reactflow'
import { SimulationCanvas } from '@/components/canvas/SimulationCanvas'
import { ProblemDescription } from '@/components/problems/ProblemDescription'

export default function SystemProblemPage({
  params,
}: {
  params: { slug: string }
}) {
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
