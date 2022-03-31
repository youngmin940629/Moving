import pandas as pd
import numpy as np
import sqlite3
from sklearn.decomposition import TruncatedSVD
import scipy
import threading

svd_predicts = rating_data = movie_data = []
# 데이터베이스에서 영화, 평점 데이터 불러오기
con = sqlite3.connect("db.sqlite3", check_same_thread=False)
def recommend():
    global svd_predicts, rating_data, movie_data
    try:
        movie_data = pd.read_sql_query("SELECT id,title from movies_movie", con)
        rating_data = pd.read_sql_query("SELECT * from movies_rating", con)
        rating_data.drop('id', axis=1, inplace=True)

        movie_data.rename(columns = {'id' : 'movie_id'}, inplace = True)

        user_movie_ratings = rating_data.pivot(
            index='user_id',
            columns='movie_id',
            values='rank'
        ).fillna(0)

        matrix = user_movie_ratings.values

        user_rating_mean = np.mean(matrix, axis = 1)
        
        matrix_user_mean = matrix - user_rating_mean.reshape(-1,1)

        U, sigma, Vt = scipy.sparse.linalg.svds(matrix_user_mean)
        sigma = np.diag(sigma)

        svd_user_predicted_ratings = np.dot(np.dot(U, sigma), Vt) + user_rating_mean.reshape(-1,1)

        svd_predicts = pd.DataFrame(svd_user_predicted_ratings, columns = user_movie_ratings.columns)
        mf_timer = threading.Timer(interval=60, function=recommend)
        mf_timer.start()
    except Exception as e:
        mf_timer = threading.Timer(interval=60, function=recommend)
        mf_timer.start()
    
recommend()
def user_recommend(user_index,user_id):
    try:
        sorted_user_prediction = svd_predicts.iloc[user_index].sort_values(ascending=False)
        user_data = rating_data[rating_data.user_id == (user_id)]
        user_history = user_data.merge(movie_data, on='movie_id').sort_values(['rank'], ascending=False)
        recommendations = movie_data[~movie_data['movie_id'].isin(user_history['movie_id'])]

        recommendations = recommendations.merge(pd.DataFrame(sorted_user_prediction).reset_index(), on='movie_id')
        recommendations = recommendations.rename(columns = {user_index:'Predictions'}).sort_values('Predictions', ascending=False)
        # print("recommendations= ", recommendations, sep='\n')

        return user_history, recommendations.head(20)
    except:
        return [], []
# print(user_recommend(4, 6))