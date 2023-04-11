import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';

@Injectable()
export class UserService {

    constructor(private readonly prisma: PrismaService) {}

    async findAll() {
        return this.prisma.user.findMany()
    }

    async create(data: CreateUserDTO) {
        return this.prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                role: data.role,
                password: data.password
            }
        })
    }

    async delete(id: number) {
        const user = await this.prisma.user.findUnique({ where: { id } });

        if (!user) {
            throw new NotFoundException("User not founded by this id")
        }

        return await this.prisma.user.delete({ where: {id} })
    }

    async update(id: number, data: UpdateUserDTO) {
        const user = await this.prisma.user.findUnique({ where: { id } });

        if (!user) {
            throw new NotFoundException("User not founded by this id")
        }

        return await this.prisma.user.update({
            where: { id },
            data,
        })
    }

    async findOne(id: number) {
        const user = await this.prisma.user.findUnique({ where: { id } });

        if (!user) {
            throw new NotFoundException("User not founded by this id")
        }

        return user
    }

}
