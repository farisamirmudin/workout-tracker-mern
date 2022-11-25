import { useState } from 'react'
import { Navigate } from 'react-router-dom'

const SignUp = () => {
  const [error, setError] = useState("")
  const [isSuccessful, setIsSuccessful] = useState(false)
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
    const res = await fetch('http://localhost:8081/api/user/signup', {
      method: 'POST',
      body: JSON.stringify(credential),
      headers: { 'Content-Type': 'application/json' }
    })
    const data = await res.json()
    if (res.ok) {
      setError("")
      setIsSuccessful(true)
      setCredential({ username: "", password: "" })
    } else {
      setError(data.error)
    }
  }
  if (isSuccessful) {
    return (
      <Navigate to="/login" />
    )
  }
  const style = "border border-[#E4E7EB] px-4 py-2 focus:outline-none rounded-lg bg-transparent"
  return (
    <div className="flex justify-center">
      <div className='p-8 rounded-lg'>
        <p className='font-semibold text-xl'>Sign up</p>
        <form onSubmit={handleSubmit} className="flex flex-col my-4 gap-4">
          <input className={style} type="text" name="username" value={credential.username} placeholder="Username" onChange={handleChange} />
          <input className={style} type="password" name="password" value={credential.password} placeholder="Password" onChange={handleChange} />
          {error && <p className='text-sm text-red-700 italic'>* {error}</p>}
          <button className='px-4 py-2 rounded-lg bg-[#3e4c59]'>Sign up</button>
        </form>
      </div>
    </div>
  )
}

export default SignUp

