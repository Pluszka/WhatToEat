from pymongo import MongoClient
import os
from rapidfuzz import fuzz
from dotenv import find_dotenv, load_dotenv

DOTENV_PATH = find_dotenv()


class DbManager:
    def __init__(self):
        load_dotenv(DOTENV_PATH)
        __DB_USERNAME = os.getenv("DB_USERNAME")
        __DB_PASSWORD = os.getenv("DB_PASSWORD")
        self.client = MongoClient(
            "mongodb+srv://" + __DB_USERNAME + ":" + __DB_PASSWORD + "@programingprojectcluste.2u9zzwr.mongodb.net"
                                                                     "/?retryWrites=true&w=majority&appName"
                                                                     "=ProgramingProjectCluster")
        self.db = self.client.get_database("what_to_eat_app_db")
        self.collectionRecipies = self.db.recipies
        self.collectionPopular = self.db.popular

    def update_recipies(self, new_recipies):
        self.collectionRecipies.delete_many({})
        self.collectionRecipies.insert_many(new_recipies)
        return new_recipies

    def get_all(self):
        return list(self.collectionRecipies.find())

    def get_popular(self):
        return list(self.collectionPopular.find())

    def get_recipe_by_id(self, recipe_id):
        return self.collectionRecipies.find_one({"_id": recipe_id})

    def get_by_fuzzy_title(self, title, threshold=70):
        all_titles = self.collectionRecipies.find()
        matching_titles = []
        for item in all_titles:
            if fuzz.partial_ratio(title.lower(), item['title'].lower()) >= threshold:
                matching_titles.append(item)
        return matching_titles

    def get_recipie_without_ingredients(self, *ingredients, threshold=70):
        all_recipes = list(self.collectionRecipies.find())
        matching_recipes = []
        for recipe in all_recipes:
            if 'ingredients' in recipe:
                any_matching = not any(fuzz.partial_ratio(ingredient, recipe_ingredient) >= threshold
                                   for ingredient in ingredients[0]
                                   for recipe_ingredient in recipe['ingredients'])
                if any_matching:
                    matching_recipes.append(recipe)
            for ingredient in ingredients[0]:
                for recipe_ingredient in recipe['ingredients']:
                        print(f"Similarity between '{ingredient}' and '{recipe_ingredient}': {fuzz.partial_ratio(ingredient, recipe_ingredient)}")

        return matching_recipes

    def get_recipes_by_any_ingredients(self, *ingredients, threshold=70):
        all_recipes = list(self.collectionRecipies.find())
        matching_recipes = []
        for recipe in all_recipes:
            if 'ingredients' in recipe:
                any_matching = any(fuzz.partial_ratio(ingredient, recipe_ingredient) >= threshold
                                   for ingredient in ingredients[0]
                                   for recipe_ingredient in recipe['ingredients'])
                if any_matching:
                    matching_recipes.append(recipe)
            for ingredient in ingredients[0]:
                for recipe_ingredient in recipe['ingredients']:
                        print(f"Similarity between '{ingredient}' and '{recipe_ingredient}': {fuzz.partial_ratio(ingredient, recipe_ingredient)}")

        return matching_recipes

    def get_recipes_by_all_ingredients(self, ingredients, threshold=70):
        all_recipes = list(self.collectionRecipies.find())
        matching_recipes = []

        for recipe in all_recipes:
            if 'ingredients' in recipe:
                all_matching = all(
                    any(fuzz.partial_ratio(ingredient, recipe_ingredient) >= threshold for recipe_ingredient in
                        recipe['ingredients'])
                    for ingredient in ingredients
                )
                if all_matching:
                    matching_recipes.append(recipe)
            for ingredient in ingredients:
                for recipe_ingredient in recipe['ingredients']:
                    print(
                        f"Similarity between '{ingredient}' and '{recipe_ingredient}': {fuzz.partial_ratio(ingredient, recipe_ingredient)}")

        return matching_recipes

    def update_rating_by_id(self,recipe_id, rating):
        self.collectionRecipies.update_one({"_id": recipe_id}, {'$push': {"rating": rating}})
        return self.get_recipe_by_id(recipe_id)