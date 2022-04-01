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
                <Title level={2}><MdPlayCircleFilled style={{color:'#2cd4ac'}}/>&nbsp;{item[0]}<span style={{fontSize:'20px', color:'grey'}}>(선호 장르별 추천)</span></Title>
              </Divider>
              <Slider {...settings}>
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
                          height="300"
                        />
                      }
                      onClick={() => Router.push(`/movie/${item2.id}`)}
                    >
                      <Meta
                        title={
                          <b>{item2.title}&nbsp;<span style={{fontSize:'5px', color:'green'}}>{item2.vote_average}</span></b>
                        }
                        description={item2.release_date ? `개봉일: ${item2.release_date.slice(0, 4)}년 ${item2.release_date.slice(5, 7)}월 ${item2.release_date.slice(8, 10)}일` : '개봉일: 미정'}
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
