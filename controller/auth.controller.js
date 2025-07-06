import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const prisma = new PrismaClient();

const RegisterUSer = async (req, res) => {
    //get the data(req.body)
    //validate the data
    //check for any existinguser
    //create the user if not present 
    //craete the verificationtoken using crypto
    //send email 


    const { email, password, phone, name } = req.body;
    console.log(req)
    if (!email || !password || !phone || !name) {
        return res.status(400).json({
            message: "plz give valid credentials"
        })
    }

    console.log("going inside try block");
    try {
        const exsitingUser = await prisma.user.findUnique({
            where: { email }
        })

        if (exsitingUser) {
            return res.status(404).json({
                message: "User already exists"
            })
        }
        //  console.log("checked existing user")

        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationToken = crypto.randomBytes(32).toString('hex');


        const user = await prisma.user.create({
            data: {
                name,
                email,
                phone,
                password: hashedPassword,
                verificationToken
            }
        })


        console.log(user);
        return res.status(201).json({
            message: "User registered successfully!",
            success: true,
            user
        });


    } catch (error) {
        return res.status(404).json({
            message: "something is wrong plz try again",
            success: false
        })
    }
}

export { RegisterUSer }