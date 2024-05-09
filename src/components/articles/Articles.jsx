import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import './article.css'
import { AppContext } from '../../App';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Articles = () => {
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const [title ,setTitle]=useState("")
  const [price ,setPrice]=useState("")
  const [disc ,setDisc]=useState("")
  const [articles ,setArticles]=useState([])
  const [showConfirm ,setShowConfirm]=useState(false)
  const [artId,setArtId]=useState("")
  const [refresh ,setRefresh]=useState(false)
  const {route ,setLoader ,filesRoute ,emp}=useContext(AppContext)
  const [photos ,setPhotos]=useState([])
  const [amount,setAmount]=useState("")

  const handlePhotoSelect = (event) => {
    const file = event.target.files[0];
    setPhotos([...photos, file]);
  };

  const handleTitle =(e)=>{
    setTitle(e.target.value)
  }

  const handleDisc =(e)=>{
    setDisc(e.target.value)
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0];
if (file && file.type.startsWith('image/')) {
  setImage(file);
} else {
  setImage(null);
}
};

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
const deleteButton =(id)=>{
  setShowConfirm(true)
  setArtId(id)
}
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoader(true)

    const formData = new FormData();
    formData.append('title', title);
    formData.append('desc',disc);
    formData.append('price',price);
    photos.forEach((image, index) => {
      formData.append(`images[]`, image);
    });

 
    try {
      const response = await fetch(`${route}/product`, {
        method: 'POST',
    
        headers:{
          "Authorization" :`Bearer ${sessionStorage.getItem("token")}`
        },
        body: formData,
      })
      .then(res=>res.json());
      setLoader(false)
      console.log(response)
      if (response.status=="success") {
  console.log(response)
  toast.success("تمت الأضافة")
  setRefresh(!refresh)
      } else {
        console.log(response)
        toast.error("هناك خطأ")
      }
    } catch (error) {
   
     
    }
  };

  const deleteArt =()=>{
    setLoader(true)
    setShowConfirm(false)
    fetch(`${route}/product/${artId}`,{
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
  const open =()=>{
    setLoader(true)
    fetch(`${route}/admin/openProfitCalculation`,{
      method:"PUT" ,
      headers :{
        "Authorization" :`Bearer ${sessionStorage.getItem("token")}`
      }
    })
    .then(res=>res.json())
    .then(data =>{console.log(data)
      setLoader(false)
      if(data.status === "success"){
        toast.success(data.msg)
      }
    })
  }
  const openSite =()=>{
    setLoader(true)
    fetch(`${route}/admin/openSite`,{
      method:"PUT" ,
      headers :{
        "Authorization" :`Bearer ${sessionStorage.getItem("token")}`
      }
    })
    .then(res=>res.json())
    .then(data =>{console.log(data)
      setLoader(false)
      if(data.status === "success"){
        toast.success(data.msg)
      }
    })
  }
  const close =()=>{
    setLoader(true)
    fetch(`${route}/admin/closeProfitCalculation`,{
      method:"PUT" ,
      headers :{
        "Authorization" :`Bearer ${sessionStorage.getItem("token")}`
      }
    })
    .then(res=>res.json())
    .then(data =>{
      setLoader(false) 
      if(data.status === "success"){
        toast.success(data.msg)
      }
    })
  }
  const closeSite =()=>{
    setLoader(true)
    fetch(`${route}/admin/closeSite`,{
      method:"PUT" ,
      headers :{
        "Authorization" :`Bearer ${sessionStorage.getItem("token")}`
      }
    })
    .then(res=>res.json())
    .then(data =>{
      setLoader(false) 
      if(data.status === "success"){
        toast.success(data.msg)
      }
    })
  }

  const charge =()=>{
    setLoader(true)
    fetch(`${route}/acc/chrageMyAcc`,{
      method:"PUT" ,
      headers :{
                'Content-Type': 'application/json',

        "Authorization" :`Bearer ${sessionStorage.getItem("token")}`
      },
      body:JSON.stringify({
        amount : amount
      })
    })
    .then(res=>res.json())
    .then(data => {
      console.log(data)
      setLoader(false)
      if(data.error === "Token expired" ){
        toast.error("قم بتسجيل الخروج و ادخل مرة اخري")
      }
      else if(data.status === "success"){
        toast.success("تم الشحن بنجاح")
      }
    })
  }
  

  useEffect(()=>{
    fetch(`${route}/product`)
    .then(res=>res.json())
    .then(data=>{
      if(data.data){
        setArticles(data.data)
        console.log(data.data)
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
{emp ? <div> غير مسموح لك بالاطلاع علي هذه التفاصيل</div>:    <div className="container">
        <div className="add">
          <h1>أضافة منتج</h1>
          <form action="" onSubmit={handleSubmit}>
          <label htmlFor="">
            <input type="text" onChange={handleTitle} />
            العنوان
          </label>
          <label htmlFor="">
            <input type="text" onChange={handleDisc} />
            الشرح
          </label>
          <label htmlFor="">
            <input type="text" onChange={(e)=>setPrice(e.target.value)} />
            السعر
          </label>
          <label class="custum-file-upload" for="file">
<div class="icon">
<svg xmlns="http://www.w3.org/2000/svg" fill="" viewBox="0 0 24 24"><g stroke-width="0" id="SVGRepo_bgCarrier"></g><g stroke-linejoin="round" stroke-linecap="round" id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"> <path fill="" d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z" clip-rule="evenodd" fill-rule="evenodd"></path> </g></svg>
</div>
<div class="text">
   <span>Upload your products images</span>
   </div>
   <input type="file" multiple onChange={handlePhotoSelect} id="file" />
</label>


      <div className="photos">     
         {photos.map((photo) => (
  <img src={URL.createObjectURL(photo)} alt={photo.name} />
))}</div>
            <button type='submit'>أضافة</button>
          </form>

         
        </div>
        <div className="all-art">
          <h1>المنتجات</h1>
          <div className="arts">
            {articles.map((art,index)=>{
              return(
                <div className="article-card" key={index}>
                  <div className="title">{art.title}</div>
                  <div className="desc">{art.desc}</div>
                  {art.images.map((img,index)=>{
                            if(index === 0){

                                return(
                                    <img src={`${filesRoute}/${img.image}`} />
                                )
                            }
                        })}
                  <div className="desc">{art.price}</div>
                  <button onClick={() => deleteButton(art.id)}>Delete</button>
                </div>
              )
            })}
          </div>
        </div>
        <h2>اغلاق الموقع</h2>
        {emp ? null :  <div className="controls">
          <div className="close" onClick={closeSite} >غلق</div>
        <div className="open" onClick={openSite} >فتح</div>
        </div>}
      
            <h2>حساب الارباح</h2>
        {emp ? null :  <div className="controls">
          <div className="close" onClick={close}>غلق</div>
          <div className="open" onClick={open}>فتح</div>
        </div> }
      
        <h2>شحن رصيد</h2>
        {emp ? null :    <div className="charge">
          <button onClick={charge} className='open'>شحن</button>
          <input onChange={(e)=>setAmount(e.target.value)} type="text" placeholder='القيمة' />
        </div> }
    
    </div> }
</div>
  )
}

export default Articles
