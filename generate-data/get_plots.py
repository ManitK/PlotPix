import json
import requests

data = {
    'Action': {
        'Avatar': '', 
        'The Matrix': '', 
        'Mad Max': '', 
        'The Dark Knight': '', 
        'Rocky': ''
    },
    'Comedy': {
        'The Hangover': '', 
        'Superbad': '', 
        'Dumb and Dumber': '', 
        'The Big Lebowski': '', 
        'Anchorman The Legend of Ron Burgundy': ''
    },
    'Drama': {
        'The Shawshank Redemption': '', 
        'Forrest Gump': '', 
        'The Godfather': '', 
        'Fight Club': '', 
        'The Green Mile': ''
    },
    'Romance': {
        'Call Me By Your Name': '', 
        'The Notebook': '', 
        'Pride and Prejudice': '', 
        'La La Land': '', 
        'Eternal Sunshine of the Spotless Mind': ''
    }
}

api_key = '86b205c7'
base_url = 'http://www.omdbapi.com/?apikey=' + api_key + '&'

def get_movie_plot(movie):
    movie = movie.strip().lower().replace(" ", "+")  # Format for URL request
    url = base_url + 't=' + movie
    response = requests.get(url)
    data = json.loads(response.text)

    if data.get('Response') == 'True':
        return data['Plot']
    else:
        return 'Plot not found or invalid movie name.'

for genre in data:
    for movie in data[genre]:
        plot = get_movie_plot(movie)
        data[genre][movie] = plot

output_file = '/Users/manitk/Desktop/Project/generate-data/movie_plots.json'
with open(output_file, 'w') as f:
    json.dump(data, f, indent=4)