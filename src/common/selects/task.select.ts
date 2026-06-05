import { Prisma } from '../../../prisma/generated/client';

export const taskFullSelect: Prisma.TaskSelect = {
  id: true,
  title: true,
  description: true,
  status: true,
  priority: true,
  dueDate: true,
  projectId: true,
  assigneeId: true,
  reporterId: true,
  parentId: true,
};
