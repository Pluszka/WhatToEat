from pymongo import MongoClient

DB_USERNAME = ""
DB_PASSWORD = ""


class DbManager:
    def __init__(self):
        client = MongoClient(
            "mongodb+srv://" + DB_USERNAME + ":" + DB_PASSWORD + "@programingprojectcluste.2u9zzwr.mongodb.net"
                                                                 "/?retryWrites=true&w=majority&appName"
                                                                 "=ProgramingProjectCluster");
