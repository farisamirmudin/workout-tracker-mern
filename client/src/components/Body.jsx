import { useEffect, useState } from "react"
import { Card } from "./Card"

export const Body = () => {
    const [workout, setWorkout] = useState({
        title: "",
        reps: "",
        weight: ""
    })

    const handleDelete = async (id) => {
        const res = await fetch(`http://localhost:8081/api/workouts/${id}`, {
            method: "DELETE"
        })
        if (res.ok) {
            setWorkout({title: "", reps: "", weight: ""})
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
    }, [workout])
    
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
    const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1)
    }

    return (
        <div className="p-8 flex flex-col space-y-4 md:space-x-4 md:space-y-0 md:items-start md:flex-row">
            {workouts ? 
                <div className="flex-1 space-y-4">
                    {workouts.map(item => <Card workout={item} key={item._id} handleDelete={handleDelete} />)}
                </div> :
                <div>No Activity</div>
            }
            <form className="space-y-4 p-4 bg-white shadow-lg" onSubmit={handleSubmit}>
                <h3 className="text-2xl text-cyan-400 font-medium">Add new workout activity</h3>
                {["title", "reps", "weight"].map(item => 
                    <div key={item}>
                        <label htmlFor={item}>{capitalize(item)}</label>
                        <input
                            className="border mx-2 indent-2" 
                            type="text" 
                            id={item} 
                            name={item}
                            value={workout[item]} 
                            onChange={handleChange}
                        />
                    </div>)
                }
                <button className='p-2 bg-cyan-400 text-white rounded-md hover:bg-cyan-300'>Add workout</button>
            </form>
        </div>
    )
}