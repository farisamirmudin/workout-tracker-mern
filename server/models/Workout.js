import mongoose from 'mongoose'

const workoutSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    weights: {
        type: Number,
        required: false
    }
}, { timestamps: true })

export default mongoose.model('Workout', workoutSchema);