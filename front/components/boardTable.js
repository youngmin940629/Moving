import { Table, Tag, Space } from 'antd';

const { Column, ColumnGroup } = Table;
import { useState } from 'react';

export default function BoardTable() {
  const [boards, setBoards] = useState([
    {
      index: 1,
      lastName: 'Brown',
      age: 32,
      title: 'New York No. 1 Lake Park',
    },
    {
      index: 2,
      lastName: 'Green',
      age: 42,
      title: 'London No. 1 Lake Park',
    },
  ]);

  const goDetail = e => {
    console.log(e.target.value);
  };

  return (
    <>
      <Table dataSource={boards}>
        <ColumnGroup title="Community">
          <Column title="Index" dataIndex="index" key="index" />
          <Column
            title="title"
            dataIndex="title"
            key="title"
            render={(text, record) => (
              <Space size="middle">
                <a value="sdaf" onClick={goDetail}>
                  {record.title}
                </a>
              </Space>
            )}
          />
          <Column title="Last Name" dataIndex="lastName" key="lastName" />
        </ColumnGroup>
      </Table>
      <style jsx>{``}</style>
    </>
  );
}
