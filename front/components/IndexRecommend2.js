import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Typography, Card, Row, Col, Divider } from 'antd';
import Router from 'next/router';
import Slider from 'react-slick';
import { MdArrowForwardIos, MdArrowBackIos, MdPlayCircleFilled } from 'react-icons/md';

const { Title } = Typography;
const { Meta } = Card;

const NextArrow = ({ onClick }) => {
  return (
    <div className="arrow next" onClick={onClick}>
      <MdArrowForwardIos />
    </div>
  );
};

const PrevArrow = ({ onClick }) => {
  return (
    <div className="arrow prev" onClick={onClick}>
      <MdArrowBackIos />
    </div>
  );
};

const IndexRecommend2 = ({ movies, setMovies }) => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    initialSlide: 0,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const onErrorImg = e => {
    e.target.src = '/img/default_img.jpg';
  };

  useEffect(() => {
    axios
      .get(
        `${
          process.env.NEXT_PUBLIC_BASE_URL
        }/movies/mf_user_recommend/${sessionStorage.getItem('id')}/`
      )
      .then(res => {
        console.log('res', res);
        setMovies(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Divider orientation="left" orientationMargin="0">
        <Title level={2}><MdPlayCircleFilled style={{color:'#2cd4ac'}}/>&nbsp;나와 비슷한 취향을 가진 사용자들이 시청한 영화</Title>
      </Divider>
      <Slider {...settings}>
        {movies.map(movie => {
          return (
            <Card
              key={movie.id}
              hoverable
              cover={
                <img
                  alt={`${movie.title} 포스터 이미지`}
                  src={movie.poster_path}
                  onError={onErrorImg}
                  height="300"
                />
              }
              onClick={() => Router.push(`/movie/${movie.id}`)}
            >
              <Meta
                title={
                  <b>{movie.title}&nbsp;<span style={{fontSize:'5px', color:'green'}}>{movie.vote_average? movie.vote_average : ''}</span></b>
                }
                description={movie.release_date ? `개봉일: ${movie.release_date.slice(0, 4)}년 ${movie.release_date.slice(5, 7)}월 ${movie.release_date.slice(8, 10)}일` : '개봉일: 미정'}
              />
            </Card>
          );
        })}
      </Slider>
    </>
  );
};

export default IndexRecommend2;
