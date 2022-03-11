import React, { useCallback, useEffect, useState } from 'react';
import {
  Button,
  Checkbox,
  Form,
  Input,
  Col,
  Select,
  DatePicker,
  Space,
  Radio,
} from 'antd';
import useInput from '../hooks/useInput';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { SIGN_UP_REQUEST } from '../reducers/user';
import axios from 'axios';

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
  color: #2cd4ac;
`;

const CheckboxWrapper = styled.div`
  margin: 20px auto 20px;
  display: flex;
  justify-content: center;
`;

const SignupButton = styled.div`
  margin: 10px;
  display: flex;
  justify-content: center;
`;

const options = [
  { label: '남', value: true },
  { label: '여', value: false },
];

const SignupForm = () => {
  const dispatch = useDispatch();
  const { signUpLoading } = useSelector(state => state.user);
  const [email, onChangeEmail] = useInput();
  const [username, onChangeUsername] = useInput();
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

  const [data, setData] = useState(null);
  const [genre, setGenre] = useState(null);
  const children = [];
  if (data) {
    for (let i = 0; i < data.length; i++) {
      children.push(<Select.Option key={i}>{data[i].name}</Select.Option>);
    }
  }
  function handleChange(value) {
    const temp = [];
    value.map(idx => {
      temp.push(data[idx].id);
    });
    setGenre(temp);
  }
  useEffect(() => {
    axios.get('http://localhost:8000/movies/genre_list/').then(res => {
      console.log(res.data);
      setData(res.data);
    });
  }, []);

  const [birthDate, setBirthDate] = useState(null);
  function onChange(date, dateString) {
    console.log(dateString);
    setBirthDate(dateString);
  }

  const [gender, setGender] = useState(null);
  const onChangeGender = e => {
    console.log(e.target.value);
    setGender(e.target.value);
  };

  const onSubmit = useCallback(() => {
    if (password !== passwordCheck) {
      return setPasswordError(true);
    }
    if (!term) {
      return setTermError(true);
    }
    console.log(email, username, passwordCheck);
    dispatch({
      type: SIGN_UP_REQUEST,
      data: { email, username, password, genre, birthDate, gender },
    });
  }, [password, passwordCheck, term, genre, birthDate, gender]);

  return (
    <>
      <LogoWrapper>
        <Logo src="/img/logo-colored.png" />
      </LogoWrapper>
      <SignupTitle>회원가입</SignupTitle>
      <Form
        name="basic"
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 12,
        }}
        autoComplete="off"
        onFinish={onSubmit}
      >
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
          name="user-username"
          rules={[
            {
              required: true,
              message: '닉네임을 입력해주세요.',
            },
          ]}
        >
          <Input
            placeholder="닉네임 입력"
            value={username}
            onChange={onChangeUsername}
          />
        </Form.Item>
        <Form.Item label="장르">
          <Select
            mode="multiple"
            allowClear
            style={{ width: '100%' }}
            placeholder="장르를 선택해주세요."
            onChange={handleChange}
          >
            {children}
          </Select>
        </Form.Item>
        <Form.Item label="생년월일">
          <Space direction="vertical">
            <DatePicker onChange={onChange} />
          </Space>
        </Form.Item>
        <Form.Item label="성별">
          <Radio.Group
            options={options}
            onChange={onChangeGender}
            value={gender}
            optionType="button"
            buttonStyle="solid"
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
          style={{ marginBottom: '0px' }}
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
          {termError && <ErrorMessage>약관에 동의하셔야 합니다.</ErrorMessage>}
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
