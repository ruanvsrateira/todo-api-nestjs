import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "src/auth/auth.service";
import { UserService } from "src/user/user.service";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService
    ) {}

    async canActivate(context: ExecutionContext) {

        const request = await context.switchToHttp().getRequest()
        const { authorization } = request.headers;
        try {
            const tokenPayload = await this.authService.validateToken(authorization)
            const user = await this.userService.findOne(tokenPayload.userId)

            request.user = user;

            return true;
        }
        catch(e) {
            return false;
        }
    }

}