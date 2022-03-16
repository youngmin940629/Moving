import React from 'react';
import AppLayout from '../components/AppLayout';
import Head from 'next/head';
import UserProfileModify from '../components/UserProfileModify';

const ProfileModify = () => {
  return (
    <>
      <Head>
        <title>회원정보 수정 | moving</title>
      </Head>
      <AppLayout>
        <UserProfileModify />
      </AppLayout>
    </>
  );
};

export default ProfileModify;
