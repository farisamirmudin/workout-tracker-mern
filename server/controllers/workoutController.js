import { Workout } from '../models/workoutModel.js'
import mongoose from 'mongoose'
const isValid = mongoose.Types.ObjectId.isValid

const getWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({ createdAt: -1 })
    res.status(200).json(workouts)
}

const getWorkout = async (req, res) => {
    if(!isValid(req.params.id)){
        return res.status(404).json({message: "No such Workout"})
    }
    const workout = await Workout.findOne({_id: req.params.id})
    if (!workout) {
        return res.status(404).json({message: "No such Workout"})
    }
    res.status(200).json(workout)
}

const createWorkout = async (req, res) => {
    const { title, reps, weight } = req.body
    try {
        const workout = await Workout.create({title, reps, weight})
        res.status(200).json(workout)
    } catch (error) {
        res.json({error: error.message})
    }
}
const deleteWorkout = async (req, res) => {
    if(!isValid(req.params.id)){
        return res.status(404).json({message: "No such Workout"})
    }
    const workout = await Workout.findOneAndDelete({_id: req.params.id})
    if (!workout) {
        return res.status(404).json({message: "No such Workout"})
    }
    res.status(200).json(workout)
}
const updateWorkout = async (req, res) => {
    if(!isValid(req.params.id)){
        return res.status(404).json({message: "No such Workout"})
    }
    const workout = await Workout.findOneAndUpdate({_id: req.params.id}, {...req.body})
    if (!workout) {
        return res.status(404).json({message: "No such Workout"})
    }
    res.status(200).json(workout)
}

export {getWorkouts, getWorkout, createWorkout, deleteWorkout, updateWorkout}