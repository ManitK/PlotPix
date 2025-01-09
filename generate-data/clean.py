import json

input = "/Users/manitk/Documents/GitHub/PlotPix/plot_pix/src/movie_images.json"
data = {}
with open(input, 'r') as f:
    data = json.load(f)

for genre in data:
    for item in data[genre]:
        item['dalle_3_img'] = "/data/" + item['title'].replace(" ", "_") + ".png"

with open(input, 'w') as f:
    json.dump(data, f, indent=4)