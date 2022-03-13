import React, {useEffect, useState} from 'react';
import {  Form, Button, List, Comment, Avatar ,Input } from 'antd';
import axios from "axios";

export default function Comments(props) {
    const [comments, setComments] = useState([{}]);
    // 댓글 등록 요청
    console.log("comment",props)
    const submitComment=(e)=>{
        console.log(e);
        axios.post(``,
            {

            }
            )
    }
    useEffect(async ()=>{
        await axios.get(`http://127.0.0.1:8000/community/comment/${props.data}/`)
            .then(res=>{
                console.log(res.data);
                setComments([res.data])
            })

    },[])


    return(
        <>
            <Form
                onFinish={submitComment}
            >
                <Form.Item
                    label="댓글"
                    name="comment"
                >
                    <Input.TextArea rows={4}/>
                </Form.Item>
                <Form.Item>
                 <div className="commentBtn">
                    <Button htmlType="submit" type="primary">
                        Add Comment
                    </Button>
                 </div>
                </Form.Item>
            </Form>
                <List
                    itemLayout="horizontal"
                    dataSource={comments}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                key={item.id}
                                title={<a href="https://ant.design">{item.username}</a>}
                                description={item.content}
                            />
                        </List.Item>
                    )}
                />

            <style jsx>{`
                .commentBtn{
                    text-align: center;
                }
            `}</style>
        </>
    )
}