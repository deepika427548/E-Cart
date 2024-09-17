import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors"; 
import apirouter from "./routes/index.js";
import { connectDb } from "./config/connectDb.js";
import errorMiddelware from './middlewares/error.js'
import path from "path";
import { fileURLToPath } from "url";

const __filename=fileURLToPath(import.meta.url)
const __dirname=path.dirname(__filename);

const app=express();
dotenv.config({path:'./config/config.env'})

app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization'
  }));

  
app.use(express.json({limit:"10mb",
    verify:(req,res,buf)=>{
    req.rawBody=buf.toString()
}}));
app.use(cookieParser())
app.use('/api',apirouter);
app.use(errorMiddelware)
connectDb();

app.use(express.static(path.join(__dirname,"../frontend/build")));
app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"../frontend/build/index.html"));
})


// console.log(process.env.PORT)

const server=app.listen(process.env.PORT,()=>{
    console.log(`Server is listening on ${process.env.PORT}`);
    
})

//Handle Unhandled Promise Rejection

process.on('unhandledRejection',(err)=>{
    console.log(`ERROR:  ${err}`);
    console.log('shutting down server due to unhandled promise rejection');
    server.close(()=>{
        process.exit((1));
    })
    
})