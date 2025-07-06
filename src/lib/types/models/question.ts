import type { QuestionType } from '@/lib/enums/question-type';
import type { Exam } from './exam';
import type { User } from './user';

export interface Question {
  _id: string;
  text: string;
  type: QuestionType;
  options: string[];
  correctAnswer: string;
  exam: Exam | string;
  points: number;
  createdBy: User | string;
  createdAt: string;
  updatedAt: string;
}
