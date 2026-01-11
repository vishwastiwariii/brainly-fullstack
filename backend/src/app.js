import express , {json} from 'express'
import helmet from "helmet"
import expressMongoSanitize from '@exortek/express-mongo-sanitize';
import userRoutes from './routes/userRoutes.js'
import cardRoutes from './routes/cardRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'
import shareRoutes from './routes/shareRoutes.js'


const app = express()

if (process.env.NODE_ENV === 'production' && !process.env.CORS_ORIGINS) {
  throw new Error('CORS_ORIGINS environment variable must be set in production');
}


// for protection
app.use(helmet())
app.use(json({ limit: '10kb' }))
app.use(expressMongoSanitize())


// User Routes
app.use('/api/v1/user', userRoutes)
app.use('/api/v1/card', cardRoutes)
app.use('/api/v1/category', categoryRoutes)
app.use('/api/v1/share', shareRoutes)



export default app