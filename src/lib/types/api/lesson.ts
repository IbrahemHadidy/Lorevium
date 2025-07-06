import type { HighSchool } from '@/lib/enums/high-school';
import type { Lesson } from '../models/lesson';

//------------------------ REQUESTS -------------------------//

export interface AddLessonRequest {
  lesson: {
    title: string;
    description: string;
    video: string;
    classLevel: HighSchool;
    price?: number;
    scheduledDate: string;
  };
}

export interface UpdateLessonRequest {
  _id: string;
  data: {
    title?: string;
    description?: string;
    video?: string;
    classLevel?: HighSchool;
    price?: number;
    scheduledDate?: string;
  };
}

export interface DeleteLessonRequest {
  _id: string;
}

export interface GetPaginatedLessonsRequest {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface GetLessonByIdRequest {
  _id: string;
}

export interface PayLessonRequest {
  _id: string;
}

//------------------------ RESPONSES -------------------------//

export interface AddLessonResponse {
  message: string;
  success: boolean;
  data: Lesson;
}

export interface UpdateLessonResponse {
  message: string;
  success: boolean;
  data: Lesson;
}

export interface GetPaginatedLessonsResponse {
  message: string;
  success: boolean;
  data: Lesson[];
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}

export interface GetPurchasedLessonsResponse {
  message: string;
  success: boolean;
  data: Lesson[];
}

export interface GetLessonByIdResponse {
  message: string;
  success: boolean;
  data: Lesson;
}

export interface DeleteLessonResponse {
  message: string;
  success: boolean;
}

export interface PayLessonResponse {
  message: string;
  success: boolean;
  paymentUrl: string;
}
