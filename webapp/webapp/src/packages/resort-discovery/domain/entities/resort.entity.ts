export type Resort = {
  id: string;
  name: string;
  image: string;
  matchPercent: number;
  description: string;
  match: number;
  conditions: { label: string; icon: string };
  skill: string;
  runs: number;
  region: string;
  budget: string;
  vibe: string;
  groupType: string;
}; 