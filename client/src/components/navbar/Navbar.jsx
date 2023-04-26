import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import './navbar.css';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
  const {user} = useContext(AuthContext)
  const navigate = useNavigate()
  const handleHome = () =>{
    navigate('/')
  }
  return (
    <div className='navbar'>
      <div className='navContainer'>
        <span onClick={handleHome} className='logo'>Gidbooking</span>
        {user ? user.username : <div className='navItems'>
            <button className='navButton'>LogIn</button>
            <button className='navButton'>Register</button>
        </div> }
      </div>
    </div>
  )
}

export default Navbar
