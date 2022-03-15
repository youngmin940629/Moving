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
} from '../reducers/user';

axios.defaults.baseURL = 'http://localhost:8000';

function loadUserAPI(data) {
  return axios.get('/', data);
}

function* loadUser() {
  try {
    const result = localStorage.getItem('JWT token');
    yield put({
      type: LOAD_USER_SUCCESS,
      data: result,
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
    yield Router.push('/');
  } catch (err) {
    yield put({ type: LOG_IN_FAILURE, error: err.response.data });
    alert('아이디와 비밀번호를 확인해주세요');
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
  } catch (err) {
    yield put({ type: LOG_OUT_FAILURE, error: err.response.data });
  }
}
function signUpAPI(data) {
  return axios.post('/accounts/signup/', data);
}

function* signUp(action) {
  try {
    const result = yield call(signUpAPI, action.data);
    yield put({
      type: SIGN_UP_SUCCESS,
      data: result.data,
    });
    yield Router.push('/login');
  } catch (err) {
    yield put({ type: SIGN_UP_FAILURE, error: err.response.data });
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

export default function* rootSaga() {
  yield all([
    fork(watchLoadUser),
    fork(watchLogIn),
    fork(watchLogOut),
    fork(watchSignUp),
  ]);
}
