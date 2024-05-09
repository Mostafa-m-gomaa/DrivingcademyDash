import React, { useContext, useState, useEffect, createContext } from "react";
import { Route, Routes } from "react-router";
import './App.css'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./component/login/Login";
import "aos/dist/aos.css";
import AOS from "aos";
import Home from "./component/home/Home";
import Header from "./component/header/Header";
import Packages from "./component/Packages/Packages";
export const AppContext = createContext();

function App() {
  const [login, setLogin] = useState(false);
  const [token, setToken] = useState("");
  const [loader, setLoader] = useState(false);
  const [route, setRoute] = useState("https://api.theoriehaast.nl/api/v1");
  const [lang, setLang] = useState("en");
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      setLogin(true);
    }

  }, [login]);
  useEffect(() => {
    AOS.init();
  }, []);


  return (
    <AppContext.Provider value={{route ,setLoader ,
    login ,
    setLogin ,
    token ,
    setToken,
    lang,
    setLang}}>
    <>
    <ToastContainer />
    {loader ?
    <div className="loader-cont">

<div class="loader"></div>
    </div>
    :null}
    <Header />
    <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/packages" element={<Packages />} />
       

    </Routes>
 

    </>
    </AppContext.Provider>
  )
}

export default App
