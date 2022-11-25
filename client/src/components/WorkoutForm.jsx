import { useState, useContext } from "react"
import { WorkoutContext } from "../context/workoutContext"
import { AuthContext } from "../context/authContext"

const WorkoutForm = () => {
  const { dispatch } = useContext(WorkoutContext)
  const { user } = useContext(AuthContext)
  const [workout, setWorkout] = useState({
    title: "",
    reps: "",
    weight: ""
  })
  const handleChange = (event) => {
    const { name, value } = event.target
    setWorkout(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const res = await fetch('http://localhost:8081/api/workouts', {
      method: 'POST',
      body: JSON.stringify(workout),
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const data = await res.json()
    if (res.ok) {
      setWorkout({ title: "", reps: "", weight: "" })
      dispatch({ type: "CREATE_WORKOUT", payload: data })
    }
  }
  const style = "border border-[#E4E7EB] px-4 py-2 focus:outline-none rounded-lg bg-transparent"

  return (
    <div className="px-8 py-4 flex-none rounded-lg">
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <h3 className="text-2xl font-medium">Add new workout</h3>
        <label htmlFor="title">Title</label>
        <input
          className={style}
          type="text"
          id="title"
          name="title"
          value={workout.title}
          onChange={handleChange}
        />
        <label htmlFor="reps">Reps</label>
        <input
          className={style}
          type="text"
          id="reps"
          name="reps"
          value={workout.reps}
          onChange={handleChange}
        />
        <label htmlFor="weight">Weight</label>
        <input
          className={style}
          type="text"
          id="weight"
          name="weight"
          value={workout.weight}
          onChange={handleChange}
        />
        <button className='my-4 p-2 bg-[#3e4c59] rounded-lg'>Add workout</button>
      </form>
    </div>
  )
}

export default WorkoutForm