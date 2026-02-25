'use client'

import {
  Network,
  Shield,
  AtSign,
  ShieldCheck,
  Server,
  Database,
  HardDrive,
  Archive,
  Search,
  Zap,
  Globe,
  MessagesSquare,
  type LucideIcon,
} from 'lucide-react'

type NodeType =
  | 'loadBalancer'
  | 'apiServer'
  | 'sqlDatabase'
  | 'nosqlDatabase'
  | 'cache'
  | 'cdn'
  | 'messageQueue'
  | 'objectStorage'
  | 'apiGateway'
  | 'searchIndex'
  | 'dns'
  | 'waf'

interface SidebarItem {
  type: NodeType
  label: string
  icon: LucideIcon
}

interface SidebarCategory {
  name: string
  color: string
  items: SidebarItem[]
}

const categories: SidebarCategory[] = [
  {
    name: 'NETWORKING',
    color: '#3b82f6', // blue
    items: [
      { type: 'loadBalancer', label: 'Load Balancer', icon: Network },
      { type: 'apiGateway', label: 'API Gateway', icon: Shield },
      { type: 'dns', label: 'DNS', icon: AtSign },
      { type: 'waf', label: 'WAF', icon: ShieldCheck },
    ],
  },
  {
    name: 'COMPUTE',
    color: '#22c55e', // green
    items: [
      { type: 'apiServer', label: 'API Server', icon: Server },
    ],
  },
  {
    name: 'STORAGE',
    color: '#f97316', // orange
    items: [
      { type: 'sqlDatabase', label: 'SQL Database', icon: Database },
      { type: 'nosqlDatabase', label: 'NoSQL Database', icon: HardDrive },
      { type: 'objectStorage', label: 'Object Storage', icon: Archive },
      { type: 'searchIndex', label: 'Search Index', icon: Search },
    ],
  },
  {
    name: 'CACHING',
    color: '#a855f7', // purple
    items: [
      { type: 'cache', label: 'Cache (Redis)', icon: Zap },
      { type: 'cdn', label: 'CDN', icon: Globe },
    ],
  },
  {
    name: 'MESSAGING',
    color: '#eab308', // yellow
    items: [
      { type: 'messageQueue', label: 'Message Queue', icon: MessagesSquare },
    ],
  },
]

export function ComponentSidebar() {
  const onDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    type: NodeType,
  ) => {
    e.dataTransfer.setData('application/reactflow-type', type)
    e.dataTransfer.effectAllowed = 'move'
  }

  return (
    <aside className="w-56 h-full bg-[#1a1d27]/80 backdrop-blur-sm border-r border-white/10 overflow-y-auto py-4 px-3 flex flex-col gap-5">
      {categories.map((category) => (
        <div key={category.name}>
          <h3
            className="text-[10px] tracking-wider mb-2 font-medium px-1"
            style={{ color: 'rgba(255, 255, 255, 0.4)' }}
          >
            {category.name}
          </h3>

          <div className="flex flex-col gap-1.5">
            {category.items.map((item) => {
              const Icon = item.icon

              return (
                <div
                  key={item.type}
                  draggable
                  onDragStart={(e) => onDragStart(e, item.type)}
                  className="group flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-grab bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/30 transition-colors"
                >
                  <Icon
                    className="w-4 h-4 shrink-0"
                    style={{ color: category.color }}
                  />
                  <span className="text-xs text-white/70 group-hover:text-white transition-colors">
                    {item.label}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </aside>
  )
}
