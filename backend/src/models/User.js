import mongoose from "mongoose";
import { Schema } from "mongoose";

const UserSchema = new Schema ({
    username: { 
     type: String,
     unique: true,
     required: [true, 'username is required']
    }, 

    email: {
        type: String,
        unique: true,
        required: [true, 'email is required']
    }, 

    password: {
        type: String,
        required: [true , 'Password is required']
    }, 
})

const User = mongoose.model("User", UserSchema)

export default User