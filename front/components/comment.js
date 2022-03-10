import React, {useState} from 'react';
import {  Form, Button, List, Comment, Avatar ,Input } from 'antd';

export default function Comments() {
    const [comments, setComments] = useState([
        {
            content: "test1",
            userName: "userTest"
        },
        {
            content: "test2",
            userName: "userTest2"
        }
    ])
    // 댓글 등록 요청
    const submitComment=()=>{
        console.log("submit");
    }
    return(
        <>
            <Form.Item>
                <Input.TextArea rows={4}/>
            </Form.Item>
            <Form.Item>
             <div style={
                 {
                     textAlign: "center"
                 }
             }>
                <Button htmlType="submit" type="primary" onClick={submitComment}>
                    Add Comment
                </Button>
             </div>
            </Form.Item>

            <List
                itemLayout="horizontal"
                dataSource={comments}
                renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            title={<a href="https://ant.design">{item.userName}</a>}
                            description={item.content}
                        />
                    </List.Item>
                )}
            />
        </>
    )
}