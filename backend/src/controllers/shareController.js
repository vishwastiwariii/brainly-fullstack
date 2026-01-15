import mongoose from "mongoose";
import crypto from 'crypto'
import User from "../models/User.js";
import Card from "../models/Card.js";

export async function generateHash(req, res) {
    try { 

        const userId = req.userId

        const user = await User.findById(userId)

        if(!user.hash){
            user.hash = crypto.randomUUID()
        }

        const sharableLink = `${process.env.CLIENT_URL || 'http://localhost:5173'}/share/${user.hash}`

        return res.status(200).json({
            message: "Here's your sharable link",
            data: sharableLink
        })

    } catch(error) {
        console.error("Fetching shareURL failed", error)
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}


export async function viewCards(req, res){
    try {

        const { hash } = req.params
        
        const user = await User.findOne({ hash: hash }).select('-password')

        if(!user){
            return res.status(404).json({
                message: "Shared Brain not found"
            })
        }

        const cards = await Card.find({ userId: user._id })
              .populate('categoryId', 'name')
              .sort({ createdAt: -1 }); 
        

        res.status(200).json({
            message: "Here are all cards",
            data: cards
        })

    } catch(error){
        console.error("Could not fetch cards", error)
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}