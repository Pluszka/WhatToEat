import requests
from bs4 import BeautifulSoup

RECIPIE_SOURCE_URL = "https://www.kwestiasmaku.com/home-przepisy?page=4"
RECIPIE_BASE_URL = "https://www.kwestiasmaku.com"

class RecipesScrapper:
    def __init__(self):
        recipe_source = RECIPIE_SOURCE_URL;
        recipie_base_url = RECIPIE_BASE_URL
        self.__getRecipieDetails();
        # recipie_names = self.__getRecipieNames();


    def __getRecipes(self):
        response = requests.get(RECIPIE_SOURCE_URL);
        website_list = response.text;
        soup = BeautifulSoup(website_list, 'html.parser');
        return soup.select('div.col-lg-3:has(> div.views-field)');

    def __getRecipieDetails(self):
        recipes = self.__getRecipes();
        recipies_records = [];
        for recipie in recipes:
            soup = BeautifulSoup(str(recipie), 'html.parser');
            recipie_url = soup.find('a')['href'];
            record = {
                "website_URL": recipie_url,
                "rating": [],
                "main_img_URL": soup.find('img')['src'],
                "ingredients": self.__findIngredients(RECIPIE_BASE_URL+recipie_url),
                "title": soup.find('span').get_text()
            };
            print(record);

    def __findIngredients(self, url):
        response = requests.get(url);
        recipie = response.text;
        soup = BeautifulSoup(recipie, 'html.parser');
        ingredients = soup.find("div", class_='field-name-field-skladniki').find_all('li');
        all_ingredients = []
        for ingredient in ingredients:
            all_ingredients.append(ingredient.getText().strip());
        return all_ingredients;




