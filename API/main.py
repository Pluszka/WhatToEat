from recipes_scrapper import RecipesScrapper
from db_manager import DbManager
from flask import Flask, make_response
from flask_restful import Api, Resource, abort
import json

rs = RecipesScrapper()
db_manager = DbManager()
app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False
api = Api(app)


def abort_if_incorrect_rating_value(rating):
    if rating < 1 or rating > 11:
        abort(400, message="Rating is outside of scale")

def abort_if_incorrect_id(recipie_id):
    if not db_manager.get_recipe_by_id(recipie_id):
        abort(404, message="Id" + recipie_id + " doesn't exist")


class Recipies(Resource):
    def get(self):
        encoded_data = json.dumps(db_manager.get_all(), ensure_ascii=False)
        response = make_response(encoded_data)
        response.headers['Content-Type'] = 'application/json'
        return response, 200

    def update(self):
        db_manager.update_recipies(rs.getBlogRecipies())
        return {'message': 'Database updated successfully'}, 201


class Rating(Resource):
    def post(self, recipie_id, rating):
        abort_if_incorrect_rating_value(rating)
        abort_if_incorrect_id(recipie_id)
        encoded_data = db_manager.update_rating_by_id(recipie_id, rating)
        response = make_response(encoded_data)
        response.headers['Content-Type'] = 'application/json; charset=utf-8'
        return encoded_data, 201


api.add_resource(Recipies, "/recipies")
api.add_resource(Rating, "/recipies/<string:recipie_id>/<int:rating>")

if __name__ == "__main__":
    app.run(debug=True)
