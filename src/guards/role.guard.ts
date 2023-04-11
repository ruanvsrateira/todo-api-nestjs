import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "src/decorators/roles.decorator";

@Injectable()
export class RoleGuard implements CanActivate {

    constructor(private readonly reflector: Reflector) {}

    async canActivate(context: ExecutionContext) {
        
        const { user } = context.switchToHttp().getRequest()

        const requiredRoles = this.reflector.getAllAndOverride(ROLES_KEY, [context.getHandler(), context.getClass()])

        if(!requiredRoles) return true;

        return requiredRoles.filter(role => role === user.role).length > 0
    }

}