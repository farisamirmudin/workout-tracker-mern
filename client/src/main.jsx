import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { AuthProvider } from './context/authContext'
import { WorkoutProvider } from './context/workoutContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <WorkoutProvider>
        <App />
      </WorkoutProvider>
    </AuthProvider>
  </React.StrictMode>


)
