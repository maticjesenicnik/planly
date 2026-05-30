import { capitalize } from '../utils/string.utils';

export const ErrorMessages = {
  NOT_FOUND: (entity: string, id: string, field: string = 'id') =>
    `${capitalize(entity)} with ${field} ${id} not found`,
  ALREADY_EXISTS: (entity: string, field: string, value: string) =>
    `${capitalize(entity)} with ${field} "${value}" already exists`,
} as const;

export const ValidationMessages = {
  PROPERTY_REQUIRED: (property: string) =>
    `${capitalize(property)} is required`,
};
