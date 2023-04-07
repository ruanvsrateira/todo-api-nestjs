import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDTO } from './dto/create-todo.dto';
import { UpdateTodoDTO } from './dto/update-todo.dto';
import { AuthGuard } from 'src/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller("todo")
export class TodoController {

    constructor(private readonly todoService: TodoService) {}

    @Get()
    async findAll() {
        return this.todoService.findAll()
    }

    @Post()
    async create(@Body() data: CreateTodoDTO) {
        return this.todoService.create(data)
    }

    @Delete(":id")
    async delete(@Param("id", ParseIntPipe) id: number) {
        return this.todoService.delete(id)
    }

    @Put(":id")
    async update(@Param("id", ParseIntPipe) id: number, @Body() data: UpdateTodoDTO) {
        return this.todoService.update(id, data)
    }
    
}
