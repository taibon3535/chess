import { Prisma, User } from '@prisma/client';
import { serverApi } from './server.api';

const usersApi = serverApi.injectEndpoints({
  endpoints: (build) => ({
    findOrCreateUser: build.mutation<
      User,
      Pick<Prisma.UserCreateInput, 'name'>
    >({
      query: (body) => ({ url: 'user/find-or-create', body, method: 'POST' }),
    }),

    findAllOtherUsers: build.query<User[], string | undefined>({
      query: (id) => ({
        url: 'users/find-all-other-users',
        params: { id },
        method: 'GET',
      }),
    }),
    findUserById: build.query<User, string | undefined>({
      query: (id) => ({
        url: 'users/find-user-by-id',
        params: { id },
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useFindOrCreateUserMutation,
  useFindAllOtherUsersQuery,
  useFindUserByIdQuery,
} = usersApi;
