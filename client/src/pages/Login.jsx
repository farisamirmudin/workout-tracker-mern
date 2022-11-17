import { useState, useContext } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { AuthContext } from '../context/authContext'

const Login = () => {
  const { user, dispatch } = useContext(AuthContext)
  const [error, setError] = useState("")
  const [credential, setCredential] = useState({
    username: "",
    password: ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setCredential(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch('http://localhost:8081/api/user/login', {
      method: 'POST',
      body: JSON.stringify(credential),
      headers: { 'Content-Type': 'application/json' }
    })
    const data = await res.json()
    if (res.ok) {
      setError("")
      setCredential({ username: "", password: "" })
      localStorage.setItem('user', JSON.stringify(data))
      dispatch({ type: "LOGIN", payload: data })
    } else {
      setError(data.error)
    }
  }
  if (user) {
    return (
      <Navigate to="/" />
    )
  }
  const style = "border border-[#E4E7EB] px-4 py-2 focus:outline-none rounded-lg bg-transparent"
  return (
    <div className="flex justify-center">
      <div className='p-8 bg-[#3e4c59] rounded-lg'>
        <p className='font-semibold text-xl'>Login</p>
        <form onSubmit={handleSubmit} className="flex flex-col my-4 gap-4">
          <input className={style} type="text" name="username" value={credential.username} placeholder="Username" onChange={handleChange} />
          <input className={style} type="password" name="password" value={credential.password} placeholder="Password" onChange={handleChange} />
          {error && <p className='text-sm text-red-700 italic'>* {error}</p>}
          <button className='px-4 py-2 rounded-lg bg-[#50A7D9]'>Login</button>
          <p className='text-center'>No Account? <Link to="/signup" className='text-[#50A7D9]'>Sign Up</Link></p>
        </form>
      </div>
    </div>
  )
}

export default Login

