import express from 'express'
import * as dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import { workoutRoutes } from './routes/workout.js'

dotenv.config()
const app = express()

// Use middleware
app.use(cors({
    origin: "*",
}))
app.use(express.json())
app.use((req, res, next) => {
    console.log(`${req.path} ${req.method}`)
    next()
})
app.use('/api/workouts', workoutRoutes)

// Connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(app.listen(process.env.PORT, () => {
        console.log(`Listening on Port ${process.env.PORT}`)
    }))
    .catch(error => console.log(error.message))
