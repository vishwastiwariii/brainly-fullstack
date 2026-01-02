//write all the logic of login , register and logout here 

import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import UserModel from '../models/User.js'

export async function register (req,res){
    try{

        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password; 

        if(!username || username.length <= 5){
          return res.status(403).json({ 
            message: 'Username must be more than 5 characters long.'
        })
        } 
        
        if (!password || password.length<=8){
            return res.status(403).json({
                message: 'Password must be more than 8 characters long.'
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
        const {email,password} = req.body; 

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

        const token = await jwt.sign({
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