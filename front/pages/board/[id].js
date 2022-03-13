import React, {useEffect, useState} from 'react';
import AppLayout from '../../components/AppLayout';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Comment from '../../components/comment';
import DetailContent from '../../components/boardDetail';
import axios from "axios";

export default function BoardDetail({post}) {

  return (
    <>
      <Head>
        <title>게시판상세 | moving</title>
      </Head>
      <AppLayout>
        <DetailContent data={post}></DetailContent>
        <Comment data={post.id}></Comment>
      </AppLayout>
    </>
  );
}

// export async function getStaticPaths() {
//     console.log("path call")
//     const res = await axios.get(`http://127.0.0.1:8000/movies/`);
//     const data = res.data;
//
//     // const paths = data.map((item) => ({
//     //     params: { id: item.id.toString() },
//     // }))
//     const paths = [
//         {
//             params: {
//                 key: 1,
//                 id: "1"
//             }
//         },{
//             params: {
//                 key: 2,
//                 id: "2"
//             }
//         }
//     ]
//     return { paths, fallback:false}
//
// }

export async function getServerSideProps({ params }) {

    const id = parseInt(params.id);
    const res = await axios.get(`http://127.0.0.1:8000/community/review/${id}`)
    const post = await res.data;
    return {
        props: {
            post,
        }
    }
}
