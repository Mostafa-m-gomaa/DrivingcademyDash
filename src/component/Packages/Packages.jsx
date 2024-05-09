import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import { AppContext } from '../../App';
import road from '../../assets/road.jpg'
import './packs.css'
import { Link } from 'react-router-dom'

const Packages = () => {
    const [packages,setPackages]=useState([])
    const {route ,lang ,login} = useContext(AppContext)

    useEffect(()=>{
        fetch(`${route}/packages`,{
          headers :{
    "Authorization" :`Bearer ${sessionStorage.getItem("token")}`
    }
        })
        .then(res=>res.json())
        .then(data=>{
          console.log(data)
          if(data.data){
         setPackages(data.data)
          }
        })
      },[])
  return (
  <div className="packages">
    {/* <img className='road' src={road} alt="" /> */}
    <div className="container">
       <h1>our packages</h1>
       <div className="packs">
         {packages.map(pack=>{
            let title ,description 
            if(lang==="en"){
            title = pack.title_en  
            description = pack.desc_en  
            }
            else if(lang==="ar"){
                title = pack.title_ar
                description = pack.desc_ar
            }
            else if(lang==="hol"){
                title = pack.title_hol
                description = pack.desc_hol
            }
            return(
              <div className="card_box">
             <span><div className="price">{pack.price} $</div></span>
            <h2>{title}</h2>   
            <p>{description}</p>
            <div className="dur">for {pack.duration} days</div>
            <Link to={`/buy`} class="button2">buy now</Link>

              
         
              </div>
            )
         })}
       </div>
    </div>
  
  </div>
  )
}

export default Packages