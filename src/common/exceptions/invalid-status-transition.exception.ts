import { BadRequestException } from '@nestjs/common';
import { TaskStatus } from '../../../prisma/generated/enums';
import { ALLOWED_TRANSITIONS } from '../../tasks/constants/transitions.constant';

export class InvalidStatusTransitionException extends BadRequestException {
  constructor(current: TaskStatus, attempted: TaskStatus) {
    super({
      message: `Invalid status transition from ${current} to ${attempted}`,
      error: 'INVALID_STATUS_TRANSITION',
      currentStatus: current,
      attemptedStatus: attempted,
      allowed: ALLOWED_TRANSITIONS[current] || [],
    });
  }
}
