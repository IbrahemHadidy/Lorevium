import type {
  CreateExamRequest,
  CreateExamResponse,
  DeleteExamRequest,
  DeleteExamResponse,
  GetAllExamsResponse,
  GetExamByIdRequest,
  GetExamByIdResponse,
  UpdateExamRequest,
  UpdateExamResponse,
} from '@/lib/types/api/exam';
import { mainApi } from '../main-api';

export const examApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * Creates a new exam.
     * @access `Admin` only.
     * @param data - The exam data to be added.
     * @returns The added exam data and success status.
     */
    createExam: builder.mutation<CreateExamResponse, CreateExamRequest>({
      query: ({ data }) => ({
        url: 'exam',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [{ type: 'Exam', id: 'LIST' }],
    }),

    /**
     * Updates an existing exam.
     * @access `Admin` only.
     * @param _id - The ID of the exam to update.
     * @param data - The updated exam data.
     * @returns The updated exam data and success status.
     */
    updateExam: builder.mutation<UpdateExamResponse, UpdateExamRequest>({
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

    /**
     * Gets all exams.
     * @access `Admin` only.
     * @returns An array of all exams.
     */
    getAllExams: builder.query<GetAllExamsResponse, void>({
      query: () => ({
        url: 'exam',
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map((exam) => ({ type: 'Exam' as const, id: exam._id })),
              { type: 'Exam', id: 'LIST' },
            ]
          : [{ type: 'Exam', id: 'LIST' }],
    }),

    /**
     * Gets an exam by its ID.
     * @access `Admin` and `User`.
     * @param _id - The ID of the exam to retrieve.
     * @returns The retrieved exam data.
     */
    getExamById: builder.query<GetExamByIdResponse, GetExamByIdRequest>({
      query: ({ _id }) => ({
        url: `exam/get/${_id}`,
      }),
      providesTags: (_result, _error, { _id }) => [{ type: 'Exam', id: _id }],
    }),

    /**
     * Deletes an exam by its ID.
     * @access `Admin` only.
     * @param _id - The ID of the exam to delete.
     * @returns The success status.
     */
    deleteExam: builder.mutation<DeleteExamResponse, DeleteExamRequest>({
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
