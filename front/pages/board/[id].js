import AppLayout from '../../components/AppLayout';
import Head from 'next/head';
import Comment from '../../components/comment';
import DetailContent from '../../components/boardDetail';
import axios from "axios";
import {Button} from "antd";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";

export default function BoardDetail({post, movieInfo}) {
    const router = useRouter();
    const [userID, setUserID] = useState(null);
    useEffect(()=>{
        if(sessionStorage.getItem("id")){
            setUserID(sessionStorage.getItem("id"));
        }else{
            setUserID(null);
        }
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
        <DetailContent data={post} movies={movieInfo}></DetailContent>
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
    let movieInfo;

    await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/community/review/${id}`)
        .then(async res=>{
            post = res.data;
            await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/movies/${post.movie}/`)
                .then(res=>{
                    movieInfo = res.data;
                    movieInfo[0]["key"] = res.data[0].id;
                });
        })

    return {
        props: {
            post,
            movieInfo
        }
    }
}
