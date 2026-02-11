import { baseApi } from '@/store/api/baseApi';
import type { SchoolClass } from '@/types/attendance';

export type ClassFilters = {
  schoolName?: string;
  academicYear?: string;
  className?: string;
  division?: string;
};

export type CreateClassRequest = {
  schoolName: string;
  academicYear: string;
  className: string;
  division: string;
};

export type UpdateClassRequest = {
  id: string;
  schoolName?: string;
  academicYear?: string;
  className?: string;
  division?: string;
};

export const classApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getClasses: builder.query<SchoolClass[], ClassFilters | void>({
      query: (filters) => ({
        url: '/classes',
        params: filters ?? undefined,
      }),
      providesTags: ['Classes'],
    }),
    createClass: builder.mutation<SchoolClass, CreateClassRequest>({
      query: (body) => ({
        url: '/classes',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Classes'],
    }),
    updateClass: builder.mutation<SchoolClass, UpdateClassRequest>({
      query: ({ id, ...body }) => ({
        url: `/classes/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Classes'],
    }),
    deleteClass: builder.mutation<{ deleted: boolean }, { id: string }>({
      query: ({ id }) => ({
        url: `/classes/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Classes'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetClassesQuery,
  useCreateClassMutation,
  useUpdateClassMutation,
  useDeleteClassMutation,
} = classApi;
