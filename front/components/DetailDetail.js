import React, { useEffect } from 'react'

export default function DetailDetail({overview, youtube_url}) {
  return (
    <>
      <div className='container'>

        <div>
          <iframe src={youtube_url} className='youtube'></iframe>
        </div>

        <div className='overview'>
          {overview}
        </div>

      </div>
      <style jsx>
        {`
          .container{
            background:white;
            width:50%;
            height:50%;
            display:flex;
            align-items:center;
          }
          .youtube{
            width:300px;
            height:200px;
          }
          .overview{
            line-height:200%;
          }
        `}
      </style>
    </>
  )
}
