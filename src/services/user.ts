import { apiSlice } from ".";
import { IUser } from "../interfaces/auth";
import { ApiResponse } from "../interfaces/general";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFollowing: builder.query<ApiResponse<IUser[]>, string | undefined>({
      query: (userId?) => {
        const url = "user/following" + (!userId ? "" : `/${userId}`);
        return url;
      },
      providesTags: ["Following"],
    }),
    followUser: builder.mutation<ApiResponse<any>, string>({
      query: (userId) => ({
        url: `user/follow/${userId}`,
        method: "POST",
      }),
      invalidatesTags: ["Following"],
    }),
  }),
});

export const { useGetFollowingQuery, useFollowUserMutation } = userApiSlice;
