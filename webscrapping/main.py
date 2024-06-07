from recipes_scrapper import RecipesScrapper;
import re
rs = RecipesScrapper();
# main_pattern = re.compile(
#     r'^(ok\.\s*)?\d+(\s+\d+/\d+)?\s*(szklanki?|łyżeczki?|łyżki?|gramy?|kg|ml|l|duże)?\s*|szczypta\s*')
# deko_pattern = re.compile(r'^do\s+dekoracji:\s*', re.IGNORECASE)
# lub_pattern = re.compile(r'\s+lub\s+', re.IGNORECASE)
# text = 'ok. 3 łyżeczki owsa'
# text2 = '60 gram mleka'
# text3 = 'do dekoracji: 9 róż'
# done = deko_pattern.sub("", text3).strip()
# print(done)