import express from "express"
import { rateLimit } from "express-rate-limit"
import { authenticate } from "../middlewares/authMiddleware"

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
router.post('/create', limiter, authenticate)    // create a new card
router.get('/:userId', limiter, authenticate)   // fetch all categories of a user



export default router