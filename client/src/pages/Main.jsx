import { useContext } from 'react'
import WorkoutField from '../components/WorkoutField'
import WorkoutForm from '../components/WorkoutForm'
import { AuthContext } from '../context/authContext'

const Main = () => {
  const { user } = useContext(AuthContext)
  if (user) {
    return (
      <main className='flex flex-col lg:flex-row justify-between lg:items-start items-center gap-y-8'>
        <WorkoutField />
        <WorkoutForm />
      </main>
    )
  }
  return (
    <main className='flex flex-col items-center'>
      <p className='text-4xl mt-10 mb-4 md:w-3/4'>You love working out? Keep track of your workouts here</p>
      <p className='italic'>Sign up or log in to get started</p>
    </main>
  )
}

export default Main