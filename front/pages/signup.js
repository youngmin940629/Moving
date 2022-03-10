import React from 'react';
import AppLayout from '../components/AppLayout';
import Head from 'next/head';
import SignupForm from '../components/SignupForm';

const Signup = () => {
  return (
  <>
    <Head>
    <title>로그인 | moving</title>
    </Head>
    <AppLayout>
      <SignupForm />
    </AppLayout> 
  </> 
  )
};

export default Signup;
