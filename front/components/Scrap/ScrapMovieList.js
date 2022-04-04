import React, { useState, useEffect } from 'react'
import ScrapMovieInfo from './ScrapMovieInfo';
import axios from 'axios';
import styled from 'styled-components';
import { Button, Row } from 'antd';

const ScrapMovieList = () => {

  const [movies, setMovies] = useState([]);
  const [userId, setUserId] = useState('');
  const [check, setCheck] = useState(false);
    
  const deleteScrapList = [];

  const ScrapTitle = styled.h2`
  text-align: center;
  padding-bottom: 5px;
  font-weight: bold;
  color: #2cd4ac;
  `;

  const ScrapDeleteButton = () =>{
    if (movies.length !== 0) {
      return (
        <Row justify="end">
          <Button
            danger 
            type="primary"
            onClick={() => deleteScrap()}
          >스크랩 취소</Button>
        </Row>
      ) 
    } else {
      return <></>
    }
  }
  
  function deleteScrap() {
    if (deleteScrapList.length !== 0) {
      deleteScrapList.map(item => {
        axios
          .post(`${process.env.NEXT_PUBLIC_BASE_URL}/movies/scrap_cancel/${userId}/`,{ "movie_id": item })
          // .then(res => {
          //   console.log(res)
          // });
        
      })
      return (
        alert('스크랩이 취소되었습니다') & setCheck(!check)
      )
    } else {
      return alert('취소할 영화를 선택해주세요.')
    } 
  }

  useEffect(() => {
    const id = sessionStorage.getItem('id');
    setUserId(id);
    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/movies/scrap/${id}/`)
      .then(res => {
        setMovies(res.data);
      });
  }, [check]);
  
  return (
    <>
      <ScrapTitle>스크랩한 영화</ScrapTitle>
      <ScrapDeleteButton />
      <ScrapMovieInfo movies={movies} deleteScrapList={deleteScrapList}/>
    </>
  )
}

export default ScrapMovieList