import { SetMetadata } from '@nestjs/common';

export enum RoleEnum {
  admin = 'admin',
  user = 'user',
}

export const Role = (...role: RoleEnum[]) => SetMetadata('role', role);
