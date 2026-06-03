import { userFullSelect } from './user.select';

export const projectMemberFullSelect = {
  id: true,
  projectId: true,
  user: { select: userFullSelect },
};
