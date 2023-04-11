import { IsString, IsEmail, IsOptional, IsEnum } from "class-validator"
import { Role } from "src/enums/role.enum"


export class CreateUserDTO {
    
    @IsString()
    name: string

    @IsEmail()
    email: string

    @IsOptional()
    @IsEnum(Role)
    role: number

    @IsString()
    password: string

}