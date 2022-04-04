import React from 'react'
import { Card, Avatar, Col, Row, Checkbox  } from 'antd';

const { Meta } = Card;

const ScrapMovieInfo = ({movies, deleteScrapList}) => {

  const onErrorImg = e => {
    e.target.src = '/img/default_img.jpg';
  };

  const deleteCheck = (e, id) => {
    if (e.target.checked) {
      deleteScrapList.push(id)
    } else {
      deleteScrapList.pop(id)
    }
    
  }
  
  if (movies.length !== 0) {
    return (
      <Row>
        {movies.map(movie => {
          return (
            <Col xs={24} md={12} style={{ margin: '16px 0' }}>
              <Card
                style={{ margin: 'auto 16px',  height: '100%' }}
                key={movie.id}
              >
                <Checkbox 
                  style={{ position: 'absolute', top: '5px', left: '6px' }}
                  onClick={(e) => deleteCheck(e, movie.id)}
                />
                <Meta
                  avatar={<Avatar shape="square" size={100} src={movie.poster_path} alt={`${movie.title} 포스터 이미지`} onError={onErrorImg} />}
                  title={<><h4>{movie.title} <span style={{fontSize:'10px', color:'red', fontWeight:'bold'}}>{movie.vote_average? movie.vote_average : ''}</span></h4> </>}
                  description={<><p>개봉일: {movie.release_date}</p><p style={{marginBottom:'0'}}>줄거리: {movie.overview.slice(0, 50)}... <a href={`/movie/${movie.id}`}>자세히 보기</a></p></>}
                />
              </Card>
            </Col>
          );
        })}
      </Row>
    )
  } else {
    return (<p style={{textAlign:'center'}}>아직 스크랩한 영화가 없습니다.</p>)
  }
}

export default ScrapMovieInfo