import '../categories/categories.css'
import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import { AppContext } from '../../App';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

const Emps = () => {
  const {route ,setLoader ,filesRoute}=useContext(AppContext)
  const [title,setTitle]=useState("")
  const [refresh ,setRefresh]=useState(false)
  const [users,setUsers]=useState([])
  const [showConfirm ,setShowConfirm]=useState(false)
  const [catId,setCatId]=useState("")
  const [name,setName]=useState("")
  const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [showAddPack,setShowAddPack]=useState(false)
    const [packId,setPackId]=useState("")
    const [userId,setUserId]=useState("")
    const [amount,setAmount]=useState("")
    const [packages,setPackages]=useState([])

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoader(true)

    
    try {
      const response = await fetch(`${route}/subscriptions`, {
        method: 'POST',
        body: JSON.stringify({
          user : userId ,package : packId, amount: amount
        }),
        headers:{
          "Authorization" :`Bearer ${sessionStorage.getItem("token")}` ,
            "Content-Type": "application/json"
        }
      })
      .then(res=>res.json());
      setLoader(false)
      if (response.status=="success") {
  console.log(response)
  toast.success("تمت الأضافة")
  setRefresh(!refresh)
  setShowAddPack(false)
      } 
      else if(response.errors){
toast.error(response.errors.error)
      }
      else {
        console.log(response)
        toast.error("هناك خطأ")
      }
    } catch (error) {
   
     
    }
  };
  const deleteButton =(id)=>{
    setShowConfirm(true)
    setCatId(id)
  }

  const deleteCateg =()=>{
    setLoader(true)
    setShowConfirm(false)
    fetch(`${route}/mcateg/${catId}`,{
      method :"DELETE" ,
      headers :{
        "Authorization" :`Bearer ${sessionStorage.getItem("token")}`
      }
    })
    .then(res => res.json())
    .then(data => {
      setLoader(false)
      if(data.status === "success"){
toast.success("تم الحذف بنجاح")
setRefresh(!refresh)
      }
      else{
        toast.error("لم يتم الحذف")
      }
    })
  }
  const addPackBtn =(idUser )=>{

setUserId(idUser)
setShowAddPack(true)
  }


  useEffect(()=>{
    fetch(`${route}/users`,{
      headers :{
"Authorization" :`Bearer ${sessionStorage.getItem("token")}`
},
    })
    .then(res=>res.json())
    .then(data=>{
        console.log(data)
      if(data.data){
        setUsers(data.data)
      }
    })
  },[refresh])
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
  },[refresh])

  return (
<div className="categs">
{showConfirm ?   <div className="confirm">
    <div>هل انت متاكد انك تريد حذف هذا ؟</div>
    <div className="btns">
      <button onClick={deleteCateg} className='yes' >Yes</button>
      <button onClick={() => setShowConfirm(false)} className='no'>No</button>
    </div>
  </div> :null}
  {showAddPack ? <div className="add-pack">
    <div className="close" onClick={()=>setShowAddPack(false)}>
      x
    </div>
    <h1>Add Package</h1>
    <div className="add">
          <form action="" onSubmit={handleSubmit} >
   <label htmlFor="">
    <select name="" id="" onChange={(e)=>setPackId(e.target.value)}>
      <option value="">اختر الباقة</option>
      {packages.map((pack,index)=>{
        return(
          <option value={pack._id} key={index}>{pack.title_en}</option>
        )
      })}
    </select>
   </label>
          <label htmlFor="">
            <input type="text" onChange={(e)=>setAmount(e.target.value)} />
Amount
          </label>
      

            <button type='submit'>أضافة</button>
          </form>

         
        </div>

  </div>:null}
    <div className="container">

       <div className="all-categs">
        <h1>Users</h1>
    
        <div className="in-all-categ">
          {users.map((user,index)=>{
            return(
              <div className="user-card" key={index}>
                <div>{user.name} : الاسم</div>
                <div>{user.email} : الايميل</div>
      
                {/* <button onClick={() => deleteButton(art.id)}>Delete</button> */}
                <button className='add-pack-btn' onClick={()=>addPackBtn(user._id)}>add package</button>
              </div>
            )
          })}
        </div>

       </div>
    </div>
</div>
  )
}

export default Emps
