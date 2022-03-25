import React, { useState, useEffect } from 'react'
import ScrapMovieInfo from './ScrapMovieInfo';
import axios from 'axios';
import styled from 'styled-components';

const ScrapMovieList = () => {

  const [movies, setMovies] = useState([]);
    
  const ScrapTitle = styled.h2`
  text-align: center;
  padding-bottom: 5px;
  font-weight: bold;
  color: #2cd4ac;
  `;
  useEffect(() => {
    const id = sessionStorage.getItem('id');
    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/movies/scrap/${id}/`)
      .then(res => {
        setMovies(res.data);
      });
  }, []);
  
  return (
    <>
      <ScrapTitle>스크랩한 영화</ScrapTitle>
      <ScrapMovieInfo movies={movies} />
    </>
  )
}

export default ScrapMovieList