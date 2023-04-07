import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';

@Controller("user")
export class UserController {

    constructor(private readonly userService: UserService) {}

    @Get()
    async findAll() {
        return this.userService.findAll()
    }

    @Post()
    async create(@Body() data: CreateUserDTO) {
        return this.userService.create(data)
    }

    @Delete(":id")
    async delete(@Param("id", ParseIntPipe) id: number) {
        return this.userService.delete(id)
    }

    @Put(":id")
    async update(@Param("id", ParseIntPipe) id: number, @Body() data: UpdateUserDTO) {
        return this.userService.update(id, data)
    }
    
}
