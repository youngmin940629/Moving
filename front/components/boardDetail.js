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
            <section className="tableSection">
               <Table  dataSource={data}
                       pagination={{ hideOnSinglePage: true}}
                       columns={columns}
                />
            </section>
            <section className="imgSection">
                <img className="posterImg" src={props.movies[0].poster_path}
                    alt="이미지가 없습니다."
                />
            </section>
            <section className="description">
                <span className="movieTitle">
                    {props.movies[0].title} :
                </span>
                <span>{props.movies[0].overview}</span>
            </section>
            <section className="contentDiv">
                {data[0].content}
            </section>


            <style jsx>{`
                .contentDiv{
                     text-align: center;
                     font-size: 30px;
                     padding-top: 70px;
                     padding-bottom : 70px;
                }
                .posterImg{
                      width: 40%;
                      height: 450px;
                      display: block;
                      margin: auto;
                }
                .imgSection{
                    text-align: center;
                }
                .movieTitle{
                    font-size: 28px
                }
                .description{
                    font-size: 16px;
                }
                `}

            </style>
        </>
    )
}