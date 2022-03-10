import { Table, Button, Space } from 'antd';
import { useRouter } from 'next/router';
import { useState } from 'react';
import BoardModal from '../components/boardWriteModal';

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
      key: 'lastName',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
  ];

  // 게시글 디테일 페이지 이동
  const goDetail = e => {
    console.log(e.target.getAttribute('value'));
    let id = e.target.getAttribute('value');
    router.push(`board/${id}`);
  };
  // 게시글 쓰기 모달창 호출
  const [isModal, setIsModal] = useState(false);
  const callModal = () => {
    setIsModal(!isModal);
    console.log('table', isModal);
  };

  return (
    <>
      <div
        style={{
          float: 'right',
        }}
      >
        <button onClick={callModal}>게시글 쓰기</button>
      </div>
      {/*{isModal?<BoardModal {isModal}/>:null}*/}
      <Table dataSource={dataSource} columns={columns} />;
    </>
  );
}
