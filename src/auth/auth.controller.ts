import { Controller, Post, Get, Body, Headers, UseGuards, Req } from '@nestjs/common';
import { AuthLoginDTO } from './dto/auth-login.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { User } from 'src/decorators/user.decorator';

@Controller("auth")
export class AuthController { 
    
    constructor(private readonly authService: AuthService) {}

    @Post("login")
    async login(@Body() data: AuthLoginDTO) {
        return this.authService.login(data);
    }

    @UseGuards(AuthGuard)
    @Get("me")
    async me(@User("password") user) { 

        return {
            msg: "ok", user
        }
    }

}
