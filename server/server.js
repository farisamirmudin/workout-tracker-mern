import express from 'express'
import * as dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import workoutRoutes from './routes/workout.js'
import userRoutes from './routes/user.js'

dotenv.config()
const app = express()

// Use middleware
app.use(cors({
    origin: "*",
}))
app.use(express.json())
app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)

// Connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(app.listen(process.env.PORT, () => {
        console.log(`Listening on Port ${process.env.PORT}`)
    }))
    .catch(error => console.log(error.message))
