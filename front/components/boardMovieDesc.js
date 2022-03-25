import {useRouter} from "next/router";

export default function BoardMovieDesc(props){

    const router = useRouter();
    return(
        <div className="movieInfo-div">

                <div className="movieInfo-main" onClick={()=>router.push(`/movie/${props.movies[0].id}`)}>
                    <div className="container-item">
                        <figure className="poster-img-figure">
                            <img className="posterImg" src={props.movies[0].poster_path}
                                 alt="이미지가 없습니다."
                            />
                            <figcaption>{props.movies[0].title}</figcaption>
                        </figure>
                    </div>

                            <div className="container-item">
                                <table>
                                    <tbody>
                                    <tr>
                                        <th>
                                            <span>장르</span>
                                        </th>
                                        <td>
                                            {props.movies[0].genres.map((item, idx)=>(
                                                idx == props.movies[0].genres.length-1?(<span key={idx}>{item.name}</span>)
                                                    : (<span key={idx}>{item.name},&nbsp;</span>)
                                            ))}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                            <span>개봉일</span>
                                        </th>
                                        <td>
                                            <span>{props.movies[0].release_date}</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                            <span>출연</span>
                                        </th>
                                        <td>
                                            <div className="actor-info">
                                                {props.movies[0].casts.map((item, idx)=>(
                                                    <figure key={idx}>
                                                        <img className="actor-img" src={item.profile_path} alt="이미지가 없습니다."/>
                                                        <figcaption>{item.name}</figcaption>
                                                    </figure>
                                                ))}
                                            </div>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>

                </div>

            <style jsx>{`
                .movieInfo-main:hover {
                    transform: scale(1.1);
                    transition-duration: 0.5s;
                }
                .posterImg{
                      position: relative;
                      width: 50%;
                }
                .movieInfo-main{
                    display: flex;  
                    border: 1px solid #e9ebee;
                    flex-wrap: wrap;
                    cursor: pointer;
                    justify-content: center;
                }
                .movieInfo-div{
                    margin: auto;
                    width: fit-content;
                }
                .container-item{
                    margin: 1rem;
                    width: 20rem;
                    display: flex;
                    align-items: center;
                }
                .movieTitle{
                    font-size: 28px;
                }
                .actor-info{
                    display: flex;
                }
                .actor-img{
                    width: 70px;
                }
                table {
                  border-spacing: 10px;
                  border-collapse: separate;
                  text-align: center;
                }
                table td {
                  width: 20px;
                }
                .movie-title-overview{
                    text-align: center;
                }
                .poster-img-figure{
                    text-align: center;
                }
                
            `}</style>
        </div>
    )
}