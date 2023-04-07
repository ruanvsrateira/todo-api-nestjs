import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthLoginDTO } from './dto/auth-login.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService { 

    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService    
    ) {}

    async login(data: AuthLoginDTO) {
        const user = await this.validateLoginInDatabase(data)

        return await this.createToken(user.id)
    }

    async validateLoginInDatabase({ email, password }: AuthLoginDTO) {
        const userExists = await this.prisma.user.findFirst({
            where: { email, password }
        })

        if(!userExists) {
            throw new BadRequestException("E-mail or password incorrect!")
        }

        return userExists
    }

    async createToken(userId: number) {
        return this.jwtService.sign({
            userId,
        }, {
            secret: process.env.JWT_SECRET,
            expiresIn: process.env.JWT_EXPIRES_IN,
        })
    }

    async validateToken(bearerToken: string) {
        try {
            const token = (bearerToken ?? "").split(" ")[1];
            return this.jwtService.verify(token)
        } catch(e) {
            throw new BadRequestException(e)
        }
    }

}
