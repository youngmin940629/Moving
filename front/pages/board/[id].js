import AppLayout from '../../components/AppLayout';
import Head from 'next/head';
import Comment from '../../components/comment';
import DetailContent from '../../components/boardDetail';
import axios from "axios";
import {Button} from "antd";
import {useRouter} from "next/router";
import jwt_decode from "jwt-decode";
import {useEffect, useState} from "react";

export default function BoardDetail({post}) {
    const router = useRouter();
    const [userID, setUserID] = useState();
    useEffect(()=>{
        setUserID(jwt_decode(localStorage.getItem("JWT token")).user_id);
    },[])
  return (
    <>
      <Head>
        <title>게시판상세 | moving</title>
      </Head>
      <AppLayout>
          {post.user === userID? (
              <div className="modifyBtn">
                  <Button onClick={()=>router.push(`/board/modify/${post.id}`)}>
                      수정
                  </Button>
              </div>
              ) : null}
        <DetailContent data={post}></DetailContent>
        <Comment data={post.id}></Comment>
      </AppLayout>

        <style jsx>{`
            .modifyBtn{
                float: right;
            }
        `}</style>
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
            post["key"] = res.data.id;
        })

    return {
        props: {
            post,
        }
    }
}
