import Head from "next/head";
import AppLayout from "../../../components/AppLayout";
import axios from "axios";
import {Button, Form, Input, Select} from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import styled from 'styled-components';

const LogoWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 20px;
`;

const Logo = styled.img``;

const BoardTitle = styled.h2`
  text-align: center;
  padding-bottom: 5px;
  font-weight: bold;
  color: #2cd4ac;
`;

export default function ModifyBoard({post,movieTitle}){
    const router = useRouter();
    const [movies, setMovies] = useState([[{}]]);
    const [selects, setSelects] = useState("");
    const [userID, setUserID] = useState(null);
    useEffect(()=>{
        if(sessionStorage.getItem("id")){
            setUserID(sessionStorage.getItem("id"));
        }else{
            setUserID(null);
        }
    },[])
    const [fields, setFields] = useState([
        {
            name : ["title"],
            value : post.title
        },
        {
            name : ["content"],
            value: post.content
        },
        {
            name: ["rank"],
            value: post.rank
        },
        {
            name: ["movie"],
            value: movieTitle
        }
    ])
    const onFinish = (data)=>{
        data["movie"] = parseInt(post.movie);
        data["user"] = userID;
        axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/community/review/${post.id}/`,
            {
                data
            }
            );
        router.push(`/community`)
    }
    const callMovie=async (id) => {
        await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/movies/search/${id}`)
            .then(res => {
                setMovies([res.data]);
                console.log(res.data)
            })
    }
    const inputEnter=(e)=>{
        // e.target.value : 영화 검색어
        // e,key : Enter 판별 값
        if(e.key == "Enter") {
            e.preventDefault();
            setSelects(e.target.value);
            callMovie(e.target.value);
        }
    }
    return(
        <>
            <Head>
                <title>게시글 수정 | moving</title>
            </Head>
            <AppLayout>
                <LogoWrapper>
                    <Logo src="/img/logo-colored.png" />
                </LogoWrapper>
                <BoardTitle>리뷰 수정하기</BoardTitle>
                <div>
                    <Form
                        labelCol={{
                        span: 6,
                    }}
                    wrapperCol={{
                        span: 14,
                    }}
                        layout="horizontal"
                        onFinish={onFinish}
                        fields={fields}
                    >

                        <Form.Item 
                            label="제목" 
                            name="title"
                            rules={[
                                {
                                required: true,
                                message: '수정할 리뷰 제목을 입력해주세요.',
                                },
                            ]} 
                        >
                            <Input placeholder="수정할 리뷰 제목을 입력해주세요." />
                        </Form.Item>
                        <div className="select">
                            {/* <Form.Item label="영화 검색">
                                <Input onKeyPress={inputEnter} placeholder="Press Enter "/>
                            </Form.Item> */}
                                <Form.Item 
                                    label="Movie" 
                                    name="movie" 
                                >
                                    <Input disabled />
                                    {/* <Select
                                        placeholder="select option"
                                        name="movie"
                                    >
                                        {movies.map(item=>item.map(movie=>(
                                            <Select.Option
                                                name={movie.title}
                                                key={movie.id}
                                            >
                                                {movie.title}
                                            </Select.Option>
                                        )))}
                                    </Select> */}
                                </Form.Item>

                        </div>

                        <Form.Item 
                            label="내용" 
                            name="content"
                            rules={[
                                {
                                required: true,
                                message: '수정할 리뷰 내용을 입력해주세요.',
                                },
                            ]}    
                        >
                            <TextArea placeholder="수정할 리뷰 내용을 입력해주세요." rows={10}>
                                
                            </TextArea>
                        </Form.Item>
                        <div className="submitBtnDiv">
                            <Button type="primary" htmlType="submit">등록</Button>
                        </div>
                    </Form>
                </div>
            </AppLayout>

            <style jsx>{`
                .submitBtnDiv {
                    text-align: center;
                }  
            `}</style>
        </>
    )
}

export async function getServerSideProps(context) {
    // console.log("id[] call")

    const id = parseInt(context.params.id);
    let post;
    let movieTitle;
    const cookie = context.req.cookies["id"] ? context.req.cookies["id"] : null;
    // console.log(cookie)
    if(cookie != null) {
        await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/community/review/${id}`)
            .then(async res => {
                post = res.data;
                await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/movies/${post.movie}/`)
                    .then(res => {
                        movieTitle = res.data[0].title;
                    });
            })

    }else {
        context.res.writeHead(301, { location: "/" } );
        context.res.end();
    }

    return {
        props: {
            post,
            movieTitle
        }
    }
}