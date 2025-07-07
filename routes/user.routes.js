import express from "express";
import { RegisterUSer, VerifyUser } from "../controller/auth.controller.js";


const UserRouter = express.Router();


UserRouter.get("/register",RegisterUSer)
UserRouter.get("/Verify/:verificationToken",VerifyUser)



export default UserRouter