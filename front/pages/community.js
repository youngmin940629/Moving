import React from 'react';
import AppLayout from '../components/AppLayout';
import Head from 'next/head';
import BoardTable from '../components/boardTable';

export default function Community({boards}) {
  return (
    <>
      <Head>
        <title>커뮤니티 | moving</title>
      </Head>
      <AppLayout>
        <BoardTable boards={boards}/>
      </AppLayout>
    </>
  );
};

export async function getServerSideProps(){
  console.log("SSD call");
  // const boards = await (await fetch("http://127.0.0.1:8000/admin/community/review/")).json();
    const boards = {name:"name"};
  return {
    props:{
      boards
    }
  };
}


