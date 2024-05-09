import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import '../articles/article.css'
import { AppContext } from '../../App';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactPlayer from 'react-player';


const Packages = () => {

  const [image, setImage] = useState(null);
  const [title ,setTitle]=useState("")
  const [vid ,setVid]=useState("")
  const [disc ,setDisc]=useState("")
  const [showConfirm ,setShowConfirm]=useState(false)
  const [artId,setArtId]=useState("")
  const [refresh ,setRefresh]=useState(false)
  const {route ,setLoader ,filesRoute}=useContext(AppContext)
  const [amount,setAmount]=useState("")
  const [packages,setPackages]=useState([])
  const [price,setPrice]=useState("")
  const [duration,setDuration]=useState("")
  const [titleAr,setTitleAr]=useState("")
  const [titleHol,setTitleHol]=useState("")
  const [descAr,setDescAr]=useState("")
  const [descHol,setDescHol]=useState("")
  const [descEn,setDescEn]=useState("")
  const [titleEn,setTitleEn]=useState("")
  

  const handleImageChange = (event) => {
    setVid("")
    const file = event.target.files[0];
if (file && file.type.startsWith('image/')) {
  setImage(file);
} else {
  setImage(null);
}
};

const deleteButton =(id)=>{
  setShowConfirm(true)
  setArtId(id)
}
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoader(true)



 
    try {
      const response = await fetch(`${route}/packages`, {
        method: 'POST',
    
        headers:{
          "Authorization" :`Bearer ${sessionStorage.getItem("token")}` ,
          "content-type": "application/json"
        },
        body: JSON.stringify({
          title_en:titleEn,
          title_ar:titleAr,
          title_hol:titleHol,
          desc_en:descEn,
          desc_ar:descAr,
          desc_hol:descHol,
 price,duration
        })
      })
      .then(res=>res.json());
      setLoader(false)
      console.log(response)
      if (response.data) {
  console.log(response)
  toast.success("تمت الأضافة")
  setRefresh(!refresh)
      } 
      else if(response.errors){
        toast.error(response.errors[0].msg)
      }
      else {
        console.log(response)
        toast.error("هناك خطأ")
      }
    } catch (error) {
   
     
    }
  };

  const deleteArt =()=>{
    setLoader(true)
    setShowConfirm(false)
    fetch(`${route}/packages/${artId}`,{
      method :"DELETE" ,
      headers :{
        "Authorization" :`Bearer ${sessionStorage.getItem("token")}`
      }
    })
    .then(res => {res.json()
      console.log(res)
            if(res.status === 200){
toast.success("تم الحذف بنجاح")
setRefresh(!refresh)
      }
   
      else{
        toast.error("لم يتم الحذف")
      }


    })
//     .then(data => {
//       setLoader(false)
//       console.log(data)
//       if(data.status === "success"){
// toast.success("تم الحذف بنجاح")
// setRefresh(!refresh)
//       }
   
//       else{
//         toast.error("لم يتم الحذف")
//       }
//     })
  }
  

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
<div className="articles">
{showConfirm ?   <div className="confirm">
    <div>هل انت متاكد انك تريد حذف هذا ؟</div>
    <div className="btns">
      <button onClick={deleteArt} className='yes' >Yes</button>
      <button onClick={() => setShowConfirm(false)} className='no'>No</button>
    </div>
  </div> :null}
    <div className="container">
        <div className="add">
          <h1>Add Package </h1>
          <form action="" onSubmit={handleSubmit}>
          <label htmlFor="">
            <input type="text" onChange={(e)=>setTitleEn(e.target.value)} />
            title-en
          </label>
          <label htmlFor="">
            <input type="text" onChange={(e)=>setTitleAr(e.target.value)} />
            title-ar
          </label>
          <label htmlFor="">
            <input type="text" onChange={(e)=>setTitleHol(e.target.value)} />
            title-hol
          </label>
          <label htmlFor="">
            <input type="text" onChange={(e)=>setDescEn(e.target.value)} />
            Description-en
          </label>
          <label htmlFor="">
            <input type="text" onChange={(e)=>setDescAr(e.target.value)} />
            Description-ar
          </label>
          <label htmlFor="">
            <input type="text" onChange={(e)=>setDescHol(e.target.value)} />
            Description-hol
          </label>
          <label htmlFor="">
            <input type="text" onChange={(e)=>setPrice(e.target.value)} />
            price
          </label>
          <label htmlFor="">
            <input type="text" onChange={(e)=>setDuration(e.target.value)} />
            duration
          </label>
    
 

 
            <button type='submit'>أضافة</button>
          </form>

         
        </div>
        <div className="all-art">
          <h1>Packages</h1>
          <div className="arts">
            {packages.map((art,index)=>{
              return(
                <div className="article-card" key={index}>
                  <div className="title">{art.title_en}</div>
                  <div className="desc">{art.desc_en}</div>
                  <div className="desc">price : {art.price} $</div>
                  <div className="desc">Duration : {art.duration}</div>
                  <img src={art.content} />
                  <button onClick={() => deleteButton(art._id)}>Delete</button>
                </div>
              )
            })}
          </div>
        </div>
           
    </div>
</div>
  )
}

export default Packages
