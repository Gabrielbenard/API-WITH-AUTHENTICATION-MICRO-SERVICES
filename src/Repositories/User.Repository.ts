
import { Script } from "vm";
import db from "../db";
import User from "../Models/User.model";
import DatabaseError from "../Models/Errors/database.error.model";

 // criação de uma pool 
class UserRepository{

            // A query será um pedido 
            // uma função assincrona async findallUser, obriagtóriamente declaramos uma promise, 
            // onde definimos o SCRIPT SQL [const query = `SELECT uuid, username FROM application_user`]
            // PEGAMOS O RESULTADO EM const result = AWAIT que vai esperar pelo resultado  do db.query
            // A const row = vai guardar os resultados da result com result.rows
            // retorne rows(os resultados) ou nada(vazio)
   async findAllUser(): Promise <User[]> {
                const query = `SELECT uuid, username FROM application_user` ;
               const result = await db.query <User>(query); 
             const rows = result.rows;
        return rows || [] ;
    }

    async findById(uuid: string): Promise <User> { 
        try{
        const query = `SELECT uuid, username FROM application_user WHERE uuid= $1 ` ;
       
        const values = [uuid];
        const  { rows } = await db.query <User>(query,values); 
        const [user] = rows;

        return user;
            }

            catch(error){
                throw new DatabaseError('erro na consulta por id ')
            }
    
    }
    async create(user: User): Promise <string> {
        //SCRIPT EM SQL 
        const script = `INSERT INTO application_user(username,password)
         VALUES ($1, cryp($2, 'my_salt))
        RETURNING uuid`  ;
        // CONStante para guarda valores user.username e o password
    const values = [user.username, user.password];
        // vai esperar o pedido do script (script) que vai retornar um uuid do tipo string que é um objeto, que vai ter coluna uuid {uuid: string }
    const { rows } = await db.query<{ uuid: string}> (script, values);
        
    const [newUser] = rows;

    return newUser.uuid;


    } 

    async update(user: User) : Promise <void> {
      
        const script = `UPDATE application_user 
        SET username = $1, 
        password = crypt($2, 'my_salt') ,
        WHERE uuid = $3`  ;
        
        const values = [user.username, user.password, user.uuid];

        await db.query(script,values);
        
    

    }

    async remove(uuid: string) : Promise <void> {
        const script = `DELETE 
                        FROM application_user
                        WHERE uuid = $1`;
                        
                        const values = [uuid];

                        await db.query(script,values);

    } 

    async findByUsernameAndPassword(username:string, password: string): Promise<User | null>{
       try{
                const query = `
                    SELECT  uuid , username
                    FROM application_user
                    WHERE username =$1
                    AND password= crypt($2, 'my_salt')
                `;
                const values = [username, password];
                const {rows } = await db.query<User>(query, values);
                const [user] = rows; 
                return user || null; 
            }   catch(error){
                throw new DatabaseError('Erro na consulta por USERNAME E PASSWORD');

            }


    }




}




export default new UserRepository