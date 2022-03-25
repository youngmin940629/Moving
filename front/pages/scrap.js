import React from 'react';
import AppLayout from '../components/AppLayout';
import Head from 'next/head';
import ScrapMovieList from '../components/Scrap/ScrapMovieList';

const Scrap = () => {
  return (
    <>
      <Head>
        <title>스크랩한 영화 | moving</title>
      </Head>
      <AppLayout>
        <ScrapMovieList />
      </AppLayout>
    </>
  );
};

export default Scrap;
