import React from 'react';
import AppLayout from '../components/AppLayout';
import Head from 'next/head';
import UserProfileModify from '../components/UserProfileModify';
import ImageUploader from '../service/image_uploader';

const ProfileModify = () => {
  const imageUploader = new ImageUploader();

  return (
    <>
      <Head>
        <title>회원정보 수정 | moving</title>
      </Head>
      <AppLayout>
        <UserProfileModify imageUploader={imageUploader} />
      </AppLayout>
    </>
  );
};

export default ProfileModify;

export function getServerSideProps(context){

    let cookie = context.req.cookies["id"] ? context.req.cookies["id"] : null;
    if(cookie == null){
        context.res.writeHead(301, { location: "/" } );
        context.res.end();
    }

    return{props:{}}
}