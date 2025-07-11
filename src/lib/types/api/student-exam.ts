import type { Exam } from '../models/exam';
import type { StudentExam } from '../models/student-exam';

//------------------------ REQUESTS -------------------------//

export interface StartStudentExamRequest {
  _id: string;
}

export interface SubmitStudentExamRequest {
  _id: string;
  data: {
    answers: {
      questionId: string;
      selectedAnswer: string;
    }[];
  };
}

export interface GetRemainingTimeRequest {
  _id: string;
}

export interface GetAllStudentScoresRequest {
  _id: string;
}

export interface GetStudentScoreRequest {
  _id: string;
}

//------------------------ RESPONSES -------------------------//

export interface StartStudentExamResponse {
  message: string;
  success: boolean;
  data: {
    exam: Exam;
    startTime: string;
    endTime: string;
  };
}

export interface SubmitStudentExamResponse {
  message: string;
  success: boolean;
  data: {
    score: number;
    totalPoints: number;
  };
}

export interface GetRemainingTimeResponse {
  message: string;
  success: boolean;
  data: {
    remainingTime:
      | {
          minutes: number;
          seconds: number;
        }
      | 0;
  };
}

export interface GetAllStudentScoresResponse {
  message: string;
  success: boolean;
  data: StudentExam[];
}

export interface GetStudentScoreResponse {
  message: string;
  success: boolean;
  data: {
    _id: string;
    score: number;
  };
}
