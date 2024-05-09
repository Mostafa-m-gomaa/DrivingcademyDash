import '../categories/categories.css'
import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import { AppContext } from '../../App';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useParams } from 'react-router-dom';

const Profits = () => {
  const {route ,setLoader ,filesRoute}=useContext(AppContext)
  const [refresh ,setRefresh]=useState(false)
  const [profits,setProfits]=useState([])
  const [week,setWeek]=useState(0)
  const param =useParams()
 
  const search =()=>{
    setLoader(true)
    setRefresh(!refresh)
  }

  

  useEffect(()=>{
    fetch(`${route}/transactions/profits/${week}/${param.id}`,{
      headers :{
"Authorization" :`Bearer ${sessionStorage.getItem("token")}`
},
    })
    .then(res=>res.json())
    .then(data=>{
        console.log(data)
        if(data.status === "success"){
          setWeek(data.weekNumber)
          setProfits(data.data)
          setLoader(false)
        }
    })
  },[refresh])

  return (
<div className="categs">

    <div className="container">
       <div className="all-categs">
        <h1>الأرباح</h1>
        <label htmlFor="" className='hori-search'>
        ابحث بالاسبوع
        <input  value={week} onChange={(e)=>setWeek(e.target.value)} />
        <button onClick={search}>بحث</button>
      </label>
        {profits.length > 0 ?         <div className="in-all-categ">
          {profits.map((user,index)=>{
            return(
              <div className="user-card" key={index}>
                <div>{user.amount}</div>
                
              </div>
            )
          })}
        </div>: <div className="no-data">لا يوجد ارباح لهذا الاسبوع</div>}


       </div>
    </div>
</div>
  )
}

export default Profits
