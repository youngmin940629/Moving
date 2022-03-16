import {Table} from "antd";
import {useEffect, useState} from "react"

export default function detailContent(props){
    const [data, setData] = useState([{}]);

    useEffect(()=>{
        setData([props.data]);
        console.log("data", data)
    },[])
    const columns = [
        {
            title: "title",
            dataIndex: "title"
        },
        {
            title: "작성자",
            dataIndex: "username"
        },
        {
            title: '평점',
            dataIndex: 'rank',
        },
        {
            title: "작성일",
            dataIndex: "created_at"
        },
        {
            title: '수정일',
            dataIndex: 'updated_at',
        }
    ];

    return(
        <>
           <Table dataSource={data}
                   pagination={{ hideOnSinglePage: true}}
                   columns={columns}
            />

            <div className="contentDiv">
                {data[0].content}
            </div>


            <style jsx>{`
                .contentDiv{
                     text-align: center;
                     font-size: 30px;
                     padding-top: 70px;
                     padding-bottom : 70px;
                }
                `}

            </style>
        </>
    )
}