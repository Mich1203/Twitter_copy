import { IUser } from "./auth";
import { ITweet } from "./tweets";

export interface ApiResponse<T> {
  error: boolean;
  message: string;
  body: T;
}

export interface ISearchTermResponse {
  users: IUser[];
  tweets: ITweet[];
}
