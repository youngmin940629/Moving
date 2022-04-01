import React from 'react';
import GenreRecommend from './DetailRecommend/Genre';
import MovieMfRecommend from './DetailRecommend/MovieMf';

export default function DetailRecommend() {
  return (
    <>
      <div className="container">
        <GenreRecommend />
        <MovieMfRecommend />
      </div>
      <style jsx>
        {`
          .container {
            background: none;
            width: 50%;
            height: 50%;
          }
        `}
      </style>
    </>
  );
}
