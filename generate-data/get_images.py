import json
from openai import OpenAI
import requests
from PIL import Image
from io import BytesIO

existing = ["Avatar","The Matrix","The Dark Knight","The Hangover","The Godfather","Fight Club","Call Me By Your Name","The Notebook","Pride and Prejudice","La La Land","Eternal Sunshine of the Spotless Mind",]

def get_image(model,movie,plot):
    client = OpenAI(api_key='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')
    instruction = "Do not add any text or words in the image generated. The image should be a depiction of the following: "
    response = client.images.generate(
        model="dall-e-" + str(model),
        prompt= instruction + plot,
        quality="standard",
        n=1,
    )

    img_loc = "/Users/manitk/Documents/GitHub/PlotPix/plot_pix/public/data/"
    image_url = response.data[0].url
    img_response = requests.get(image_url)
    img = Image.open(BytesIO(img_response.content))
    # img.show()
    movie = movie.replace(" ", "_")
    img.save(img_loc + movie + ".png")
    print("Generated image for", movie)

images_data = {}
plots_file = '/Users/manitk/Documents/GitHub/PlotPix/generate-data/movie_plots.json'
with open(plots_file) as f:
    plots_data = json.load(f)

for genre in plots_data:
    images_data[genre] = []
    for movie in plots_data[genre]:
        if movie not in existing:
            plot = plots_data[genre][movie]
            # dalle_2_img = get_image(2,plot)
            dalle_3_img = get_image(3,movie,plot)
            # images_data[genre][movie] = {'plot': plot, 'dalle_2_img': dalle_2_img, 'dalle_3_img': dalle_3_img}
            images_data[genre].append({'title': movie,'plot': plot, 'dalle_3_img': dalle_3_img})
            print(movie)

output_file = '/Users/manitk/Documents/GitHub/PlotPix/plot_pix/src/movie_images2.json'
with open(output_file, 'w') as f:
    json.dump(images_data, f, indent=4)