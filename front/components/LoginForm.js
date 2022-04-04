import React, { useCallback } from 'react';
import { Form, Input, Button } from 'antd';
import Link from 'next/link';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { loaduserRequestAction, loginRequestAction } from '../reducers/user';
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

const LoginLinkWrapper = styled.div`
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
            wrapperCol={{
              span: 24,
            }}
          >
            <Button 
              style={{ width: '100%', backgroundColor: '#2cd4ac', borderColor: 'transparent' }}
              type="primary"
              htmlType="submit"
              loading={loginLoading}
            >
              로그인
            </Button>
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
