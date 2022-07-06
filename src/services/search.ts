import { apiSlice } from ".";
import { ApiResponse, ISearchTermResponse } from "../interfaces/general";

export const searchApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    searchTerm: builder.query<ApiResponse<ISearchTermResponse>, string>({
      query: (term) => "search?q=" + term,
    }),
  }),
});

export const { useLazySearchTermQuery } = searchApiSlice;
