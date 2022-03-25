import {useRouter} from "next/router";

export default function BoardMovieDesc(props){

    const router = useRouter();
    return(
        <div className="movieInfo-div">
            <section className="movieInfo-container" onClick={()=>router.push(`/movie/${props.movies[0].id}`)}>

                <div className="movieInfo-main">
                    <figure className="container-item">
                        <img className="posterImg" src={props.movies[0].poster_path}
                             alt="이미지가 없습니다."
                        />
                    </figure>
                    <div className="container-item">

                        <div className="subMovie-info">
                            <div className="movie-title-overview">
                                <span className="movieTitle">
                                    {props.movies[0].title}
                                        <br/>
                                </span>
                                <span>
                                    {props.movies[0].overview.length > 100?(
                                        props.movies[0].overview.substr(0, 101)+"..."
                                    ): props.movies[0].overview}
                                </span>
                            </div>
                            <div>
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
                    </div>
                </div>

            </section>

            <style jsx>{`
                .movieInfo-div{
                    width: 80%;
                    margin: 0 auto;
                    margin-top: 50px;
                }
                .movieInfo-container:hover {
                    transform: scale(1.1);
                    transition-duration: 0.5s;
                }
                .posterImg{
                      width: 120px;
                }
                .movieInfo-main{
                    display: inline-flex;  
                }
                .movieInfo-container{
                    border: 1px solid #e9ebee;
                    border-radius: 8px;
                    margin-bottom: 20px;
                }
                .container-item{
                    margin: auto;
                    display: inline-block;
                    padding: 10px;
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
                .subMovie-info{
                    display: flex;
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
                    margin: auto;
                }
                
            `}</style>
        </div>
    )
}