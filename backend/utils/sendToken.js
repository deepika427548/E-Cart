//create token and save it in cookie
import dotenv from 'dotenv';
dotenv.config({path:'./config/config.env'});

export default (user,statusCode,message,res)=>{

    //create twt Token

    const token=user.getJwtToken();

    //options for cookies
    const options={
        expires:new Date(Date.now()+process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000), 
    
        httpOnly:true ,//http cookie cannot be accessed on frontend it can be accesed only in backend
    }

    res.status(statusCode).cookie('token',token,options).json({message:message,
        token,user
    })


}
