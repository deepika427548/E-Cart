import express from "express";
import v1router from "./v1/index.js";

const apirouter=express.Router();

apirouter.use('/v1',v1router)



export default apirouter;