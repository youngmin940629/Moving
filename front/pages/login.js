import React from 'react';
import AppLayout from '../components/AppLayout';
import Head from 'next/head';
import LoginForm from '../components/LoginForm';

const Login = ({ setIsLoggedIn }) => {
  return (
    <>
      <Head>
        <title>로그인 | moving</title>
      </Head>
      <AppLayout>
        <LoginForm setIsLoggedIn={setIsLoggedIn} />
      </AppLayout>
    </>
  );
};

export default Login;
