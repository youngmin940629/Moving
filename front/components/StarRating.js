import axios from 'axios';
import jwtDecode from 'jwt-decode';
import React, { useEffect, useState } from 'react'

export default function StarRating({id}) {
  const [rating,setRating] = useState(0);
  const [user, setUser] = useState(null)
  const [originRating, setOriginRating] = useState(0);
  useEffect(()=>{

    const token = localStorage.getItem('JWT token');
    const decoded = jwtDecode(token);
    setUser(decoded.user_id);
    axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/movies/rating/${id}/${decoded.user_id}`)
    .then(function(res){
      if(res.data){
        setOriginRating(res.data);
        if(0<=res.data && res.data<2){
          setRating(2)
        }else if(2<=res.data && res.data<4){
          setRating(4)
        }else if(4<=res.data && res.data<6){
          setRating(6)
        }else if(6<=res.data && res.data<8){
          setRating(8)
        }else if(8<=res.data && res.data<=10){
          setRating(10)
        }
      }
    })

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
          console.log(res.data)
        }).catch(err=>console.log(err))
      }
    }
  },[rating])
  useEffect(()=>{
    const originRatingArr = new Array(5)
    for (let i = 0; i < originRatingArr.length; i++) {
      originRatingArr[i] = document.querySelector(`.star${i+1}`)
      if(originRating/2 > i) originRatingArr[i].style.color="#fc0"
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
