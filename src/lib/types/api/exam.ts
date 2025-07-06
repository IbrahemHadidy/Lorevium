import type { HighSchool } from '@/lib/enums/high-school';
import type { Exam } from '../models/exam';

//------------------------ REQUESTS -------------------------//

export interface CreateExamRequest {
  data: {
    title: string;
    description: string;
    duration: number;
    classLevel: HighSchool;
    startDate: string;
    endDate: string;
    isPublished: boolean;
  };
}

export interface UpdateExamRequest {
  _id: string;
  data: {
    title?: string;
    description?: string;
    duration?: number;
    classLevel?: HighSchool;
    startDate?: string;
    questions?: string[];
    endDate?: string;
    isPublished?: boolean;
  };
}

export interface GetExamByIdRequest {
  _id: string;
}

export interface DeleteExamRequest {
  _id: string;
}

//------------------------ RESPONSES -------------------------//

export interface CreateExamResponse {
  message: string;
  success: boolean;
  data: Exam;
}

export interface UpdateExamResponse {
  message: string;
  success: boolean;
  data: Exam;
}

export interface GetAllExamsResponse {
  message: string;
  success: boolean;
  data: Exam[];
}

export interface GetExamByIdResponse {
  message: string;
  success: boolean;
  data: Exam;
}

export interface DeleteExamResponse {
  message: string;
  success: boolean;
}
