import {Table} from 'antd';
import { useRouter } from 'next/router';
import Link from "next/link"

export default function BoardTable(props) {
  const router = useRouter();

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
          href={`board/${encodeURIComponent(record.id)}`}
          value={record.id}><a>{title}</a></Link>
    },
  ];

  // 게시글 등록 창으로 이동
  const goWrite=()=>{
    console.log("submit");
    router.push(`board/write`);
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

      <Table dataSource={props.boards} columns={columns} />;

    </>
  );
}

