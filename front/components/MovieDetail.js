import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import StarRating from './StarRating';
import DetailMenu from './DetailMenu';
import ScrapIcon from './ScrapIcon';

export default function MovieDetail({ id, detail }) {
  const [isLogined, setIsLogined] = useState(false);
  useEffect(() => {
    if (localStorage.getItem('JWT token') === null) {
      setIsLogined(false);
    } else {
      setIsLogined(true);
    }
    // console.log(isLogined);
  }, []);
  return (
    <>
      <div className="container">
        <ScrapIcon id={id} />
        <div className="content">
          <h1 className="movie_title">
            {detail.title}
            <span style={{ fontSize: '30px', color: 'green' }}>
              &nbsp;{detail.vote_average ? detail.vote_average : ''}
            </span>
          </h1>
          {isLogined ? (
            <div className="star_rating">
              <StarRating id={id} />
            </div>
          ) : null}
          <div className="movie_menu">
            <DetailMenu isLogined={isLogined} id={id} detail={detail} />
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .container {
            width: 100%;
            height: 100vh;
            background: url(${detail.backdrop_path});
            background-size: 100% 100%;
            position: relative;
          }
          .content {
            padding-top: 5%;
            padding-left: 5%;
          }
          .movie_backdrop {
            width: 100%;
            height: auto;
          }
          .movie_title {
            color: white;
            font-weight: 700;
            font-size: xxx-large;
            font-weight: bold;
            text-shadow: -1px 0 #000, 0 1px #000, 1px 0 #000, 0 -1px #000;
          }
          .star_rating {
            margin-left: 4%;
          }
        `}
      </style>
    </>
  );
}
