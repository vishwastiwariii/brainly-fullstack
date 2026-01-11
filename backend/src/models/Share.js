import mongoose from "mongoose";
import { Schema } from "mongoose";

const ShareSchema = new Schema(
{
    hash: {
        type: String, 
    }, 

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    }
}, 
{
    timestamps: true
})


const Share = mongoose.model('share', ShareSchema)


export default Share