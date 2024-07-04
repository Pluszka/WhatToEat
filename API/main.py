from recipes_scrapper import RecipesScrapper
from db_manager import DbManager
from flask import Flask, make_response, jsonify, request
from flask_restful import Api, Resource, abort
from flask_cors import CORS

import json

rs = RecipesScrapper()
db_manager = DbManager()
app = Flask(__name__)
CORS(app)
app.config['JSON_AS_ASCII'] = False
api = Api(app)


def abort_if_incorrect_rating_value(rating):
    if rating < 1 or rating > 6:
        abort(400, message="Rating is outside of scale")


def abort_if_incorrect_id(recipie_id):
    if not db_manager.get_recipe_by_id(recipie_id):
        abort(404, message="Id" + recipie_id + " doesn't exist")


def abort_if_incorrect_pages_amount(size):
    if size < 0:
        abort(400, message="Page amount is outside of scale")


class Recipies(Resource):
    def get(self):
        encoded_data = db_manager.get_all()
        response_data = json.dumps(encoded_data, ensure_ascii=False)
        response = make_response(response_data, 200)
        response.headers['Content-Type'] = 'application/json; charset=utf-8'
        return response

    def post(self, size=1):
        abort_if_incorrect_pages_amount(size)
        db_manager.update_recipies(rs.getBlogRecipiesMultiplePages(size))
        return {'message': 'Database updated successfully'}, 201


class Title(Resource):
    def get(self, title):
        encoded_data = db_manager.get_by_fuzzy_title(title)
        response = make_response(jsonify(encoded_data), 200)
        response.headers['Content-Type'] = 'application/json; charset=utf-8'
        return response


class IngredientsNone(Resource):
    def get(self):
        ingredients_str = request.args.get('ingredients', '')
        ingredients = ingredients_str.split(',')
        encoded_data = db_manager.get_recipie_without_ingredients(ingredients)
        response = make_response(jsonify(encoded_data), 200)
        response.headers['Content-Type'] = 'application/json; charset=utf-8'
        return response


class IngredientsAny(Resource):
    def get(self):
        ingredients_str = request.args.get('ingredients', '')
        ingredients = ingredients_str.split(',')
        encoded_data = db_manager.get_recipes_by_any_ingredients(ingredients)
        response = make_response(jsonify(encoded_data), 200)
        response.headers['Content-Type'] = 'application/json; charset=utf-8'
        return response


class IngredientsAll(Resource):
    def get(self):
        ingredients_str = request.args.get('ingredients', '')
        ingredients = ingredients_str.split(',')
        encoded_data = db_manager.get_recipes_by_all_ingredients(ingredients)
        response = make_response(jsonify(encoded_data), 200)
        response.headers['Content-Type'] = 'application/json; charset=utf-8'
        return response


class Rating(Resource):
    def post(self, recipie_id, rating):
        abort_if_incorrect_rating_value(rating)
        abort_if_incorrect_id(recipie_id)
        encoded_data = db_manager.update_rating_by_id(recipie_id, rating)
        response = make_response(jsonify(encoded_data), 201)
        response.headers['Content-Type'] = 'application/json; charset=utf-8'
        return encoded_data

class PopularRecipies(Resource):
    def get(self):
        encoded_data = db_manager.get_popular()
        response_data = json.dumps(encoded_data, ensure_ascii=False)
        response = make_response(response_data, 200)
        response.headers['Content-Type'] = 'application/json; charset=utf-8'
        return response

api.add_resource(Recipies, "/recipies", "/recipies/<int:size>")
api.add_resource(PopularRecipies, "/recipies/ingredients/popular")
api.add_resource(Title, "/recipies/<string:title>")
api.add_resource(IngredientsAny, "/recipies/any/ingredients")
api.add_resource(IngredientsAll, "/recipies/all/ingredients")
api.add_resource(IngredientsNone, "/recipies/none/ingredients")
api.add_resource(Rating, "/recipies/<string:recipie_id>/<int:rating>")

if __name__ == "__main__":
    app.run(debug=True)
