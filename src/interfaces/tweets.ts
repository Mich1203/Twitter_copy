import { IUser } from "./auth";

export interface ITweet {
  _id: string;
  owner: IUser;
  content: string;
  created_date: Date;
  likes: IUser[];
  attachments: string[];
}

export interface IRetweet {
  _id: string;
  user: IUser;
  tweet: ITweet;
  created_date: Date;
}

export interface IAddTweetRequest {
  content: string;
}

export interface IUploadAttachmentRequest {
  tweetId: string;
  form: FormData;
}
