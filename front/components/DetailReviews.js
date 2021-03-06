import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Table } from 'antd';
import WriteRating from './DetailReviewStarrating/WriteRating'

export default function DetailReviews({ id, isLogined }) {
  const [userID, setUserID] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [myreview, setMyreivew] = useState(null);
  const [myrank, setMyrank] = useState(10);

  useEffect(() => {
    if (id) {
      axios
        .get(process.env.NEXT_PUBLIC_BASE_URL+`/movies/oneline_review/${id}`)
        .then(res => {
          let resreviews = res.data
          for (let i = 0; i < resreviews.length; i++) {

            let rate = resreviews[i].rank
            if(0<=rate && rate<2){
              resreviews[i].rank="⭐"
            }else if(2<=rate && rate<4){
              resreviews[i].rank="⭐⭐"
            }else if(4<=rate && rate<6){
              resreviews[i].rank="⭐⭐⭐"
            }else if(6<=rate && rate<8){
              resreviews[i].rank="⭐⭐⭐⭐"
            }else{
              resreviews[i].rank="⭐⭐⭐⭐⭐"
            }

          }
          setReviews(resreviews);
        });
    }
    if (sessionStorage.getItem('id')) {
      setUserID(sessionStorage.getItem('id'));
    } else {
      setUserID(null);
    }
  }, []);

  const deleteReview = (id, index) => {
    axios
      .delete(
        process.env.NEXT_PUBLIC_BASE_URL + `/movies/oneline_review_detail/${id}`
      )
      .then(res => {
        let reviews_copy = [...reviews];
        let del_index = reviews_copy.findIndex(el => el.id == index.id);
        reviews_copy.splice(del_index, 1);
        setReviews(reviews_copy);
      });
  };

  const columns = [
    {
      title: '닉네임',
      dataIndex: ['user', 'username2'],
    },
    {
      title: '점수',
      dataIndex: 'rank',
    },
    {
      title: '한줄평',
      dataIndex: 'content',
    },
    {
      title: '작성일',
      dataIndex: 'created_at',
    },
    {
      render: (review, index) => (
        <>
          {userID == review.user.id ? (
            <Button
              type="primary"
              danger
              ghost
              key={index}
              onClick={() => deleteReview(review.id, index)}
            >
              삭제
            </Button>
          ) : null}
        </>
      ),
    },
  ];

  const postReview = () => {
    let user = sessionStorage.getItem('id');
    let username = sessionStorage.getItem('username');
    let token = localStorage.getItem('JWT token');
    if (user !== null) {
      var today = new Date();
      var year = today.getFullYear();
      var month = ('0' + (today.getMonth() + 1)).slice(-2);
      var day = ('0' + today.getDate()).slice(-2);
      var dateString = year + '-' + month + '-' + day;

      if (myreview !== null && myrank !== null) {
        axios({
          method: 'post',
          url: process.env.NEXT_PUBLIC_BASE_URL+`/movies/oneline_review/${id}/`,
          data: {
            content: myreview,
            rank: myrank,
            user: Number(user),
            movie: Number(id),
          },
          headers: { Authorization: `JWT ${token}` },
        }).then((res) => {
          let rate;
          if(0<=myrank && myrank<2){
            rate="⭐"
          }else if(2<=myrank && myrank<4){
            rate="⭐⭐"
          }else if(4<=myrank && myrank<6){
            rate="⭐⭐⭐"
          }else if(6<=myrank && myrank<8){
            rate="⭐⭐⭐⭐"
          }else{
            rate="⭐⭐⭐⭐⭐"
          }
          let reviews_copy = [...reviews];
          reviews_copy = reviews_copy.concat([
            {
              user: {
                id: userID,
                username2: username,
              },
              id:res.data.id,
              content: myreview,
              rank: rate,
              created_at: dateString,
            },
          ]);
          setReviews(reviews_copy);
          setMyreivew(null);
          setMyrank(null);
        });
      } else {
        alert('글을 쓰거나, 랭크를 주세요..');
      }
    } else {
      alert('로그인을 하세요..');
    }
  };
  

  return (
    <>
      <div className="container">
        <Table
          columns={columns}
          dataSource={reviews}
          pagination={{
            position: ['bottomCenter'],
            pageSize: 4,
          }}
        />
        <Form>
          <div
            className="commentDiv-area"
            style={{ display: 'flex', flexDirection: 'row' }}
          >
            <WriteRating setMyrank={setMyrank}/>
            <Input
              value={myreview}
              placeholder="한줄평을 남겨주세요."
              style={{ resize: 'none' }}
              onChange={e => {
                setMyreivew(e.target.value);
              }}
            />
            <div className="commentBtn">
              {/* {userID != null ?( */}
              <Button
                type="primary"
                onClick={() => {
                  postReview();
                }}
              >
                한줄평 작성
              </Button>
              {/* ) : <span>댓글 작성은 로그인 후 이용해 주세요</span>
              } */}
            </div>
          </div>
        </Form>
      </div>
      <style jsx>
        {`
          .container {
            margin: 10px 0;
            background: white;
            width: 60%;
            height: 50%;
          }
        `}
      </style>
    </>
  );
}
