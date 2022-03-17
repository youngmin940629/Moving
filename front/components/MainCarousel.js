import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { MdArrowForwardIos, MdArrowBackIos } from 'react-icons/md';
import Router from 'next/router';
import axios from 'axios';
import styled from 'styled-components';

const StyledImg = styled.img`
  cursor: pointer;
  &:hover {
    border-color: transparent;
    box-shadow: 0 1px 2px -2px rgb(0 0 0 / 16%), 0 3px 6px 0 rgb(0 0 0 / 12%), 0 5px 12px 4px rgb(0 0 0 / 9%);
  }
`;

const MainCarousel = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/movies/')
    .then(res => {
      // console.log(res.data);
      setMovies(res.data);
    });
  }, []);

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
  const [imageIndex, setImageIndex] = useState(0);

  const settings = {
    infinite: true,
    lazyLoad: true,
    speed: 300,
    slidesToShow: 3,
    centerMode: true,
    centerPadding: 0,
    autoplay: true,
    autoplaySpeed: 5000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: (current, next) => setImageIndex(next),
  };
  return (
    <div className="App">
      <Slider {...settings}>
        {movies.map((movie, idx) => (
          <div
            className={idx === imageIndex ? 'slide activeSlide' : 'slide'}
            key={idx}
          >
            <StyledImg 
              src={movie.poster_path} 
              alt={`${movie.title} poster image`} 
              onClick={() => Router.push(`/movie/${movie.id}`)}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default MainCarousel;
