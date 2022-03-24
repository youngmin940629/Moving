import AppLayout from '../../components/AppLayout';
import Head from 'next/head';
import Comment from '../../components/comment';
import DetailContent from '../../components/boardDetail';
import axios from "axios";

export default function BoardDetail({post, movieInfo}) {

  return (
    <>
      <Head>
        <title>게시판상세 | moving</title>
      </Head>
      <AppLayout>
        <DetailContent data={post} movies={movieInfo}></DetailContent>
        <Comment data={post}></Comment>
      </AppLayout>

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
