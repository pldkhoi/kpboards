import {
  createUser,
  deleteUser,
  getUser,
  getUserByUserIdOrUsername,
  getUserList,
  updateUser,
  updateUserProfile,
} from '@/services/user';
import { type GetListParamType } from '@/types/request-param/request-param-global';
import { type UpdateUserParamType } from '@/types/request-param/request-param-user';
import { type ReponseSuccessType, type ResponseErrorType } from '@/types/response/response';
import { type UserType } from '@/types/user';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { type AxiosError } from 'axios';

// ----------------------------------------------------------------------

export const KEY = {
  GET_USER: ['/api/user'],
  GET_USER_LIST: ['/api/user/search'],
  GET_USER_BY_ID_OR_USERNAME: ['api', 'user'],
};

// ----------------------------------------------------------------------

export const useGetUserList = (params: GetListParamType) =>
  useQuery<ReponseSuccessType<UserType[]>, AxiosError>({
    queryKey: [...KEY.GET_USER_LIST, params],
    queryFn: () => getUserList(params),
  });

export const useGetUser = (userName: string) =>
  useQuery<UserType | undefined, AxiosError>({
    queryKey: [...KEY.GET_USER, userName],
    queryFn: async () => (await getUser(userName)).data,
    enabled: Boolean(userName),
  });

export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();
  return useMutation<
    ReponseSuccessType<UserType>,
    AxiosError<ResponseErrorType>,
    UpdateUserParamType
  >({
    mutationFn: updateUserProfile,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: KEY.GET_USER });
    },
  });
};

export const useGetUserByUserIdOrUsername = (userIdOrUsername?: string) =>
  useQuery<UserType | undefined, AxiosError>({
    queryKey: [...KEY.GET_USER_BY_ID_OR_USERNAME, userIdOrUsername],
    queryFn: async () => (await getUserByUserIdOrUsername(userIdOrUsername as string)).data,
    enabled: !!userIdOrUsername,
  });

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation<
    ReponseSuccessType<UserType>,
    AxiosError<ResponseErrorType>,
    UpdateUserParamType
  >({
    mutationFn: createUser,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: KEY.GET_USER });
      void queryClient.invalidateQueries({ queryKey: KEY.GET_USER_LIST });
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation<
    ReponseSuccessType<UserType>,
    AxiosError<ResponseErrorType>,
    UpdateUserParamType
  >({
    mutationFn: updateUser,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: KEY.GET_USER });
      void queryClient.invalidateQueries({ queryKey: KEY.GET_USER_LIST });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation<ReponseSuccessType<string>, AxiosError<ResponseErrorType>, string>({
    mutationFn: deleteUser,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: KEY.GET_USER });
      void queryClient.invalidateQueries({ queryKey: KEY.GET_USER_LIST });
    },
  });
};
