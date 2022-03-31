import pandas as pd
import numpy as np
import sqlite3
from sklearn.decomposition import TruncatedSVD
import threading


corr=[]
movie_id=[]
movie_id_list=[]
# 데이터베이스에서 영화, 평점 데이터 불러오기
con = sqlite3.connect("db.sqlite3", check_same_thread=False)
def recommend():
    global corr, movie_id, movie_id_list
    try:
        movie_data = pd.read_sql_query("SELECT id,title from movies_movie", con)    
        rating_data = pd.read_sql_query("SELECT * from movies_rating", con)
        rating_data.drop('id', axis=1, inplace=True)
        # print("data=", movie_data)

        # 두 데이터의 공통부분을 merge 하기 위해 공통부분 칼럼명을 맞춰줌
        movie_data.rename(columns = {'id' : 'movie_id'}, inplace = True)

        user_movie_data = pd.merge(rating_data, movie_data, on='movie_id')

        # 피봇 테이블로 만들어서 각 유저가 영화에 몇점씩 줬는지 확인할 수 있도록 만듬
        user_movie_rank = user_movie_data.pivot_table('rank', index='user_id', columns='movie_id').fillna(0)

        movie_user_rank = user_movie_rank.values.T

        SVD = TruncatedSVD(n_components=2)
        matrix = SVD.fit_transform(movie_user_rank)
        corr = np.corrcoef(matrix)

        movie_id = user_movie_rank.columns
        movie_id_list = list(movie_id)
        mf_timer = threading.Timer(interval=60, function=recommend)
        mf_timer.start()
        
    except Exception as e:
        mf_timer = threading.Timer(interval=60, function=recommend)
        mf_timer.start()

recommend()



def mf_recomnend(id):
    try:
        coffey_hands = movie_id_list.index(id)
        corr_coffey_hands = corr[coffey_hands]
        corr_coffey_hands = pd.DataFrame(corr_coffey_hands)
        top_20_corr_coffey_hands = corr_coffey_hands.nlargest(20, 0)
        movie_list = []
        for idx in top_20_corr_coffey_hands.index:
            movie_list.append(movie_id[idx])
            
        return movie_list
    except:
        return []