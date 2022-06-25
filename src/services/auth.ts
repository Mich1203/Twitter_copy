import { apiSlice } from ".";
import {
  IUserResponse,
  ILoginRequest,
  IRegisterRequest,
} from "../interfaces/auth";
import { ApiResponse } from "../interfaces/general";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<ApiResponse<IUserResponse>, ILoginRequest>({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),
    register: builder.mutation<ApiResponse<IUserResponse>, IRegisterRequest>({
      query: (body) => ({
        url: "auth/register",
        method: "POST",
        body,
      }),
    }),
    protected: builder.mutation<{ message: string }, void>({
      query: () => "protected",
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useProtectedMutation } =
  authApiSlice;
