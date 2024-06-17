import { Prisma } from '@prisma/client';

export interface FindOrCreateDto
  extends Pick<Prisma.usersCreateInput, 'clerkUserId'> {}
