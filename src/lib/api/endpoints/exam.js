import { mainApi } from '../main-api';

export const examApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    createExam: builder.mutation({
      query: ({ data }) => ({
        url: 'exam',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [{ type: 'Exam', id: 'LIST' }],
    }),
    updateExam: builder.mutation({
      query: ({ _id, data }) => ({
        url: `exam/${_id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (_result, _error, { _id }) => [
        { type: 'Exam', id: _id },
        { type: 'Exam', id: 'LIST' },
      ],
    }),
    getAllExams: builder.query({
      query: () => ({
        url: 'exam',
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map((exam) => ({ type: 'Exam', id: exam._id })),
              { type: 'Exam', id: 'LIST' },
            ]
          : [{ type: 'Exam', id: 'LIST' }],
    }),
    getExamById: builder.query({
      query: ({ _id }) => ({
        url: `exam/get/${_id}`,
      }),
      providesTags: (_result, _error, { _id }) => [{ type: 'Exam', id: _id }],
    }),
    deleteExam: builder.mutation({
      query: ({ _id }) => ({
        url: `exam/${_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, { _id }) => [
        { type: 'Exam', id: _id },
        { type: 'Exam', id: 'LIST' },
      ],
    }),
  }),
});

export const {
  useCreateExamMutation,
  useUpdateExamMutation,
  useGetAllExamsQuery,
  useLazyGetAllExamsQuery,
  useGetExamByIdQuery,
  useLazyGetExamByIdQuery,
  useDeleteExamMutation,
} = examApi;
