import { capitalize } from '../utils/string.utils';

export const ErrorMessages = {
  NOT_FOUND: (entity: string, id: string) =>
    `${capitalize(entity)} with id ${id} not found`,
  ALREADY_EXISTS: (entity: string, field: string, value: string) =>
    `${capitalize(entity)} with ${field} "${value} already exists`,
} as const;
