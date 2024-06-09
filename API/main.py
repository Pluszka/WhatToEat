from recipes_scrapper import RecipesScrapper
from db_manager import DbManager
from flask import Flask, make_response
from flask_restful import Api, Resource
import json

rs = RecipesScrapper()
db_manager = DbManager()
# db_manager.update_recipies(rs.getBlogRecipies())
app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False
api = Api(app)

class Recipies(Resource):
    def get(self):
        encoded_data = json.dumps(db_manager.get_all(), ensure_ascii=False)
        response = make_response(encoded_data)
        response.headers['Content-Type'] = 'application/json'
        return response

api.add_resource(Recipies, "/recipies")

if __name__ == "__main__":
    app.run(debug=True)