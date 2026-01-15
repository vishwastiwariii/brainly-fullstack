import express from "express"
import { rateLimit } from "express-rate-limit"
import { authenticate } from "../middlewares/authMiddleware.js"
import { createCategory, deleteCategory, getAllCategory, updateCategory } from "../controllers/categoryController.js"

let limiter = rateLimit(
    {
        max:50,
        windowMs: 60 * 60 * 1000, 
        message: 'Too many requests from a single IP. Please wait'
    }
)

const router = express.Router()


// category Routes

router.get('/', limiter, authenticate, getAllCategory)    // show all categories
router.patch('/update/:categoryid', limiter, authenticate, updateCategory)  // updates a category
router.post('/create', limiter, authenticate, createCategory)    // create a new category
router.delete('/delete/:categoryid', limiter, authenticate, deleteCategory) // delete a category


export default router