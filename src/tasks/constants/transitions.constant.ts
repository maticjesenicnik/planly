import { TaskStatus } from '../../../prisma/generated/enums';

export const ALLOWED_TRANSITIONS = {
  TODO: ['IN_PROGRESS', 'DONE', 'CANCELLED'],
  IN_PROGRESS: ['TODO', 'REVIEW', 'DONE', 'CANCELLED'],
  REVIEW: ['IN_PROGRESS', 'DONE', 'CANCELLED'],
  DONE: ['TODO'],
  CANCELLED: ['TODO'],
};

export const isTaskTransitionAllowed = (
  from: TaskStatus,
  to: TaskStatus,
): boolean => {
  return ALLOWED_TRANSITIONS[from]?.includes(to) ?? false;
};
