import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './role.enum';
import { ROLES_KEY } from './roles.decorator';
import { findUserRole } from 'src/helperFunctions';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles || requiredRoles.length < 1) {
      return true;
    }
    const { userid } = context.switchToHttp().getRequest().headers;
    const userRole = findUserRole(userid);
    if (userRole) {
      const userRoleCheck = userRole as Role;
      return requiredRoles.includes(userRoleCheck);
    }
    return false;
  }
}
