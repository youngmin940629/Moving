import React, { useCallback, useState } from 'react';
import { Button, Checkbox, Form, Input, Col } from 'antd';
import useInput from '../hooks/useInput';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { SIGN_UP_REQUEST } from '../reducers/user';


const ErrorMessage = styled.div`
  color: red;
`;

const LogoWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 20px;
`;

const Logo = styled.img``;

const SignupTitle = styled.h2`
  text-align: center;
  padding-bottom: 5px;
  font-weight: bold;
  color: #2CD4AC;
`;

const CheckboxWrapper = styled.div`
  margin: 20px auto 20px;
  display: flex;  
  justify-content: center;
`

const SignupButton = styled.div`
  margin: 10px;
  display: flex;  
  justify-content: center;
`;

const SignupForm = () => {
  const dispatch = useDispatch();
  const { signUpLoading } = useSelector(state => state.user);
  const [email, onChangeEmail] = useInput();
  const [nickname, onChangeNickname] = useInput();
  const [password, onChangePassowrd] = useInput();

  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const onChangePasswordCheck = useCallback(
    e => {
      setPasswordCheck(e.target.value);
      setPasswordError(e.target.value !== password);
    },
    [password]
  );

  const [term, setTerm] = useState('');
  const [termError, setTermError] = useState(false);
  const onChangeTerm = useCallback(e => {
    setTerm(e.target.checked);
    setTermError(false);
  }, []);

  const onSubmit = useCallback(() => {
    if (password !== passwordCheck) {
      return setPasswordError(true);
    }
    if (!term) {
      return setTermError(true);
    }
    console.log(email, nickname, passwordCheck);
    dispatch({
      type: SIGN_UP_REQUEST,
      data: { email, nickname, password },
    });
  }, [password, passwordCheck, term]);

  return (
    <>
      <LogoWrapper>
        <Logo src="/img/logo-colored.png" />
      </LogoWrapper>
      <SignupTitle>
       회원가입
      </SignupTitle>
      <Form 
        name="basic"
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 12,
        }}
        autoComplete="off"
        onFinish={onSubmit}>
        <Form.Item
          label="E-mail"
          name="user-email"
          type="email"
          rules={[
            {
              required: true,
              message: 'E-mail을 입력해주세요.',
            },
          ]}
        >
          <Input 
            type="email"
            placeholder="이메일 입력"
            value={email} 
            onChange={onChangeEmail} 
          />
        </Form.Item>
        <Form.Item
          label="닉네임"
          name="user-nickname"
          rules={[
            {
              required: true,
              message: '닉네임을 입력해주세요.',
            },
          ]}  
        >
          <Input
            placeholder="닉네임 입력"
            value={nickname}
            onChange={onChangeNickname}
          />
        </Form.Item>
        <Form.Item
          label="비밀번호"
          name="user-password"
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
            onChange={onChangePassowrd}
          />
        </Form.Item>
        
        <Form.Item
          label="비밀번호 확인"
          name="user-password-check"
          rules={[
            {
              required: true,
              message: '비밀번호 확인란을 입력해주세요.',
            },
          ]}
          style={{marginBottom:"0px"}}
        >
          <Input.Password
            placeholder="비밀번호 입력"
            value={passwordCheck}
            onChange={onChangePasswordCheck}
          />
        </Form.Item>
        <Col offset={6} span={6}>
          {passwordError && (
            <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>
          )}
        </Col>
        <CheckboxWrapper>
          <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>
            약관에 동의합니까?
          </Checkbox>
          {termError && (
            <ErrorMessage>약관에 동의하셔야 합니다.</ErrorMessage>
          )}
        </CheckboxWrapper>
        <SignupButton>
          <Button type="primary" htmlType="submit" loading={signUpLoading}>
            가입하기
          </Button>
        </SignupButton>
      </Form>
    </>
  );
};

export default SignupForm;