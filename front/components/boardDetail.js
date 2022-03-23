import {Table} from "antd";
import {useEffect, useState} from "react"
import {useRouter} from "next/router";

export default function detailContent(props){
    const [data, setData] = useState([{}]);
    useEffect(()=>{
        setData([props.data]);
    },[])
    const router = useRouter();
    return(
        <div className="boardInfo">
            <div className="postInfo">

                <div className="postInfo-header">

                    <div className="postInfo-header-title">
                        <h2>{data[0].title}</h2>
                    </div>

                    <div className="postInfo-header-subtitle">
                        <h4 className="username">{data[0].username}</h4>
                        <span>&nbsp;&nbsp;&nbsp;{data[0].created_at}</span>
                    </div>

                </div>

            </div>
            <div className="content">
            <section className="contentDiv">
                {data[0].content}
            </section>

            <div className="movieInfo-div" onClick={()=>router.push(`/movie/${props.movies[0].id}`)}>
                <section className="movieInfo-container">
                    <figure className="container-item">
                        <img className="posterImg" src={props.movies[0].poster_path}
                            alt="이미지가 없습니다."
                        />
                    </figure>
                    <div className="container-item">
                        <span className="movieTitle">
                            {props.movies[0].title}
                            <br/>
                        </span>
                        <span>{props.movies[0].overview}</span>
                    </div>
                </section>
            </div>
            </div>
            <style jsx>{`
                .postInfo-header{
                    border-bottom: 1px solid #f1f3f5;
                }
                .postInfo-header-subtitle{
                    display: flex;
                }
                .movieInfo-div{
                    text-align: center;
                }
                .movieInfo-container:hover {
                    transform: scale(1.1);
                    transition-duration: 0.5s;
                }
                .contentDiv{
                     font-size: 30px;
                     padding-top: 70px;
                     padding-bottom : 70px;
                }
                .posterImg{
                      width: 200px;
                }
                .movieInfo-container{
                    display: inline-flex;
                    border: 1px solid #e9ebee;
                    border-radius: 8px;
                    width: 70%;
                    margin-bottom: 20px;
                    align-items: center;
                }
                .container-item{
                    margin: auto;
                    display: inline-block;
                }
                .movieTitle{
                    font-size: 28px;
                }
                .movieInfo-div{
                    cursor: pointer;
                }
                .description{
                    font-size: 16px;
                }  
                .content{
                    border-bottom: 1px solid #f1f3f5; 
                    margin-bottom: 20px;
                }
                .username{
                    font-weight: 600;
                    
                }
                `}

            </style>
        </div>
    )
}