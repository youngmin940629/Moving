import React from 'react'
import { Card, Avatar, Col, Row  } from 'antd';

const { Meta } = Card;

const ScrapMovieInfo = ({movies}) => {

  const onErrorImg = e => {
    e.target.src = '/img/default_img.jpg';
  };
  
  if (movies.length !== 0) {
    return (
      <Row>
        {movies.map(movie => {
          return (
            <Col span={12} style={{ margin: '16px 0' }}>
              <Card
                style={{ margin: 16,  height:'100%' }}
                key={movie.id}
              >
                <input type="checkbox" />
                <Meta
                  avatar={<Avatar shape="square" size={100} src={movie.poster_path} alt={`${movie.title} 포스터 이미지`} onError={onErrorImg} />}
                  title={<><h4>{movie.title} <span style={{fontSize:'10px', color:'red', fontWeight:'bold'}}>{movie.vote_average}</span></h4> </>}
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