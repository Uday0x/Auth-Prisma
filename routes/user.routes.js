import express from "express";
import { forgotPassowrd, getMe, loginUser, Logout, RegisterUSer, VerifyUser } from "../controller/auth.controller.js";
import { isLoggenIn } from "../middleware/auth.middleware.js";

const UserRouter = express.Router();


UserRouter.get("/register",RegisterUSer)
UserRouter.get("/Verify/:verificationToken",VerifyUser)
UserRouter.post("/login",loginUser)
UserRouter.get("/getMe",isLoggenIn,getMe)
UserRouter.get("/logout",isLoggenIn,Logout)
UserRouter.get("/forgotPassword",isLoggenIn,forgotPassowrd)




export default UserRouter