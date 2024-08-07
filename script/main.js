const DATABASEURL = "http://127.0.0.1:5000/recipies";
const BASEDATABASEURL = "http://127.0.0.1:5000";
const INGREDIENTSDATABASEURL = "http://127.0.0.1:5000/recipies/ingredients/popular";
const SELECTINGREDNETSQUERY ="http://127.0.0.1:5000/recipies/all/ingredients?ingredients=";
const POSTRATINGURL = "http://127.0.0.1:5000/recipies/"
const getData = async (databaseUrl) => {
  let data = await fetch(databaseUrl);
  data = await data.json();
  return data;
};

const updateRecipes = async (url) => {
  await getData(url).then((data) => {
    let fullrecipesEl = new DocumentFragment();
    for (let i = 0; i < data.length; i++) {
      const recipeEl = createRecipe(data[i]);
      fullrecipesEl.append(recipeEl);
    }
    document.getElementById("fullRecipe").innerHTML = "";
    document.getElementById("fullRecipe").appendChild(fullrecipesEl);
  });
};
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

  const ratingEl = generateRatingButtons(recipeObj.rating, recipeObj._id);
  root.append(ratingEl);

  let linkContainerEl = document.createElement("div");
  let linkEl = document.createElement("a");
  linkEl.classList.add("recipe__link");
  linkEl.href = "https://kwestiasmaku.com" + recipeObj.website_URL;
  linkEl.textContent = "link do przepisu";
  linkContainerEl.append(linkEl);
  root.append(linkContainerEl);

  return root;
};
// const beforeNextAction(fn, sec){

// }
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

const ingredientsHandler = (ingredientsList) => {
  {
    
    let fullIngredientsEl = new DocumentFragment();
    for (let i = 0; i < ingredientsList.length; i++) {
      const ingredientEl = createIngredientEl(ingredientsList[i].title);
      addIngredientHandler(ingredientEl);
      ingredientsSelected.forEach((el) => {
        if (el == ingredientsList[i].title) {
          toggleSelectionOnButton(ingredientEl);
        }
      });
      fullIngredientsEl.append(ingredientEl);
    }
    document.getElementById("jarContainer").innerHTML = "";
    document.getElementById("jarContainer").appendChild(fullIngredientsEl);
  }
};
let fullIngredientsList;
getData(INGREDIENTSDATABASEURL).then((data) => {
  fullIngredientsList = data;
  console.log(data)
  ingredientsHandler(data);
});
const handleRatingClick = async (event) =>{
  const id = event.target.name;
  const rating = event.target.value;
  await fetch(`${DATABASEURL}/${id}/${rating}`,{method: "POST"})
}
const generateRatingButtons = (ratingArr = [0, 0],ratingId) => {
  let avarageRating;
  if (ratingArr.length !== 0) {
    avarageRating = Math.round(
      ratingArr.reduce((a, b) => a + b) / ratingArr.length 
    );
  } else {
    avarageRating = 0;
  }

  const root = new DocumentFragment();
  const containerEl = document.createElement("div");
  root.append(containerEl);
  containerEl.classList.add("rating");
  for (let i = 0; i < 5; i++) {

    let inputEl = document.createElement("input");
    inputEl.classList.add("rating__input");
    inputEl.type = "radio";
    inputEl.value = 5 - i;
    inputEl.id = ratingId+inputEl.value;
    inputEl.name =  ratingId;
    inputEl.addEventListener("click",handleRatingClick)
    containerEl.append(inputEl);
    if (avarageRating === 5 - i) {
      inputEl.checked = true;
    }

    let labelEl = document.createElement("label");
    labelEl.classList.add("rating__label");
    labelEl.htmlFor = ratingId+inputEl.value;
    labelEl.textContent = "★";
    containerEl.append(labelEl);
  }
  return root;
};

//ingredients selection
const toggleSelectionOnButton = (btnEl) => {
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
};

const addIngredientHandler = (el) => {
  el.addEventListener("click", (e) => {
    let btnEl = e.target.parentNode;
    toggleSelectionOnButton(btnEl);
    toggleIngredient(btnEl.querySelector("span").textContent);
    document.getElementById("ingredientsCount").textContent =
      ingredientsSelected.length;
    let recipeQuery = SELECTINGREDNETSQUERY;
    ingredientsSelected.forEach((ing) => {
      recipeQuery += encodeURI(ing) + ",";
    });
    recipeQuery = recipeQuery.slice(0,-1);
    if(ingredientsSelected.length === 0){
      updateRecipes(DATABASEURL)
    }else{
      updateRecipes(recipeQuery)
    }

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

const recipeInputEl = document.getElementById("recipeInput");
recipeInputEl.addEventListener("input", () => {
  recipeSearchHandler(recipeInputEl.value);
});
const recipeSearchHandler = async (searchedTerm) => {
  if (searchedTerm == "") {
    updateRecipes(`${BASEDATABASEURL}/recipies`);
  }
  updateRecipes(`${BASEDATABASEURL}/recipies/${searchedTerm}`);
};

//ingredients filter
const filterIngredients = (textToFilter) => {
  const result = fullIngredientsList.filter((ingredientObj) =>
  ingredientObj.title.toLowerCase().includes(textToFilter.toLowerCase())
  );
  return result;
};
const ingredientsInputEl = document.getElementById("ingredientsInput");
ingredientsInputEl.addEventListener("input", (e) => {
  const filteredIngredients = filterIngredients(e.target.value);
  ingredientsHandler(filteredIngredients);
});
