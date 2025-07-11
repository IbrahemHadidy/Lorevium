import type { QuestionType } from '@/lib/enums/question-type';
import type { Question } from '../models/question';

//------------------------ REQUESTS -------------------------//

export interface CreateQuestionRequest {
  data: {
    text: string;
    type: QuestionType;
    options?: string[];
    correctAnswer: string;
    points: number;
    exam: string;
  };
}

export interface UpdateQuestionRequest {
  _id: string;
  data: {
    text?: string;
    type?: QuestionType;
    options?: string[];
    correctAnswer?: string;
    points?: number;
    exam?: string;
  };
}

export interface GetQuestionByIdRequest {
  _id: string;
}

export interface DeleteQuestionRequest {
  _id: string;
}

//------------------------ RESPONSES -------------------------//

export interface CreateQuestionResponse {
  message: string;
  success: boolean;
  data: Question;
}

export interface UpdateQuestionResponse {
  message: string;
  success: boolean;
  data: Question;
}

export interface GetAllQuestionsResponse {
  message: string;
  success: boolean;
  data: Question[];
}

export interface GetQuestionByIdResponse {
  message: string;
  success: boolean;
  data: Question;
}

export interface DeleteQuestionResponse {
  message: string;
  success: boolean;
}
