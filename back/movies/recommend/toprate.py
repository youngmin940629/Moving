import pandas as pd
import numpy as np
import sqlite3


# 데이터베이스에서 영화, 평점 데이터 불러오기
con = sqlite3.connect("db.sqlite3")
try:
    rating_data = pd.read_sql_query("SELECT * from movies_rating", con )
    if len(rating_data)>200:
        movie_data = pd.read_sql_query("SELECT id,title from movies_movie", con)
        rating_data.drop('id', axis=1, inplace=True)
        user_movie_ratings = rating_data.pivot(
            index='user_id',
            columns='movie_id',
            values='rank'
        )
        movie_data.rename(columns={'id' : 'movie_id'},inplace=True)

        movie_mean_vote = np.mean(user_movie_ratings.T, axis=1)
        movie_mean_vote = pd.DataFrame(movie_mean_vote,columns=['평점평균'])

        movie_mean_data = pd.merge(movie_data, movie_mean_vote, on='movie_id')



    else:
        movie_mean_data = pd.read_sql_query("SELECT id,title,vote_average from movies_movie", con)
        movie_mean_data.rename(columns={"id":"movie_id"}, inplace=True)
        movie_mean_data.rename(columns={"vote_average":"평점평균"}, inplace=True)


    con.close()
    
except:
    pass

def toprate():
    toprate_list = movie_mean_data.sort_values('평점평균', ascending=False)
    if len(toprate_list) > 20:
        toprate_list = toprate_list[:20]
    return toprate_list
