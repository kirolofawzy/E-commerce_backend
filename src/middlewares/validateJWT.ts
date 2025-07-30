import { NextFunction , Request , Response} from "express";
import jwt from 'jsonwebtoken'
import UserModel from "../moduls/UserModel";

interface ExtendRequest extends Request{
    user?:any;
}

const validateJWT = async(req:ExtendRequest , res:Response ,next:NextFunction) =>{
    const authorizationHeader = await req.get('authorization')

    if(!authorizationHeader){
        res.status(403).send("Authorization header was not provided")
        return;
    }

    console.log(authorizationHeader);
    const token = authorizationHeader.split(" ")[1]

    if(!token){
        res.status(403).send("header token not found")
        return;
    }

    jwt.verify(token,'123', async (err , payload) =>{
        if(err){
            res.status(403).send("invalid token")
            return;
        }
        
        if(!payload){
            res.status(403).send("invalid token payload")
            return;
           }
        
        console.log(typeof payload)
        
        const userpayload = payload as {
            email: string
        }
        // fetch user from database based on the payload
        const user = await UserModel.findOne({email: userpayload.email })
        console.log(user)
        req.user = user
        next()
    })
}

export default validateJWT