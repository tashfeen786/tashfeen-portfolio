export interface Project {
  title: string
  description: string
  problem?: string
  solution?: string
  tags: string[]
  features?: string[]
  badge?: string
  icon: string
  github?: string
  demo?: string
}

export interface Experience {
  role: string
  company: string
  location: string
  period: string
  points: string[]
}

export interface SkillGroup {
  label: string
  icon: string
  skills: string[]
}

export interface Capability {
  title: string
  description: string
  icon: string
}