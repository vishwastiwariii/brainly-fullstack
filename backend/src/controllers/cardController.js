import mongoose from "mongoose";
import Card from "../models/Card.js";
import Category from "../models/Category.js";

export async function createCard(req, res){

    try {

        const userId = req.userId
        const { title, description, categoryId, thumbnail, url } = req.body

        const categoryDoc = await Category.findOne({
            _id: categoryId,
            userId: userId
        })

        if(!categoryDoc){
            return res.status(400).json({
                message: "Invalid Category"
            })
        }

        const existingCard = await Card.findOne({
            url: url, 
            userId: userId
        })

        if(existingCard){
            return res.status(400).json({
                message: "Card already exists"
            })
        }

        const newCard = await Card.create({
            url: url,
            title: title,
            description: description,
            thumbnail: thumbnail, 
            categoryId: categoryId, 
            userId: userId
        })

        await newCard.populate('categoryId', 'name');

        return res.status(200).json({
            message: "Card created successfully",
            data: newCard
        })

    } catch(error) {
        console.error("Card creation failed: ", error)
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export async function updateCard(req, res){

    try {

        const { cardId } = req.params
        const { title, description, categoryId, thumbnail, url} = req.body

        const card = await Card.findById(cardId)

        if(!card){
            return res.status(404).json({
                message: "Card not found"
            })
        }
        
        if(card.userId.toString() !== req.userId.toString()) {
            return res.status(403).json({
                message: "Card doesn't belong to user"
            })
        }

        const existingUrl = await Card.findOne({
            url: url,
            userId: req.userId,
            _id: { $ne: req.params.id }
        })

        if(existingUrl) {
            return res.status(400).json({
                message: "Url already exists in another Card"
            })
        }

        const existingCategory = await Category.findOne({
            categoryId: categoryId,
            userId: userId,
        })

        if(!existingCategory) {
            return res.status(400).json({
                message: "Invalid Category"
            })
        }

        const updatedCard = await Card.findByIdAndUpdate(
            userId, 
            { url, title, description, thumbnail, categoryId }
        ).populate('categoryId', 'name')

        return res.status(200).json({
            message: "Card is updated successfully",
            data: updatedCard
        })

    } catch(error) {
        console.error("Updating of card failed: ", error)
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export async function deleteCard(req, res){
    try {

        const { cardId } = req.params 
        const userId = req.userId

        if(!mongoose.Types.ObjectId.isValid(cardId)) {
            return res.status(400).json({
                message: "Invalid Card Id"
            })
        }

        const card = await Card.findById(cardId)

        if(card.userId.toString() === userId.toString()) {
            return res.status(403).json({
                message: "Not authorized"
            })
        }

        await card.deleteOne()

        return res.status(200).json({
            message: "Card deleted successfully"
        })

    } catch (error) {
        console.error("Card deletion failed: ", error)
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export async function getAllCards(req, res){
    try {

        const userId = req.userId

        const allCards = await Card.find(userId)
             .populate('categoryId', 'name')
             .sort({ createdAt: -1 }); 

        return res.status(200).json({
            message: "All cards fetched successfully",
            data: allCards
        })

    } catch(error) {
        console.error("Failed to fetch all Cards", error)
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export async function getAllCardsByCategory(req, res){
    try {

        const { categoryId } = req.params

        const requiredCards = await Card.find(categoryId)
            .populate('categoryId', 'name')
            .sort({createdAt: -1})

        return res.status(200).json({
            message: "Cards fetched successfully", 
            data: requiredCards
        })

    } catch (error){
        console.error("Failed to fetch Cards", error)
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}