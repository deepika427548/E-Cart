//protects the routes from unauthenticated users
import jwt from "jsonwebtoken";
import userModel from "../Models/userModel.js";
import errorHandler from "../utils/errorHandler.js";
import asyncHandler from "./asyncHandler.js";
import dotenv from 'dotenv';
dotenv.config({path:'./config/config.env'});


export const isAuthenticatedUser=asyncHandler(async(req,res,next)=>{
   
    const {token}=req.cookies;
     
    if(!token){
        return next(new errorHandler("Login first to access the deatails") )
    }

    const decoded=jwt.verify(token,process.env.JWT_SECRET);
    req.user=await userModel.findById(decoded.id);
    next();

})

//Authorise user roles and permissions
export const authoriseRoles=(...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(new errorHandler(`Role (${req.user.role}) is not allowed to access the resourse`))
        }
        next();
    }
}