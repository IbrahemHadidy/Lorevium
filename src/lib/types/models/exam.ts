import type { HighSchool } from '@/lib/enums/high-school';
import type { Question } from './question';
import type { User } from './user';

export interface Exam {
  _id: string;
  title: string;
  description: string;
  duration: number;
  questions: (string | Question)[];
  classLevel: HighSchool;
  isPublished: boolean;
  startDate: string;
  endDate: string;
  createdBy: User | string;
  createdAt: string;
  updatedAt: string;
}
