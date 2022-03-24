import { Button, Table } from 'antd';
import { useRouter } from 'next/router';
import {useEffect, useState} from "react";
import axios from "axios";
import styled from 'styled-components';

const LogoWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 20px;
`;

const Logo = styled.img``;

const BoardTitle = styled.h2`
  text-align: center;
  padding-bottom: 5px;
  font-weight: bold;
  color: #2cd4ac;
`;

const TableWrapper = styled.div`
  width: 70rem;
  margin: auto;
`;

const BoardWriteBtn = styled(Button)`
  float: right;
  margin-bottom: 20px;
`;

// 게시글 갯수 : props.boards.length

export default function BoardTable(props) {
  const router = useRouter();
  const [userID, setUserID] =  useState(null);

  useEffect(()=>{
    if(sessionStorage.getItem("id")){
      setUserID(sessionStorage.getItem("id"));
    }else{
      setUserID(null);
    }
  },[])

  // 게시글 삭제 함수 id : 게시글 번호
  const deleteBoard = (id)=>{
    console.log(id)
    try {
      if(confirm("삭제하사겠습니까?")){
        axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/community/review/${id}/`);
        alert("삭제완료");
        router.replace(router.asPath);
      }

    }catch (e){}
  }
  // 게시글 테이블 컬럼 내용
  const columns = [
    {
      title: 'No.',
      dataIndex: 'id',
    },
    {
      title: '작성자',
      dataIndex: 'username',
    },
    {
      title: '제목',
      dataIndex: 'title',
      // width: '30rem',
      render: (title, record) => <a
          style={{color:'black', fontWeight:'bold'}}
          href={`board/${record.id}`}
          value={record.id} key={record.id}>{title}</a>
    },
    {
      title: '작성일',
      dataIndex: 'created_at',
    },
    {
      // width: '5rem',
      render: (record) => (
          <>
            {/*
            로그인 사용자ID == 게시글 작성자ID
            삭제 버튼 보여주기
            */}
            {userID == record.user ?
                <Button 
                  type="primary" 
                  danger 
                  ghost
                  key={record.id} 
                  onClick={()=>deleteBoard(record.id)}
                >
                  삭제
                </Button>
            : null}
          </>
      ),
    },

  ];

  // 게시글 등록 창으로 이동
  const goWrite=()=>{
    router.push(`board/write`);
  }

  return (
    <TableWrapper>
      <LogoWrapper>
        <Logo src="/img/logo-colored.png" />
      </LogoWrapper>
      <BoardTitle>Review Board</BoardTitle>
      {userID != null ? (
          <BoardWriteBtn type="primary" onClick={goWrite}>게시글 쓰기</BoardWriteBtn>
        ) : null
      }
      <Table dataSource={props.boards} 
        columns={columns}
        pagination={{
        position:["bottomCenter"]
        }}
      />
    </TableWrapper>
  );
}
