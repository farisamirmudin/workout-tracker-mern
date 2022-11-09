import { useEffect, useState, useContext } from "react"
import { Card } from "./Card"
import { WorkoutContext } from "../context/workoutContext"

export const Body = () => {
    const {workouts, dispatch} = useContext(WorkoutContext)
    const [workout, setWorkout] = useState({
        title: "",
        reps: "",
        weight: ""
    })

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('http://localhost:8081/api/workouts')
            const data = await res.json()
            dispatch({type: "SET_WORKOUTS", payload: data})
        }
        fetchData()
    }, [])
    
    const handleChange = (event) => {
        const { name, value } = event.target
        setWorkout(prev => ({...prev, [name]: value}))
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const res = await fetch('http://localhost:8081/api/workouts', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {'Content-Type': 'application/json'}
        })
        const data = await res.json()
        if (res.ok) {
            setWorkout({title: "", reps: "", weight: ""})
            dispatch({type: "CREATE_WORKOUT", payload: data})
        } 
    }

    return (
        <div className="p-8 flex flex-col space-y-4 md:space-x-4 md:space-y-0 md:items-start md:flex-row">
            {workouts ? 
                <div className="flex-1 space-y-4">
                    {workouts.map(workout => <Card workout={workout} key={workout._id}/>)}
                </div> :
                <div>No workout</div>
            }
            <form className="flex flex-col space-y-2 p-4 bg-white shadow-lg" onSubmit={handleSubmit}>
                <h3 className="text-2xl text-cyan-400 font-medium">Add new workout activity</h3>

                <label htmlFor="title">Title</label>
                <input
                    className="border indent-2" 
                    type="text" 
                    id="title"
                    name="title"
                    value={workout.title} 
                    onChange={handleChange}
                />
                <label htmlFor="reps">Reps</label>
                <input
                    className="border indent-2" 
                    type="text" 
                    id="reps"
                    name="reps"
                    value={workout.reps} 
                    onChange={handleChange}
                />
                <label htmlFor="weight">Weight</label>
                <input
                    className="border indent-2" 
                    type="text" 
                    id="weight"
                    name="weight"
                    value={workout.weight} 
                    onChange={handleChange}
                />

                
                <button className='p-2 bg-cyan-400 text-white rounded-md hover:bg-cyan-300'>Add workout</button>
            </form>
        </div>
    )
}