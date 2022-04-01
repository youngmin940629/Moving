import Router from 'next/router';
import { all, call, delay, fork, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE,
  WITH_DRAWAL_REQUEST,
  WITH_DRAWAL_SUCCESS,
  WITH_DRAWAL_FAILURE,
  loaduserRequestAction,
} from '../reducers/user';
import { useDispatch } from 'react-redux';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_URL;

function loadUserAPI(data) {
  return axios.get(`/accounts/${data}`);
}

function* loadUser(action) {
  try {
    const result = yield call(loadUserAPI, action.data);
    yield put({
      type: LOAD_USER_SUCCESS,
      data: result,
    });
    let token = localStorage.getItem('JWT token');
    yield axios({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/accounts/getuserpk/`,
      method: 'post',
      headers: { Authorization: `JWT ${token}` },
    }).then(res => {
      sessionStorage.setItem('id', res.data.pk);
    });
  } catch (err) {
    yield put({ type: LOAD_USER_FAILURE, error: err.response.data });
  }
}

function logInAPI(data) {
  return axios.post('/accounts/login/', data);
}

function* logIn(action) {
  try {
    const result = yield call(logInAPI, action.data);
    yield put({
      type: LOG_IN_SUCCESS,
      data: result.data,
    });
    yield localStorage.setItem('JWT token', result.data.token);
    let token = localStorage.getItem('JWT token');
    yield axios({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/accounts/getuserpk/`,
      method: 'post',
      headers: { Authorization: `JWT ${token}` },
    })
      .then(res => {
        sessionStorage.setItem('id', res.data.pk);
      })
      .then(() => {
        action.data.setIsModalVisible(false);
        // if (window.location.pathname === '/') {
        //   document.location.href = '/';
        // }
        // Router.push('/');
        window.location.reload() // 기존 경로 유지 + 새로고침
      });
  } catch (err) {
    action.data.setIsModalVisible(true);
    yield put({ type: LOG_IN_FAILURE, error: err.response.data });
    alert('아이디와 비밀번호를 확인해주세요. 이메일 인증 전이시면 인증완료 후 로그인해주세요.');
  }
}

function* logOut() {
  try {
    // const result = yield call(logInAPI, action.data);
    yield delay(1000);
    yield put({
      type: LOG_OUT_SUCCESS,
    });
    yield localStorage.removeItem('JWT token');
    yield sessionStorage.removeItem('id');
    Router.push('/');
  } catch (err) {
    yield put({ type: LOG_OUT_FAILURE, error: err.response.data });
  }
}
function signUpAPI(data) {
  return axios.post('/accounts/signup/', data);
}

function* signUp(action) {
  try {
    yield call(signUpAPI, action.data);
    yield put({
      type: SIGN_UP_SUCCESS,
    });
    yield call(() => {
      alert('가입 인증 메일이 발송되었습니다. 입력하신 이메일을 확인하시고 인증을 진행해주세요.');
      Router.push('/');
    });
  } catch (err) {
    yield put({ type: SIGN_UP_FAILURE, error: err.response.data });
  }
}

function withDrawalAPI(data) {
  return axios.delete(`/accounts/${data}`);
}

function* withDrawal(action) {
  try {
    yield call(withDrawalAPI, action.data);
    yield put({
      type: WITH_DRAWAL_SUCCESS,
    });
    yield call(() => {
      alert('탈퇴가 완료되었습니다. 메인페이지로 이동합니다.');
      localStorage.removeItem('JWT token');
      sessionStorage.removeItem('id');
      Router.push('/');
    });
  } catch (err) {
    alert('처리 중 에러가 발생했습니다. 관리자에게 문의하세요.');
    yield put({ type: WITH_DRAWAL_FAILURE, error: err.response.data });
  }
}

function* watchLoadUser() {
  yield takeLatest(LOAD_USER_REQUEST, loadUser);
}
function* watchLogIn() {
  yield takeLatest(LOG_IN_REQUEST, logIn);
}

function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOut);
}

function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}

function* watchWithdrawal() {
  yield takeLatest(WITH_DRAWAL_REQUEST, withDrawal);
}

export default function* rootSaga() {
  yield all([
    fork(watchLoadUser),
    fork(watchLogIn),
    fork(watchLogOut),
    fork(watchSignUp),
    fork(watchWithdrawal),
  ]);
}
