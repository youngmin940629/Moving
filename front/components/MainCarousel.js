import React, { useState } from 'react';
import Slider from 'react-slick';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';

const images = [
  '/img/poster1.jpg',
  '/img/poster2.jpg',
  '/img/poster3.jpg',
  '/img/poster4.jpg',
  '/img/poster5.jpg',
];

const MainCarousel = () => {
  const NextArrow = ({ onClick }) => {
    return (
      <div className="arrow next" onClick={onClick}>
        <FaArrowRight />
      </div>
    );
  };

  const PrevArrow = ({ onClick }) => {
    return (
      <div className="arrow prev" onClick={onClick}>
        <FaArrowLeft />
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
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: (current, next) => setImageIndex(next),
  };
  return (
    <div className="App">
      <Slider {...settings}>
        {images.map((img, idx) => (
          <div
            className={idx === imageIndex ? 'slide activeSlide' : 'slide'}
            key={idx}
          >
            <img src={img} alt={img} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default MainCarousel;
