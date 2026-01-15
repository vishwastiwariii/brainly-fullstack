import express from "express"
import rateLimit from "express-rate-limit"
import { authenticate } from "../middlewares/authMiddleware.js"

let limiter = rateLimit({
    max: 50,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from a single IP. Please wait'
})


const router = express.Router()


// share routes

router.post('/generate', limiter, authenticate)  //generates a sharable link with a shareId
router.get('/:hash', limiter)       


export default router