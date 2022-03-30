import React, { useCallback, useEffect, useState } from 'react';
import {
  Button,
  Checkbox,
  Form,
  Input,
  Col,
  Row,
  Select,
  DatePicker,
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

const FormMargin = styled.div`
  margin-top: 22px;
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

  const [pwValidErrMsg, setPwValidErrMsg] = useState('');

  useEffect(() => {
    //  8~20자 숫자 포함 영문 포함 숫자 포함 특수문자 포함 공백X
    if (password) {
      const num = password.search(/[0-9]/g);
      const eng = password.search(/[a-z]/ig);
      const spe = password.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);
      if (password.length < 8 || password.length > 20){
        setPwValidErrMsg("8자리 ~ 20자리 이내로 입력해주세요.");
      } else if (password.search(/\s/) != -1){
        setPwValidErrMsg("비밀번호는 공백 없이 입력해주세요.");
      } else if (num < 0 || eng < 0 || spe < 0 ){
        setPwValidErrMsg("영문, 숫자, 특수문자를 혼합하여 입력해주세요.");
      } else {
        setPwValidErrMsg('')
      }
    }
  }, [password]);
  

  const [term, setTerm] = useState('');
  const [termError, setTermError] = useState(false);
  const onChangeTerm = useCallback(e => {
    setTerm(e.target.checked);
    setTermError(false);
  }, []);

  const [data, setData] = useState(null);
  const [category_list, setCategoryList] = useState(null);
  const children = [];
  if (data) {
    for (let i = 0; i < data.length; i++) {
      children.push(
        <Select.Option key={data[i].id} value={data[i].name}>
        </Select.Option>
      );
    }
  }

  function handleChange(value) {
    const temp = [];
    value.map(title => {
      function findId(element)  {
        if(element.name === title) return true
      }
      const idx = data.findIndex(findId)
      temp.push(data[idx].id);
    });
    setCategoryList(temp);
  }
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/movies/genre_list/`)
      .then(res => {
        setData(res.data);
      });
  }, []);

  const [birthDate, setBirthDate] = useState(null);
  function onChange(date, dateString) {
    setBirthDate(dateString);
  }

  const [gender, setGender] = useState(null);
  const onChangeGender = e => {
    setGender(e.target.value);
  };

  const [username2Check, setUsername2Check] = useState('');

  const nicknameCheckTrue = () => {
    alert('사용 불가능한 닉네임 입니다.');
    setUsername2Check(true);
  };

  const nicknameCheckFalse = () => {
    alert('사용 가능한 닉네임 입니다.');
    setUsername2Check(false);
  };

  const nicknameCheck = () => {
    axios
      .post(`${process.env.NEXT_PUBLIC_BASE_URL}/accounts/isexist/`, {
        username2: username,
      })
      .then(res => {
        res.data ? nicknameCheckTrue() : nicknameCheckFalse();
      })
      .catch(err => {
        console.log(err);
      });
  };

  const onSubmit = useCallback(() => {
    if (password !== passwordCheck) {
      return setPasswordError(true);
    }

    if (username2Check === '' || username2Check === true) {
      // console.log(username2Check);
      return setUsername2Check(true);
    }

    if (pwValidErrMsg) {
      // console.log(pwValidErrMsg)
      return setPwValidErrMsg(`***${pwValidErrMsg}***`)
    }

    dispatch({
      type: SIGN_UP_REQUEST,
      data: { email, username, password, category_list, birthDate, gender },
    });
  }, [
    password,
    passwordCheck,
    term,
    category_list,
    birthDate,
    gender,
    username2Check,
  ]);

  return (
    <div style={{ textAlign: 'center' }}>
      <div
        style={{
          width: '600px',
          display: 'inline-block',
        }}
      >
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
            label="이메일"
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
              placeholder="이메일을 입력해주세요."
              value={email}
              onChange={onChangeEmail}
            />
          </Form.Item>
          <Form.Item
            layout="inline"
            label="닉네임"
            name="user-nickname"
            rules={[
              {
                required: true,
                message: '',
              },
            ]}
          >
            <Row>
              <Col span={16}>
                <Form.Item
                  name="user-username"
                  rules={[
                    {
                      required: true,
                      message: '닉네임을 입력해주세요.',
                    },
                  ]}
                  style={{ margin: '0 15px 0 0' }}
                >
                  <Input
                    placeholder="닉네임을 입력해주세요."
                    value={username}
                    onChange={onChangeUsername}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Button onClick={nicknameCheck} style={{ width: '100%' }} disabled={!Boolean(username)}>
                  중복확인
                </Button>
              </Col>
              {username2Check && (
                <ErrorMessage>닉네임 중복확인을 진행해주세요.</ErrorMessage>
              )}
            </Row>
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
            style={{ marginBottom: '0px' }}
          >
            <Input.Password
              placeholder="비밀번호를 입력해주세요."
              value={password}
              onChange={onChangePassowrd}
            />
          </Form.Item>
          <ErrorMessage>{pwValidErrMsg}</ErrorMessage>
          <FormMargin />
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
              placeholder="비밀번호를 확인해주세요."
              value={passwordCheck}
              onChange={onChangePasswordCheck}
            />
          </Form.Item>
          {passwordError && (
            <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>
          )}
          <FormMargin />
          <Form.Item
            label="선호 장르"
            name="category_list"
            rules={[
              {
                required: true,
                message: '장르를 선택해주세요.',
              },
            ]}
          >
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
          <Form.Item
            label="성별"
            name="gender"
            rules={[
              {
                required: true,
                message: '성별을 선택해주세요.',
              },
            ]}
          >
            <Radio.Group
              options={options}
              onChange={onChangeGender}
              value={gender}
              optionType="button"
              buttonStyle="solid"
            />
          </Form.Item>
          <Form.Item
            label="생년월일"
            name="birthDate"
            rules={[
              {
                required: true,
                message: '생년월일을 선택해주세요.',
              },
            ]}
          >
            <DatePicker style={{ width: '100%' }} onChange={onChange} />
          </Form.Item>

          <SignupButton>
            <Button
              style={{
                width: '52%',
                height: '50px',
                backgroundColor: '#2cd4ac',
                color: 'white',
                fontSize: '20px',
                fontWeight: 'bold',
              }}
              htmlType="submit"
              loading={signUpLoading}
            >
              가입하기
            </Button>
          </SignupButton>
        </Form>
      </div>
    </div>
  );
};

export default SignupForm;
