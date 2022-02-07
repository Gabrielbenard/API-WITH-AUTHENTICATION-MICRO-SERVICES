import { Router, Request, Response, NextFunction } from "express";
import ForbiddenError from "../Models/Errors/forbidden.error.model";
import UserRepository from "../Repositories/User.Repository";

export default async function  Basicautheticationmiddleware(req:Request, res: Response , next: NextFunction){
        
            try{
                // pegamos o conteudo do header 'authorization'
                const authorizationHeader = req.headers['authorization'];
    
                // se não exisitr jogara um forbiddenerror com 'credenciais não informadas'
                if(!authorizationHeader){
                throw new ForbiddenError('credenciais não informadas');
                    };
                
                    // se existir  verificamos qual tipo da autorização é do tipo basic 
                    // e se existe token 
                    const [authenticationtype, token] = authorizationHeader.split(':');
    
                    if(authenticationtype !== 'Basic' || !token ){
                        throw new ForbiddenError('tipo de autenticação invalido')
                    }
    
                    //convertemos  o conteudo do token que é base64 par utf-8
                    const tokenContent =  Buffer.from(token, 'base64').toString('utf-8');
                    
                    // separamos o usuário e a senha 
                    const [username ,password] = tokenContent.split('');
    
                    if(!username || !password){
                        throw new ForbiddenError('Credenciais não preenchidas')
                    }
                    // se usuário e a senha existir vamos no banco de dados e pegamos de qual usuário é o username e o password
                    const user = await UserRepository.findByUsernameAndPassword(username,password);
                    console.log(user);
    
                    if(!user){
                        throw new ForbiddenError('usuário ou senha inválidos ')
                    }
                    
                    req.user = user;
                    
                    
                     //o next é uma função que chamamos que vai para proximo handler ou para errorhandler
                    next();


        }
        catch(error){
             next(error)

        }


}