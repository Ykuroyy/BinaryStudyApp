export type NumberSystem = '2進法' | '8進法' | '10進法' | '16進法';

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: 'conversion' | 'calculation' | 'concept';
}

export interface StudyProgress {
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  studyTime: number;
  lastStudyDate: string;
  completedLessons: string[];
}

export interface Lesson {
  id: string;
  title: string;
  content: string;
  examples: Example[];
  practiceQuestions: Question[];
}

export interface Example {
  title: string;
  description: string;
  steps: string[];
}

export interface ExamResult {
  date: string;
  score: number;
  totalQuestions: number;
  timeSpent: number;
  questions: Question[];
  userAnswers: number[];
}

export type RootStackParamList = {
  Home: undefined;
  Study: undefined;
  Practice: undefined;
  Exam: undefined;
};