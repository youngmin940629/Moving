import React, {useEffect} from 'react';
import AppLayout from '../../components/AppLayout';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Comment from '../../components/comment';
import DetailContent from '../../components/boardDetail';

export default function BoardDetail() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>게시판상세 | moving</title>
      </Head>
      <AppLayout>
        <DetailContent id={router.query.id}></DetailContent>
        <Comment id={router.query.id}></Comment>
      </AppLayout>
    </>
  );
}
