import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import '../articles/article.css'
import { AppContext } from '../../App';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactPlayer from 'react-player';


const Exams = () => {

  const {route ,setLoader ,filesRoute }=useContext(AppContext)
  const [image, setImage] = useState(null);

  const [showConfirm ,setShowConfirm]=useState(false)
  const [artId,setArtId]=useState("")
  const [refresh ,setRefresh]=useState(false)
  const [titleAr,setTitleAr]=useState("")
  const [titleHol,setTitleHol]=useState("")
  const [descAr,setDescAr]=useState("")
  const [descHol,setDescHol]=useState("")
  const [descEn,setDescEn]=useState("")
  const [titleEn,setTitleEn]=useState("")
  const [data,setData]=useState([])
  const [pass,setPass]=useState("")
    const [packages,setPackages]=useState([])
    const [packageId,setPackageId]=useState("")
    const [showAdd,setShowAdd]=useState(false)
    const [answerStrEn,setAnswerStrEn]=useState("")
    const [answerStrAr,setAnswerStrAr]=useState("")
    const [answerStrHol,setAnswerStrHol]=useState("")
    const [questionEn,setQuestionEn]=useState("")
    const [questionAr,setQuestionAr]=useState("")
    const [questionHol,setQuestionHol]=useState("")
    const [answerEn,setAnswerEn]=useState([])
    const [answerAr,setAnswerAr]=useState([])
    const [answerHol,setAnswerHol]=useState([])
    const [examId,setExamId]=useState("")
    const [stage,setStage]=useState("")
    const [questions,setQuestions]=useState([])
    const [showQuestions,setShowQuestions]=useState(false)



  const handleImageChange = (event) => {
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
      const response = await fetch(`${route}/exams`, {
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
 package:packageId,
 passDegree:pass
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
  const handleSubmitQues = async (event) => {
    event.preventDefault();
    setLoader(true)
const answersEn = answerStrEn.split(",")
const answersAr = answerStrAr.split(",")
const answersHol = answerStrHol.split(",")
const formData = new FormData();
formData.append('question_en', questionEn);
formData.append('question_ar', questionAr);
formData.append('question_hol', questionHol);
formData.append('options_en', answersEn);
formData.append('options_ar', answersAr);
formData.append('options_hol', answersHol);
formData.append('answer_en', answerEn);
formData.append('answer_ar', answerAr);
formData.append('answer_hol', answerHol);
formData.append('stage', stage);
formData.append('image', image);


 
    try {
      const response = await fetch(`${route}/exams/addQuestion/${examId}`, {
        method: 'PUT',
    
        headers:{
          "Authorization" :`Bearer ${sessionStorage.getItem("token")}` ,
     
        },
        body: formData
      })
      .then(res=>res.json());
      setLoader(false)
      console.log(response)
      if (response.data) {
  console.log(response)
  toast.success("تمت الأضافة")
  // setShowAdd(false)
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
    fetch(`${route}/exams/${artId}`,{
      method :"DELETE" ,
      headers :{
        "Authorization" :`Bearer ${sessionStorage.getItem("token")}`
      }
    })
    .then(res => {res.json()
      console.log(res)
      setLoader(false)
            if(res.status === 200){
toast.success("تم الحذف بنجاح")
setRefresh(!refresh)
      }
   
      else{
        toast.error("لم يتم الحذف")
      }


    })

  }
  const deleteQues =(id)=>{
    setLoader(true)
    setShowConfirm(false)
    fetch(`${route}/exams/removeQuestion/${examId}`,{
      method :"PUT" ,
      headers :{
        "Authorization" :`Bearer ${sessionStorage.getItem("token")}` ,
        "content-type":"application/json"
      },
      body :JSON.stringify({
        questionId:id
      })
    })
    .then(res => {res.json()
      console.log(res)
      setLoader(false)
            if(res.status === 200){
toast.success("تم الحذف بنجاح")
setRefresh(!refresh)
getQuestions(examId)
      }
   
      else{
        toast.error("لم يتم الحذف")
      }


    })

  }

  const addQuestion =(id)=>{
    setShowAdd(true)
    setExamId(id)   

  }
  const getQuestions =(id)=>{
    setExamId(id)
    setLoader(true)

    fetch(`${route}/exams/${id}`,{
      headers :{
"Authorization" :`Bearer ${sessionStorage.getItem("token")}`

      }
    })
    .then(res=>res.json())
    .then(data=>{
      setLoader(false)
      console.log(data)
      if(data.data){
        setQuestions(data.data.questions)
        setShowQuestions(true)

      }
    })
  }
  

  useEffect(()=>{
    fetch(`${route}/exams`,{
      headers :{
"Authorization" :`Bearer ${sessionStorage.getItem("token")}`
}
    })
    .then(res=>res.json())
    .then(data=>{
      console.log(data)
      if(data.data){
     setData(data.data)
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
  {showAdd  ?
  <div className="add-question">
    <div className="close" onClick={()=>setShowAdd(false)}>x</div>
           <div className="add">
          <h1>Add Question </h1>
          <form action="" onSubmit={handleSubmitQues}>
          <label htmlFor="">
            <input type="text" onChange={(e)=>setQuestionEn(e.target.value)} />
            question-en
          </label>
          <label htmlFor="">
            <input type="text" onChange={(e)=>setQuestionAr(e.target.value)} />
            question-ar
          </label>
          <label htmlFor="">
            <input type="text" onChange={(e)=>setQuestionHol(e.target.value)} />
            question-hol
          </label>
          
          <label htmlFor="">
            <input onChange={(e)=>setAnswerStrEn(e.target.value)} type="text" />
            answers-en
        </label>
          <label htmlFor="">
            <input onChange={(e)=>setAnswerStrAr(e.target.value)} type="text" />
            answers-ar
        </label>
          <label htmlFor="">
            <input onChange={(e)=>setAnswerStrHol(e.target.value)} type="text" />
            answers-hol
        </label>
          <label htmlFor="">
        <select name="" id="" onChange={(e)=>setAnswerEn(e.target.value)}>
            <option value="">Select Answer</option>
            {answerStrEn.split(",").map((ans,index)=>{
                return(
                    <option value={ans} key={index}>{ans}</option>
                )
})
            }
        </select>
         correct answer -en
        </label>
          <label htmlFor="">
          <select name="" id="" onChange={(e)=>setAnswerAr(e.target.value)}>
            <option value="">Select Answer</option>
            {answerStrAr.split(",").map((ans,index)=>{
                return(
                    <option value={ans} key={index}>{ans}</option>
                )
})
            }
          </select>

            correct answer -ar
        </label>
          <label htmlFor="">
            <select name="" id="" onChange={(e)=>setAnswerHol(e.target.value)}>
            <option value="">Select Answer</option>
            {answerStrHol.split(",").map((ans,index)=>{
                return(
                    <option value={ans} key={index}>{ans}</option>
                )
})
            }
            </select>
            correct answer -hol
        </label>
          <label htmlFor="">
            <input type="file" onChange={handleImageChange}  />
            image
        </label>
          <label htmlFor="">
            <select name="" id="" onChange={(e)=>setStage(e.target.value)}>
            <option value="">Select Stage</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            </select>
         stage
        </label>
            <button type='submit'>أضافة</button>
          </form>

         
        </div>
  </div>
  : null}


  {showQuestions ? 
  <div className='show-ques'>
    <div className="close" onClick={(e)=>setShowQuestions(false)}>x</div>

    {questions.map((ques,index)=>{
      return(
        <div className='question-card' key={index}>
          <div className='question'>{ques.question_en}</div>
     
          <div className='answers'>
            {ques.options_en.map((ans,index)=>{
              return(
                <div className='ans' key={index}>{ans}</div>
              )
            })

            }

          </div>
          <div className='answer'>{ques.answer_en}</div>
          {/* <div className='stage'>stage: {ques.stage}</div> */}
          <img src={`${filesRoute}/${ques.image}`} />
          <button onClick={() => deleteQues(ques._id)}>Delete</button>
          
        </div>
      )
    }
    )}
  </div>  : null}
    <div className="container">
        <div className="add">
          <h1>Add Exam </h1>
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
            <input type="text" onChange={(e)=>setPass(e.target.value)} />
      pass degree
          </label>
            <label htmlFor="">
                <select onChange={(e)=>setPackageId(e.target.value)} name="" id="">
                    <option value="">Select Package</option>
                    {packages.map((pack,index)=>{
                        return(
                            <option value={pack._id} key={index}>{pack.title_en}</option>
                        )
                    })}
                </select>
                select package
            </label>
      
    
 

 
            <button type='submit'>أضافة</button>
          </form>

         
        </div>
        <div className="all-art">
          <h1>Exams</h1>
          <div className="arts">
            {data.map((art,index)=>{
              return(
                <div className="article-card" key={index}>
                  <div className="title">{art.title_en}</div>
                  <div className="desc">{art.desc_en}</div>
                  <div className="desc">pass degree: {art.passDegree} </div>
               
                  <img src={art.content} />
                  <button onClick={() => deleteButton(art._id)}>Delete</button>
                  <button className='add-ques' onClick={() => addQuestion(art._id)}>Add Question</button>
                  <button className='add-ques' onClick={() => getQuestions(art._id)}>Questions</button>
                </div>
              )
            })}
          </div>
        </div>
           
    </div>
</div>
  )
}

export default Exams
