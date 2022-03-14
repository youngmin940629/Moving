import React, {useEffect, useState} from 'react';
import {  Form, Button, List, Comment, Avatar ,Input } from 'antd';
import axios from "axios";

export default function Comments(props) {
    const [comments, setComments] = useState([{}]);

    // 댓글 등록 요청 data : 댓글 내용
    const submitComment=(data)=>{
        console.log(data.comment);
        axios.post(`http://localhost:8000/community/review/${props.data}/comment/`,
            {
                user:1, // 유저 아이디 바꿔야됨
                review:props.data,
                content:data.comment
            })
    }
    // 댓글 가져오기
    useEffect(async ()=>{
        console.log("effect call")
        await axios.get(`http://localhost:8000/community/review/${props.data}/`)
            .then(res=>{
                setComments(res.data.comments);
            })
        console.log("comments: ", comments);
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
            {comments.length>0 &&
                <List
                    itemLayout="horizontal"
                    dataSource={comments}
                    renderItem={item=>(
                        <List.Item>
                            <List.Item.Meta
                                key={item.id}
                                title={item.username}
                                description={item.content}
                            />
                        </List.Item>
                    )}
                />
            }
            <style jsx>{`
                .commentBtn{
                    text-align: center;
                }
            `}</style>
        </>
    )
}
