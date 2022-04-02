import React from 'react';
import AppLayout from '../components/AppLayout';
import Head from 'next/head';
import UserProfile from '../components/UserProfile';

const Profile = () => {
  return (
    <>
      <Head>
        <title>프로필 | moving</title>
      </Head>
      <AppLayout>
        <UserProfile />
      </AppLayout>
    </>
  );
};

export default Profile;

export function getServerSideProps(context){

    const cookie = context.req.cookies["id"] ? context.req.cookies["id"] : null;
    if(cookie == null){
        context.res.writeHead(301, { location: "/" } );
        context.res.end();
    }

    return{
        props:{}
    }
}