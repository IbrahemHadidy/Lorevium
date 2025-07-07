import { mainApi } from '../main-api';

export const lessonApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    addLesson: builder.mutation({
      query: ({ lesson }) => ({
        url: 'lesson',
        method: 'POST',
        body: lesson,
      }),
      invalidatesTags: [{ type: 'Lesson', id: 'LIST' }],
    }),
    updateLesson: builder.mutation({
      query: ({ _id, data }) => ({
        url: `lesson/${_id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (_result, _error, { _id }) => [{ type: 'Lesson', id: _id }],
    }),
    getPaginatedLessons: builder.query({
      query: ({ page, limit, sortBy, sortOrder }) => ({
        url: 'lesson',
        method: 'GET',
        params: { page, limit, sortBy, sortOrder },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ _id }) => ({ type: 'Lesson', id: _id })),
              { type: 'Lesson', id: 'LIST' },
            ]
          : [{ type: 'Lesson', id: 'LIST' }],
    }),
    getPurchasedLessons: builder.query({
      query: () => ({
        url: 'lesson/my/purchased',
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ _id }) => ({ type: 'Lesson', id: _id })),
              { type: 'Lesson', id: 'LIST' },
            ]
          : [{ type: 'Lesson', id: 'LIST' }],
    }),
    getLessonById: builder.query({
      query: ({ _id }) => `lessons/${_id}`,
      providesTags: (_result, _error, { _id }) => [{ type: 'Lesson', id: _id }],
    }),
    deleteLesson: builder.mutation({
      query: ({ _id }) => ({
        url: `lesson/${_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, { _id }) => [
        { type: 'Lesson', id: _id },
        { type: 'Lesson', id: 'LIST' },
      ],
    }),
    payLesson: builder.mutation({
      query: ({ _id }) => ({
        url: `lesson/pay/${_id}`,
        method: 'POST',
      }),
      invalidatesTags: (_result, _error, { _id }) => [{ type: 'Lesson', id: _id }],
    }),
  }),
});

export const {
  useAddLessonMutation,
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
