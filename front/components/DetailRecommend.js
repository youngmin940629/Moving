import React from 'react'
import GenreRecommend from './DetailRecommend/genre'

export default function DetailRecommend() {
  return (
    <>
      <div className='container'>
        <GenreRecommend/>
      </div>
      <style jsx>
        {`
          .container{
            background:white;
            width:50%;
            height:50%;
          }
        `}
      </style>
    </>
  )
}
