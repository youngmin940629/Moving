import {Table} from "antd";
import {useEffect, useState} from "react"

export default function detailContent(props){
    const [data, setData] = useState([{}]);

    useEffect(()=>{
        setData([props.data]);
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
            title: "작성일",
            dataIndex: "created_at"
        }
    ];

    return(
        <>
           <Table dataSource={data}
                   pagination={{ hideOnSinglePage: true}}
                   columns={columns}
                  rowKey={data.id}
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