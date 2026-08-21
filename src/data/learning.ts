export interface LearningItem {
  label: string;
  status: 'completed' | 'current' | 'next' | 'exploring';
  category: 'ai' | 'fundamentals';
}

export const learningRoadmap: LearningItem[] = [
  { label: 'Python', status: 'current', category: 'ai' },
  { label: 'Machine Learning Fundamentals', status: 'current', category: 'ai' },
  { label: 'Neural Networks', status: 'next', category: 'ai' },
  { label: 'LLMs', status: 'next', category: 'ai' },
  { label: 'AI Agents', status: 'exploring', category: 'ai' },
  { label: 'AI System Design', status: 'exploring', category: 'ai' },
];

export const additionalLearning: LearningItem[] = [
  { label: 'Data Structures & Algorithms', status: 'current', category: 'fundamentals' },
  { label: 'System Design', status: 'current', category: 'fundamentals' },
];

export const statusLabels: Record<LearningItem['status'], string> = {
  completed: 'DONE',
  current: 'CURRENT',
  next: 'NEXT',
  exploring: 'EXPLORING',
};

export const statusColors: Record<LearningItem['status'], string> = {
  completed: '#4ade80',
  current: '#00d4ff',
  next: '#a78bfa',
  exploring: '#f59e0b',
};
