import { useContext, useState } from 'react'
import './login.css'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
    const [credentials, setCredientials] = useState({
        username:undefined,
        password:undefined 
    })
    const navigate = useNavigate()

    const {loading, error, dispatch} = useContext(AuthContext)

    const handleLogin   = async (e) => {
        e.preventDefault()
        dispatch({type:"LOGIN_START"})

        try {
        const res = await axios.post("/auth/login", credentials)
        dispatch({type: "LOGIN_SUCCESS", payload:res.data.details})
        navigate("/")
        } catch (err) {
            dispatch({type:"LOGIN_FAILURE", payload:err.response.data})

        }

    }

    const handleChange = (e) =>{
        setCredientials((prev)=> ({...prev, [e.target.id]: e.target.value}))  /// set creditial set to the input value 
    }

   
  return (
    <div className='login'>
        <div className="longinContainer">
           
            <input type="text"
             placeholder='username'
             onChange={handleChange} 
             className="lInput" 
              id='username' />

        <input type="password"
             placeholder='password'
             onChange={handleChange} 
             className="lInput" 
              id='password' />
              <button  onClick={handleLogin} className="lButton">Login</button>
              {error && <span>{JSON.stringify(error.message)}</span>}

        </div>
      
    </div>
  )
}

export default LoginPage
