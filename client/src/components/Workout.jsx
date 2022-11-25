import { formatDistanceToNow } from 'date-fns'
import { useContext } from 'react'
import { WorkoutContext } from '../context/workoutContext'
import { AuthContext } from "../context/authContext"
import { BsTrash } from 'react-icons/bs'

export const Workout = ({ workout }) => {
    const { user } = useContext(AuthContext)
    const { dispatch } = useContext(WorkoutContext)
    const deleteWorkout = async (_id) => {
        const res = await fetch(`http://localhost:8081/api/workouts/${_id}`, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const data = await res.json()
        if (res.ok) {
            dispatch({ type: "DELETE_WORKOUT", payload: data })
        }
    }
    return (
        <div className="px-4 py-2 rounded-lg bg-[#3e4c59] flex justify-between items-center gap-4">
            {/* left section */}
            <div className="flex-1">
                <p className="text-2xl">{workout.title}</p>
                <div className="flex items-center gap-4">
                    <p><strong>Reps:</strong> {workout.reps}</p>
                    <p><strong>Weight:</strong> {workout.weight} (kg)</p>
                    <p className='text-sm'>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
                </div>
            </div>
            {/* right section */}
            <BsTrash className='text-2xl hover:cursor-pointer rounded-full hover:opacity-80' onClick={() => deleteWorkout(workout._id)} />
        </div>
    )
}