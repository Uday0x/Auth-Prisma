import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config();


export const isLoggenIn=async(req ,res,next)=>{
    console.log(req.cookies)

    try {
        let token = req.cookies?.token 
         //kyu ki humne token naam diya tha jwt 
        console.log("token",token);

        if(!token){
            res.status(300).json({
                message:"please give a valid token",
                success:false
            })
        }

        
        const decoded = await jwt.verify(token,process.env.JWT_SECRET)
        
        console.log(decoded);
        req.user = decoded;//giving request a supuerpower gain
        
        next();


    } catch (error) {
        return res.status(400).json({
            message:"Auth middleware failure",
            succes:false
        })
    }
}