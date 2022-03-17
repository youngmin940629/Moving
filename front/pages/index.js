import React from 'react';
import AppLayout from '../components/AppLayout';
import MainCarousel from '../components/MainCarousel';
import MoviePoster from '../components/MoviePoster';
import IndexRecommend from '../components/IndexRecommend';

const Home = () => {
  const poster = [1, 2, 3, 4, 5, 6, 7];

  return (
    <>
      <AppLayout>
        <MainCarousel />
        <IndexRecommend />
        <hr />
        <div>OO별 추천</div>
        <div
          style={{
            width: '90%',
            margin: '0 auto',
            paddingTop: '10px',
            overflow: 'hidden',
          }}
        >
          {poster.map((a, i) => {
            return <MoviePoster i={i} key={i} />;
          })}
        </div>
        <hr />
        <div>OO별 추천</div>
        <div
          style={{
            width: '90%',
            margin: '0 auto',
            paddingTop: '10px',
            overflow: 'hidden',
          }}
        >
          {poster.map((a, i) => {
            return <MoviePoster i={i} key={i} />;
          })}
        </div>
      </AppLayout>
    </>
  );
};

export default Home;
