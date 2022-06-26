import { apiSlice } from ".";
import { ApiResponse } from "../interfaces/general";
import {
  IAddTweetRequest,
  ITweet,
  IUploadAttachmentRequest,
} from "../interfaces/tweets";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTweets: builder.query<ApiResponse<ITweet[]>, void>({
      query: () => `tweets`,
      providesTags: ["Tweets"],
    }),
    addTweet: builder.mutation<ApiResponse<ITweet>, IAddTweetRequest>({
      query: (body) => ({
        url: "tweets",
        method: "POST",
        body,
      }),
      // invalidatesTags: ["Tweets"],
    }),
    uploadAttachment: builder.mutation<
      ApiResponse<string[]>,
      IUploadAttachmentRequest
    >({
      query: (body) => ({
        url: `tweets/${body.tweetId}/files`,
        method: "POST",
        body: body.form,
      }),
      invalidatesTags: ["Tweets"],
    }),
  }),
});

export const {
  useGetTweetsQuery,
  useAddTweetMutation,
  useUploadAttachmentMutation,
} = authApiSlice;
