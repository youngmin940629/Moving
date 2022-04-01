import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Typography, Card, Row, Col, Divider } from 'antd';
import Router from 'next/router';
import Slider from 'react-slick';
import { MdArrowForwardIos, MdArrowBackIos, MdPlayCircleFilled } from 'react-icons/md';

const { Title } = Typography; // Typograpy.Title
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

const IndexRecommend = () => {
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

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/movies/recommend1/`)
      .then(res => {
        setMovies(res.data);
      });
  }, []);
  console.log(movies)

  return (
    <>
      <Divider orientation="left" orientationMargin="0">
        <Title level={2}><MdPlayCircleFilled style={{color:'#2cd4ac'}}/>&nbsp;랜덤 추천</Title>
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

export default IndexRecommend;
