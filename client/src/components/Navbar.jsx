import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context/authContext'
import { WorkoutContext } from '../context/workoutContext'

const Navbar = () => {
  const { user, dispatch: userDispatch } = useContext(AuthContext)
  const { dispatch: workoutDispatch } = useContext(WorkoutContext)
  const handleLogout = () => {
    userDispatch({ type: "LOGOUT" })
    workoutDispatch({ type: "SET_WORKOUTS", payload: [] })
    localStorage.removeItem('user')
  }
  if (user) {
    return (
      <nav className="py-6 flex items-center flex-col md:flex-row justify-center gap-y-4">
        <Link to="/" className="text-3xl">Workout Tracker</Link>
        <p className='md:ml-auto md:mx-4 text-sm'>{user.username}</p>
        <Link to='/' onClick={handleLogout} className='float-right px-4 py-2 rounded-lg border border-[#E4E7EB]'>Logout</Link>
      </nav>
    )
  }
  return (
    <nav className="py-6 flex items-center flex-col md:flex-row justify-center gap-y-4">
      <Link to="/" className="text-3xl">Workout Tracker</Link>
      <Link to='/login' className='px-4 py-2 rounded-lg border border-[#E4E7EB] md:ml-auto'>Log in</Link>
    </nav>
  )
}
export default Navbar