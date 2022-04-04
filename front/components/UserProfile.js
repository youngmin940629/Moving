import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Input, Modal, Row, Tag } from 'antd';
import { MailFilled } from '@ant-design/icons';
import { FaBirthdayCake } from 'react-icons/fa';
import { MdOutlineCategory } from 'react-icons/md';
import { RiGenderlessLine } from 'react-icons/ri';
import styled from 'styled-components';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import {
  loaduserRequestAction,
  LOAD_USER_REQUEST,
  withdrawalRequestAction,
} from '../reducers/user';
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

const UserProfile = () => {
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
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

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loaduserRequestAction(Number(sessionStorage.getItem('id'))));
  }, []);

  const deleteUser = () => {
    // 확인
    if (window.confirm('탈퇴하시겠습니까?')) {
      // 탈퇴
      dispatch(withdrawalRequestAction(sessionStorage.getItem('id')));
    } else {
      alert('탈퇴가 취소되었습니다.');
    }
  };

  const today = new Date()
  const birthDate = (yyyyMMdd) => {
    String(yyyyMMdd)
    var sYear = yyyyMMdd.substring(0,4);
    var sMonth = yyyyMMdd.substring(5,7);
    var sDate = yyyyMMdd.substring(8,10);

    return new Date(Number(sYear), Number(sMonth)-1, Number(sDate)); // 나이계산
  }


  const { me } = useSelector(state => state.user);
  useEffect(() => {
    if (me != null) {
      setCategory(me.data.category_list);
      setUserInfo({
        username: me.data.username,
        username2: me.data.username2,
        birthDate: me.data.birthDate,
        gender: me.data.gender,
        picture: me.data.picture || '/img/profile.png',
        scrap_count: me.data.scrap_movie.length
      });
    }
  }, [me]);

  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <div >
          {userInfo != null && category !== null && (
            <div>
              <div
                style={{
                  textAlign: 'center',
                  // width: '100%',
                  borderRadius: '10px',
                }}
              >
                <SignupTitle>프로필</SignupTitle>
                <div>
                  <Row justify="center">
                    <Col sm={24} md={15}>
                      <div className="card-container">
                        <header>
                          <img src={userInfo.picture} alt={`${userInfo.username2}_프로필 이미지`} />
                        </header>
                        <h1 className="bold-text">
                          {userInfo.username2} {userInfo.birthDate ? <span className="normal-text">({today.getFullYear() - birthDate(userInfo.birthDate).getFullYear()})</span> : <></>}
                        </h1>
                        <h2 className="normal-text"><MailFilled style={{color:'#2cd4ac'}} />&nbsp;e-mail : {userInfo.username}</h2>
                        <h2 className="normal-text"><FaBirthdayCake style={{color:'#2cd4ac'}} />&nbsp;생년월일 : {userInfo.birthDate}</h2>
                        <h2 className="normal-text"><RiGenderlessLine style={{color:'#2cd4ac'}} />&nbsp;성별 : {userInfo.gender ? '남' : '여'}</h2>
                        <h2 className="normal-text"><MdOutlineCategory style={{color:'#2cd4ac'}} />&nbsp;선호 장르 : {category.map(item => {
                              return (
                                <span key={item.id}>
                                  <Tag color="green">{item.name}</Tag>
                                </span>
                              );
                            })}
                        </h2>
                        <div className="social-container">
                          <div className="scraps">
                            <h1 className="bold-text" onClick={() => router.push('/scrap')}>{userInfo.scrap_count}</h1>
                            <h2 className="smaller-text" onClick={() => router.push('/scrap')}>Scraps</h2>
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <div>
                    <MyButton
                      type="primary"
                      shape="round"
                      size="large"
                      onClick={() => setVisible(true) & setMode('mod')}
                    >
                      회원정보 수정
                    </MyButton>
                    <MyButton
                      type="danger"
                      shape="round"
                      size="large"
                      onClick={() => setVisible(true) & setMode('del')}
                    >
                      회원 탈퇴
                    </MyButton>
                  </div>
                  <Modal
                    title="비밀번호 확인"
                    centered
                    visible={visible}
                    onOk={() => {
                      axios
                        .post(
                          `${process.env.NEXT_PUBLIC_BASE_URL}/accounts/login/`,
                          {
                            username: userInfo.username,
                            password: password,
                          }
                        )
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
                        회원님의 정보를 안전하게 보호하기 위해 비밀번호를 한번
                        더 확인해주세요.
                      </h3>
                      <Input.Password
                        style={{ width: '50%' }}
                        placeholder="비밀번호를 입력해주세요."
                        value={password}
                        onChange={onChangePassword}
                      />
                      {passwordError && (
                        <ErrorMessage>
                          비밀번호가 일치하지 않습니다.
                        </ErrorMessage>
                      )}
                    </div>
                  </Modal>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <style jsx>
        {`
          .card-container {
            background-color: white;
            height: auto;
            border-radius: 14px;
            box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
            margin-bottom: 20px;
          }
          
          header {
            background-color: #2cd3ac;
            background-position: 0px 0px;
            background-repeat: no-repeat;
            background-size: contain;
            text-align: center;
            border-top-left-radius: 14px;
            border-top-right-radius: 14px;
          }
          
          img {
            margin: auto;
            width: 100px;
            border: solid white 4px;
            border-radius: 50%;
            margin-top: 75px;
          }
          
          .bold-text {
            font-weight: bold;
            font-size: 1.1rem;
            text-align: center;
            padding: 10px 20px 0px 20px;
          }
          
          .normal-text {
            font-weight: normal;
            font-size: 0.95rem;
            color: hsl(0, 0%, 50%);
            text-align: center;
            padding-bottom: 10px;
          }
          
          /* SOCIAL STATS */
          .smaller-text {
            font-weight: normal;
            font-size: 0.7rem;
            color: hsl(0, 0%, 50%);
            text-align: center;
            letter-spacing: 1px;
            padding-bottom: 20px;
            line-height: 5px;
          }
          
          .social-container {
            display: flex;
            border-top: solid rgb(206, 206, 206) 1px;
            text-align: center;
          }
          .scraps {
            flex: 1;
            cursor: pointer;
          }
          .scraps:hover > .bold-text {
            color: #2cd4ac;
          }
        `}
      </style>
    </>
  );
};

export default UserProfile;
