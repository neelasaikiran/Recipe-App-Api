const searchBox = document.querySelector(".searchbox");
const searchBtn = document.querySelector(".searchBtn");
const recipeContainer = document.querySelector(".recipe-container");

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
     <p> ${meal.strArea} <p>
     <p> ${meal.strCategory} <p>


     `
        recipeContainer.appendChild(recipeDiv);
    })
    // console.log(response);
}

searchBtn.addEventListener('click', (e) => {
    e.preventDefault(); // if refresh the page the data will be constant
    const searchInput = searchBox.value.trim()
    fetchRecipes(searchInput);

})