import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Typography, Card, Row, Col, Divider } from 'antd';
import Router from 'next/router';
const { Title } = Typography; // Typograpy.Title
const { Meta } = Card;

const IndexRecommend = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/movies/recommend1/`).then(res => {
      setMovies(res.data.slice(0, 6));
    });
  }, []);

  return (
    <>
      <Divider orientation="left" orientationMargin="0">
        <Title level={2}>랜덤 추천 영화</Title>
      </Divider>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        {movies.map(movie => {
          return (
            <Col className="gutter-row" span={4} key={movie.id}>
              <Card
                style={{ height: '100%' }}
                hoverable
                cover={
                  <img
                    alt={`${movie.title} 포스터 이미지`}
                    src={movie.backdrop_path}
                  />
                }
                onClick={() => Router.push(`/movie/${movie.id}`)}
              >
                <Meta
                  title={movie.title}
                  description={`${movie.overview.slice(0, 100)}...`}
                />
              </Card>
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default IndexRecommend;
