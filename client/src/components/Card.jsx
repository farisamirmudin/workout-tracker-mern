import { formatDistanceToNow } from 'date-fns'
import { useContext } from 'react'
import { WorkoutContext } from '../context/workoutContext'
import { BsTrash } from 'react-icons/bs'

export const Card = ({ workout }) => {
    const {dispatch} = useContext(WorkoutContext)
    const deleteWorkout = async (_id) => {
        const res = await fetch(`http://localhost:8081/api/workouts/${_id}`, {
            method: "DELETE"
        })
        const data = await res.json()
        if (res.ok) {
            dispatch({type: "DELETE_WORKOUT", payload: data})
        }
    }
    return (
        <div className="p-4 shadow-lg bg-white">
            <div className="float-right mt-2 p-2 flex place-content-center hover:bg-slate-100 hover:rounded-full">
                <button onClick={() => deleteWorkout(workout._id)}><BsTrash className='text-2xl'/></button>
            </div>
            <div className="text-2xl mb-2 text-cyan-400 font-medium">{workout.title}</div>
            <div className="flex space-x-6">
                <p><strong>Reps:</strong> {workout.reps}</p>
                <p><strong>Weight:</strong> {workout.weight} (kg)</p>
                <p>{formatDistanceToNow(new Date(workout.createdAt), {addSuffix: true})}</p>
            </div>
        </div>
    )
}