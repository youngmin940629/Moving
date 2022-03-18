import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Modal, Tag } from 'antd';
import styled from 'styled-components';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import UseInput from '../hooks/useInput';
import { useRouter } from 'next/router';
import Router from 'next/router';
import { useDispatch } from 'react-redux';
import { LOAD_USER_REQUEST, logoutRequestAction } from '../reducers/user';

const MyButton = styled(Button)`
  width: 150px;
  margin: 10px;
`;

const ErrorMessage = styled.div`
  color: red;
`;

const UserProfile = () => {
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState({
    username: '',
  });
  const [category, setCategory] = useState(null);
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [id, setId] = useState(null);

  const onChangePassword = e => {
    setPassword(e.target.value);
    setPasswordError(false);
  };

  const logout = () => {
    console.log(dispatch(logoutRequestAction()));
    Router.push('/');
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: LOAD_USER_REQUEST,
    });
  }, [LOAD_USER_REQUEST]);

  const deleteUser = () => {
    // 확인
    if (window.confirm('탈퇴하시겠습니까?')) {
      // 탈퇴
      axios
        .delete(`http://localhost:8000/accounts/${user.user_id}`)
        .then(res => {
          console.log(res.data);
          alert('탈퇴가 완료되었습니다. 메인페이지로 이동합니다.');
          logout();
        })
        .catch(err => {
          console.log(err);
          alert('처리 중 에러가 발생했습니다. 관리자에게 문의하세요.');
        });
    } else {
      alert('탈퇴가 취소되었습니다.');
    }
  };

  useEffect(() => {
    // setToken(localStorage.getItem('JWT token'));
    let id = sessionStorage.getItem('id');
    setId(id);
  }, []);

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:8000/accounts/${id}`)
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
  }, [id]);
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
              <h1>회원정보</h1>
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
                    <span>{userInfo.username2}</span>
                  </Form.Item>
                  <Form.Item label="성별">
                    <span>{userInfo.gender ? '남' : '여'}</span>
                  </Form.Item>
                  <Form.Item label="생년월일">
                    <span>{userInfo.birthDate}</span>
                  </Form.Item>
                  <Form.Item label="좋아하는 장르">
                    {category.map(item => {
                      return (
                        <span key={item.id}>
                          <Tag color="purple">{item.name}</Tag>
                        </span>
                      );
                    })}
                  </Form.Item>
                </Form>
              </div>
              <div style={{ border: '1px solid green' }}>
                <MyButton
                  type="primary"
                  shape="round"
                  size="large"
                  onClick={() => setVisible(true) & setMode('mod')}
                >
                  수정
                </MyButton>
                <MyButton
                  type="danger"
                  shape="round"
                  size="large"
                  onClick={() => setVisible(true) & setMode('del')}
                >
                  탈퇴
                </MyButton>
              </div>
              <Modal
                title="비밀번호 확인"
                centered
                visible={visible}
                onOk={() => {
                  console.log('password', password);
                  axios
                    .post('http://localhost:8000/accounts/login/', {
                      username: userInfo.username,
                      password: password,
                    })
                    .then(() => {
                      setVisible(false);
                      if (mode === 'mod') {
                        router.push('/profileModify');
                      } else {
                        deleteUser();
                      }
                    })
                    .catch(() => {
                      setPasswordError(true);
                    });
                }}
                onCancel={() => setVisible(false)}
                okText="확인"
                cancelText="취소"
                width="50%"
              >
                <div
                  style={{
                    width: '100%',
                    textAlign: 'center',
                  }}
                >
                  <h3>
                    회원님의 정보를 안전하게 보호하기 위해 비밀번호를 한번 더
                    확인해주세요.
                  </h3>
                  <Input.Password
                    style={{ width: '50%' }}
                    placeholder="비밀번호를 입력해주세요."
                    value={password}
                    onChange={onChangePassword}
                  />
                  {passwordError && (
                    <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>
                  )}
                </div>
              </Modal>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserProfile;
