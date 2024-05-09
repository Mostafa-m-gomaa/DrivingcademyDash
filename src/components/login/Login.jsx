import React, { useContext, useState } from 'react'
import './login.css'
import { AppContext } from '../../App'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const {route ,setLogin ,setEmp ,setLoader}=useContext(AppContext)
    const [email ,setEmail]=useState("")
    const [pass ,setPass]=useState("")
    const history=useNavigate()

    const handleEmail =(e)=>{
        setEmail(e.target.value)
    }

    const handlePass =(e)=>{
        setPass(e.target.value)
    }

    const handleLogin = async (event) => {
      event.preventDefault();
      setLoader(true)
    
      
      try {
        const response = await fetch(`${route}/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({email:email ,password:pass}),
        })
        .then(res=>res.json())
        console.log(response)
         setLoader(false)
        if (response.token) {
          sessionStorage.setItem("login",true)
          sessionStorage.setItem("token",response.token)
          sessionStorage.setItem("userName",response.data.name)
          sessionStorage.setItem("id",response.data.id)
          sessionStorage.setItem("email",response.data.email)
        
          history("/users")
          setLogin(true)
        } 
  
        
        else {
       toast.error(response.error)
         }
      } catch (error) {
        console.error("dd");
      
      }
    };
  return (
   <div className="login">
    <div className="container">
    <form class="form" onSubmit={handleLogin}>
تسجيل الدخول
    <input value={email} onChange={handleEmail} type="text" class="input" placeholder="Email" />
    <input value={pass} onChange={handlePass} type="text" class="input" placeholder="Password" /> 
    <button type='submit'>Submit</button>
</form>
    </div>
   </div>
  )
}

export default Login
