import {Button, Table} from 'antd';
import { useRouter } from 'next/router';
import Link from "next/link"
import {useEffect, useState} from "react";
import axios from "axios";

export default function BoardTable(props) {
  const router = useRouter();
  const [userID, setUserID] =  useState();

  useEffect(()=>{
    // localstorage의 jwt에서 userID 파싱
    // 그리고 userID에 set
    const base64Payload = localStorage.getItem("JWT token").split('.')[1];
    const payload = Buffer.from(base64Payload, 'base64');
    const result = JSON.parse(payload.toString())
    console.log("logined userID : ",result.user_id);
    setUserID(result.user_id);
  },[])

  // 게시글 삭제 함수 id : 게시글 번호
  const deleteBoard = (id)=>{
    console.log(id)
    try {
      axios.delete(`http://localhost:8000/community/review/${id}/`);
      alert("삭제완료");
      router.replace(router.asPath);
    }catch (e){}
  }
  // 게시글 테이블 컬럼 내용
  const columns = [
    {
      title: '작성자',
      dataIndex: 'username',
    },
    {
      title: '작성일',
      dataIndex: 'created_at',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      render: (title, record) => <Link
          href={`board/${record.id}`}
          value={record.id}><a>{title}</a></Link>
    },
    {
      render: (record) => (
          <div>
            {/*
            로그인 사용자ID == 게시글 작성자ID
            삭제 버튼 보여주기
            */}
            {userID == record.user ?
                <Button type="primary" key={record.id} onClick={()=>deleteBoard(record.id)}>삭제</Button>
            : null}
          </div>
      ),
    },

  ];

  // 게시글 등록 창으로 이동
  const goWrite=()=>{
    console.log("submit");
    router.push(`board/write`);
  }

  return (
    <>
      <div className="boardWriteBtn">
        <button onClick={goWrite}>게시글 쓰기</button>
      </div>

      <Table dataSource={props.boards} columns={columns} />;

      <style jsx>{`
        .boardWriteBtn{
          float: right;
        }
      `}</style>
    </>
  );
}
