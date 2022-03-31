import AppLayout from '../../components/AppLayout';
import Head from 'next/head';
import Comment from '../../components/comment';
import DetailContent from '../../components/boardDetail';
import axios from "axios";
import BoardMovieDesc from "../../components/boardMovieDesc";
import {Button} from "antd"
import {useRouter} from "next/router";

export default function BoardDetail({post, movieInfo}) {
const router = useRouter();
  return (
    <>
      <Head>
        <title>게시판상세 | moving</title>
      </Head>
      <AppLayout>
          <div className="Btn">
            <Button className="boardListBtn" type="primary"
            onClick={()=>router.push(`/community`)}
            >목록</Button>
          </div>
        <DetailContent data={post} movies={movieInfo}></DetailContent>
          <BoardMovieDesc movies={movieInfo}></BoardMovieDesc>
        <Comment data={post}></Comment>
      </AppLayout>

        <style jsx>{`
            .Btn{
                width: 80%;
                margin: auto;
            }
        `}</style>
    </>
  );
}

export async function getServerSideProps({ params }) {
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
