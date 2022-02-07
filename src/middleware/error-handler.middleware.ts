 import {Router, Request, NextFunction, Response } from 'express';   
import { StatusCodes } from 'http-status-codes';
import DatabaseError from '../Models/Errors/database.error.model';
import ForbiddenError from '../Models/Errors/forbidden.error.model';



function errorhandler(error: any, req: Request, res: Response, next: NextFunction) {
        if(error instanceof DatabaseError){
            res.sendStatus(StatusCodes.BAD_REQUEST);
        } 
        else if(error instanceof ForbiddenError) {
                res.sendStatus(StatusCodes.FORBIDDEN)

        }
        else{
            res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
        }

}

export default errorhandler