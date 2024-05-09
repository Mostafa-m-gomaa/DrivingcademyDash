import React from 'react'
import backGround from '../../../assets/alexandre-boucher-BNrlDv8w07Y-unsplash.jpg'
import logo from '../../../assets/fefef.jpeg'
import { Link } from 'react-router-dom'

import './landing.css'
const Landing = () => {
  return (
    <div className="landing">
        <img src={backGround} alt=""  className='backGround'/>
        <div className="container">
            <img src={logo} alt=""
            data-aos="fade-down"
            data-aos-duration="1500"
            />
<div className="txt" data-aos="fade-up"
     data-aos-duration="3000">
<h1>Theorie haast</h1>
 <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur nisi perspiciatis voluptate accusamus. Facilis pariatur enim non atque aut deleniti tempore, fugit, iste nihil quidem optio assumenda asperiores earum suscipit?</p>
<Link to="/login" className='btn'>Start Now</Link>
 </div> 
       </div>
    </div>
  )
}

export default Landing