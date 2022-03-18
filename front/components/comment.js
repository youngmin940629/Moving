import React, {useEffect, useState} from 'react';
import {  Form, Button, List, Input } from 'antd';
import axios from "axios";

export default function Comments(props) {
    const [comments, setComments] = useState([{}]);
    const [userID, setUserID] = useState(null);
    const dateFormat = (data)=>{
        let originDate;
        for(let i=0; i<data.length; i++){
            originDate= new Date(data[i].created_at);
            let date="";
            date += originDate.getFullYear()+"-";
            date += originDate.getMonth()+1+"-";
            date += originDate.getDate()+"-";
            date += originDate.getHours()+"-";
            date += originDate.getMinutes();
            data[i].created_at = date;
        }
        setComments(data);
    }
    useEffect(()=>{
        if(sessionStorage.getItem("id")){
            setUserID(sessionStorage.getItem("id"));
        }else{
            setUserID(null);
        }
    },[])


    // 댓글 등록 요청
    const submitComment=(data)=>{
        console.log(data.comment);
        axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/community/review/${props.data}/comment/`,
            {
                user:userID,
                review:props.data, //게시글 id
                content:data.comment // 댓글 내용
            })
            .then(()=>{
                axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/community/review/${props.data}/`)
                    .then(res=>{
                        dateFormat(res.data.comments);
                    });
        })

    }
    // 댓글 삭제
    const commentDelete = (id)=>{
        axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/community/comment/${id}/`)
            .then(async () => {
                await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/community/review/${props.data}/`)
                    .then(res => {
                        dateFormat(res.data.comments);
                    });

            })
    }
    // 댓글 가져오기
    useEffect(async ()=>{
        console.log("effect call")
        await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/community/review/${props.data}/`)
            .then(res=>{
                dateFormat(res.data.comments);
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
                    <Input.TextArea defaultValue="" rows={4}/>
                </Form.Item>
                <Form.Item>
                 <div className="commentBtn">
                     {userID != null ?(
                         <Button htmlType="submit" type="primary">
                             Add Comment
                         </Button>
                     ) : <span>댓글 작성은 로그인 후 이용해 주세요</span>
                     }
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
                            <span>{item.created_at}</span>
                            {item.user == userID? (
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
