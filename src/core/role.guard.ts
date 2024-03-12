import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const role = this.reflector.get<string[]>('role', context.getHandler());
    if (!role || role.length === 0) {
      return true;
    }

    try {
      const { user } = context.switchToHttp().getRequest();

      return user.role === role;
    } catch {
      return false;
    }
  }
}
