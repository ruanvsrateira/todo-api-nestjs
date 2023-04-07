import { IsString, Min, IsEnum, IsOptional } from "class-validator"
import { TodoStatusEnum } from "src/enums/todo.enum"

export class CreateTodoDTO {
    
    @IsString()
    title: string

    @IsString()
    description: string

    @IsOptional()
    @IsString()
    @IsEnum(TodoStatusEnum)
    status: TodoStatusEnum

}