import express from 'express'
const router = express.Router()

// GET all workout
router.get('/', (req, res) => {
    res.json({message: 'get all'})
})

// GET a single workout
router.get('/:id', (req, res) => {
    res.json({message: 'get one'})

})

// POST a new workout
router.post('/', (req, res) => {
    res.json({message: 'post one'})

})

// DELETE a new workout
router.delete('/:id', (req, res) => {
    res.json({message: 'delete one'})

})
// PATCH a new workout
router.patch('/:id', (req, res) => {
    res.json({message: 'patch one'})

})



export { router as workoutRoutes }