import Head from "next/head";
import AppLayout from "../../components/AppLayout";
import React, {useEffect, useState} from "react";
import {Button, Form, Input, Select} from "antd";
import TextArea from "antd/lib/input/TextArea";


export default function Write(){

    const [selects, setSelects] = useState([
        {
            key: 1,
            option:"option1",
        },
        {
            key: 2,
            option:"option2"
        }
    ]);

    const onFinish = (e)=>{
        console.log("submit");
        console.log(e);
    }

    return(
        <>
            <Head>
                <title>게시글 작성 | moving</title>
            </Head>
            <AppLayout>

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

                    <Form.Item label="제목" name="name">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Select" name="options">
                        <Select
                            mode="multiple"
                            placeholder="select option"
                        >
                            {selects.map((select)=>(
                                <Select.Option name="select" key={select.key} value={select.option}>{select.option}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item label="내용" name="content">
                        <TextArea placeholder="내용을 입력해주세요" rows={10}>
                            
                        </TextArea>
                    </Form.Item>
                    <div className="submitBtnDiv">
                        <Button type="primary" htmlType="submit">등록</Button>
                    </div>
                </Form>

            </AppLayout>

            <style jsx>{`
                .submitBtnDiv {
                    text-align: center;
                }  
            `}</style>
        </>    
    )
}