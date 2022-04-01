import React, { useEffect, useState } from 'react';
import AppLayout from '../components/AppLayout';
import MainCarousel from '../components/MainCarousel';
import IndexRecommend from '../components/IndexRecommend';
import IndexRecommend2 from '../components/IndexRecommend2';
import { useDispatch, useSelector } from 'react-redux';
import IndexRecommend3 from '../components/IndexRecommend3';
import IndexRecommend4 from '../components/IndexRecommend4';
import IndexRecommend5 from '../components/IndexRecommend5';
import { Divider, Typography } from 'antd';
import { PlaySquareFilled } from '@ant-design/icons';
const { Title } = Typography;

const RecommendTitle = ({title, title2}) => {
  return (
    <>
      <Divider>
        <Title><PlaySquareFilled style={{color:'#2cd4ac'}}/>&nbsp;<span style={{color:'#2cd4ac'}}>{title}</span>&nbsp;{title2} 영화 추천</Title>
      </Divider>
    </>

  )
}

const Home = () => {
  const { me } = useSelector(state => state.user);
  const [movies, setMovies] = useState(null);
  return (
    <>
      <AppLayout>
        <MainCarousel />
        {me !== null && 
          <>
            <br />
            <br />
            <RecommendTitle title={`${me.data.username2}님`} title2="만을 위한" />
          </>
        }
        {/* 나와 비슷한 취향을 가진 사용자들이 시청한 영화 */}
        {me !== null && movies !== null && (
          <IndexRecommend2 movies={movies} setMovies={setMovies} />
        )}
        {/* 장르별 추천 영화 */}
        {me !== null && <IndexRecommend3 />}
        
        <br />
        <br />
        <RecommendTitle title="전체 User Data" title2="기반" />
        {/* 최신순 */}
        <IndexRecommend5 />
        {/* 평점순 */}
        <IndexRecommend4 />
        {/* 랜덤 추천 영화 */}
        <IndexRecommend />
      </AppLayout>
    </>
  );
};

export default Home;
