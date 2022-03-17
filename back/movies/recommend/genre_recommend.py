#%%
import json
import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity

#%%
genres_path = '데이터베이스/genres.json'
genres_data = pd.read_json(genres_path)
movies_path = '데이터베이스/movies.json'
movies = pd.read_json(movies_path)

genres_dict = {}
for i in range(len(genres_data)):
    genres_dict[genres_data.loc[i]['pk']] = genres_data.loc[i]['fields']

with open(movies_path,'r', encoding='utf-8') as j:
    contents=json.loads(j.read()) 

id = []
casts = []
genres = []
title = []
vote_count = []
ratings = []
for i in range(len(contents)):
    id.append(contents[i]['fields']['id'])
    casts.append(contents[i]['fields']['casts'])
    title.append(contents[i]['fields']['title'])
    vote_count.append(contents[i]['fields']['vote_count'])
    ratings.append(contents[i]['fields']['vote_average'])
    # genres.append(contents[i]['fields']['genres'])
    temp = []
    for j in range(len(contents[i]['fields']['genres'])):
        tmp_name = genres_dict[contents[i]['fields']['genres'][j]]
        temp.append(tmp_name)
        # genres.append(genres_data[genres_data['pk'] == contents[i]['fields']['genres'][j]]['fields'])
    genres.append(temp)

genre_rec_df = pd.DataFrame({'id': id,
                              'genres': genres,
                              'title': title,
                              'vote_count': vote_count,
                              'ratings': ratings})    
#%%
# movie 장르 정보 벡터화
count_vect=CountVectorizer(min_df=0, ngram_range=(1, 2))
#%%
genre_rec_df['genres']=genre_rec_df['genres'].apply(lambda x : [ y['name'] for y in x])
genre_rec_df['genres_literal']=genre_rec_df['genres'].apply(lambda x : (' ').join(x))
genre_mat=count_vect.fit_transform(genre_rec_df['genres_literal'])
# print('genre_mat = ', genre_mat.shape())
# 장르간의 코사인 유사도 구하기
genre_sim = cosine_similarity(genre_mat, genre_mat)
genre_sim_sorted_ind=genre_sim.argsort()[:, ::-1]

#%%
# 가중 평점 추가
"""
가중 평점( Weighted Rating ) = (v/(v+m) * R + (m/(v+m)) * C
param
    v : 개별 영화에 평점을 투표한 횟수
    m : 평점을 부여하기 위한 최소 투표 횟수
    R : 개별 영화에 대한 평균 평점
    C : 전체 영화에 대한 평균 평점

출처: https://jeonsm9575.tistory.com/64
"""

percentile = 0.6
m = genre_rec_df['vote_count'].quantile(percentile)
C = genre_rec_df['ratings'].mean()

def weighted_vote_avg(record):
    v = record['vote_count']
    R = record['ratings']

    return ( (v/(v+m) * R) + (m/(m+v)) * C)

genre_rec_df['weighted_vote'] =genre_rec_df.apply(weighted_vote_avg, axis = 1)

#%%
def find_sim_movie(df, sorted_ind, title_name, top_n=10):
    title_movie = df[df['title'] == title_name]
    title_index = title_movie.index.values
    
    similar_indexes = sorted_ind[title_index, :(top_n*2)]
    similar_indexes = similar_indexes.reshape(-1)
    similar_indexes = similar_indexes[similar_indexes != title_index]

    return df.iloc[similar_indexes].sort_values('weighted_vote', ascending=False)[:top_n]

#%%
similar_movies = find_sim_movie(genre_rec_df, genre_sim_sorted_ind, '스파이더맨: 노 웨이 홈', 10)
print(similar_movies[['title', 'ratings', 'weighted_vote']])