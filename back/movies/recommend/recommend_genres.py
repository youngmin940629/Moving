import pandas as pd
import numpy as np
import json
from pprint import pprint
import sqlite3

from ast import literal_eval
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity

con = sqlite3.connect("db.sqlite3")
cast_data = pd.read_sql_query("SELECT * from movies_cast", con)
movie_data = pd.read_sql_query("SELECT id,title from movies_movie", con)
genre_data = pd.read_sql_query("SELECT * from movies_genre", con)


print(len(genre_data))