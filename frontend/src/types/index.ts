export interface Project {
  title: string;
  description: string;
  tags: string[];
  badge?: string;
  icon: string;
  github?: string;
  demo?: string;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  points: string[];
}

export interface WritingPost {
  title: string;
  impressions: string;
  url: string;
}