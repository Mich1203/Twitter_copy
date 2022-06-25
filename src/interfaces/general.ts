export interface ApiResponse<T> {
  error: boolean;
  message: string;
  body: T;
}
