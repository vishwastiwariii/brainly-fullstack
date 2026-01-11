import mongoose from "mongoose";
import { Schema } from "mongoose";

const CategorySchema = new Schema(
{
    name: {
        type: String, 
        required: true, 
        unique: true
    }, 

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
},
{
    timestamps: true
})

const Category = mongoose.model("Category", CategorySchema)

export default Category