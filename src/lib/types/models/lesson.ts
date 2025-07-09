import type { HighSchool } from '@/lib/enums/high-school';
import type { User } from './user';

export interface Lesson {
  _id: string;
  title: string;
  description: string;
  video: string;
  classLevel: HighSchool;
  isPaid?: boolean;
  price?: number;
  scheduledDate: string;
  createdBy: User | string;
  createdAt: string;
  updatedAt: string;
}
