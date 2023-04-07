import { Controller, Post, Get, Body, Headers } from '@nestjs/common';
import { AuthLoginDTO } from './dto/auth-login.dto';
import { AuthService } from './auth.service';

@Controller("auth")
export class AuthController { 
    
    constructor(private readonly authService: AuthService) {}

    @Post("login")
    async login(@Body() data: AuthLoginDTO) {
        return this.authService.login(data);
    }

    @Get("me")
    async me(@Headers("authorization") token: string) {
        return this.authService.validateToken(token)
    }

}
