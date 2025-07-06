import type {
  StartStudentExamRequest,
  StartStudentExamResponse,
  SubmitStudentExamRequest,
  SubmitStudentExamResponse,
  GetRemainingTimeResponse,
  GetRemainingTimeRequest,
  GetAllStudentScoresResponse,
  GetAllStudentScoresRequest,
  GetStudentScoreResponse,
  GetStudentScoreRequest,
} from '@/lib/types/api/student-exam';
import { mainApi } from '../main-api';

export const studentExamApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * Starts a student exam (creates or resumes it).
     * @access `Admin` and `User`.
     * @param _id - The ID of the exam to start.
     * @returns The created or resumed student exam session.
     */
    startExam: builder.mutation<StartStudentExamResponse, StartStudentExamRequest>({
      query: ({ _id }) => ({
        url: `studentExam/start/${_id}`,
        method: 'POST',
      }),
    }),

    /**
     * Submits a student's completed exam.
     * @access `Admin` and `User`.
     * @param _id - The ID of the student exam to submit.
     * @param data - The answers and submission data.
     * @returns The result and score of the submitted exam.
     */
    submitExam: builder.mutation<SubmitStudentExamResponse, SubmitStudentExamRequest>({
      query: ({ _id, data }) => ({
        url: `studentExam/submit/${_id}`,
        method: 'POST',
        body: data,
      }),
    }),

    /**
     * Retrieves the remaining time for an ongoing exam.
     * @access `Admin` and `User`.
     * @param _id - The ID of the student exam.
     * @returns Time left before the exam auto-submits.
     */
    getRemainingTime: builder.query<GetRemainingTimeResponse, GetRemainingTimeRequest>({
      query: ({ _id }) => ({
        url: `studentExam/exams/remaining-time/${_id}`,
        method: 'GET',
      }),
      keepUnusedDataFor: 0,
    }),

    /**
     * Gets all student scores for a specific exam.
     * @access `Admin` only.
     * @param _id - The exam ID to get student scores for.
     * @returns An array of student scores.
     */
    getAllStudentScores: builder.query<GetAllStudentScoresResponse, GetAllStudentScoresRequest>({
      query: ({ _id }) => ({
        url: `studentExam/exams/${_id}`,
        method: 'GET',
      }),
    }),

    /**
     * Gets the current student's score for a specific exam.
     * @access `Admin` and `User`.
     * @param _id - The exam ID.
     * @returns The student's score for that exam.
     */
    getStudentScore: builder.query<GetStudentScoreResponse, GetStudentScoreRequest>({
      query: ({ _id }) => ({
        url: `studentExam/exams/score/${_id}`,
        method: 'GET',
      }),
    }),
  }),
});


export const {
  useStartExamMutation,
  useSubmitExamMutation,
  useGetRemainingTimeQuery,
  useLazyGetRemainingTimeQuery,
  useGetAllStudentScoresQuery,
  useLazyGetAllStudentScoresQuery,
  useGetStudentScoreQuery,
  useLazyGetStudentScoreQuery,
} = studentExamApi;
