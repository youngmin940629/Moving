import React, { useEffect, useState } from 'react'

export default function WriteRating({setMyrank}) {
  const [rating,setRating] = useState(0);

  useEffect(()=>{
    const star_array = new Array(5)
    for (let i = 0; i < star_array.length; i++) {
      star_array[i] = document.querySelector(`.star${i+1}_write`)
    }
    const click = (i) => {
      for (let j = 0; j < star_array.length; j++) {
        star_array[j].style.color="#ccc";
      }
      for (let j = 0; j < i+1; j++) {
        star_array[j].style.color="#fc0"
      }
      setRating(((i)/5)*10)
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
    setMyrank(rating)
  },[rating])

  return (
    <>
    <div className="star-rating_write">
      <label className="star5_write">★</label>
      <label className="star4_write">★</label>
      <label className="star3_write">★</label>
      <label className="star2_write">★</label>
      <label className="star1_write">★</label>
    </div>
    <style jsx>
      {`
        .star-rating_write {
          display:flex;
          flex-direction: row-reverse;
          font-size:1.5em;
          text-align:center;
          width:5em;
        }
        .star-rating_write label {
          font-size:20px;
          color:#ccc;
          cursor:pointer;
        }
        .star-rating_write :checked ~ label {
          color:#f90;
        }
        .star-rating_write label:hover,
        .star-rating_write label:hover ~ label {
          color:#fc0;
        }
      `}
    </style>
    </>
  )
}
