import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Typography, Card, Row, Col, Divider } from 'antd';
import Router from 'next/router';
import Slider from 'react-slick';
import { MdArrowForwardIos, MdArrowBackIos } from 'react-icons/md';

// import styled from 'styled-components';

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

const IndexRecommend3 = () => {
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

  const [movies, setMovies] = useState(null);

  useEffect(() => {
    axios
      .get(
        `${
          process.env.NEXT_PUBLIC_BASE_URL
        }/movies/user_category_recommend/${sessionStorage.getItem('id')}/`
      )
      .then(res => {
        console.log('무비데이터', res);
        setMovies(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {movies !== null &&
        movies.map(item => {
          return (
            <div key={item}>
              <Divider orientation="left" orientationMargin="0">
                <Title level={2}>{item[0]}</Title>
              </Divider>
              <Slider {...settings}>
                {console.log('장르별 영화 추천', item[1])}
                {item[1].map(item2 => {
                  return (
                    <Card
                      key={item2.id}
                      hoverable
                      cover={
                        <img
                          alt={`${item2.title} 포스터 이미지`}
                          src={item2.poster_path}
                          onError={onErrorImg}
                          height="280"
                        />
                      }
                      onClick={() => Router.push(`/movie/${item2.id}`)}
                    >
                      <Meta
                        title={item2.title}
                        description={`${item2.overview.slice(0, 100)}...`}
                      />
                    </Card>
                  );
                })}
              </Slider>
            </div>
          );
        })}
    </>
  );
};

export default IndexRecommend3;
