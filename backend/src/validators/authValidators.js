import { z } from 'zod'

export const signupSchema = z.object({
    username: z.string().min(5).trim(),
    password: z.string().min(6),
    email: z.email().trim().toLowerCase()
})


export const loginSchema = z.object({
    email: z.email().trim().toLowerCase(),
    password: z.string().min(6),
})