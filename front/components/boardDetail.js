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
            영화정보
            <section className="movieInfo-container">
                <div className="container-item">
                    <img className="posterImg" src={props.movies[0].poster_path}
                        alt="이미지가 없습니다."
                    />
                </div>
                <div className="container-item">
                    <span className="movieTitle">
                        {props.movies[0].title}
                        <br/>
                    </span>
                    <span>{props.movies[0].overview}</span>
                </div>
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
                }
                .movieInfo-container{
                    max-width: 100%;
                    display: flex;
                    border-top: 2px groove grey;
                    border-bottom : 2px groove grey;
                   
                }
                .container-item{
                    margin: auto;
                    padding: 10% auto 10% auto;
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