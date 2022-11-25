import { useEffect, useContext } from "react"
import { Workout } from "./Workout"
import { WorkoutContext } from "../context/workoutContext"
import { AuthContext } from "../context/authContext"

const WorkoutField = () => {
  const { workouts, dispatch } = useContext(WorkoutContext)
  const { user } = useContext(AuthContext)

  useEffect(() => {
    const fetchWorkout = async () => {
      const res = await fetch('http://localhost:8081/api/workouts', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      const data = await res.json()
      dispatch({ type: "SET_WORKOUTS", payload: data })
    }
    fetchWorkout()
  }, [user])
  
  if (!workouts.length) {
    return (
      <div className="px-4 py-2 rounded-lg bg-[#3e4c59]">No workout</div>
    )
  }
  return (
    <div className="flex-1">
      {workouts && workouts.map(workout => <Workout workout={workout} key={workout._id} />)}
    </div>
  )
}
export default WorkoutField