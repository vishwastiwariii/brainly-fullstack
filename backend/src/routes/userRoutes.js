// user router for adding all the routes of user
import express from "express";
import { campaigns, login, register } from "../controllers/authentication.js";
import { rateLimit } from 'express-rate-limit'
import { authenticate } from "../middlewares/authMiddleware.js";


// limiting the no. of request to prevent bruteforce and DoS
let limiter = rateLimit(
    {
        max: 50,
        windowMs: 60 * 60 * 1000,
        message: 'We have received too many requests from this IP, Please try again after one hour'
    }
);

const router = express.Router(); 


// authentication routes
router.post('/signup',limiter, register)
router.post('/login',limiter, login)
router.get('/campaigns',limiter,authenticate,campaigns)

export default router