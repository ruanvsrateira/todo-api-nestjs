import { Controller, Post, Get, Body, Headers, UseGuards, Req } from '@nestjs/common';
import { AuthLoginDTO } from './dto/auth-login.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller("auth")
export class AuthController { 
    
    constructor(private readonly authService: AuthService) {}

    @Post("login")
    async login(@Body() data: AuthLoginDTO) {
        return this.authService.login(data);
    }

    @UseGuards(AuthGuard)
    @Get("me")
    async me(@Req() request) {
        const { user } = request 

        return {
            msg: "ok", user
        }
    }

}
