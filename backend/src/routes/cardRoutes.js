// Adding all routes related to Cards here

import express from "express"
import { rateLimit } from "express-rate-limit"
import { authenticate } from "../middlewares/authMiddleware"


let limiter = rateLimit(
    {
        max: 50, 
        windowMs: 60 * 60 * 1000,
        message: 'Too many requests from a single IP. Please wait'
    }
)

const router = express.Router()


// card Routes

router.get('/', limiter, authenticate) // fetching all cards of a user
router.post('/create', limiter, authenticate)   // create the card
router.patch('/update/:id', limiter, authenticate)  // update the card
router.delete('/delete/:id', limiter, authenticate)  // delete the card
router.get('/:categoryTitle', limiter, authenticate)  // fetching all cards by category




export default router