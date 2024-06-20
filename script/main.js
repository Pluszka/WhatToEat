const DATABASEURL = "http://127.0.0.1:5500/database.json";
const INGREDIENTSDATABASEURL = "http://127.0.0.1:5500/ingredientsDatabase.json";

const getData = async (databaseUrl) => {
  let data = await fetch(databaseUrl);
  data = await data.json();
  return data;
};
getData(DATABASEURL).then((data) => {
  let fullrecipesEl = new DocumentFragment();
  for (let i = 0; i < data.length; i++) {
    const recipeEl = createRecipe(data[i]);
    fullrecipesEl.append(recipeEl)
  }
  document.getElementById("fullRecipe").appendChild(fullrecipesEl);
});

const createRecipe = (recipeObj) => {
  let root = document.createElement("div");
  root.classList.add("recipe");

  let rootContainer = document.createElement("div");
  rootContainer.classList.add("recipe__container");
  rootContainer.append(root);

  let imgEl = document.createElement("img");
  imgEl.classList.add("recipe__image");
  imgEl.src = recipeObj.main_img_URL;
  root.append(imgEl);

  let headingEl = document.createElement("h5");
  headingEl.classList.add("recipe__heading");
  headingEl.textContent = recipeObj.title;
  root.append(headingEl);

  let ingredientsEl = document.createElement("div");
  ingredientsEl.classList.add("recipe__ingredientsInfo");
  ingredientsEl.textContent = "you have all ingredients";
  root.append(ingredientsEl);

  const ratingEl = generateRatingButtons()
  root.append(ratingEl)

  let linkContainerEl = document.createElement("div");
  let linkEl = document.createElement("a");
  linkEl.classList.add("recipe__link");
  linkEl.href = "https://kwestiasmaku.com" + recipeObj.website_URL;
  linkEl.textContent = "link to recipe";
  linkContainerEl.append(linkEl);
  root.append(linkContainerEl);

  return root;
};

const createIngredientEl = (ingredientName) => {
  let root = document.createElement("button");
  root.classList.add("shelf__button");

  let imgEl = document.createElement("img");
  imgEl.classList.add("shelf__buttonImage");
  imgEl.src = "./img/jar.svg";
  root.append(imgEl);
  
  let textEl = document.createElement("span");
  textEl.classList.add("shelf__buttonText")
  textEl.textContent = ingredientName
  root.append(textEl)
  return root
}


getData(INGREDIENTSDATABASEURL).then((data) => {
  
  let fullIngredientsEl = new DocumentFragment();
  for (let i = 0; i < data.ingredients.length; i++) {
    const ingredientEl = createIngredientEl(data.ingredients[i]);
    fullIngredientsEl.append(ingredientEl)
  }
  document.getElementById("jarContainer").appendChild(fullIngredientsEl);
});
function generateId() {
       
  return Math.random().toString(8).substring(2) +
    (new Date()).getTime().toString(8);
}

const  generateRatingButtons = () =>{
  const root = new DocumentFragment();
  const containerEl = document.createElement("div")
  root.append(containerEl);
  containerEl.classList.add("rating");
  for(let i = 0; i< 5; i++){
    const uniqueId = generateId()

    let inputEl = document.createElement("input")
    inputEl.classList.add("rating__input")
    inputEl.type = "radio"
    inputEl.id = uniqueId;
    inputEl.value = 5-i;
    containerEl.append(inputEl)

    let labelEl = document.createElement("label")
    labelEl.classList.add("rating__label")
    labelEl.htmlFor = uniqueId;
    labelEl.textContent = "★";
    containerEl.append(labelEl)

  }
  return(root)
}