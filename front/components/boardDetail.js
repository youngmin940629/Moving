import {useEffect, useState} from "react"
import {useRouter} from "next/router";
import {Button} from "antd";

export default function detailContent(props){
    const [userID, setUserID] = useState(null);
    const [data, setData] = useState([{}]);
    const router = useRouter();

    useEffect(()=>{
        setData([props.data]);
        if(sessionStorage.getItem("id")){
            setUserID(sessionStorage.getItem("id"));
        }else{
            setUserID(null);
        }
    },[])
    console.log(props.data)
    return(
        <div className="boardInfo">
            <div className="postInfo">

                <div className="postInfo-header">
                    <div className="postInfo-header-title">
                        <h2>{data[0].title}</h2>
                    </div>

                    <div className="postInfo-header-subtitle">
                        <div className="subtitle-info">
                            <h4 className="username">{data[0].username}</h4>
                            <span>&nbsp;&nbsp;&nbsp;{data[0].created_at}</span>
                            <span>&nbsp;&nbsp;&nbsp;댓글수:&nbsp;&nbsp;{props.data.comments.length}</span>
                        </div>
                        {props.data.user == userID? (
                            <div className="modifyBtn">
                                <Button onClick={()=>router.push(`/board/modify/${props.data.id}`)}>
                                    수정
                                </Button>
                            </div>
                        ) : null}
                    </div>

                </div>

                <div className="content">
                <section className="contentDiv">
                    {data[0].content}
                </section>

                <div className="movieInfo-div">
                    <section className="movieInfo-container" onClick={()=>router.push(`/movie/${props.movies[0].id}`)}>
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
            </div>
            <style jsx>{`
                .boardInfo{
                    margin: 50px;
                    border-top: 2px solid #f1f3f5;
                    border-bottom: 2px solid #f1f3f5;
                    width: 80%;
                    margin: auto;
                }
                .subtitle-info{
                    display: flex;
                }
                .postInfo-header{
                    border-bottom: 1px solid #f1f3f5;
                    margin: auto;
                }
                .postInfo-header-subtitle{
                    display: flex;
                    justify-content: space-between;
                }
                .movieInfo-div{
                    width: 70%;
                    margin: 0 auto;
                }
                .movieInfo-container:hover {
                    transform: scale(1.1);
                    transition-duration: 0.5s;
                }
                .contentDiv{
                     font-size: 30px;
                     padding-top: 70px;
                     padding-bottom : 70px;
                     text-align: left;
                }
                .posterImg{
                      width: 200px;
                }
                .movieInfo-container{
                    display: inline-flex;
                    border: 1px solid #e9ebee;
                    border-radius: 8px;
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