import { useContext } from 'react'
import WorkoutField from '../components/WorkoutField'
import WorkoutForm from '../components/WorkoutForm'
import { AuthContext } from '../context/authContext'

const Main = () => {
  const { user } = useContext(AuthContext)
  if (user) {
    return (
      <main className='flex flex-col items-center lg:flex-row gap-4 lg:items-start'>
        <WorkoutField />
        <WorkoutForm />
      </main>
    )
  }
  return (
    <main className=''>
      <p className='my-6 text-2xl md:text-3xl lg:text-4xl'>You love working out? Keep track of your workouts here</p>
      <p className='italic'>Sign up or log in to get started</p>
    </main>
  )
}

export default Main