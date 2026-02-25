'use client'

import { type EdgeProps, getBezierPath } from 'reactflow'
import { useSimulationStore } from '@/store/simulation.store'
import { useEffect, useRef } from 'react'

export function AnimatedEdge({
  sourceX, sourceY, targetX, targetY,
  sourcePosition, targetPosition
}: EdgeProps) {
  const status = useSimulationStore(s => s.status)
  const metrics = useSimulationStore(s => s.metrics)
  const svgRef = useRef<SVGGElement>(null)
  const animRef = useRef<number>(0)
  const dotsRef = useRef<{ progress: number; hasError: boolean }[]>([])

  const [edgePath] = getBezierPath({ sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition })

  useEffect(() => {
    if (status !== 'running' || !metrics) {
      dotsRef.current = []
      if (svgRef.current) svgRef.current.innerHTML = ''
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
