import { Injectable, CanActivate, ExecutionContext, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
    private readonly logger = new Logger(RolesGuard.name);

    constructor(private readonly reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
            context.getHandler(),
            context.getClass(),
        ]);

        this.logger.debug('Required Roles:', requiredRoles);

        if (!requiredRoles) {
            return true; // Permitir el acceso si no se especifican roles
        }

        const { user } = context.switchToHttp().getRequest();
        this.logger.debug('User Roles:', user.roles);

        return requiredRoles.some((role) => user.roles?.includes(role));
    }
}

