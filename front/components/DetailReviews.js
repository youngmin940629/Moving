import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Table } from 'antd';

export default function DetailReviews({ id, isLogined }) {
  const [userID, setUserID] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [myreview, setMyreivew] = useState(null);
  const [myrank, setMyrank] = useState(10);

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:8000/movies/oneline_review/${id}`)
        .then(res => {
          setReviews(res.data);
          console.log(res.data);
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
        console.log(index.id);
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
    if (user !== undefined) {
      var today = new Date();
      var year = today.getFullYear();
      var month = ('0' + (today.getMonth() + 1)).slice(-2);
      var day = ('0' + today.getDate()).slice(-2);
      var dateString = year + '-' + month + '-' + day;

      if (myreview !== null && myrank !== null) {
        axios({
          method: 'post',
          url: `http://localhost:8000/movies/oneline_review/${id}/`,
          data: {
            content: myreview,
            rank: myrank,
            user: Number(user),
            movie: Number(id),
          },
          headers: { Authorization: `JWT ${token}` },
        }).then((res) => {
          let reviews_copy = [...reviews];
          console.log(reviews_copy);
          reviews_copy = reviews_copy.concat([
            {
              user: {
                id: userID,
                username2: username,
              },
              id:res.data.id,
              content: myreview,
              rank: myrank,
              created_at: dateString,
            },
          ]);
          setReviews(reviews_copy);
          setMyreivew('');
          setMyrank(10);
        });
      } else {
        alert('글을쓰거나, 랭크를 주세요..');
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
            pageSize: 5,
          }}
        />

        <Form>
          <div
            className="commentDiv-area"
            style={{ display: 'flex', flexDirection: 'row' }}
          >
            <input
              value={myrank}
              type="number"
              max={10}
              min={1}
              onChange={e => {
                setMyrank(Number(e.target.value));
              }}
            ></input>
            <Input.TextArea
              value={myreview}
              rows={1}
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
                댓글 작성
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
            background: white;
            width: 50%;
            height: 50%;
          }
        `}
      </style>
    </>
  );
}
