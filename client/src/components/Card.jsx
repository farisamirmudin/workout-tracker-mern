import { formatDistanceToNow as fmt } from "date-fns"

export const Card = ({ workout, handleClick }) => {
    return (
        <div className="px-6 py-4 bg-white rounded-md shadow-lg flex items-center justify-between">
            <div>
                <h3 className="text-2xl mb-2 text-cyan-400 font-medium">{workout.title}</h3>
                <p><strong>Reps:</strong> {workout.reps}</p>
                <p><strong>Weight:</strong> {workout.weight} (kg)</p>
                <p>{fmt(new Date(workout.createdAt), {addSuffix: true})}</p>
            </div>
            <button className="material-symbols-outlined" onClick={() => handleClick(workout._id)}>delete</button>
        </div>
    )
}