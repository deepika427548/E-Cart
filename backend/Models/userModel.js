import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import crypto from 'crypto'
import dotenv from 'dotenv';
dotenv.config({path:'./config/config.env'});

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"please enter your name"],
        maxLength:[20,"name should not exeed 50 characters"]
    },
    email:{
        type:String,
        required:[true,"please enter your email"],
        unique:true
    
    },
    password:{
        type:String,
        required:[true,"please enter the password"],
        minLength:[8,"password should'nt be less than 8 characters"],
        select:false
    },
    avatar:{
        public_id:String,
        url:String
    },
    role:{
        type:String,
        default:'user'
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date,

   


},{timestamps:true} )

 //hash password before saving it
userSchema.pre("save",async function(next){
    if (!this.isModified('password')){
        next();
    }


 const hashedPassword= await bcrypt.hash(this.password,10)
 this.password=hashedPassword;

})
//method to generate token
userSchema.methods.getJwtToken=function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES_TIME,
    });
};

//compare the password with the entered one

userSchema.methods.comparePassword=async function(enteredPassword){
    return bcrypt.compare(enteredPassword,this.password)
}

//Generate password reset token

userSchema.methods.getResetPasswordToken=function (){

    //Generate Toknen
  const resetToken=crypto.randomBytes(20).toString('hex')
  
  //hash and set to resetPasswordToken field
  this.resetPasswordToken=crypto
  .createHash('sha256')
  .update(resetToken)
  .digest('hex');

  //set token expire time 

  this.resetPasswordExpire=Date.now() +30 * 60 * 1000;

  return resetToken;

}

const userModel=mongoose.model("User",userSchema);
export default userModel;