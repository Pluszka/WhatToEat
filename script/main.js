const DATABASEURL = "http://127.0.0.1:5000/recipies";
const BASEDATABASEURL = "http://127.0.0.1:5000";
const INGREDIENTSDATABASEURL = "http://127.0.0.1:5000/recipies/all/ingredients";

const getData = async (databaseUrl) => {
  
  let data = await fetch(databaseUrl);
  data = await data.json();
  return data;
};

const updateRecipes = async (url) =>{
  await getData(url).then((data) => {
    let fullrecipesEl = new DocumentFragment();
    for (let i = 0; i < data.length; i++) {
      const recipeEl = createRecipe(data[i]);
      fullrecipesEl.append(recipeEl);
    }    
    document.getElementById("fullRecipe").innerHTML = ""
    document.getElementById("fullRecipe").appendChild(fullrecipesEl);
  });
}
updateRecipes(DATABASEURL);

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

  const ratingEl = generateRatingButtons(recipeObj.rating);
  root.append(ratingEl);

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
  textEl.classList.add("shelf__buttonText");
  textEl.textContent = ingredientName;
  root.append(textEl);
  return root;
};

getData(INGREDIENTSDATABASEURL).then((data) => {
  let fullIngredientsEl = new DocumentFragment();
  for (let i = 0; i < data.ingredients.length; i++) {
    const ingredientEl = createIngredientEl(data.ingredients[i]);
    addIngredientHandler(ingredientEl);
    fullIngredientsEl.append(ingredientEl);
  }
  document.getElementById("jarContainer").appendChild(fullIngredientsEl);
});
function generateId() {
  return (
    Math.random().toString(8).substring(2) + new Date().getTime().toString(8)
  );
}

const generateRatingButtons = (ratingArr = [0, 0]) => {
  let avarageRating;
  if (ratingArr.length !== 0) {
    avarageRating = Math.round(
      ratingArr.reduce((a, b) => a + b) / ratingArr.length / 2
    );
  } else {
    avarageRating = 0;
  }

  const root = new DocumentFragment();
  const containerEl = document.createElement("div");
  root.append(containerEl);
  containerEl.classList.add("rating");
  elementId = generateId();
  for (let i = 0; i < 5; i++) {
    const uniqueId = generateId();

    let inputEl = document.createElement("input");
    inputEl.classList.add("rating__input");
    inputEl.type = "radio";
    inputEl.id = uniqueId;
    inputEl.value = 5 - i;
    inputEl.name = "rating" + elementId;
    containerEl.append(inputEl);
    if (avarageRating === 5 - i) {
      inputEl.checked = true;
    }

    let labelEl = document.createElement("label");
    labelEl.classList.add("rating__label");
    labelEl.htmlFor = uniqueId;
    labelEl.textContent = "★";
    containerEl.append(labelEl);
  }
  return root;
};

//ingredients selection

const addIngredientHandler = (el) => {
  el.addEventListener("click", (e) => {
    let btnEl = e.target.parentNode;
    if (
      btnEl.dataset.selected == "false" ||
      btnEl.dataset.selected === undefined
    ) {
      btnEl.dataset.selected = true;
      btnEl.querySelector("img").src = "./img/jarSelected.svg";
    } else {
      btnEl.dataset.selected = false;
      btnEl.querySelector("img").src = "./img/jar.svg";
    }
    toggleIngredient(btnEl.querySelector("span").textContent)
    console.log(ingredientsSelected)
  });
};
let ingredientsSelected = [];
const toggleIngredient = (ingredient) => {
  if (ingredientsSelected.includes(ingredient)) {
    ingredientsSelected.splice(ingredientsSelected.indexOf(ingredient), 1);
  } else {
    ingredientsSelected.push(ingredient);
  }
};

const recipeInputEl = document.getElementById("recipeInput")
recipeInputEl.addEventListener("input",()=>{
  recipeSearchHandler(recipeInputEl.value)
})
const recipeSearchHandler = async (searchedTerm) => {
  if(searchedTerm == ""){
    updateRecipes(`${BASEDATABASEURL}/recipies`)
  }
  updateRecipes(`${BASEDATABASEURL}/recipies/${searchedTerm}`)
} 