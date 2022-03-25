import React from 'react';
import AppLayout from '../components/AppLayout';
import Head from 'next/head';
import ScrapMovies from '../components/Scrap/ScrapMovies';

const Scrap = () => {
  return (
    <>
      <Head>
        <title>좋아요한 영화 | moving</title>
      </Head>
      <AppLayout>
        <ScrapMovies />
      </AppLayout>
    </>
  );
};

export default Scrap;
