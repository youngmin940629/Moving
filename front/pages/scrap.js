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