export type Role = 'student' | 'instructor';

export interface User {
  id: string;
  fullName: string;
  role: Role;
}

export interface Lesson {
  id: string;
  title: string;
  content: string;
}

export interface Course {
  id: string;
  title: string;
  category: 'A' | 'B';
  level: 'početni' | 'napredni';
  description: string;
  lessons: number;
  details?: Lesson[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  answers: string[];
  correctIndex: number;
}
