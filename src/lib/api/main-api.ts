import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const mainApi = createApi({
  reducerPath: 'mainApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: (headers) => {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        if (token) headers.set('token', token);        
      }
      return headers;
    },
  }),
  tagTypes: ['Admin', 'User', 'Lesson', 'Exam', 'StudentExam', 'Question'],
  endpoints: () => ({}),
});
