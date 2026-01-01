import dotenv from "dotenv"; 
dotenv.config({ path: "../.env" })

import app from './app.js'
import connectDB from "./config/database.js";

const port = process.env.PORT || 5000

async function startServer() { 
    try {
        await connectDB()
        console.log("Database is connected")

        app.listen(port,()=>{
            console.log(`The server is running at port ${port}`)
        })
    } catch(error){
        console.error("DB Connection Error" , error)
    }
}

startServer()