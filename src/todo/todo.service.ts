import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTodoDTO } from './dto/create-todo.dto';
import { UpdateTodoDTO } from './dto/update-todo.dto';

@Injectable()
export class TodoService {

    constructor(private readonly prisma: PrismaService) {}

    async findAll() {
        return this.prisma.todo.findMany()
    }

    async create(data: CreateTodoDTO) {
        return this.prisma.todo.create({
            data: {
                title: data.title,
                description: data.description,
                status: data.status,
            }
        })
    }

    async delete(id: number) {
        const user = await this.prisma.todo.findUnique({ where: { id } });

        if (!user) {
            throw new NotFoundException("Todo not founded by this id")
        }

        return await this.prisma.todo.delete({ where: {id} })
    }

    async update(id: number, data: UpdateTodoDTO) {
        const user = await this.prisma.todo.findUnique({ where: { id } });

        if (!user) {
            throw new NotFoundException("Todo not founded by this id")
        }

        return await this.prisma.todo.update({
            where: { id },
            data,
        })
    }

}
