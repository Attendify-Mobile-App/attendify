import { baseApi } from '@/store/api/baseApi';

export type Role = 'TEACHER' | 'STUDENT' | 'ADMIN';

export type User = {
  id: string;
  username: string;
  role: Role;
  createdAt: string;
};

export type LoginRequest = {
  username: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
  user: User;
};

export type SignupRequest = {
  username: string;
  password: string;
  role?: Role;
};

export type ResetPasswordRequest = {
  username: string;
  password: string;
  newPassword: string;
};

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Auth'],
    }),

    signup: builder.mutation<User, SignupRequest>({
      query: (body) => ({
        url: '/auth/signup',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Auth'],
    }),

    resetPassword: builder.mutation<User, ResetPasswordRequest>({
      query: (body) => ({
        url: '/auth/reset-password',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Auth'],
    }),
  }),
  overrideExisting: false,
});

export const { useLoginMutation, useSignupMutation, useResetPasswordMutation } = authApi;
