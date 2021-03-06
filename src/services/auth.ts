import { apiSlice } from ".";
import {
  IUserResponse,
  ILoginRequest,
  IRegisterRequest,
  IUser,
} from "../interfaces/auth";
import { ApiResponse } from "../interfaces/general";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<ApiResponse<IUser>, void>({
      query: () => "auth/profile",
      providesTags: ["User"],
    }),
    updateProfile: builder.mutation<ApiResponse<IUser>, IUser>({
      query: (user) => ({
        url: "auth/profile",
        method: "PUT",
        body: user,
      }),
      invalidatesTags: ["User"],
    }),
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

export const {
  useLazyGetProfileQuery,
  useLoginMutation,
  useUpdateProfileMutation,
  useRegisterMutation,
  useProtectedMutation,
} = authApiSlice;
