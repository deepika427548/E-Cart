import mongoose from "mongoose";

export const connectDb= async()=>{
    try {
        
       await mongoose.connect(`${process.env.DB_URI}/${process.env.DB_NAME}`)
        console.log(`Database connected successfully`);
      
       
    } catch (error) {
        console.log(error)
    }
}