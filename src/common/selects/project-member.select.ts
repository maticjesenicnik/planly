import { Prisma } from '../../../prisma/generated/client';
import { userFullSelect } from './user.select';

export const projectMemberFullSelect: Prisma.ProjectMemberSelect = {
  id: true,
  projectId: true,
  user: { select: userFullSelect },
};
