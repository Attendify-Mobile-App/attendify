import { baseApi } from '@/store/api/baseApi';
import type { AttendanceMark, AttendanceStatus } from '@/types/attendance';

export type MarkAttendanceRequest = {
  classId: string;
  studentId: string;
  date: string;
  status: AttendanceStatus;
};

export type AttendanceMarksQuery = {
  classId: string;
  startDate: string;
  endDate: string;
};

export type DailySummaryResponse = {
  date: string;
  totals: { boys: number; girls: number; total: number };
};

export type WeeklySummaryResponse = {
  week: number;
  range: { startDate: string; endDate: string };
  totals: { boys: number; girls: number; total: number };
};

export type MonthlySummaryResponse = {
  month: number;
  totals: { boys: number; girls: number; total: number };
  schoolDays: number;
  studentTotals: {
    studentId: string;
    name: string;
    admissionNo: string;
    studentNo: string;
    gender: string;
    totalPresent: number;
  }[];
  averages: { boys: number; girls: number; total: number };
};

export type YearlySummaryResponse = {
  year: number;
  studentTotals: {
    studentId: string;
    name: string;
    admissionNo: string;
    studentNo: string;
    gender: string;
    totalPresent: number;
  }[];
};

export const attendanceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAttendanceMarks: builder.query<AttendanceMark[], AttendanceMarksQuery>({
      query: ({ classId, startDate, endDate }) => ({
        url: '/attendance/marks',
        params: { classId, startDate, endDate },
      }),
      providesTags: (result, error, arg) => [{ type: 'Attendance', id: arg.classId }],
    }),
    markAttendance: builder.mutation<AttendanceMark, MarkAttendanceRequest>({
      query: ({ classId: _classId, ...body }) => ({
        url: '/attendance/mark',
        method: 'POST',
        body,
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Attendance', id: arg.classId }],
    }),
    getDailySummary: builder.query<DailySummaryResponse, { classId: string; date: string }>({
      query: ({ classId, date }) => ({
        url: '/attendance/summary/daily',
        params: { classId, date },
      }),
      providesTags: (result, error, arg) => [{ type: 'Attendance', id: arg.classId }],
    }),
    getWeeklySummary: builder.query<
      WeeklySummaryResponse,
      { classId: string; year: number; month: number; week: number }
    >({
      query: ({ classId, year, month, week }) => ({
        url: '/attendance/summary/weekly',
        params: { classId, year, month, week },
      }),
      providesTags: (result, error, arg) => [{ type: 'Attendance', id: arg.classId }],
    }),
    getMonthlySummary: builder.query<
      MonthlySummaryResponse,
      { classId: string; year: number; month: number }
    >({
      query: ({ classId, year, month }) => ({
        url: '/attendance/summary/monthly',
        params: { classId, year, month },
      }),
      providesTags: (result, error, arg) => [{ type: 'Attendance', id: arg.classId }],
    }),
    getYearlySummary: builder.query<YearlySummaryResponse, { classId: string; year: number }>({
      query: ({ classId, year }) => ({
        url: '/attendance/summary/yearly',
        params: { classId, year },
      }),
      providesTags: (result, error, arg) => [{ type: 'Attendance', id: arg.classId }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAttendanceMarksQuery,
  useMarkAttendanceMutation,
  useGetDailySummaryQuery,
  useGetWeeklySummaryQuery,
  useGetMonthlySummaryQuery,
  useGetYearlySummaryQuery,
} = attendanceApi;
