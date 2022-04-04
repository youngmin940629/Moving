import React, { useCallback, useEffect, useState } from 'react';
import { Button, Col, Form, Input, Modal, Select } from 'antd';
import styled from 'styled-components';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { useRouter } from 'next/router';
import UseInput from '../hooks/useInput';
import ImageUpload from './ImageUpload';

const MyButton = styled(Button)`
  width: 150px;
  margin: 10px;
`;

const ErrorMessage = styled.div`
  color: red;
`;

const LogoWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 20px;
`;

const SignupTitle = styled.h2`
  text-align: center;
  padding-bottom: 5px;
  font-weight: bold;
  color: #2cd4ac;
`;

const UserProfileModify = ({ imageUploader }) => {
  const router = useRouter();
  const [id, setId] = useState(null);
  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [category, setCategory] = useState(null);
  const [data, setData] = useState(null);
  const [category_list, setCategoryList] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [username2Check, setUsername2Check] = useState(false);
  const [password, onChangePassowrd] = UseInput();
  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [state, setState] = useState(false);
  const [image, setImage] = useState(null);
  const onChangePasswordCheck = useCallback(
    e => {
      setPasswordCheck(e.target.value);
      setPasswordError(e.target.value !== password);
    },
    [password]
  );

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
    // console.log('선택된 장르 : ', value);
    const temp = [];
    value.map(item => {
      temp.push(Number(item));
    });
    // console.log('temp', temp);
    setCategoryList(temp);
    setState(true);
  }

  const nicknameCheckTrue = () => {
    alert('사용 불가능한 닉네임 입니다.');
    setUsername2Check(true);
  };

  const nicknameCheckFalse = () => {
    alert('사용 가능한 닉네임 입니다.');
    setUsername2Check(false);
    setState(true);
  };

  const handleOk = () => {
    axios
      .put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/accounts/changepassword/${id}/`,
        {
          password: password,
        }
      )
      .then(res => {
        console.log(res);
        setState(true);
        setIsModalVisible(false);
      })
      .catch(err => {
        console.log(err);
      });
    // setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const changePassword = () => {
    console.log('비밀번호 바꾸기');
    setIsModalVisible(true);
  };

  const onSubmit = () => {
    console.log('닉네임 수정', userInfo.username2);
    console.log('장르 수정', category_list);
    const data = {
      username2: userInfo.username2,
      category_list: category_list,
      picture: image,
    };
    // console.log('data', data);

    axios({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/accounts/edit/${id}/`,
      method: 'put',
      data: data,
    })
      .then(res => {
        // console.log(res);
        alert('프로필이 수정되었습니다. 프로필 페이지로 이동합니다.');
        router.push('/profile');
      })
      .catch(err => {
        console.log(err);
      });
  };
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/movies/genre_list/`)
      .then(res => {
        setData(res.data);
      });
  }, []);

  useEffect(() => {
    setId(sessionStorage.getItem('id'));
  }, []);

  useEffect(() => {
    if (id) {
      axios
        .get(`${process.env.NEXT_PUBLIC_BASE_URL}/accounts/${id}`)
        .then(res => {
          setCategory(res.data.category_list);
          const temp = [];
          res.data.category_list.map(item => {
            temp.push(item.id);
            setCategoryList(temp);
          });
          setUserInfo({
            username: res.data.username,
            username2: res.data.username2,
            birthDate: res.data.birthDate,
            gender: res.data.gender,
            picture: res.data.picture,
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [id]);
  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: '600px', display: 'inline-block' }}>
          {userInfo != null && category != null && (
            <div style={{ width: '100%' }}>
              <div
                style={{
                  textAlign: 'center',
                  width: '100%',
                  borderRadius: '10px',
                }}
              >
                <div>
                  <SignupTitle>프로필 수정</SignupTitle>
                  <div>
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
                      <ImageUpload
                        setState={setState}
                        userInfo={userInfo}
                        imageUploader={imageUploader}
                        image={image}
                        setImage={setImage}
                      />
                      <Form.Item label="이메일">
                        <span>{userInfo.username}</span>
                      </Form.Item>
                      <Form.Item label="비밀번호">
                        <span>
                          <a onClick={changePassword}>비밀번호 변경하기</a>
                        </span>
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
                        <Button
                          onClick={() => {
                            axios
                              .post(
                                `${process.env.NEXT_PUBLIC_BASE_URL}/accounts/isexist/`,
                                {
                                  username2: userInfo.username2,
                                }
                              )
                              .then(res => {
                                res.data
                                  ? nicknameCheckTrue()
                                  : nicknameCheckFalse();
                              })
                              .catch(err => {
                                console.log(err);
                              });
                          }}
                        >
                          중복확인
                        </Button>
                      </Form.Item>
                      <Form.Item label="성별">
                        <span>{userInfo.gender ? '남' : '여'}</span>
                      </Form.Item>
                      <Form.Item label="생년월일">
                        <span>{userInfo.birthDate}</span>
                      </Form.Item>
                      <Form.Item label="선호 장르">
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
                  <div>
                    <MyButton
                      shape="round"
                      size="large"
                      onClick={() => {
                        router.back();
                      }}
                    >
                      취소
                    </MyButton>
                    {state ? (
                      <MyButton
                        type="primary"
                        shape="round"
                        size="large"
                        onClick={onSubmit}
                      >
                        확인
                      </MyButton>
                    ) : (
                      <MyButton shape="round" size="large" disabled>
                        확인
                      </MyButton>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
          <Modal
            title="비밀번호 변경"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            okText="변경"
            cancelText="취소"
          >
            <Form
              name="basic2"
              labelCol={{
                span: 6,
              }}
              wrapperCol={{
                span: 12,
              }}
              autoComplete="off"
            >
              <Form.Item label="새 비밀번호" name="user-password">
                <Input.Password
                  style={{ width: '100%' }}
                  placeholder="새 비밀번호를 입력해주세요."
                  value={password}
                  onChange={onChangePassowrd}
                />
              </Form.Item>
              <Form.Item label="새 비밀번호 확인" name="user-password-check">
                <Input.Password
                  style={{ width: '100%' }}
                  placeholder="새 비밀번호를 입력해주세요."
                  value={passwordCheck}
                  onChange={onChangePasswordCheck}
                />
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default UserProfileModify;
