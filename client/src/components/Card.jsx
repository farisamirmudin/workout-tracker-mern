import { formatDistanceToNow } from 'date-fns'
export const Card = ({ workout, handleDelete }) => {
    return (
        <div className="p-4 shadow-lg bg-white">
            <div className="float-right mt-5">
                <button className="material-symbols-outlined" onClick={() => handleDelete(workout._id)}>delete</button>
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