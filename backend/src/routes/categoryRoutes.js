import express from "express"
import { rateLimit } from "express-rate-limit"
import { authenticate } from "../middlewares/authMiddleware.js"

let limiter = rateLimit(
    {
        max:50,
        windowMs: 60 * 60 * 1000, 
        message: 'Too many requests from a single IP. Please wait'
    }
)

const router = express.Router()


// category Routes

router.get('/', limiter, authenticate)    // show all categories
router.patch('/update/:id', limiter, authenticate)  // updates a category
router.post('/create', limiter, authenticate)    // create a new category
router.delete('/delete/:id', limiter, authenticate) // delete a category


export default router