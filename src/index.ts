
            // configuração da aplicação APP.js   com expressjs

import express,{Request, Response, NextFunction} from 'express';
import UserRoute from './Routes/Users.route';
import statusRoute from './Routes/Status.Route';
import errorhandler from './middleware/error-handler.middleware';
import authorizationRoute from './Routes/authorization.route';
import Basicautheticationmiddleware from './middleware/basic.authetication.middleware';
import bearerAutheticationmiddleware from './middleware/bearer-authetication-middleware';

// instaciando o express  / primeiro passo 
const app= express();


//configurações da aplicação
app.use(express.json());



//configurações das rotas


app.use(statusRoute);

app.use(authorizationRoute);
app.use(bearerAutheticationmiddleware);
app.use(UserRoute);


// configuração dos handlers de erro 
app.use(errorhandler)


//utilizar a porta 3000
app.listen(3000, ()=> {
        console.log('APLICAÇAO EXECUTANDO NA PORTA 3000');
    }

);