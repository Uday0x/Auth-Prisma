import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors'

import UserRouter from './routes/user.routes.js';
dotenv.config();

const app = express();


app.use(express.json());
app.use(cors({
    origin:"http://localhost:5174"
}))
app.use(cookieParser());
app.use(express.urlencoded({ extended:true }))

//import the routes
app.use("/api/v1/users",UserRouter)




const port = process.env.PORT || 2000


app.get("/test",(req,res)=>{
    res.send("just for sending purpose")
    console.log(req.body);
})


app.listen(port ,()=>{
    console.log(`app is listening on port ${port}`)
})