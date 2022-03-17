import pandas as pd
import numpy as np
import sqlite3
from sklearn.decomposition import TruncatedSVD
import scipy

# 데이터베이스에서 영화, 평점 데이터 불러오기
con = sqlite3.connect("db.sqlite3")
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

U, sigma, Vt = scipy.sparse.linalg.svds(matrix_user_mean, k=12)

sigma = np.diag(sigma)

svd_user_predicted_ratings = np.dot(np.dot(U, sigma), Vt) + user_rating_mean.reshape(-1,1)

svd_predicts = pd.DataFrame(svd_user_predicted_ratings, columns = user_movie_ratings.columns)

def user_recommend(svd_predicts, user_id, movies, ratings, num = 5):
    user_id = user_id
    sorted_user_prediction = svd_predicts.iloc[user_id].sort_values(ascending=False)
    user_data = ratings[ratings.user_id == user_id]
    user_history = user_data.merge(movie_data, on='movie_id').sort_values(['rank'], ascending=False)

    recommendations = movies[~movies['movie_id'].isin(user_history['movie_id'])]

    recommendations = recommendations.merge(pd.DataFrame(sorted_user_prediction).reset_index(), on='movie_id')

    recommendations = recommendations.rename(columns = {user_id:'Predictions'}).sort_values('Predictions', ascending=False)

    return user_history, recommendations.head(num)

already_rated, prediction = user_recommend(svd_predicts, 100, movie_data, rating_data, 20)

# print(already_rated)
# print(prediction)