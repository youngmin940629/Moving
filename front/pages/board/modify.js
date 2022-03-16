import Head from "next/head";
import AppLayout from "../../components/AppLayout";
import {Button, Form, Input, Select} from "antd";
import TextArea from "antd/lib/input/TextArea";
import React from "react";

export default function BoardModify(){
    return(
        <>
            <Head>
                <title>게시글 작성 | moving</title>
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
                    >

                        <Form.Item label="제목" name="title">
                            <Input />
                        </Form.Item>
                        <div className="select">
                            <Form.Item label="영화 검색">
                                <Input onKeyPress={inputEnter} placeholder="Press Enter "/>
                            </Form.Item>
                            {selects &&
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

            <style jsx>{`
                .submitBtnDiv {
                    text-align: center;
                }  
            `}</style>
        </>
    )
}