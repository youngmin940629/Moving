import React from 'react';
import AppLayout from '../components/AppLayout';
import Head from 'next/head';
import ImageUpload from '../components/ImageUpload';
import ImageUploader from '../service/image_uploader';

const Profile = () => {
  const imageUploader = new ImageUploader();

  return (
    <>
      <Head>
        <title>이미지 업로드 | moving</title>
      </Head>
      <AppLayout>
        <ImageUpload imageUploader={imageUploader} />
      </AppLayout>
    </>
  );
};

export default Profile;
