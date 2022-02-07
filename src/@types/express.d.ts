import { User} from '../Models/User.model'

declare module 'express-serve-static-core'{

    interface Request{
        user?:User   
    }



}