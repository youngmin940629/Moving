import React, { useEffect, useState } from 'react';
import { Card, Input } from 'antd';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

const InputStyle = styled(Input)`
  width: 245px;
`;

const UserProfile = () => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState({
    username: '',
  });
  const [category, setCategory] = useState(null);
  useEffect(() => {
    setToken(localStorage.getItem('JWT token'));
  }, []);
  useEffect(() => {
    if (token) {
      setUser(jwt_decode(token));
    }
  }, [token]);
  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:8000/accounts/${user.user_id}`)
        .then(res => {
          console.log(res.data);
          setCategory(res.data.category_list);
          setUserInfo({
            username: res.data.username,
            username2: res.data.username2,
            birthDate: res.data.birthDate,
            gender: res.data.gender,
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [user]);
  return (
    <>
      {userInfo != null && category != null && (
        <div>
          <div>이메일 : {userInfo.username}</div>
          <div>닉네임: {userInfo.username2}</div>
          <div>성별: {userInfo.gender ? '남' : '여'}</div>
          <div>
            장르:
            {category.map((item, idx) => {
              return <span key={idx}>{item.name}</span>;
            })}
          </div>
          <div>생년월일: {userInfo.birthDate}</div>
        </div>
      )}
    </>
  );
};

export default UserProfile;
