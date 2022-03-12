import {Table} from "antd";
import {useEffect, useState} from "react"
import axios from "axios";

export default function detailContent({id}){
    const [data, setData] = useState([{}]);
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
    useEffect( async () => {
        console.log("effect call")
        await axios.get(`http://127.0.0.1:8000/community/review/${id}/`).then(res=>{
            console.log("게시글 리턴 : ", res.data);
            setData( [res.data]);
        })
    },[])
    const info = Object.assign(data[0]);

    return(
        <>
            <Table dataSource={data}
                   pagination={{ hideOnSinglePage: true}}
                   columns={columns}
                   rowKey={data[0].id}
            >
            </Table>
            <div className="contentDiv">
                {info.content}
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
