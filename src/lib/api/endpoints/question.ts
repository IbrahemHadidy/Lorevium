import type {
  CreateQuestionRequest,
  CreateQuestionResponse,
  DeleteQuestionRequest,
  DeleteQuestionResponse,
  GetAllQuestionsResponse,
  GetQuestionByIdRequest,
  GetQuestionByIdResponse,
  UpdateQuestionRequest,
  UpdateQuestionResponse,
} from '@/lib/types/api/question';
import { mainApi } from '../main-api';

export const questionApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * Creates a new question.
     * @access `Admin` only.
     * @param data - The question data to be added.
     * @returns The added question data and success status.
     */
    createQuestion: builder.mutation<CreateQuestionResponse, CreateQuestionRequest>({
      query: ({ data }) => ({
        url: 'question',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [{ type: 'Question', id: 'LIST' }],
    }),

    /**
     * Updates an existing question.
     * @access `Admin` only.
     * @param _id - The ID of the question to update.
     * @param data - The updated question data.
     * @returns The updated question data and success status.
     */
    updateQuestion: builder.mutation<UpdateQuestionResponse, UpdateQuestionRequest>({
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

    /**
     * Gets all questions.
     * @access `Admin` only.
     * @returns An array of all questions.
     */
    getAllQuestions: builder.query<GetAllQuestionsResponse, void>({
      query: () => ({
        url: 'question',
        method: 'GET',
      }),
      providesTags: (result) =>
        result?.data
          ? [
              { type: 'Question', id: 'LIST' },
              ...result.data.map((q) => ({ type: 'Question' as const, id: q._id })),
            ]
          : [{ type: 'Question', id: 'LIST' }],
    }),

    /**
     * Gets a question by its ID.
     * @access `Admin` and `User`.
     * @param _id - The ID of the question to retrieve.
     * @returns The retrieved question data.
     */
    getQuestionById: builder.query<GetQuestionByIdResponse, GetQuestionByIdRequest>({
      query: ({ _id }) => ({
        url: `question/get/${_id}`,
        method: 'GET',
      }),
      providesTags: (_result, _error, { _id }) => [{ type: 'Question', id: _id }],
    }),

    /**
     * Deletes a question by its ID.
     * @access `Admin` only.
     * @param _id - The ID of the question to delete.
     * @returns The success status.
     */
    deleteQuestion: builder.mutation<DeleteQuestionResponse, DeleteQuestionRequest>({
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
