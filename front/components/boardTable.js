import { Table, Button, Space } from 'antd';
import {useRouter} from "next/router";
import {useState} from "react";
import BoardModal from "../components/boardWriteModal"

const { Column, ColumnGroup } = Table;
import { useState } from 'react';

export default function BoardTable(){
    const router = useRouter();
    const [boards, setBoards] = useState([ {
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

        },{
            index: 1,
            lastName: 'Brown',
            age: 32,
            title: 'New York No. 1 Lake Park',

        }])
    // 게시글 디테일 페이지 이동
    const goDetail=(e)=>{
        console.log(e.target.getAttribute("value"));
        let id = e.target.getAttribute("value");
        router.push(`board/${id}`)
    }
    // 게시글 쓰기 모달창 호출
    const [isModal, setIsModal] = useState(false);
    const callModal=()=>{
        setIsModal(!isModal);
        console.log("table",isModal);
    }

    return(
        <>

            <div style={
                {
                    float: "right"
                }
            }>
                <button onClick={callModal}>게시글 쓰기</button>
            </div>
            {/*{isModal?<BoardModal {isModal}/>:null}*/}


            <Table dataSource={boards} pagination={{ position: ["bottomCenter"]}}>
                <ColumnGroup title="Community">
                    <Column title="Index" dataIndex="index" key="index" />
                    <Column title="title" dataIndex="title" key="title"
                            render={(text, record) => (
                                <Space size="middle">
                                    <a value={record.index} onClick={goDetail}>{record.title}</a>
                                </Space>
                            )}
                    />
                    <Column title="Last Name" dataIndex="lastName" key="lastName" />
                </ColumnGroup>
            </Table>
        </>
    )
}

