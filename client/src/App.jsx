import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthContext } from "./context/authContext"
import { useContext } from 'react'
import Main from "./pages/Main"
import Navbar from "./components/Navbar"
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Footer from './components/Footer'

const App = () => {
  const { user } = useContext(AuthContext)
  return (
    <div className="flex flex-col min-h-screen font-poppins bg-[#1F2933] text-[#E4E7EB] md:px-40 px-12">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route 
            path="/"
            element={<Main />}
          />
          <Route 
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
          <Route 
            path="/signup"
            element={!user ? <SignUp /> : <Navigate to="/" />}
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
