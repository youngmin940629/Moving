import React, {useEffect, useState} from 'react';
import {  Form, Button, List, Comment, Avatar ,Input } from 'antd';
import axios from "axios";
import jwt_decode from "jwt-decode";

export default function Comments(props) {
    const [comments, setComments] = useState([{}]);
    const [userID, setUserID] = useState();
    useEffect(()=>{
        if(localStorage.getItem("JWT token")){
            setUserID(jwt_decode(localStorage.getItem("JWT token")).id);
        }else{
            setUserID(null);
        }
    },[])


    // 댓글 등록 요청
    const submitComment=(data)=>{
        console.log(data.comment);
        axios.post(`http://localhost:8000/community/review/${props.data}/comment/`,
            {
                user:1, // 유저 아이디 바꿔야됨
                review:props.data, //게시글 id
                content:data.comment // 댓글 내용
            })
            .then(()=>{
                axios.get(`http://localhost:8000/community/review/${props.data}/`)
                    .then(res=>{
                        setComments(res.data.comments)
                    });
        })

    }
    // 댓글 삭제
    const commentDelete = (id)=>{
        axios.delete(`http://localhost:8000/community/comment/${id}/`)
            .then(async () => {
                await axios.get(`http://localhost:8000/community/review/${props.data}/`)
                    .then(res => {
                        setComments(res.data.comments)
                    });
            })
    }
    // 댓글 가져오기
    useEffect(async ()=>{
        console.log("effect call")
        await axios.get(`http://localhost:8000/community/review/${props.data}/`)
            .then(res=>{
                setComments(res.data.comments);
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
                            {item.user === userID? (
                                <Button onClick={()=>{
                                    commentDelete(item.id)
                                }}>삭제</Button>
                            ):null}
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
