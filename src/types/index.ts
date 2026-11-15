export interface Project {
  slug: string;
  year: string;
  title: string;
  oneLiner: string;
  role: string;
  team: string;
  stack: string[];
  problem: string[];
  decisions: {
    decision: string;
    reason: string;
  }[];
  outcome: string;
  retrospective: string[];
  liveUrl?: string;
  githubUrl?: string;
  image: string;
  imageCaption: string;
}

export interface Experience {
  years: string;
  role: string;
  company: string;
  note?: string;
}
