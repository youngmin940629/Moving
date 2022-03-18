import Head from "next/head";
import AppLayout from "../../../components/AppLayout";
import axios from "axios";
import {Button, Form, Input, Select} from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";

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
        data["rank"] = parseInt(data.rank);
        data["movie"] = parseInt(data.movie);
        data["user"] = userID;
        console.log(data);
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
                <div>
                    <Form
                        labelCol={{
                            span: 4,
                        }}
                        wrapperCol={{
                            span: 14,
                        }}
                        layout="horizontal"
                        onFinish={onFinish}
                        fields={fields}
                    >

                        <Form.Item label="제목" name="title"  >
                            <Input />
                        </Form.Item>
                        <div className="select">
                            <Form.Item label="영화 검색">
                                <Input onKeyPress={inputEnter} placeholder="Press Enter "/>
                            </Form.Item>
                                <Form.Item label="Movie" name="movie">
                                    <Select
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
                                    </Select>
                                </Form.Item>}

                            <Form.Item label="평점" name="rank">
                                <Input type="number"></Input>
                            </Form.Item>
                        </div>

                        <Form.Item label="내용" name="content">
                            <TextArea placeholder="내용을 입력해주세요" rows={10}>

                            </TextArea>
                        </Form.Item>
                        <div className="submitBtnDiv">
                            <Button type="primary" htmlType="submit">등록</Button>
                        </div>
                    </Form>
                </div>
            </AppLayout>
        </>
    )
}

export async function getServerSideProps({ params }) {
    console.log("id[] call")
    const id = parseInt(params.id);
    let post;
    let movieTitle;
    await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/community/review/${id}`)
        .then(async res => {
            post = res.data;
            await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/movies/${post.movie}/`)
                .then(res => {
                    movieTitle = res.data[0].title;
                });
        })

    return {
        props: {
            post,
            movieTitle
        }
    }
}