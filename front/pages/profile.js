import React from 'react';
import AppLayout from '../components/AppLayout';
import Head from 'next/head';
import UserProfile from '../components/UserProfile';

const Profile = () => {
  return (
    <>
      <Head>
        <title>회원정보 | moving</title>
      </Head>
      <AppLayout>
        <UserProfile />
      </AppLayout>
    </>
  );
};

export default Profile;
