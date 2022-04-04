import pandas as pd
import numpy as np
import sqlite3
from sklearn.decomposition import TruncatedSVD
import threading
import scipy
con = sqlite3.connect("db.sqlite3", check_same_thread=False)
try:
  rating_data = pd.read_sql_query("SELECT * from movies_rating", con )
  if len(rating_data) > 100:
      movie_data = pd.read_sql_query("SELECT id,title from movies_movie", con)
      rating_data.drop('id', axis=1, inplace=True)
      user_movie_ratings = rating_data.pivot(
          index='user_id',
          columns='movie_id',
          values='rank'
      )
  
      movie_genre_data = movie_data = pd.read_sql_query("SELECT movie_id,genre_id from movies_movie_genres", con)
      movie_mean_vote = np.mean(user_movie_ratings.T, axis=1)
      movie_mean_vote = pd.DataFrame(movie_mean_vote)
  
      movie_genre_mean_data = pd.merge(movie_genre_data, movie_mean_vote, on='movie_id')
      movie_genre_mean_data.rename(columns={0:'평점평균'}, inplace=True)
  else:
      movie_genre_data = pd.read_sql_query("SELECT movie_id,genre_id from movies_movie_genres", con)
      movie_data = pd.read_sql_query("SELECT id,title,vote_average from movies_movie", con)
      movie_data.rename(columns={"id":"movie_id"}, inplace=True)
      movie_genre_mean_data = pd.merge(movie_genre_data, movie_data, on='movie_id')
      movie_genre_mean_data.rename(columns={"vote_average" : '평점평균'},inplace=True)
except:
  pass
# 데이터베이스에서 영화, 평점 데이터 불러오기
con.close()

def recommend():
    con = sqlite3.connect("db.sqlite3", check_same_thread=False)
    try:
        rating_data = pd.read_sql_query("SELECT * from movies_rating", con )
        if len(rating_data) > 100:
            movie_data = pd.read_sql_query("SELECT id,title from movies_movie", con)
            rating_data.drop('id', axis=1, inplace=True)
            user_movie_ratings = rating_data.pivot(
                index='user_id',
                columns='movie_id',
                values='rank'
            )

            movie_genre_data = movie_data = pd.read_sql_query("SELECT movie_id,genre_id from movies_movie_genres", con)
            movie_mean_vote = np.mean(user_movie_ratings.T, axis=1)
            movie_mean_vote = pd.DataFrame(movie_mean_vote)

            movie_genre_mean_data = pd.merge(movie_genre_data, movie_mean_vote, on='movie_id')
            movie_genre_mean_data.rename(columns={0:'평점평균'}, inplace=True)
        else:
            movie_genre_data = pd.read_sql_query("SELECT movie_id,genre_id from movies_movie_genres", con)
            movie_data = pd.read_sql_query("SELECT id,title,vote_average from movies_movie", con)
            movie_data.rename(columns={"id":"movie_id"}, inplace=True)
            movie_genre_mean_data = pd.merge(movie_genre_data, movie_data, on='movie_id')
            movie_genre_mean_data.rename(columns={"vote_average" : '평점평균'},inplace=True)
        con.close()
        mf_timer = threading.Timer(interval=60, function=recommend)
        mf_timer.start()
    except:
        con.close()
        mf_timer = threading.Timer(interval=60, function=recommend)
        mf_timer.start()

recommend()

def categoryPick(category):
    categorypick_list = movie_genre_mean_data[movie_genre_mean_data.genre_id == category]
    categorypick_list = categorypick_list.sort_values('평점평균', ascending=False)
    return categorypick_list