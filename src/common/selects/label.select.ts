import { Prisma } from '../../../prisma/generated/client';

export const labelFullSelect: Prisma.LabelSelect = {
  id: true,
  name: true,
  color: true,
  projectId: true,
};
