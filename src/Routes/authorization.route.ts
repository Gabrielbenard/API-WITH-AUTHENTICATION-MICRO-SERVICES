import { Router, Request, Response, NextFunction } from "express";
import ForbiddenError from "../Models/Errors/forbidden.error.model";
import UserRepository from "../Repositories/User.Repository";
import JWT from 'jsonwebtoken';
import { StatusCodes } from "http-status-codes";
import Basicautheticationmiddleware from "../middleware/basic.authetication.middleware";
import bearerAutheticationmiddleware from "../middleware/bearer-authetication-middleware";
import { STATUS_CODES } from "http";


const authorizationRoute = Router()

        // a requisição irá passar  pelo basicautheticationmiddleware
        // e depois seguira pela função assincrona  
authorizationRoute.post('/token',Basicautheticationmiddleware ,async (req:Request, res: Response , next: NextFunction )=> {
       try{
                const user = req.user;   

                if(!user) {
                    throw new ForbiddenError('usuário não informado')
                }

                //as constantes que são objetos com as chaves e os valores
               
                const jwtpayload = {username: user.username};
                const jwtoptions = { subject: user?.uuid };
                const secretkey = 'my_scret_key';

                //registrando a token 
                const jwt = JWT.sign(jwtpayload, secretkey, jwtoptions);
                
                res.status(StatusCodes.OK).json( {token: jwt});

        }   catch(error){
            next(error);
        } 

}

);

authorizationRoute.post('/toke/validadte', bearerAutheticationmiddleware, async (req:Request, res: Response , next: NextFunction ) => {
    res.sendStatus(StatusCodes.OK);


});

export default authorizationRoute