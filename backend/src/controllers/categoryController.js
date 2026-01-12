import mongoose from 'mongoose'
import Category from '../models/Category.js'
import Card from '../models/Card.js'


export async function getAllCategory(req, res){

    try {

        const userId = req.userId

        const categories = await Category.findOne({
            userId: userId
        })

        return res.status(201).json({
            message: "Categories fetched successfully",
            data: categories
        })

    } catch (error) {
        console.error("Error while fetching categories: ", error)
        return res.status(500).json({
            message: "Internal Server Error: "
        })
    }
    
}


export async function updateCategory(req, res){

    try {

        const { name } = req.body
        const { categoryId } = req.params
        
        if(!mongoose.Types.ObjectId.isValid(categoryId)){
            return res.status(400).json({
                message: "Invalid Category Id"
            })
        }

        if (Category.user.toString() !== req.userId.toString()) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized'
            });
        }

        const existing = await Category.findOne({
            name: name,
            userId: req.userId
        })

        if(existing) {
            return res.status(400).json({
                message: "Category already exists"
            })
        }

        const updatedCategory = await Category.findByIdAndUpdate(
            categoryId, 
            {
                name: name,
            }, {
                new: true
            }
        )

        if(updatedCategory){
            return res.status(201).json({
                message: "Category updated successfully",
                data: updateCategory
            })
        }

    } catch (error) {
        console.error("Could not update category: ", error)
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}


export async function createCategory(req, res){

    try {

        const { name } = req.body

        if(!name) {
            return res.status(400).json({
                message: "Category Name is missing"
            })
        }

        const existingCategory = await Category.findOne({
            name: name, 
            userId: req.userId
        })

        if(existingCategory){
            return res.status(400).json({
                message: "Category already exists"
            })
        }

        const category = await Category.create({
            name: name, 
            userId: req.userId
        }, {
            timestamps: true
        })

        return res.status(201).json({
            message: "Category is created",
            data: category
        })

    } catch (error) {
        console.error('Create Category Error: ', error)
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}


export async function deleteCategory(req, res){

    try {

        const { categoryId } = req.params

        if(!mongoose.Types.ObjectId.isValid(categoryId)){
            return res.status(400).json({
                message: "Invalid Category Id"
            })
        }

        const category = await Category.findById(categoryId)

        if(!category.userId.toString() == req.userId.toString()){
            return res.status(400).json({
                message: "User not authorized"
            })
        }

        const cardCount = await Card.countDocuments({
            category: categoryId
        })

        if(cardCount>0){
            return res.status(400).json({
                message: `Could not delete Category as it contains ${cardCount} cards. 
                Please delete cards or change their category first`
            })
        }

        await category.deleteOne()

        return res.status(201).json({
            message: "Category Deleted"
        })

    } catch(error) {
        console.error('Delete Category Error:', error)
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}