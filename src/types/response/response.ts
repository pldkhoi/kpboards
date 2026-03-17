export type ReponseSuccessType<T> = {
  code?: number;
  data?: T;
  message?: string;
  totalRecords?: number;
};

export type ResponseErrorType = {
  message?: string;
};
