import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Typography, Divider } from 'antd';
import Router, { useRouter } from 'next/router';
import Slider from 'react-slick';
import { MdArrowForwardIos, MdArrowBackIos } from 'react-icons/md';
import styled from 'styled-components';

const { Title } = Typography;

const MyNextArrow = styled(MdArrowForwardIos)`
  font-size: 20px;
  font-weight: bold;
  color: white;
  text-shadow: -1px 0 #000, 0 1px #000, 1px 0 #000, 0 -1px #000;
`;

const MyPrevArrow = styled(MdArrowBackIos)`
  font-size: 20px;
  font-weight: bold;
  color: white;
  text-shadow: -1px 0 #000, 0 1px #000, 1px 0 #000, 0 -1px #000;
`;

const NextArrow = ({ onClick }) => {
  return (
    <div className="arrow next" onClick={onClick}>
      <MyNextArrow />
    </div>
  );
};

const PrevArrow = ({ onClick }) => {
  return (
    <div className="arrow prev" onClick={onClick}>
      <MyPrevArrow />
    </div>
  );
};

const GenreRecommend = () => {
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

  const router = useRouter();
  const { query } = router;
  const movieId = query.id;

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/movies/genre_rec/${movieId}/`)
      .then(res => {
        setMovies(res.data);
      });
  }, [movieId]);

  if (movies.length !== 0) {
    return (
      <>
        <Divider orientation="left" style={{ marginBottom: '0'}}>
          <Title
            style={{
              color: 'white',
              fontWeight: 'bold',
              textShadow: '-1px 0 #000, 0 1px #000, 1px 0 #000, 0 -1px #000',
              fontSize: '20px',
            }}
            level={5}
          >
            비슷한 장르 영화 추천
          </Title>
        </Divider>
        <Slider {...settings}>
          {movies.map(movie => {
            return (
              <img
                className="posterImg"
                key={movie.id}
                alt={`${movie.title} 포스터 이미지`}
                src={movie.poster_path}
                onError={onErrorImg}
                onClick={() => Router.push(`/movie/${movie.id}`)}
              />
            );
          })}
        </Slider>
        <style jsx>
          {`
            .posterImg {
              cursor: pointer;
              height: 150px;
            }
            .posterImg:hover {
              box-shadow: 0 1px 8px black;
            }
          `}
        </style>
      </>
    );
  } else {
    return <></>
  }
};

export default GenreRecommend;
