import express from "express";
import { RegisterUSer } from "../controller/auth.controller.js";


const UserRouter = express.Router();


UserRouter.get("/register",RegisterUSer)



export default UserRouter