import type { Node, Edge } from 'reactflow'
import type { SuccessCriteria } from './simulation'

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
  referenceTopology: { nodes: Node[]; edges: Edge[] }
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
