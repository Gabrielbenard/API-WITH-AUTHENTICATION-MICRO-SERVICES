import {Request, Response, NextFunction } from 'express'
import ForbiddenError from '../Models/Errors/forbidden.error.model';
import UserRepository from '../Repositories/User.Repository';
import JWT from 'jsonwebtoken';


async function bearerAutheticationmiddleware(req: Request, res: Response, next: NextFunction){

    try{

            //recebemos o authorizationheader
            const authorizationheader = req.headers['authorization'];
            
            //verificamos se ha conteudo dentro do authorizationheader
                if(!authorizationheader){
                throw new ForbiddenError('credenciais não informadas');
                    };
            
            // se tiver o conteudo damos um split por espaço 
            const [authenticationtype, token] = authorizationheader.split('');
            
            // verificamos o conteudo dele se ele é bearer 'espaço' o token
            if(authenticationtype !== 'Bearer' || !token ){
                                throw new ForbiddenError('tipo de autenticação invalido')
                    }
           
           try{
           
             //verificamos se ele não expirou e se ele é valido
            const tokenPayload = await JWT.verify(token, 'my_secret_key');
            

            //se ele ta válido e tiver um usuário que é um subject
            if(typeof tokenPayload !== 'object' || !tokenPayload.sub) {
                    throw new ForbiddenError('toekn invalido')

            }       

            //pegamos o id que é o usuário 
            const uuid = tokenPayload.sub;
            //vamos buscar no banco de dados 
            const user = await UserRepository.findById(uuid);
            // para quem usar o middleware receber na mão o usuário autenticado 
                req.user = user;
                next();
               
            
                } catch(error){
                next();
            }
               
            }

        catch(error){
            next(error)
        }
        

}


export default bearerAutheticationmiddleware;

