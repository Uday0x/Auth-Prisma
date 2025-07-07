import express from "express";
import { loginUser, RegisterUSer, VerifyUser } from "../controller/auth.controller.js";


const UserRouter = express.Router();


UserRouter.get("/register",RegisterUSer)
UserRouter.get("/Verify/:verificationToken",VerifyUser)
UserRouter.get("/login",loginUser)



export default UserRouter