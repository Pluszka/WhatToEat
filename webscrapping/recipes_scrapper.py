import requests
import re
from morfeusz2 import Morfeusz
from bs4 import BeautifulSoup

RECIPIE_SOURCE_URL = "https://www.kwestiasmaku.com/home-przepisy?page=4"
RECIPIE_BASE_URL = "https://www.kwestiasmaku.com"


class RecipesScrapper:
    def __init__(self):
        self.__blog_recipies = self.__getRecipieDetails()

    def getBlogRecipies(self):
        return self.__blog_recipies

    def __getRecipes(self):
        response = requests.get(RECIPIE_SOURCE_URL)
        website_list = response.text
        soup = BeautifulSoup(website_list, 'html.parser')
        return soup.select('div.col-lg-3:has(> div.views-field)')

    def __getRecipieDetails(self):
        recipes = self.__getRecipes()
        all_recipies = [];
        for recipie in recipes:
            soup = BeautifulSoup(str(recipie), 'html.parser')
            recipie_url = soup.find('a')['href']
            record = {
                "website_URL": recipie_url,
                "rating": [],
                "main_img_URL": soup.find('img')['src'],
                "ingredients": self.__findIngredients(RECIPIE_BASE_URL + recipie_url),
                "title": soup.find('span').get_text()
            }
            all_recipies.append(record);
        return all_recipies;

    def __findIngredients(self, url):
        response = requests.get(url)
        recipie = response.text
        soup = BeautifulSoup(recipie, 'html.parser')
        ingredients = soup.find("div", class_='field-name-field-skladniki').find_all('li')
        all_ingredients = []
        ingredients = self.__extract_ingredients(ingredients)
        for ingredient in ingredients:
            all_ingredients.append(ingredient)
        return all_ingredients

    def __extract_ingredients(self, all_ingredients):
        ingredients = []
        main_pattern = re.compile(
            r'^(ok\.\s*)?\d+(\s+\d+/\d+)?\s*(szklanki?|łyżeczki?|łyżki?|gramy?|kg|ml|l|duże?|mały?|g|puszka?|puszki?|słoiczek?|słoik?|plasterki)?\s*|szczypta\s*')
        deko_pattern = re.compile(r'^do\s+dekoracji:\s*', re.IGNORECASE)
        parenthesis_pattern = re.compile(r'\(.*?\)')
        colon_pattern = re.compile(r'^.*?:')
        range_pattern = re.compile(r'\d+\s*-\s*\d+')
        fraction_pattern = re.compile(r'\d+\s*\/\s*\d+')
        for item in all_ingredients:
            original_text = item.getText().strip()
            clean_item = range_pattern.sub('', original_text).strip()
            clean_item = main_pattern.sub('', clean_item).strip()
            clean_item = deko_pattern.sub('', clean_item).strip()
            clean_item = parenthesis_pattern.sub('', clean_item).strip()
            clean_item = colon_pattern.sub('', clean_item).strip()
            clean_item = fraction_pattern.sub('', clean_item).strip()
            ingredients.append(clean_item)
        return ingredients
