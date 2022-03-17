import React, { useEffect, useState } from 'react'

export default function StarRating() {
  const [rating,setRating] = useState(0);
  useEffect(()=>{
    const star_array = new Array(5)
    for (let i = 0; i < star_array.length; i++) {
      star_array[i] = document.querySelector(`.star${i+1}`)
    }
    const click = (i) => {
      for (let j = 0; j < star_array.length; j++) {
        star_array[j].style.color="#ccc";
      }
      for (let j = 0; j < i+1; j++) {
        star_array[j].style.color="#fc0"
      }
      setRating(((i+1)/5)*10)
    }
    for (let i = 0; i < star_array.length; i++) {
      star_array[i].addEventListener("click",()=>click(i))
    }
    return ()=>{
      for (let i = 0; i < star_array.length; i++) {
        star_array[i].removeEventListener("click",()=>click(i))
      }
    }
  },[])
  useEffect(()=>{
    console.log(rating)
  },[rating])
  return (
    <>
    <div className="star-rating">
      <label className="star5">★</label>
      <label className="star4">★</label>
      <label className="star3">★</label>
      <label className="star2">★</label>
      <label className="star1">★</label>
    </div>
    <style jsx>
      {`
        .star-rating {
          display:flex;
          flex-direction: row-reverse;
          font-size:1.5em;
          justify-content:space-around;
          padding:0 .2em;
          text-align:center;
          width:5em;
        }
        .star-rating label {
          font-size:50px;
          color:#ccc;
          cursor:pointer;
        }
        .star-rating :checked ~ label {
          color:#f90;
        }
        .star-rating label:hover,
        .star-rating label:hover ~ label {
          color:#fc0;
        }
      `}
    </style>
    </>
  )
}
