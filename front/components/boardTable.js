import {Table, Button, Modal, Form, Input, InputNumber, Select} from 'antd';
import { useRouter } from 'next/router';
import { useState } from 'react';

const { Column, ColumnGroup } = Table;

export default function BoardTable() {
  const router = useRouter();
  const dataSource = [
    {
      key: 1,
      lastName: 'Brown',
      age: 32,
      title: 'New York No. 1 Lake Park',
    },
    {
      key: 2,
      lastName: 'Green',
      age: 42,
      title: 'London No. 1 Lake Park',
    },
    {
      key: 3,
      lastName: 'Brown',
      age: 32,
      title: 'New York No. 1 Lake Park',
    },
  ];

  const columns = [
    {
      title: 'lastName',
      dataIndex: 'lastName',
    },
    {
      title: 'Age',
      dataIndex: 'age',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      render: (title) => <a onClick={goDetail}>{title}</a>,
    },
  ];

  // 게시글 디테일 페이지 이동
  const goDetail=(e)=>{
    console.log(e.target);
    let id = e.target.getAttribute("value");
    router.push(`board/${id}`)
  }

  // 게시글 등록 창으로 이동
  const goWrite=()=>{
    console.log("submit");
    router.push(`board/write`)
  }

  return (
    <>
      <div
        style={{
          float: 'right',
        }}
      >
        <button onClick={goWrite}>게시글 쓰기</button>
      </div>

      <Table dataSource={dataSource} columns={columns}/>;
        <ColumnGroup title="Community">
          <Column title="Index" dataIndex="index" key="index" />
          <Column title="title" dataIndex="title" key="title"/>
          <Column title="Last Name" dataIndex="lastName" key="lastName" />
        </ColumnGroup>
    </>
  );
}
