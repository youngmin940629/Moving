import axios from 'axios';
import jwtDecode from 'jwt-decode';
import React, { useEffect, useState } from 'react'

export default function StarRating({id}) {
  const [rating,setRating] = useState(0);
  const [user, setUser] = useState(null)
  const [originRating, setOriginRating] = useState(null);
  
  useEffect(()=>{
    // console.log('영화바꼇다',id)
    let userid = sessionStorage.getItem('id')
    setRating(0)
    setUser(userid);
    if(userid){
      axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/movies/rating/${id}/${userid}`)
      .then(function(res){
        // console.log(res.data)
        // console.log(res.data=="")
        if (res.data=="") {
          // console.log('맞지?',originRating)
          setOriginRating(0)
          for (let i = 0; i < 5; i++) {
            let star_array = document.querySelector(`.star${i+1}`)
            star_array.style.color="#ccc"
          }
        } else {
          setOriginRating(res.data)
        }
      })
    }
  },[id])

  useEffect(()=>{
    const star_array = new Array(5)
    for (let i = 0; i < star_array.length; i++) {
      star_array[i] = document.querySelector(`.star${i+1}`)
      // console.log(star_array[i])
    }
    const click = (i) => {
      // console.log('!!')
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


    // let userid = sessionStorage.getItem('id')
    // setUser(userid);
    // if(userid){
    //   axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/movies/rating/${id}/${userid}`)
    //   .then(function(res){
    //     console.log(res.data)
    //     if (res.data) {
    //       setOriginRating(res.data)
    //     } else {
    //       setOriginRating(0)
    //     }
    //   })
    // }

    return ()=>{
      for (let i = 0; i < star_array.length; i++) {
        star_array[i].removeEventListener("click",()=>click(i))
      }
    }
  },[])

  useEffect(()=>{
    if(rating!==0){
      if(user !== null){
        let data = {
          movie:Number(id),
          user:user,
          rank:rating,
        }
        axios({
          url:`${process.env.NEXT_PUBLIC_BASE_URL}/movies/rating_movie/`,
          method:'post',
          data:data,
        }).then(function(res){
          // console.log(res.data)
        }).catch(err=>console.log(err))
      }
    }
  },[rating])

  useEffect(()=>{
    // console.log('originrating',originRating)
    const originRatingArr = new Array(5)
    for (let i = 0; i < originRatingArr.length; i++) {
      originRatingArr[i] = document.querySelector(`.star${i+1}`)
      if (originRating/2 > i) {
        originRatingArr[i].style.color="#fc0"
      } else {
        originRatingArr[i].style.color="#ccc"
      }
    }
  },[originRating])

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
