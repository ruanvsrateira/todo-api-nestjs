import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';

@Controller("user")
export class UserController {

    constructor(private readonly userService: UserService) {}

    // Admin Routes
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RoleGuard)
    @Get()
    async findAll() {
        return this.userService.findAll()
    }

    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RoleGuard)
    @Delete(":id")
    async delete(@Param("id", ParseIntPipe) id: number) {
        return this.userService.delete(id)
    }

    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RoleGuard)
    @Put(":id")
    async update(@Param("id", ParseIntPipe) id: number, @Body() data: UpdateUserDTO) {
        return this.userService.update(id, data)
    }

    // User Routes
    @Post()
    async create(@Body() data: CreateUserDTO) {
        return this.userService.create(data)
    }
    
}
