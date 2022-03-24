import React, {useEffect, useState} from 'react';
import {  Form, Button, List, Input } from 'antd';
import axios from "axios";

export default function Comments(props) {
    const [comments, setComments] = useState([{}]);
    console.log("props", props)
    const dateFormat = (data)=>{
        let originDate;
        for(let i=0; i<data.length; i++){
            originDate= new Date(data[i].created_at);
            let date="";
            date += originDate.getFullYear()+".";
            date += originDate.getMonth()+1+".";
            date += originDate.getDate()+". ";
            date += originDate.getHours()+":";
            date += originDate.getMinutes() < 10? '0'+originDate.getMinutes() : originDate.getMinutes();
            data[i].created_at = date;
        }
        setComments(data);
    }
    const [userID, setUserID] = useState();
    const [form] = Form.useForm();
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
        form.resetFields();
        axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/community/review/${props.data.id}/comment/`,
            {
                user:userID,
                review:props.data.id, //게시글 id
                content:data.comment // 댓글 내용
            })
            .then(()=>{
                axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/community/review/${props.data.id}/`)
                    .then(res=>{
                        dateFormat(res.data.comments);
                        
                    });
        })
    }
    // 댓글 삭제
    const commentDelete = (id)=>{
        axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/community/comment/${id}/`)
            .then(async () => {
                await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/community/review/${props.data.id}/`)
                    .then(res => {
                        dateFormat(res.data.comments);
                    });

            })
    }
    // 댓글 가져오기
    useEffect(async ()=>{
                dateFormat(props.data.comments);
    },[])

    return(
        <div className="commentDiv">
            <div className="commentInfo">
            <Form
                onFinish={submitComment}
                form={form}
            >
                    <div className="commentDiv-area">
                        <Form.Item
                            name="comment"
                        >
                        <Input.TextArea defaultValue="" rows={7} style={{resize: "none"}}/>
                        </Form.Item>
                    </div>
                <Form.Item>
                 <div className="commentBtn">
                     {userID != null ?(
                         <Button htmlType="submit" type="primary">
                             댓글 작성
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
                    renderItem={(item, idx)=>(
                        <List.Item>
                            <List.Item.Meta
                                key={idx}
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
            </div>
            <style jsx>{`
                .commentBtn{
                    text-align: center;
                }
                .commentDiv-area{
                    text-align: center;
                }
                .commentDiv{
                    margin: 50px;
                }
                .commentInfo{
                    width: 80%;
                    margin: auto;   
                }
            `}</style>
        </div>
    )
}
