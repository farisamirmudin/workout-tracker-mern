import Nav from './components/Nav'
import { Body } from './components/Body'
import { WorkoutProvider } from './context/workoutContext'
function App() {

  return (
    <div className="bg-slate-100 h-screen font-poppins">
      <Nav />
      <WorkoutProvider>
        <Body />
      </WorkoutProvider>
    </div>
  )
}

export default App
