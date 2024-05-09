import React, { useEffect } from 'react'
import './header.css'
import logo from '../../assets/fefef.jpeg'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from '../../App'

const Header = () => {
  const {login ,setLogin} = useContext(AppContext)
  useEffect(()=>{
    if (sessionStorage.getItem("token")) {
    
      setLogin(true);
    }
  },[])
  return (
   <div className="header">
    <div className="container">
        <img src={logo} alt="" />
        <div className="links">
<Link to="/">Home</Link>
<Link to="/">Contact</Link>
<Link to="/">About Us</Link>
<Link to="/packages">Packages</Link>
{login ? <Link to="/login" class="btn"><i class="animation"></i>Log Out<i class="animation"></i>
    </Link>: <Link to="/login" class="btn"><i class="animation"></i>Login<i class="animation"></i>
    </Link>}

        </div>
    </div>
   </div>
  )
}

export default Header