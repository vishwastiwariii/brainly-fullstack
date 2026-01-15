import mongoose from "mongoose";
import { Schema } from "mongoose";

const CardSchema = new Schema(
{
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },

    title: {
        type: String,
        required: true, 
        unique: true, 
        trim: true
    }, 

    description: {
        type: String, 
        required: true, 
        trim: true
    }, 

    categoryId: {
        type: mongoose.Schema.Types.ObjectId , 
        ref: "Category", 
    },

    thumbnail: {
        type: String,
        default: "",
    },

    url: {
        type: String, 
        unique: true, 
        required: true, 
        trim: true, 
    }, 

},
{
    timestamps: true
}
)


const Card = mongoose.model("Card", CardSchema)

export default Card