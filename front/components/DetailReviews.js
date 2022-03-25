import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { List, Form, Input, Button } from 'antd';

export default function DetailReviews({id, isLogined}) {

  const [reviews, setReviews] = useState([]);
  const [myreview, setMyreivew] = useState(null);
  const [myrank, setMyrank] = useState(null);

  useEffect(()=>{
    if(id){
      axios.get(`http://localhost:8000/movies/oneline_review/${id}`)
      .then(res=>{
        setReviews(res.data)
        console.log(res.data)
      })
    }
  },[])

  const postReview = () => {
    let user = sessionStorage.getItem('id');
    if (user !== undefined) {

      if(myreview !== null && myrank !== null){
        axios({
          method:'post',
          url:`http://localhost:8000/movies/oneline_review/${id}/`,
          data:{
            content:myreview,
            rank:myrank,
            user:user,
            movie:id,
          }
        })
      }else{
        alert('글을쓰거나, 랭크를 주세요..')
      }

    } else{
      alert('로그인을 하세요..')
    }

  }

  return (
    <>
      <div className='container'>
        {
          <List
              itemLayout="horizontal"
              dataSource={reviews}
              renderItem={(review, idx)=>(
                  <List.Item>
                      <List.Item.Meta
                          key={idx}
                          title={review.rank}
                          description={review.content}
                      />
                      <span>{review.created_at}</span>
                      {/* {item.user == userID? (
                          <Button onClick={()=>{
                              commentDelete(item.id)
                          }}>삭제</Button>
                      ):null} */}
                  </List.Item>
              )}
          />
        }
        <Form
        >
          <div className="commentDiv-area">
              <Form.Item
                  name="comment"
              >
              <Input.TextArea defaultValue="" rows={1} style={{resize: "none"}} onChange={(e)=>{setMyreivew(e.target.value)}}/>
              <input type="number" max={10} min={1} onChange={(e)=>{setMyrank(Number(e.target.value))}}></input>
              </Form.Item>
          </div>
          <Form.Item>
            <div className="commentBtn">
                {/* {userID != null ?( */}
                    <Button type="primary" onClick={()=>{postReview()}}>
                        댓글 작성
                    </Button>
                {/* ) : <span>댓글 작성은 로그인 후 이용해 주세요</span>
                } */}
            </div>
          </Form.Item>
        </Form>
      </div>
      <style jsx>
        {`
          .container{
            background:white;
            width:50%;
            height:50%;
          }
        `}
      </style>
    </>
  )
}
