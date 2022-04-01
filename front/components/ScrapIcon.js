import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { Tooltip, Modal } from 'antd';
import LoginForm from './LoginForm';

const IconWrapper = styled.div`
  position:absolute;
  right:20px; 
  top:20px;
`
const BeforeScrapIcon = styled(HeartOutlined)`
  font-size:3rem;
  color:#f5222d;
  cursor:pointer;
`;

const AfterScrapIcon = styled(HeartFilled)`
  font-size:3rem;
  color:#f5222d;
  cursor:pointer;
`;

export default function ScrapIcon({id}) {

  const [isScrapped, setIsScrapped] = useState(false)
  const [userId, setUserId] = useState('');

  const [isModalVisible, setIsModalVisible] = useState(false);
  
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  
  const movieId = id
  const BeforeScrap = () => {
    return (
      <IconWrapper onClick={scrapAdd}>
        <Tooltip placement="left" color="#2cd4ac" title="스크랩하기">
          <BeforeScrapIcon />
        </Tooltip>
      </IconWrapper>
    )
  }

  const AfterScrap = () => {
    return (
      <IconWrapper onClick={scrapDelete}>
        <Tooltip placement="left" color="#2cd4ac" title="스크랩취소">
          <AfterScrapIcon />
        </Tooltip>
      </IconWrapper>
    )
  }

  const scrapAdd = () => {
    if(userId) {
      axios
      .post(`${process.env.NEXT_PUBLIC_BASE_URL}/movies/scrap/${userId}/`, { "movie_id": movieId })
      .then(
        setIsScrapped(!isScrapped)
      );
    } else {
        const goLogin = confirm('영화를 스크랩하려면 로그인해주세요. 로그인하시겠습니까?')
        if (goLogin) showModal()
    }
  }

  const scrapDelete = () => {
    axios
      .post(`${process.env.NEXT_PUBLIC_BASE_URL}/movies/scrap_cancel/${userId}/`, { "movie_id": movieId })
      .then(
        setIsScrapped(!isScrapped)
      );
  }

  useEffect (() => {
    const userId = sessionStorage.getItem('id')
    setUserId(userId)
    if (userId) {
      axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/movies/scrap_check/${userId}/${movieId}/`)
      .then(res => {
        // console.log(res.data[0]);
        setIsScrapped(res.data[0]);
      });
    }
  }, [movieId])

  return isScrapped ? (
      <AfterScrap /> 
    ) : (
      <>
      <BeforeScrap />
        <Modal
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
        >
          <LoginForm setIsModalVisible={setIsModalVisible} />
        </Modal>
      </>
    )
}