import React, { useCallback, useEffect, useState } from 'react';
import { Button, Form, Input, Modal, Select, Tag } from 'antd';
import styled from 'styled-components';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import UseInput from '../hooks/useInput';
import { useRouter } from 'next/router';

const MyButton = styled(Button)`
  width: 150px;
  margin: 10px;
`;

const ErrorMessage = styled.div`
  color: red;
`;

const UserProfileModify = () => {
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [category, setCategory] = useState(null);
  const [data, setData] = useState(null);
  const [category_list, setCategoryList] = useState(null);

  const onChangeUserInfo = e => {
    setUserInfo({
      username: userInfo.username,
      username2: e.target.value,
      birthDate: userInfo.birthDate,
      gender: userInfo.gender,
    });
  };

  const children = [];
  if (data) {
    for (let i = 0; i < data.length; i++) {
      children.push(
        <Select.Option key={data[i].id}>{data[i].name}</Select.Option>
      );
    }
  }
  function handleChange(value) {
    console.log('선택된 장르 : ', value);
    const temp = { category_list: [] };
    value.map(item => {
      temp.category_list.push(Number(item));
    });
    console.log('temp', temp);
    setCategoryList(temp);
  }
  useEffect(() => {
    axios.get('http://localhost:8000/movies/genre_list/').then(res => {
      setData(res.data);
    });
  }, []);

  const onSubmit = () => {
    console.log('userInfo 수정', userInfo);
    console.log('장르 수정', category_list);
  };

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
        <div style={{ width: '100%' }}>
          <div
            style={{
              textAlign: 'center',
              border: '1px solid red',
              width: '100%',
            }}
          >
            <div>
              <h1>회원정보 수정</h1>
              <div style={{ border: '1px solid blue' }}>
                <Form
                  name="basic"
                  labelCol={{
                    span: 6,
                  }}
                  wrapperCol={{
                    span: 12,
                  }}
                  autoComplete="off"
                >
                  <Form.Item label="이메일">
                    <span>{userInfo.username}</span>
                  </Form.Item>
                  <Form.Item label="닉네임">
                    <span>
                      <Input
                        style={{ width: '50%' }}
                        placeholder="닉네임을 입력해주세요."
                        value={userInfo.username2}
                        onChange={onChangeUserInfo}
                      />
                    </span>
                  </Form.Item>
                  <Form.Item label="성별">
                    <span>{userInfo.gender ? '남' : '여'}</span>
                  </Form.Item>
                  <Form.Item label="생년월일">
                    <span>{userInfo.birthDate}</span>
                  </Form.Item>
                  <Form.Item label="좋아하는 장르">
                    <Select
                      mode="multiple"
                      allowClear
                      style={{ width: '50%' }}
                      placeholder="장르를 선택해주세요."
                      defaultValue={Object.values(
                        category.map(item => `${item.id}`)
                      )}
                      onChange={handleChange}
                    >
                      {children}
                    </Select>
                  </Form.Item>
                </Form>
              </div>
              <div style={{ border: '1px solid green' }}>
                <MyButton
                  type="primary"
                  shape="round"
                  size="large"
                  onClick={onSubmit}
                >
                  확인
                </MyButton>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserProfileModify;
