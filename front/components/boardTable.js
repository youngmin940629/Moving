import {Button, Table} from 'antd';
import { useRouter } from 'next/router';
import Link from "next/link"
import {useEffect, useState} from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";

export default function BoardTable(props) {
  const router = useRouter();
  const [userID, setUserID] =  useState();

  useEffect(()=>{
    if(localStorage.getItem("JWT token")){
      setUserID(jwt_decode(localStorage.getItem("JWT token")).user_id);
    }else{
      setUserID(null);
    }
  },[])

  // 게시글 삭제 함수 id : 게시글 번호
  const deleteBoard = (id)=>{
    console.log(id)
    try {
      if(confirm("삭제하기겠습니까?")){
        axios.delete(`http://localhost:8000/community/review/${id}/`);
        alert("삭제완료");
        router.replace(router.asPath);
      }

    }catch (e){}
  }
  // 게시글 테이블 컬럼 내용
  const columns = [
    {
      title: '작성자',
      dataIndex: 'username',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      render: (title, record) => <Link
          href={`board/${record.id}`}
          value={record.id}><a>{title}</a></Link>
    },
    {
      title: '작성일',
      dataIndex: 'created_at',
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
        {userID != null ? (
            <button onClick={goWrite}>게시글 쓰기</button>
        ) : null
        }
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
