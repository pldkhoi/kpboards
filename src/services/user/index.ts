import { env } from '@/env';
import * as endpoints from '@/services/user/endpoints';
import type { GetListParamType } from '@/types/request-param/request-param-global';
import type { UpdateUserParamType } from '@/types/request-param/request-param-user';
import type { ReponseSuccessType } from '@/types/response/response';
import type { UserType } from '@/types/user';
import { sendDelete, sendGet, sendPost, sendPut } from '@/utils/axios';

const USER_SUCCESS_DELAY = 180;

const MOCK_USERS: UserType[] = [
  {
    id: 'user-demo-admin',
    username: 'demo.user',
    firstName: 'Demo',
    lastName: 'User',
    email: 'demo.user@example.com',
    isAdmin: true,
    companyName: 'KP Boards',
    phoneNumber: '0901430110',
    thumbnailAvatarUrl: '',
  },
  {
    id: 'user-khoi',
    username: 'phamledangkhoi',
    firstName: 'Pham Le Dang',
    lastName: 'Khoi',
    email: 'pldkhoi@gmail.com',
    isAdmin: true,
    companyName: 'KP Boards',
    phoneNumber: '0901430110',
    thumbnailAvatarUrl: '',
  },
];

function mockResponse<T>(payload: T): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(payload), USER_SUCCESS_DELAY);
  });
}

function isMockModeEnabled(): boolean {
  return import.meta.env.DEV && env.VITE_AUTH_MOCK_MODE;
}

function filterUsers(searchKey: string): UserType[] {
  const normalizedSearch = searchKey.trim().toLowerCase();

  if (!normalizedSearch) {
    return MOCK_USERS;
  }

  return MOCK_USERS.filter((user) =>
    [user.username, user.firstName, user.lastName, user.email]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()
      .includes(normalizedSearch)
  );
}

export async function getUserList(
  params: GetListParamType
): Promise<ReponseSuccessType<UserType[]>> {
  if (isMockModeEnabled()) {
    const filteredUsers = filterUsers(params.searchKey);

    return mockResponse({
      code: 200,
      message: 'Mock users loaded',
      data: filteredUsers,
      totalRecords: filteredUsers.length,
    });
  }

  return sendGet<ReponseSuccessType<UserType[]>>(endpoints.GET_USER_LIST, { params });
}

export async function getUser(userName: string): Promise<ReponseSuccessType<UserType>> {
  if (isMockModeEnabled()) {
    const match =
      MOCK_USERS.find((user) => user.username === userName) ??
      MOCK_USERS.find((user) => user.username === 'demo.user') ??
      MOCK_USERS[0];

    return mockResponse({
      code: 200,
      message: 'Mock user loaded',
      data: match,
    });
  }

  return sendGet<ReponseSuccessType<UserType>>(
    `${endpoints.GET_USER}/${encodeURIComponent(userName)}`
  );
}

export async function getUserByUserIdOrUsername(
  userIdOrUsername: string
): Promise<ReponseSuccessType<UserType>> {
  if (isMockModeEnabled()) {
    const match =
      MOCK_USERS.find(
        (user) => user.id === userIdOrUsername || user.username === userIdOrUsername
      ) ?? MOCK_USERS[0];

    return mockResponse({
      code: 200,
      message: 'Mock user loaded',
      data: match,
    });
  }

  return sendGet<ReponseSuccessType<UserType>>(
    `${endpoints.GET_USER_BY_ID_OR_USERNAME}/${encodeURIComponent(userIdOrUsername)}`
  );
}

export function createUser(params: UpdateUserParamType): Promise<ReponseSuccessType<UserType>> {
  if (isMockModeEnabled()) {
    const user: UserType = {
      id: `mock-${params.username ?? 'user'}`,
      username: params.username ?? 'user',
      firstName: params.firstName,
      lastName: params.lastName,
      isAdmin: false,
    };

    return mockResponse({
      code: 200,
      message: 'Mock user created',
      data: user,
    });
  }

  return sendPost<ReponseSuccessType<UserType>>(endpoints.CREATE_USER, params);
}

export function updateUser(params: UpdateUserParamType): Promise<ReponseSuccessType<UserType>> {
  if (isMockModeEnabled()) {
    const user: UserType = {
      id: `mock-${params.username ?? 'user'}`,
      username: params.username ?? 'user',
      firstName: params.firstName,
      lastName: params.lastName,
      isAdmin: false,
    };

    return mockResponse({
      code: 200,
      message: 'Mock user updated',
      data: user,
    });
  }

  return sendPut<ReponseSuccessType<UserType>>(endpoints.UPDATE_USER, params);
}

export function updateUserProfile(
  params: UpdateUserParamType
): Promise<ReponseSuccessType<UserType>> {
  if (isMockModeEnabled()) {
    const existingUser =
      MOCK_USERS.find((user) => user.username === params.username) ?? MOCK_USERS[0];

    return mockResponse({
      code: 200,
      message: 'Mock profile updated',
      data: {
        ...existingUser,
        ...params,
      },
    });
  }

  return sendPut<ReponseSuccessType<UserType>>(endpoints.UPDATE_USER_PROFILE, params);
}

export function deleteUser(userId: string): Promise<ReponseSuccessType<string>> {
  if (isMockModeEnabled()) {
    return mockResponse({
      code: 200,
      message: 'Mock user deleted',
      data: userId,
    });
  }

  return sendDelete<ReponseSuccessType<string>>(
    `${endpoints.DELETE_USER}/${encodeURIComponent(userId)}`
  );
}
