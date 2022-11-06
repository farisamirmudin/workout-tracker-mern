import { useEffect, useState } from "react"
import { Card } from "./Card"

export const Main = () => {
    const [workout, setWorkout] = useState({
        title: "",
        reps: "",
        weight: ""
    })

    const [deleted, setDeleted] = useState({})
    const handleDelete = async (id) => {
        const res = await fetch(`http://localhost:8081/api/workouts/${id}`, {
            method: "DELETE"
        })
        const data = await res.json()
        console.log(data)
        if (res.ok) {
            setDeleted(data)
        }
    }

    const [workouts, setWorkouts] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('http://localhost:8081/api/workouts')
            const data = await res.json()
            setWorkouts(data)
        }
        fetchData()
    }, [workout, deleted])
    
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
        if (res.ok) {
            setWorkout({title: "", reps: "", weight: ""})
        } 
    }

    const info = Object.keys(workout).map(key => {
        return (
            <div key={key}>
                <label htmlFor={key} className="block">{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                <input 
                    className="border rounded-md w-full indent-2" 
                    type="text" 
                    id={key} 
                    name={key} 
                    value={workout[key]} 
                    onChange={handleChange}
                />
            </div> 
        )
    })
    

    return (
        <div className="flex space-x-4 p-12 justify-between items-start">
            <div className="grow space-y-4">
                {workouts && workouts.map(workout => <Card workout={workout} key={workout._id} handleClick={handleDelete} />)}
            </div>
            <form className="space-y-4 px-6 py-4 bg-white rounded-md shadow-lg" onSubmit={handleSubmit}>
                <h3 className="text-2xl text-cyan-400 font-medium">Add new workout activity</h3>
                {info}
                <button className='p-2 bg-cyan-400 text-white rounded-md hover:bg-cyan-300'>Add workout</button>
            </form>
        </div>
    )
}