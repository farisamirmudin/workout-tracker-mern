import mongoose from 'mongoose'

const workoutSchema = new mongoose.Schema({
    title: {
        type: String
    },
    reps: {
        type: Number
    },
    weight: {
        type: Number
    }
}, { timestamps: true })

export const Workout = mongoose.model('Workout', workoutSchema)