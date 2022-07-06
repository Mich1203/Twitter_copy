import { apiSlice } from ".";
import { ApiResponse } from "../interfaces/general";
import {
  IAddTweetRequest,
  IRetweet,
  ITweet,
  IUploadAttachmentRequest,
} from "../interfaces/tweets";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTweets: builder.query<
      ApiResponse<{ tweets: ITweet[]; retweets: IRetweet[] }>,
      string | undefined
    >({
      query: (type: string) => `tweets?type=${type ?? "all"}`,
      providesTags: ["Tweets"],
    }),
    addTweet: builder.mutation<ApiResponse<ITweet>, IAddTweetRequest>({
      query: (body) => ({
        url: "tweets",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Tweets"],
    }),
    uploadAttachment: builder.mutation<
      ApiResponse<ITweet>,
      IUploadAttachmentRequest
    >({
      query: (body) => ({
        url: `tweets/${body.tweetId}/files`,
        method: "POST",
        body: body.form,
      }),
      invalidatesTags: ["Tweets"],
    }),
    deleteTweet: builder.mutation<ApiResponse<void>, string>({
      query: (id) => ({
        url: "tweets",
        method: "DELETE",
        body: {
          _id: id,
        },
      }),
      invalidatesTags: ["Tweets"],
    }),
    toggleLike: builder.mutation<ApiResponse<void>, string>({
      query: (id) => ({
        url: `tweets/toggleLike/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Tweets"],
    }),
    toggleRetweet: builder.mutation<ApiResponse<IRetweet | void>, string>({
      query: (id) => ({
        url: `tweets/retweet/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["Tweets"],
    }),
  }),
});

export const {
  useGetTweetsQuery,
  useLazyGetTweetsQuery,
  useAddTweetMutation,
  useUploadAttachmentMutation,
  useToggleLikeMutation,
  useToggleRetweetMutation,
  useDeleteTweetMutation,
} = authApiSlice;
