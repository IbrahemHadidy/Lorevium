import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const mainApi = createApi({
  reducerPath: 'mainApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://edu-master-delta.vercel.app',
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
