import React, { useCallback, useState } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import Link from 'next/link';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequestAction } from '../reducers/user';
import Router from 'next/router';
import useInput from '../hooks/useInput';

const LogoWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const Logo = styled.img``;

const LoginFormWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const SignupLink = styled.div`
  margin-top: 10px;
  display: block;
`;

const LoginForm = () => {
  // antD 제공 함수 : onFinish / onFinishFailed
  // const onFinish = (values) => {
  //   console.log('Success:', values);
  // };
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const dispatch = useDispatch();
  const { isLoggingIn } = useSelector(state => state.user);
  const [id, onChangeId] = useInput();
  const [password, onChangePassword] = useInput();

  const onSubmitForm = useCallback(() => {
    dispatch(loginRequestAction({ id, password }));
    Router.push('/');
  }, [id, password]);

  return (
    <>
      <LogoWrapper>
        <Logo src="/img/logo-colored.png" />
      </LogoWrapper>
      <LoginFormWrapper>
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          // onFinish={onFinish}
          onFinish={onSubmitForm}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="E-mail"
            name="userEmail"
            rules={[
              {
                required: true,
                message: 'E-mail을 입력해주세요!',
              },
            ]}
          >
            <Input value={id} onChange={onChangeId} />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Password를 입력해주세요!',
              },
            ]}
          >
            <Input.Password value={password} onChange={onChangePassword} />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit" loading={isLoggingIn}>
              로그인
            </Button>
            <SignupLink>
              <Link href="/signup">회원가입</Link>
            </SignupLink>
          </Form.Item>
        </Form>
      </LoginFormWrapper>
    </>
  );
};

export default LoginForm;
