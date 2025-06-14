import userModel from "../model/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const Login = async(req, res) => {
    try {
        const { email, password } = req.body;
        if (!email ||!password) {
            return res.send({ 
                message: "Please fill all the required fields",
                success: false,
            });
        }

        const userExists = await userModel.findOne({email});
        if(!userExists){
            return res.send({message: "User does not exist", success:false})
        }

        const checkPassword = await bcrypt.compare(password, userExists.password);
        if(!checkPassword){
            return res.send({message: "Password Incorrect", success:false});
        }

        const token = await jwt.sign({id:userExists._id}, process.env.TOKEN_SECRET);
        if(!token){
            return res.send({message: "Token not created", success:false});
        }

        return res.cookie("token", token, {
            httpOnly:true
        }).send({message: "Login Succcessful", success:true})

    } catch (error) {
        return res.send({message: error.message, success: false})
    }
}

export const Signup = async(req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!email || !name || !password) {
            return res.send({ 
                message: "Please fill all the required fields",
                success: false,
            })
        }
        const userExists = await userModel.findOne({email});
        if(userExists){
            return res.send({message:"User Already Exists", success:false})
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        
        
        const newUser = new userModel({
            name,
            email,
            password: hashPassword
        })

        await newUser.save();
        const token = await jwt.sign({_id: newUser._id}, process.env.TOKEN_SECRET)
        console.log(token);
        if(!token){
            return res.send({message: "Token not created", success:false});
        }

        return res.cookie("token", token, {
            httpOnly:true
        }).send({message: "User Created Successfully", success:true})

        
        
    } catch (error) {
        return res.send({message: error.message, success: false})
    }
}
