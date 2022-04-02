import React from 'react';
import { Avatar } from 'antd'
import DetailOverviewModal from './DetailOverviewModal';

export default function DetailDetail({detail}) {
  const {title, youtube_url, release_date, overview, casts, genres, poster_path} = detail

  return (
    <>
      <div className='container'>
        <div>
          {youtube_url ? 
            <iframe src={youtube_url} className='youtube'></iframe> 
            : 
            <img className="poster" src={poster_path} />} 
            {/* youtube_url 없는 경우 poster 표시 */}
        </div>

        <div className='contents'>
          <p>장르 : {genres.map((genre, index) => <span>{genre.name}{index+1<genres.length? ',':''}&nbsp;</span>)}</p>
          <p>개봉일 : {release_date}</p>
          <Avatar.Group
            maxCount={3}
            maxStyle={{
              color: '#2cd4ac',
              backgroundColor: '#fde3cf',
            }}
            >
            {casts.map((cast) => <Avatar src={cast.profile_path} />)}
          </Avatar.Group>
          <p>출연 : {casts.map((cast, index) => <span>{cast.name}{index+1<genres.length? ',':''}&nbsp;</span>)}</p>
          <p className="overview">줄거리 : {overview.length < 400 ? 
            <>{overview}</> : <>{overview.substring(0, 400)}...&nbsp;<DetailOverviewModal title={title} overview={overview}/></>}
          </p>
        </div>
      </div>
      <style jsx>
        {`
          .container{
            background:rgba(0, 0, 0, 0.7);
            width:60%;
            height:50%;
            display:flex;
            align-items:center;
            padding: 15px 10px;
            margin: 10px 0;
          }
          .youtube{
            width:300px;
            height:200px;
            border:0;
          }
          .poster{
            height: 300px;
          }
          .contents{
            padding: 10px 0 0 15px;
            color: white;
          }
          .overview{
            line-height:200%;
          }
        `}
      </style>
    </>
  )
}
