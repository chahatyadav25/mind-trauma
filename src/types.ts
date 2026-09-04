export type ViewId =
  | 'landing'
  | 'consent'
  | 'safety'
  | 'intro'
  | 'assessment'
  | 'results'
  | 'symptoms'
  | 'chat'
  | 'resources'
  | 'dashboard'
  | 'history'
  | 'states';

export interface Question {
  id: number;
  q: string;
  why: string;
  cluster: string;
}

export interface SymptomCluster {
  id: string;
  number: number;
  name: string;
  description: string;
  screenedIn: string;
  iconName: string;
}

export interface ResourceItem {
  id: string;
  title: string;
  category: 'crisis' | 'grounding' | 'care' | 'sleep';
  badge: string;
  meta: string;
  description: string;
  actionType: 'modal' | 'external' | 'tel';
  actionUrl?: string;
  actionLabel: string;
  isBookmarked?: boolean;
}

export interface AssessmentRecord {
  id: string;
  date: string;
  score: number;
  total: number;
  isPositive: boolean;
  statusText: string;
  summary: string;
  answers: (boolean | null)[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp?: string;
  isFallback?: boolean;
}

export interface GroundingStep {
  step: number;
  title: string;
  iconName: string;
  text: string;
}
