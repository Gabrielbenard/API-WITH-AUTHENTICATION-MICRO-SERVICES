import { Console } from "console";
import {Router, Request, Response, NextFunction} from "express";
import {StatusCodes} from 'http-status-codes';
import DatabaseError from "../Models/Errors/database.error.model";
import UserRepository from "../Repositories/User.Repository";


const UserRoute= Router();




UserRoute.get('/users', async (req: Request, res: Response, next: NextFunction) => {
        
        const users= await UserRepository.findAllUser();
        res.status(StatusCodes.OK).send({users});
}
);

UserRoute.get('/users/:uuid', async (req: Request, res: Response, next: NextFunction) => {
    
    
    try{    
            const uuid = req.params.uuid;
    const user = await UserRepository.findById(uuid);
    res.status(StatusCodes.OK).send({user});         
            }   

            // o catch será o tratamento de erro 
        catch (error){
            next(error);
        }


    }

 
 
 );

 UserRoute.post('/users', async(req: Request, res: Response, next: NextFunction) =>{
     const newUser = req.body;

     const uuid = await UserRepository.create(newUser);
     res.status(StatusCodes.CREATED).send(newUser);
 });


UserRoute.put('/users/:uuid', async(req: Request, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid;
    const modifieduser = req.body;
    
    modifieduser.uuid = uuid;

    await UserRepository.update(modifieduser);

    res.status(StatusCodes.OK).send({uuid});
}
);


UserRoute.delete('/users/:uuid', async(req: Request, res: Response, next: NextFunction) =>{
    const uuid= req.params.uuid;

    await UserRepository.remove(uuid);

    res.sendStatus(StatusCodes.OK);
} )


export default UserRoute;

