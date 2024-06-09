from recipes_scrapper import RecipesScrapper
from db_manager import DbManager
from flask import Flask
from flask_restful import Api, Resource

# rs = RecipesScrapper()
# db_manager = DbManager()
# db_manager.update_recipies(rs.getBlogRecipies())
app = Flask(__name__)
api = Api(app)

if __name__ == "__main__":
    app.run(debug=True)