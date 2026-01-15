// Adding all routes related to Cards here

import express from "express"
import { rateLimit } from "express-rate-limit"
import { authenticate } from "../middlewares/authMiddleware.js"
import { createCard, deleteCard, getAllCards, getAllCardsByCategory, updateCard } from "../controllers/cardController.js"


let limiter = rateLimit(
    {
        max: 50, 
        windowMs: 60 * 60 * 1000,
        message: 'Too many requests from a single IP. Please wait'
    }
)

const router = express.Router()


// card Routes

router.get('/', limiter, authenticate, getAllCards) // fetching all cards of a user
router.post('/create', limiter, authenticate, createCard)   // create the card
router.patch('/update/:id', limiter, authenticate, updateCard)  // update the card
router.delete('/delete/:id', limiter, authenticate, deleteCard)  // delete the card
router.get('/:categoryId', limiter, authenticate, getAllCardsByCategory)  // fetching all cards by category




export default router