import { mainApi } from '../main-api';

export const questionApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    createQuestion: builder.mutation({
      query: ({ data }) => ({
        url: 'question',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [{ type: 'Question', id: 'LIST' }],
    }),
    updateQuestion: builder.mutation({
      query: ({ _id, data }) => ({
        url: `question/${_id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (_result, _error, { _id }) => [
        { type: 'Question', id: 'LIST' },
        { type: 'Question', id: _id },
      ],
    }),
    getAllQuestions: builder.query({
      query: () => ({
        url: 'question',
        method: 'GET',
      }),
      providesTags: (result) =>
        result?.data
          ? [
              { type: 'Question', id: 'LIST' },
              ...result.data.map((q) => ({ type: 'Question', id: q._id })),
            ]
          : [{ type: 'Question', id: 'LIST' }],
    }),
    getQuestionById: builder.query({
      query: ({ _id }) => ({
        url: `question/get/${_id}`,
        method: 'GET',
      }),
      providesTags: (_result, _error, { _id }) => [{ type: 'Question', id: _id }],
    }),
    deleteQuestion: builder.mutation({
      query: ({ _id }) => ({
        url: `question/${_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, { _id }) => [
        { type: 'Question', id: 'LIST' },
        { type: 'Question', id: _id },
      ],
    }),
  }),
});

export const {
  useCreateQuestionMutation,
  useUpdateQuestionMutation,
  useGetAllQuestionsQuery,
  useLazyGetAllQuestionsQuery,
  useGetQuestionByIdQuery,
  useLazyGetQuestionByIdQuery,
  useDeleteQuestionMutation,
} = questionApi;
