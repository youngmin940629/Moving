import pandas as pd
import numpy as np
import sqlite3
from sklearn.decomposition import TruncatedSVD

# 데이터베이스에서 영화, 평점 데이터 불러오기
con = sqlite3.connect("db.sqlite3")
movie_data = pd.read_sql_query("SELECT id,title from movies_movie", con)
rating_data = pd.read_sql_query("SELECT * from movies_rating", con)
rating_data.drop('id', axis=1, inplace=True)

# 두 데이터의 공통부분을 merge 하기 위해 공통부분 칼럼명을 맞춰줌
movie_data.rename(columns = {'id' : 'movie_id'}, inplace = True)

user_movie_data = pd.merge(rating_data, movie_data, on='movie_id')

# 피봇 테이블로 만들어서 각 유저가 영화에 몇점씩 줬는지 확인할 수 있도록 만듬
user_movie_rank = user_movie_data.pivot_table('rank', index='user_id', columns='movie_id').fillna(0)

movie_user_rank = user_movie_rank.values.T

SVD = TruncatedSVD(n_components=12)
matrix = SVD.fit_transform(movie_user_rank)

corr = np.corrcoef(matrix)

movie_id = user_movie_rank.columns
movie_id_list = list(movie_id)
coffey_hands = movie_id_list.index(883)

corr_coffey_hands = corr[coffey_hands]
print(list(movie_id[(corr_coffey_hands) >= 0.9])[:50])