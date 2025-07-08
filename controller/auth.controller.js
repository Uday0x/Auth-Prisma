import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();

const RegisterUSer = async (req, res) => {
    //get the data(req.body)
    //validate the data
    //check for any existinguser
    //create the user if not present 
    //craete the verificationtoken using crypto
    //send email 


    const { email, password, phone, name } = req.body;
    console.log(req.body)
    if (!email || !password || !phone || !name) {
        return res.status(400).json({
            message: "plz give valid credentials"
        })
    }

    console.log("going inside try block");
    try {
        const exsitingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { email },
                    { phone }
                ]
            } //since both email and phone are given unique in schema we ahve to use it 
        })
        // console.log(exsitingUser);

        if (exsitingUser) {
            return res.status(404).json({
                message: "User already exists"
            })
        }
        //  console.log("checked existing user")

        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationToken = crypto.randomBytes(32).toString('hex');
        console.log("checked existing user")

        const user = await prisma.user.create({
            data: {
                name,
                email,
                phone,
                password: hashedPassword,
                verificationToken
            }
        })


        console.log(user.email);



        //sending the email to verify
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT),
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            },
        });

        const Mailoption = {
            from: process.env.MAIL_FROM,
            to: user.email,
            subject: "Verify your email",
            text: `Please click the following link:
            ${process.env.Base_url}/api/v1/users/verify/${verificationToken}`
        };


        await transporter.sendMail(Mailoption);


        return res.status(200).json({
            message: "USer registered sucessfully and mail sent for verification",
            success: true
        })
    } catch (error) {
        return res.status(404).json({
            message: "something is wrong plz try again",
            success: false
        })
    }
}



//get the token from params
////search the user based on token 
//if found verify or else not verfy 
//remove the token 
const VerifyUser = async (req, res) => {
    try {
        const { verificationToken } = req.params;

        if (!verificationToken) {
            return res.status(400).json({
                message: "Please provide a valid token",
                success: false,
            });
        }

        const user = await prisma.user.findFirst({
            where: {
                verificationToken
            }
        });

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                isVerified: true,
                verificationToken: null
            }
        });

        return res.status(200).json({
            message: "User verified successfully",
            success: true
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Something went wrong during verification",
            success: false
        });
    }
}


const loginUser = async (req, res) => {
     
     const {email, password} = req.body;
    
     if (!email || !password) {
         res.status(440).json({
             message: "Both email and passowrd are required",
             success: false
         })
     }
     
   try {
     //get the data username passowORD ,PHONE
     //find the user
     
     const user = await prisma.user.findFirst({
         where: { email }
     })
     console.log(user);
 
 
     if (!user || !(await bcrypt.compare(password, user.password))) {
         return res.status(401).json({ message: "Invalid credentials" });
     }
 
    const token = jwt.sign(
       { id: user.id, role: user.role },//user kiase acces ho rha ??scroll up alil idhar hi login mein hi access hoga uska
       process.env.JWt_SECRET,
       {
         expiresIn: "24h"
       }
     )
 
 
     const cookieOptions = {
         http:true,
         secure:true,
         maxAge:24*60*60*1000
     }
 
 
     res.cookie("token",token,cookieOptions)
 
     return res.status(200).json({
       sucess: true,
       message: "login succcesful",
       user: {
         id: user.id,
         name: user.name,
         role: user.role,
       }
     })
   } catch (error) {
        return res.status(200).json({
            message:"something in login error",
            success:false
        })
   }

}
export { RegisterUSer, VerifyUser, loginUser }