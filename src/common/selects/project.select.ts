import { Prisma } from '../../../prisma/generated/client';

export const projectFullSelect: Prisma.ProjectSelect = {
  id: true,
  name: true,
  description: true,
  key: true,
  ownerId: true,
};
