import React, { useEffect, useState } from 'react';
import AppLayout from '../components/AppLayout';
import Head from 'next/head';
import BoardTable from '../components/boardTable';
import axios from 'axios';

export default function Community({ boards }) {
  const [data, setData] = useState(null);
  useEffect(() => {
    const temp = [];
    boards.map(item => {
      temp.push({
        key: item.id,
        comments: item.comments.length,
        content: item.content,
        created_at: item.created_at,
        id: item.id,
        title: item.title,
        username2: item.user.username2,
        visit_count: item.visit_count,
        user: item.user,
      });
    });
    setData(temp);
  }, []);

  return (
    <>
      <Head>
        <title>커뮤니티 | moving</title>
      </Head>
      <AppLayout>
        <BoardTable boards={boards} data={data} setData={setData} />
      </AppLayout>
    </>
  );
}

export async function getServerSideProps() {
  let boards;
  await axios
    .get(`${process.env.NEXT_PUBLIC_BASE_URL}/community/review/`)
    .then(res => {
      try {
        boards = res.data;
        for (let i = 0; i < boards.length; i++) {
          boards[i]['key'] = res.data[i].id;
        }
      } catch (error) {}
    });
  return {
    props: {
      boards,
    },
  };
}
