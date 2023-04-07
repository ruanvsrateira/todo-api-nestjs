import { PrismaModule } from 'src/prisma/prisma.module';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TodoIdCheckMiddleware } from 'src/middlewares/todo-id-check.middleware';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';

@Module({
    imports: [PrismaModule, AuthModule, UserModule],
    controllers: [TodoController],
    providers: [TodoService],
})
export class TodoModule implements NestModule {

    configure(consumer: MiddlewareConsumer) {
        consumer.apply(TodoIdCheckMiddleware).forRoutes({
            path: "/todo/:id",
            method: RequestMethod.ALL,
        })
    }

}
