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
  }),
  overrideExisting: false,
});

export const { useLoginMutation, useSignupMutation } = authApi;
