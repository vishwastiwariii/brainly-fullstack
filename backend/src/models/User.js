import mongoose from "mongoose";
import { Schema } from "mongoose";

const User = new Schema ({
    username: {type: String , unique: true}, 
    email: {type: String , unique: true}, 
    password: String, 
})

const UserModel = mongoose.model("users" , User)

export default UserModel