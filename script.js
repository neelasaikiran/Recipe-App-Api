const searchBox = document.querySelector(".searchbox");
const searchBtn = document.querySelector(".searchBtn");
const recipeContainer = document.querySelector(".recipe-container");
const recipeDetailsContent = document.querySelector(".recipe-details-content");
const recipeCloseButton = document.querySelector(".recipe-close-btn");

// function to get recipes
const fetchRecipes = async (query) => {
    recipeContainer.innerHTML = '<h2>Fetching Recipes...</h2>';
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response = await data.json();

    recipeContainer.innerHTML = '';
    response.meals.forEach(meal => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML = `
     <img src="${meal.strMealThumb}">
     <h3>${meal.strMeal}</h3>
     <p>  <span> ${meal.strArea} </span> Dish<p>
     <p>Belongs to <span>  ${meal.strCategory} </span> category <p>
     
     `
        const button = document.createElement('button');
        button.textContent = "View Recipe";
        recipeDiv.appendChild(button);


        // Adding EventListener 

        button.addEventListener('click', () => {
            openRecipePopup(meal);
        })
        recipeContainer.appendChild(recipeDiv);
    })
    // console.log(response);
}
const openRecipePopup = (meal) =>{
    recipeDetailsContent.textContent = 
    `
    <h2>${meal.strMeal}</h2>
    `
    recipeDetailsContent.parentElement.style.display = "block";
}
searchBtn.addEventListener('click', (e) => {
    e.preventDefault(); // if refresh the page the data will be constant
    const searchInput = searchBox.value.trim()
    fetchRecipes(searchInput);

})