// Adding all routes related to Cards here

import express from "express"
import { rateLimit } from "express-rate-limit"


let limiter = rateLimit(
    {
        max: 50, 
        windowMs: 60 * 60 * 1000,
        message: 'Too many requests from a single IP. Please wait'
    }
)

const router = express.Router()

// card Routes




export default router