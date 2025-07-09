import type {
  CreateLessonRequest,
  CreateLessonResponse,
  DeleteLessonRequest,
  DeleteLessonResponse,
  GetLessonByIdRequest,
  GetLessonByIdResponse,
  GetPaginatedLessonsRequest,
  GetPaginatedLessonsResponse,
  GetPurchasedLessonsResponse,
  PayLessonRequest,
  PayLessonResponse,
  UpdateLessonRequest,
  UpdateLessonResponse,
} from '@/lib/types/api/lesson';
import { mainApi } from '../main-api';

export const lessonApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * Creates a new lesson.
     * @access `Admin` only.
     * @param data - The lesson data to be added.
     * @returns The added lesson data and success status.
     */
    createLesson: builder.mutation<CreateLessonResponse, CreateLessonRequest>({
      query: ({ data }) => ({
        url: 'lesson',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [{ type: 'Lesson', id: 'LIST' }],
    }),

    /**
     * Updates an existing lesson.
     * @access `Admin` only.
     * @param _id - The ID of the lesson to update.
     * @param data - The updated lesson data.
     * @returns The updated lesson data and success status.
     */
    updateLesson: builder.mutation<UpdateLessonResponse, UpdateLessonRequest>({
      query: ({ _id, data }) => ({
        url: `lesson/${_id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (_result, _error, { _id }) => [{ type: 'Lesson', id: _id }],
    }),

    /**
     * Retrieves paginated lessons.
     * @description This query fetches a list of lessons with pagination and sorting options.
     * @access `Admin` and `User`.
     * @param page - The page number for pagination.
     * @param limit - The number of items per page.
     * @param sortBy - The field to sort by.
     * @param sortOrder - The sort order (`asc` or `desc`).
     * @returns An array of lesson data, pagination data and success status.
     */
    getPaginatedLessons: builder.query<GetPaginatedLessonsResponse, GetPaginatedLessonsRequest>({
      query: ({ page, limit, sortBy, sortOrder }) => ({
        url: 'lesson',
        method: 'GET',
        params: { page, limit, sortBy, sortOrder },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ _id }) => ({ type: 'Lesson' as const, id: _id })),
              { type: 'Lesson', id: 'LIST' },
            ]
          : [{ type: 'Lesson', id: 'LIST' }],
    }),

    /**
     * Retrieves all purchased lessons for the current user.
     * @access `Admin` and `User`.
     * @returns An array of lesson data and success status.
     */
    getPurchasedLessons: builder.query<GetPurchasedLessonsResponse, void>({
      query: () => ({
        url: 'lesson/my/purchased',
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ _id }) => ({ type: 'Lesson' as const, id: _id })),
              { type: 'Lesson', id: 'LIST' },
            ]
          : [{ type: 'Lesson', id: 'LIST' }],
    }),

    /**
     * Retrieves a specific lesson by its ID.
     * @access `Admin` and `User`.
     * @param _id - The ID of the lesson.
     * @returns The lesson data and success status.
     */
    getLessonById: builder.query<GetLessonByIdResponse, GetLessonByIdRequest>({
      query: ({ _id }) => `lessons/${_id}`,
      providesTags: (_result, _error, { _id }) => [{ type: 'Lesson', id: _id }],
    }),

    /**
     * Deletes a lesson by ID.
     * @access `Admin` only.
     * @param _id - The ID of the lesson to delete.
     * @returns A response indicating success or failure.
     */
    deleteLesson: builder.mutation<DeleteLessonResponse, DeleteLessonRequest>({
      query: ({ _id }) => ({
        url: `lesson/${_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, { _id }) => [
        { type: 'Lesson', id: _id },
        { type: 'Lesson', id: 'LIST' },
      ],
    }),

    /**
     * Marks a lesson as paid.
     * @access `Admin` and `User`.
     * @param _id - The ID of the lesson to pay for.
     * @returns A response indicating payment success.
     */
    payLesson: builder.mutation<PayLessonResponse, PayLessonRequest>({
      query: ({ _id }) => ({
        url: `lesson/pay/${_id}`,
        method: 'POST',
      }),
      invalidatesTags: (_result, _error, { _id }) => [{ type: 'Lesson', id: _id }],
    }),
  }),
});

export const {
  useCreateLessonMutation,
  useUpdateLessonMutation,
  useGetPaginatedLessonsQuery,
  useLazyGetPaginatedLessonsQuery,
  useGetPurchasedLessonsQuery,
  useLazyGetPurchasedLessonsQuery,
  useGetLessonByIdQuery,
  useLazyGetLessonByIdQuery,
  useDeleteLessonMutation,
  usePayLessonMutation,
} = lessonApi;
