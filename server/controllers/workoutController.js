import Workout from '../models/workoutModel.js'
import mongoose from 'mongoose'
const isValid = mongoose.Types.ObjectId.isValid

const getWorkouts = async (req, res) => {
    const user_id = req.user._id
    const workouts = await Workout.find({ user_id }).sort({ createdAt: -1 })
    res.status(200).json(workouts)
}

const getWorkout = async (req, res) => {
    const id = req.params.id
    if(!isValid(id)){
        return res.status(404).json({message: "No such Workout"})
    }
    const workout = await Workout.findOne({_id: id})
    if (!workout) {
        return res.status(404).json({message: "No such Workout"})
    }
    res.status(200).json(workout)
}

const createWorkout = async (req, res) => {
    const user_id = req.user._id
    const { title, reps, weight } = req.body
    try {
        const workout = await Workout.create({title, reps, weight, user_id})
        res.status(200).json(workout)
    } catch (error) {
        res.json({error: error.message})
    }
}
const deleteWorkout = async (req, res) => {
    const id = req.params.id
    if(!isValid(id)){
        return res.status(404).json({message: "No such Workout"})
    }
    const workout = await Workout.findOneAndDelete({_id: id})
    if (!workout) {
        return res.status(404).json({message: "No such Workout"})
    }
    res.status(200).json(workout)
}
const updateWorkout = async (req, res) => {
    const id = req.params.id
    if(!isValid(id)){
        return res.status(404).json({message: "No such Workout"})
    }
    const workout = await Workout.findOneAndUpdate({_id: id}, {...req.body})
    if (!workout) {
        return res.status(404).json({message: "No such Workout"})
    }
    res.status(200).json(workout)
}

export {getWorkouts, getWorkout, createWorkout, deleteWorkout, updateWorkout}