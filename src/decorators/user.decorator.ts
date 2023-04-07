import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const User = createParamDecorator((filter: string, context: ExecutionContext) => {

    const request = context.switchToHttp().getRequest()
    const { user } = request

    if(filter) {
        return request.user[filter]
    } 

    return user;

})