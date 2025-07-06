import type { Lesson } from './lesson';
import type { User } from './user';

export interface LessonPurchase {
  _id: string;
  user: User | string;
  lesson: Lesson | string;
  paidAt: string;
  amount: number;
  transactionId: string;
  createdAt: string;
  updatedAt: string;
}
