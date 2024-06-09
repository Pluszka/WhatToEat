from recipes_scrapper import RecipesScrapper
from db_manager import DbManager

rs = RecipesScrapper()
db_manager = DbManager()
db_manager.update_recipies(rs.getBlogRecipies())
