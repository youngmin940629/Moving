import {useEffect, useState} from "react"
import {useRouter} from "next/router";
import {Button} from "antd";
import ReviewLike from "./ReviewLike";
import axios from "axios";

export default function detailContent(props){
    const [userID, setUserID] = useState(0);
    const router = useRouter();
    useEffect(()=>{
        if(sessionStorage.getItem("id")){
            setUserID(sessionStorage.getItem("id"));
        }
    },[])
    
    // 게시글 삭제 함수
    const deleteBoard = (id) => {
        if (confirm('삭제하시겠습니까?')) {
            axios
                .delete(`${process.env.NEXT_PUBLIC_BASE_URL}/community/review/${id}/`)
                .then(() => {
                    alert("삭제 완료")
                    router.push('/community')
                })
        };
    }

    return(
        <div className="boardInfo">
            <div className="postInfo">

                <div className="postInfo-header">
                    <div className="postInfo-header-title">
                        <h2>{props.data.title}</h2>
                    </div>

                    <div className="postInfo-header-subtitle">
                        <div className="subtitle-info">
                            <h4 className="username">{props.data.user.username2}</h4>
                            <span>&nbsp;&nbsp;&nbsp;작성일:&nbsp;&nbsp;{props.data.created_at}</span>
                            <span>&nbsp;&nbsp;&nbsp;수정일:&nbsp;&nbsp;{props.data.updated_at}</span>
                            <span>&nbsp;&nbsp;&nbsp;조회수:&nbsp;&nbsp;{props.data.visit_count}</span>
                            <span>&nbsp;&nbsp;&nbsp;댓글수:&nbsp;&nbsp;{props.data.comments.length}</span>
                        </div>
                        {props.data.user.id == userID? (
                            <div className="modifyBtn">
                                <Button
                                    type="primary"
                                    ghost
                                    key={props.data.id}
                                    onClick={()=>router.push(`/board/modify/${props.data.id}`)}
                                    style={{marginRight:'5px'}}
                                >
                                    수정
                                </Button>
                                <Button
                                    type="primary"
                                    danger
                                    ghost
                                    key={props.data.id}
                                    onClick={() => deleteBoard(props.data.id)}
                                >
                                    삭제
                                </Button>
                            </div>
                        ) : null}
                    </div>

                </div>

                <div className="content">
                    <section className="contentDiv">
                        {props.data.content}
                    </section>
                </div>

                <ReviewLike userId={userID} reviewId={props.data.id} />


            </div>
            <style jsx>{`
                .boardInfo{
                    margin: 50px;
                    border-top: 2px solid #f1f3f5;
                    width: 80%;
                    margin: auto;
                    
                }
                .subtitle-info{
                    display: flex;
                    flex-wrap: wrap;
                }
                .postInfo-header{
                    border-bottom: 1px solid #f1f3f5;
                    margin: auto;
                }
                .postInfo-header-subtitle{
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 5px;

                }
                .contentDiv{
                     font-size: 20px;
                     padding-top: 20px;
                     padding-bottom : 20px;
                     text-align: left;
                }
                .content{
                    margin-bottom: 20px;
                }
                .username{
                    font-weight: 600;    
                }
                .actor-img{
                    width: 30%;
                }
                `}

            </style>
        </div>
    )
}