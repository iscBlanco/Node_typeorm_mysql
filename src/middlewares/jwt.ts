import * as express from "express"
import * as jwt from 'jsonwebtoken'
import config from '../config/config';
const app = express();

export const checkJwt = (req: express.Request, res: express.Response, next: express.NextFunction)=>{
    const token = <string>req.headers['auth'];
    let jwtPayload;
    try{
        jwtPayload = <any>jwt.verify(token, config.jwtSecret)
        
        res.locals.jwtPayload = jwtPayload;
        console.log(res.locals.jwtPayload)
     
    }
    catch(e){
        return res.status(401).send({message:'Not authorized.'});
    }

    const {userId, username} = jwtPayload;
    res.locals.jwtPayload = jwtPayload;

    const newToken = jwt.sign({userId, username}, config.jwtSecret, {expiresIn:'1h'})

    res.setHeader('token', newToken);
    //Call next
    next();
}