import './App.css';
import { BrowserRouter, Link, Route,Routes } from 'react-router-dom';
import Sidebar from './layout/Sidebar/Sidebar';
import ContentTop from './components/ContentTop/ContentTop';
import { createContext, useEffect, useState } from 'react';
import Login from './components/login/Login';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Employes from './components/emps/Employes';
import Packages from './components/activities/Activities';
import Exams from './components/exams/Exams';


export const AppContext =createContext()

function App() {
  const [headTitle,setHeadTitle]=useState("تسجيل الدخول")
  const [login,setLogin]=useState(false)
  // const [route ,setRoute]=useState("https://api.max-sy.com/api")
  const [filesRoute ]=useState("https://api.theoriehaast.nl/questionsImages")
  const [route, setRoute] = useState("https://api.theoriehaast.nl/api/v1");
  const [emp,setEmp]=useState(false)

  const [loader,setLoader]=useState(false)


  useEffect(()=>{
    
      setLogin(sessionStorage.getItem("login"))


  },[login])
  useEffect(()=>{
    
      setEmp(sessionStorage.getItem("emp"))


  },[emp])
  return (
    <AppContext.Provider value={{headTitle
    ,setHeadTitle ,
    route,
    login,
    setLogin ,
    setLoader ,
    emp,
    setEmp,
    filesRoute
    }}>
    <>
      <div className='app'>
      <ToastContainer />
{loader ? <div className="loader-cont">
<div class="banter-loader">
  <div class="banter-loader__box"></div>
  <div class="banter-loader__box"></div>
  <div class="banter-loader__box"></div>
  <div class="banter-loader__box"></div>
  <div class="banter-loader__box"></div>
  <div class="banter-loader__box"></div>
  <div class="banter-loader__box"></div>
  <div class="banter-loader__box"></div>
  <div class="banter-loader__box"></div>
</div>
</div> : null}
        <Sidebar />
      <div className="the-content">
        <ContentTop />
       
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/users" element={<Employes/>} />
      <Route path="Packages" element={<Packages/>} />
      <Route path="Exams" element={<Exams/>} />

 
    </Routes>

      </div>
      </div>
    </>
    </AppContext.Provider>
  )
}

export default App
