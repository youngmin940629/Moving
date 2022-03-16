import React, {useEffect, useState} from 'react';
import AppLayout from '../../components/AppLayout';
import Head from 'next/head';
import Comment from '../../components/comment';
import DetailContent from '../../components/boardDetail';
import axios from "axios";
import {Button} from "antd";

export default function BoardDetail({post}) {
  return (
    <>
      <Head>
        <title>게시판상세 | moving</title>
      </Head>
      <AppLayout>
        <Button>수정</Button>
        <DetailContent data={post}></DetailContent>
        <Comment data={post.id}></Comment>
      </AppLayout>
    </>
  );
}

export async function getServerSideProps({ params }) {
    console.log("id[] call")
    const id = parseInt(params.id);
    let post;

    await axios.get(`http://127.0.0.1:8000/community/review/${id}`)
        .then(res=>{
            post = res.data;
        })

    return {
        props: {
            post,
        }
    }
}
