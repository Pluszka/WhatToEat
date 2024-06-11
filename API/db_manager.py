from pymongo import MongoClient
import os
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
        self.collection = self.db.recipies

    def update_recipies(self, new_recipies):
        self.collection.delete_many({})
        self.collection.insert_many(new_recipies)
        return new_recipies

    def get_all(self):
        return list(self.collection.find())

    def get_recipe_by_id(self, recipe_id):
        return self.collection.find_one({"_id": recipe_id})

    def update_rating_by_id(self,recipe_id, rating):
        self.collection.update_one({"_id": recipe_id}, {'$push': {"rating": rating}})
        return self.get_recipe_by_id(recipe_id)
