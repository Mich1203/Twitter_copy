export interface IUser {
  _id: string;
  email: string;
  name: string;
  username: string;
  phoneNumber: string | null;
  profileImg: string;
}

export interface IUserResponse {
  user: IUser;
  token: string;
}

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface IRegisterRequest {
  email: string;
  password: string;
  name: string;
}
