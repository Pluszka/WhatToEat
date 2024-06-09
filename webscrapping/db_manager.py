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
        self.records = self.db.recipies
