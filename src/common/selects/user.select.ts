import { Prisma } from '../../../prisma/generated/client';

export const userFullSelect: Prisma.UserSelect = {
  id: true,
  email: true,
  name: true,
  username: true,
};
