import express , {json} from 'express'
import helmet from "helmet"
import userRoutes from './routes/userRoutes.js'

const app = express()

app.use(helmet())

app.use(json())

// User Routes
app.use('/api/user',userRoutes)

export default app