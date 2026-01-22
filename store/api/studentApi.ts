import { baseApi } from '@/store/api/baseApi';
import type { Student } from '@/types/attendance';

export type CreateStudentRequest = {
  classId: string;
  admissionNo: string;
  studentNo: string;
  name: string;
  dateOfBirth: string;
  gender: Student['gender'];
};

export const studentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStudentsByClass: builder.query<Student[], string>({
      query: (classId) => `/classes/${classId}/students`,
      providesTags: (result, error, classId) => [{ type: 'Students', id: classId }],
    }),
    createStudent: builder.mutation<Student, CreateStudentRequest>({
      query: ({ classId, ...body }) => ({
        url: `/classes/${classId}/students`,
        method: 'POST',
        body,
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Students', id: arg.classId }],
    }),
  }),
  overrideExisting: false,
});

export const { useGetStudentsByClassQuery, useCreateStudentMutation } = studentApi;
