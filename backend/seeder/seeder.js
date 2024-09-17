import mongoose from "mongoose";
import productModel from "../Models/productModel.js";
import products from "./data.js";
import dotenv from 'dotenv';
dotenv.config({path:'./config/config.env'});

const seedProducts=async()=>{
    try {
        await mongoose.connect(`${process.env.DB_URI}/${process.env.DB_NAME}`)
        console.log(`${process.env.DB_URI}/${process.env.DB_NAME}`);
        
        
        await productModel.deleteMany();
        console.log("deleted");

        await productModel.insertMany(products)
        console.log('added successfully');
        process.exit();
        
        
        
    } catch (error) {
        console.log(error.message);
        process.exit();
    }
}
seedProducts();