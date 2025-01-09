import json
import requests

data = {
    'Action': {
        'The Dark Knight': '',
        'Gladiator': '', 
        'John Wick': '',
        'Kill Bill': '', 
        'Dunkirk': ''
    },
    'Adventure': {
        'Casino Royale': '',
        'Jaws': '',
        'Inside Out': '',
        'Up' : '',
        'Back to the Future': '',
    },
    'Comedy': {
        'The Hangover': '', 
        'The Wolf of Wall Street': '',
        'Home Alone': '',
        'The Truman Show': '',
        'Knives Out': ''
    },
    'Drama': {
        'The Godfather': '', 
        'Fight Club': '', 
        'Oppenheimer': '',
        'The Social Network': '',
        'Good Will Hunting': ''
    },
    'Thriller': {
        'Parasite': '',
        'Pulp Fiction': '',
        'Get Out': '',
        'Shutter Island': ''
    },
    'Romance': {
        'Call Me By Your Name': '', 
        'The Notebook': '', 
        'Pride and Prejudice': '', 
        'La La Land': '', 
        'Eternal Sunshine of the Spotless Mind': ''
    },
    'Sci-Fi': {
        'Avatar': '',
        'Inception': '',
        '2001 A Space Odyssey': '',
        'The Matrix': ''
    },
    'Horror': {
        'It': '',
        'The Conjuring': '',
        'The Shining': '',
        'Scream': '',
    },
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

output_file = '/Users/manitk/Documents/GitHub/PlotPix/generate-data/movie_plots.json'
with open(output_file, 'w') as f:
    json.dump(data, f, indent=4)