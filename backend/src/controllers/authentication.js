//write all the logic of login , register and logout here 

import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import UserModel from '../models/User.js'
import { loginSchema, signupSchema } from '../validators/authValidators.js';


// Add Zod Validation - Done

export async function register (req,res){
    try{

        const parsed = signupSchema.safeParse(req.body || {})

        if (!parsed.success) return res.status(400).json({
            message: parsed.error,
            errors: parsed.error.errors
        });

        const { username, email, password} = parsed.data

        if(!username || username.length <= 5){
          return res.status(403).json({ 
            message: 'Username must be more than 5 characters long.'
        })
        } 
        
        if (!password || password.length<=8){
            return res.status(403).json({
                message: 'Password must be more than 6 characters long.'
            })
        } 

        const isRegistered = await UserModel.findOne({email}); 

        if(isRegistered){
            return res.status(404).json({
                message: "Email already exists" 
            })
        }

        const hashedPassword = await bcrypt.hash(password,10); 

        const newUser = await UserModel.create({
            username: username,
            email: email, 
            password: hashedPassword
        })

        return res.status(200).json({
            message: "User registration successfull"
        })
    } catch (err){
        console.log(err)
        return res.status(500).json({
            message: "Something went wrong"
        })
    }
}

export async function login(req,res){
    try{
        const parsed = loginSchema.safeParse(req.body || {})

        if (!parsed.success) return res.status(400).json({
            message: parsed.error,
            errors: parsed.error.errors
        });

        const {email,password} = parsed.data; 

        const user = await UserModel.findOne({
            email: email
        })

        if(!user){
            return res.status(403).json({
                message: "User does not exist"
            })
        }

        const isPasswordValid = await bcrypt.compare(password,user.password); 

        if(!isPasswordValid){
            return res.status(403).json({
                message: "Invalid Password"
            })
        }

        const token = jwt.sign({
            userId: user._id.toString(),
        },process.env.JWT_SECRET);

        return res.json({
            token: token
        })

    } catch (err){
        console.log(err); 
        return res.status(500).json({
            message: "Something went wrong"
        })
    }
}

export async function campaigns(req,res){
    return res.status(200).json({
        message: "Route is protected"
    })
}