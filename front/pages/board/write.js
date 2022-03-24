import Head from "next/head";
import AppLayout from "../../components/AppLayout";
import React, {useState} from "react";
import {Button, Form, Input, Select} from "antd";
import TextArea from "antd/lib/input/TextArea";
import axios from "axios";
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


export default function Write(){
    const router = useRouter();

    const [movies, setMovies] = useState([[{}]]);
    const [selects, setSelects] = useState("");

    const onFinish = (data)=>{
        data["rank"] = parseInt(data.rank);
        data["movie"] = parseInt(data.movie);
        axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/community/review/`,
            {
                data
            },{
            headers:{
                Authorization: "JWT"+ " "+localStorage.getItem("JWT token")
            }
        });
        router.replace(`/community`)
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
                <title>게시글 작성 | moving</title>
            </Head>
            <AppLayout>
            <div>
                <LogoWrapper>
                    <Logo src="/img/logo-colored.png" />
                </LogoWrapper>
                <BoardTitle>리뷰 작성하기</BoardTitle>
                <Form
                    labelCol={{
                        span: 6,
                    }}
                    wrapperCol={{
                        span: 14,
                    }}
                    layout="horizontal"
                    onFinish={onFinish}
                >

                    <Form.Item 
                        label="제목" 
                        name="title"
                        rules={[
                            {
                              required: true,
                              message: '제목을 입력해주세요.',
                            },
                        ]}
                    >
                        <Input placeholder="리뷰 제목을 입력해주세요." />
                    </Form.Item>
                    <div className="select">
                        <Form.Item 
                            label="영화 검색"
                            name="search"
                            rules={[
                                {
                                required: true,
                                message: '영화를 검색해주세요.',
                                },
                            ]}
                        >
                            <Input onKeyPress={inputEnter} placeholder="영화 검색 키워드 입력 후 Enter "/>
                        </Form.Item>
                            {selects &&
                                    <Form.Item 
                                        label="Movie" 
                                        name="movie"
                                        rules={[
                                            {
                                            required: true,
                                            message: '영화를 선택해주세요.',
                                            },
                                        ]}
                                    >
                                        <Select
                                            placeholder="영화 선택"
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

                        <Form.Item 
                            label="평점" 
                            name="rank"
                            rules={[
                                {
                                required: true,
                                message: '평점을 등록해주세요.',
                                },
                            ]}    
                        >
                            <Input type="number" placeholder="평점을 입력해주세요."></Input>
                        </Form.Item>
                    </div>

                    <Form.Item 
                        label="내용" 
                        name="content"
                        rules={[
                            {
                            required: true,
                            message: '리뷰 내용을 입력해주세요.',
                            },
                        ]}    
                    >
                        <TextArea placeholder="리뷰 내용을 입력해주세요." rows={10}>
                            
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

