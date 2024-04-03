import { Prisma, users } from '@prisma/client';
import { serverApi } from './server.api';
import { User } from '@clerk/clerk-sdk-node';

const usersApi = serverApi.injectEndpoints({
  endpoints: (build) => ({
    findOrCreateUser: build.mutation<
      users,
      Pick<Prisma.usersCreateInput, 'clerkUserId'>
    >({
      query: (body) => ({
        url: 'users/find-or-create',
        body,
        method: 'POST',
      }),
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
