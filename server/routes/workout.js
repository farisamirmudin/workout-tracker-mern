import express from 'express'
import {getWorkouts, getWorkout, createWorkout, deleteWorkout, updateWorkout} from '../controllers/workoutController.js'
import requireAuth from '../middleware/requireAuth.js'

const router = express.Router()
router.use(requireAuth)

// GET all workout
router.get('/', getWorkouts)

// GET a single workout
router.get('/:id', getWorkout)

// POST a new workout
router.post('/', createWorkout)

// DELETE a new workout
router.delete('/:id', deleteWorkout)

// PATCH a new workout
router.patch('/:id', updateWorkout)

export default router 