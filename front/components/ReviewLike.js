import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { LikeOutlined, LikeFilled } from '@ant-design/icons';
import styled from 'styled-components';
import { Tooltip, Button } from 'antd';

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
        alert('리뷰를 좋아요하려면 로그인해주세요.')
    }
  }

  useEffect (() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/community/like/${reviewId}/${userId}`)
      .then(res => {
        setIsLiked(res.data.liked)
        setLikeCount(res.data.count)
      });
  }, [])

  return <Like />
}