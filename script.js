const searchBox = document.querySelector(".searchbox");
const searchBtn = document.querySelector(".searchBtn");
const recipeContainer = document.querySelector(".recipe-container");
const recipeDetailsContent = document.querySelector(".recipe-details-content");
const recipeCloseButton = document.querySelector(".recipe-close-btn");

// Function to fetch recipes
const fetchRecipes = async (query) => {
  recipeContainer.innerHTML = '<h2>Fetching Recipes...</h2>';
  try {
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response = await data.json();

    recipeContainer.innerHTML = ''; // Clear the container before displaying new results
    if (response.meals === null) {
      recipeContainer.innerHTML = '<h2>No Recipes Found</h2>';
      return;
    }

    response.meals.forEach((meal) => {
      const recipeDiv = document.createElement('div');
      recipeDiv.classList.add('recipe');
      recipeDiv.innerHTML = `
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <h3>${meal.strMeal}</h3>
        <p><span>${meal.strArea}</span> Dish</p>
        <p>Belongs to <span>${meal.strCategory}</span> category</p>
      `;

      const button = document.createElement('button');
      button.textContent = "View Recipe";
      recipeDiv.appendChild(button);

      // Adding EventListener to the button to open recipe popup
      button.addEventListener('click', () => {
        openRecipePopup(meal);
      });

      recipeContainer.appendChild(recipeDiv);
    });
  } catch (error) {
    console.error("Error fetching recipes:", error);
    recipeContainer.innerHTML = "<h2>Error Fetching Recipes</h2>";
  }
};

// Function to fetch ingredients and measurements
const fetchIngredients = (meal) => {
  let ingredientsList = "";
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    if (ingredient) {
      const measure = meal[`strMeasure${i}`];
      ingredientsList += `<li>${measure} ${ingredient}</li>`;
    } else {
      break;
    }
  }
  return ingredientsList;
};

// Function to open recipe details popup
const openRecipePopup = (meal) => {
  recipeDetailsContent.innerHTML = `
    <h2 class="recipeName">${meal.strMeal}</h2>
    <h3>Ingredients:</h3>
    <ul class="ingredientsList">${fetchIngredients(meal)}</ul>
    <div>
      <h3>Instructions</h3>
      <p class="recipeInstructions">${meal.strInstructions}</p>
    </div>
  `;
  recipeDetailsContent.parentElement.style.display = "block"; // Show the popup
};

// Close recipe popup
recipeCloseButton.addEventListener('click', () => {
  recipeDetailsContent.parentElement.style.display = "none"; // Hide the popup
});

// Add event listener to the search button
searchBtn.addEventListener('click', (e) => {
  e.preventDefault(); // Prevent page refresh
  const searchInput = searchBox.value.trim(); // Get user input

  if (!searchInput) {
    recipeContainer.innerHTML = `<h2>Type something...</h2>`;
    return;
  }

  fetchRecipes(searchInput); // Fetch the recipes
});
