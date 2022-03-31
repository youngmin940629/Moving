import React, { useCallback, useEffect, useState } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import Link from 'next/link';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { loaduserRequestAction, loginRequestAction } from '../reducers/user';
import Router from 'next/router';
import useInput from '../hooks/useInput';

const LogoWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 20px;
`;

const Logo = styled.img``;

const LoginTitle = styled.h2`
  text-align: center;
  padding-bottom: 5px;
  font-weight: bold;
  color: #2cd4ac;
`;

const LoginFormWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const SignupLinkWrapper = styled.div`
  margin-top: 10px;
  display: block;
  text-align: center;
`;

const LoginForm = ({ setIsModalVisible }) => {
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const dispatch = useDispatch();
  const { loginLoading } = useSelector(state => state.user);
  const [username, onChangeUsername] = useInput();
  const [password, onChangePassword] = useInput();

  const onSubmitForm = useCallback(() => {
    dispatch(loginRequestAction({ username, password, setIsModalVisible }));
  }, [username, password]);

  return (
    <>
      <LogoWrapper>
        <Logo src="/img/logo-colored.png" />
      </LogoWrapper>
      <LoginFormWrapper>
        <Form
          name="basic"
          labelCol={{
            span: 7,
          }}
          wrapperCol={{
            span: 17,
          }}
          initialValues={{
            remember: false,
          }}
          // onFinish={onFinish}
          onFinish={onSubmitForm}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            type="email"
            label="E-mail"
            name="userusername"
            rules={[
              {
                required: true,
                message: 'E-mail을 입력해주세요.',
              },
            ]}
          >
            <Input
              placeholder="이메일 입력"
              type="username"
              value={username}
              onChange={onChangeUsername}
            />
          </Form.Item>
          <Form.Item
            label="비밀번호"
            name="password"
            rules={[
              {
                required: true,
                message: '비밀번호를 입력해주세요.',
              },
            ]}
          >
            <Input.Password
              placeholder="비밀번호 입력"
              value={password}
              onChange={onChangePassword}
            />
          </Form.Item>
          <Form.Item
            style={{justifyContent: 'center'}}
          >
            <Button 
              style={{
                width: '100%',
                height: '50px',
                backgroundColor: '#2cd4ac',
                borderColor: 'transparent',
                color: 'white',
                fontSize: '20px',
                fontWeight: 'bold',
              }}
              type="primary" 
              htmlType="submit" 
            >
              로그인
            </Button>
            <SignupLinkWrapper>
              <Link href="/signup">회원가입</Link>
            </SignupLinkWrapper>
          </Form.Item>
        </Form>
      </LoginFormWrapper>
      <LoginLinkWrapper>
        <Link href="/signup">회원가입 하러 가기</Link>
      </LoginLinkWrapper>
    </>
  );
};

export default LoginForm;
