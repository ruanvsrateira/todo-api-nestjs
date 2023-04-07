import { BadRequestException, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

export class TodoIdCheckMiddleware implements NestMiddleware{
    
    use(req: Request, res: Response, next: NextFunction) {
     
        const { id } = req.params;

        if(id) {
            try {
                if (Number(id) < 1) {
                    throw new BadRequestException("Id Invalid")
                }
            }
            catch(e) {
                throw new BadRequestException(e)
            }
        }
        else {
            throw new BadRequestException("Id not informed")
        }

        next()
    }

}