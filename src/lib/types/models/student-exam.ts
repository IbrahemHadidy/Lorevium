import type { Exam } from './exam';
import type { Question } from './question';
import type { User } from './user';

export interface StudentExam {
  _id: string;
  student: User | string;
  exam: Exam | string;
  startTime: string;
  endTime: string;
  isSubmitted: boolean;
  answers: {
    question: Question | string;
    selectedAnswer: string;
    isCorrect: boolean;
  }[];
  score: number;
  createdAt: string;
  updatedAt: string;
}
