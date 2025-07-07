import { mainApi } from '../main-api';

export const studentExamApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    startExam: builder.mutation({
      query: ({ _id }) => ({
        url: `studentExam/start/${_id}`,
        method: 'POST',
      }),
    }),
    submitExam: builder.mutation({
      query: ({ _id, data }) => ({
        url: `studentExam/submit/${_id}`,
        method: 'POST',
        body: data,
      }),
    }),
    getRemainingTime: builder.query({
      query: ({ _id }) => ({
        url: `studentExam/exams/remaining-time/${_id}`,
        method: 'GET',
      }),
      keepUnusedDataFor: 0,
    }),
    getAllStudentScores: builder.query({
      query: ({ _id }) => ({
        url: `studentExam/exams/${_id}`,
        method: 'GET',
      }),
    }),
    getStudentScore: builder.query({
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
