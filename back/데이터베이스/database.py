import urllib.request
from pprint import pprint
import json

API_KEY = "733c7d5145ecf236ad387093e2d52047"
HOST = "https://api.themoviedb.org"
MOVIE_LIST_URI = "/3/movie/popular"
MOVIE_INFO_URI = "/3/movie/"
GENRE_LIST_URI = "/3/genre/movie/list"
VEDIO_URL = '/3/movie/'
youtube_base_url = 'https://www.youtube.com/embed/'
POSTER_PATH = 'https://image.tmdb.org/t/p/original'
movie_list = []
movie_Ids = []
genre_list = []
cast_list = []

genre_request = (f'{HOST}{GENRE_LIST_URI}?api_key={API_KEY}&language=ko')
response = urllib.request.urlopen(genre_request)
json_str = response.read().decode('utf-8')
json_object = json.loads(json_str)

genre_data = json_object.get("genres")

for data in genre_data:

    my_data = {
        "number": data.get("id"),
        "name": data.get("name")
    }

    my_genre = {
        "model": "movies.genre",
        "pk": my_data.get("number"),
        "fields": {
            "name": my_data.get("name")
        },
    }
    genre_list.append(my_genre)

for page in range(1, 501):
    request = (f'{HOST}{MOVIE_LIST_URI}?api_key={API_KEY}&language=ko&page={page}')
    response = urllib.request.urlopen(request)
    json_str = response.read().decode('utf-8')
    json_object = json.loads(json_str)

    data_movies = (json_object.get("results"))

    for movie in data_movies:
        movie_Ids.append(movie.get("id"))

for idx, movie_Id in enumerate(movie_Ids):

    movie_request = (f'{HOST}{MOVIE_INFO_URI}{movie_Id}?api_key={API_KEY}&language=ko&')
    response = urllib.request.urlopen(movie_request)
    json_str = response.read().decode('utf-8')
    json_object = json.loads(json_str)
    video_request = f'{HOST}{VEDIO_URL}{movie_Id}/videos?api_key={API_KEY}&language=ko&'
    video_response = urllib.request.urlopen(video_request)
    video_json_str = video_response.read().decode('utf-8')
    video_object = json.loads(video_json_str)
    flag = 0
    youtube_url = ''
    if video_object['results']:
        for video in video_object['results']:
            if video["type"] == 'Trailer':
                youtube_url = video["key"]
                break
    if youtube_url == '':
        youtubeUrl = ''
    else:
        youtubeUrl = youtube_base_url + youtube_url
    genres = []
    for genre in json_object.get("genres"):
        if genre["id"]:
            genres.append(genre['id'])
    if json_object.get("poster_path") and json_object.get("adult") == False:
        cast_request = f'{HOST}{VEDIO_URL}{movie_Id}/credits?api_key={API_KEY}&language=ko'
        cast_response = urllib.request.urlopen(cast_request)
        cast_json_str = cast_response.read().decode('utf-8')
        cast_object = json.loads(cast_json_str)

        cast_info = []


        for cast in cast_object.get("cast")[0:3]:
            cast_info.append(cast.get('id'))
            profile_path = ''
            if cast.get('profile_path') == None:
                profile_path = ''
            else:
                profile_path = POSTER_PATH + cast.get('profile_path')
            if cast_list:
                flag = 0
                for cast_ in cast_list:
                    if cast_.get('id') in cast:
                        flag = 1
                        break
                if flag == 0:
                    cast_list.append({
                        "model" : "casts.cast",
                        "fields" : {
                            "id" : cast.get('id'),
                            "name" : cast.get('name'),
                            "profile_path" : profile_path,
                            "gender" : cast.get('gender'),
                        }
                    })
            else:
                cast_list.append({
                        "model" : "casts.cast",
                        "fields" : {
                            "id" : cast.get('id'),
                            "name" : cast.get('name'),
                            "profile_path" : profile_path,
                            "gender" : cast.get('gender'),
                        }
                })


        if json_object.get("genres"):
            if json_object.get("backdrop_path"):
                BACKDROP_PATH = POSTER_PATH + json_object.get("backdrop_path")
            else:
                BACKDROP_PATH = ''
            my_object = {
                "model": "movies.movie",
                "fields": {
                    "id": json_object.get("id"),
                    "title": json_object.get("title"),
                    "popularity": json_object.get("popularity"),
                    "poster_path": POSTER_PATH + json_object.get("poster_path"),
                    "release_date": json_object.get("release_date"),
                    "runtime": json_object.get("runtime"),
                    "vote_average": json_object.get("vote_average"),
                    "vote_count": json_object.get("vote_count"),
                    "overview": json_object.get("overview"),
                    "genres": genres,
                    "youtube_url" : youtubeUrl,
                    "casts" : cast_info,
                    "backdrop_path" : BACKDROP_PATH
                }  
            }
        else:
            my_object = {
                "model": "movies.movie",
                "fields": {
                    "id": json_object.get("id"),
                    "title": json_object.get("title"),
                    "popularity": json_object.get("popularity"),
                    "poster_path": POSTER_PATH + json_object.get("poster_path"),
                    "release_date": json_object.get("release_date"),
                    "runtime": json_object.get("runtime"),
                    "vote_average": json_object.get("vote_average"),
                    "vote_count": json_object.get("vote_count"),
                    "overview": json_object.get("overview"),
                    "genres": genres,
                    "youtube_url" : youtubeUrl,
                    "casts" : cast_info,
                    "backdrop_path" : BACKDROP_PATH
                }
            }
        movie_list.append(my_object)

with open('movies.json', 'w', encoding='UTF-8') as file:
    file.write(json.dumps(movie_list, ensure_ascii=False, indent=4))

with open('genres.json', 'w', encoding='UTF-8') as file:
    file.write(json.dumps(genre_list, ensure_ascii=False, indent=4))

with open('casts.json', 'w', encoding='UTF-8') as file:
    file.write(json.dumps(cast_list, ensure_ascii=False, indent=4))
