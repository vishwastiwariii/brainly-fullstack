import mongoose from "mongoose"

async function connectDB() {
    console.log("MONGO_URL:", process.env.MONGO_URL);
    if(!process.env.MONGO_URL){
        throw new Error("Missing mongourl in environment")
    }

    await mongoose.connect(process.env.MONGO_URL);
    return mongoose.connection
}

export default connectDB