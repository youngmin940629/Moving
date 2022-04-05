import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { LikeOutlined, LikeFilled } from '@ant-design/icons';
import styled from 'styled-components';
import { Tooltip, Button, Modal } from 'antd';
import LoginForm from './LoginForm';

const IconWrapper = styled(Button)`
  height:100%;
  color:#2cd4ac;
  margin:1.5rem auto;
  display:block;
`

const BeforeLikeIcon = styled(LikeOutlined)`
  font-size:1.5rem;
  color: #2cd4ac;
  cursor:pointer;
`;

const AfterLikeIcon = styled(LikeFilled)`
  font-size:1.5rem;
  color: #2cd4ac;
  cursor:pointer;
`;

export default function ReviewLike({userId, reviewId}) {

  const [likeCount, setLikeCount] = useState('')
  const [isLiked, setIsLiked] = useState(false)

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

  const Like = () => {
    return (
      <IconWrapper onClick={like}>
        {isLiked 
          && 
          <Tooltip placement="left" color="#2cd4ac" title="좋아요 취소">
            <AfterLikeIcon />
            <div>{likeCount}</div>
          </Tooltip> 
          || 
          <Tooltip placement="left" color="#2cd4ac" title="좋아요하기">
            <BeforeLikeIcon />
            <div>{likeCount}</div>
          </Tooltip>
        }
      </IconWrapper>
    )
  }

  const like = () => {
    if(userId) {
      axios
        .post(`${process.env.NEXT_PUBLIC_BASE_URL}/community/like/${reviewId}/${userId}/`)
        .then(res => {
          setIsLiked(res.data.liked)
          setLikeCount(res.data.count)
        });
    } else {
      const goLogin = confirm('리뷰 추천하려면 로그인해주세요. 로그인하시겠습니까?')
      if (goLogin) showModal()
    }
  }

  useEffect (() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/community/like/${reviewId}/${userId}`)
      .then(res => {
        setIsLiked(res.data.liked)
        setLikeCount(res.data.count)
      });
  }, [userId])

  return (
    <>
      <Like />
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