import React from 'react';
import { useLocation } from 'react-router-dom';

const RecipeDetail = () => {
  const location = useLocation();
  const { meal } = location.state; // Get meal data from the state

  return (
    <div className="recipe-detail">
      <h2>{meal.strMeal}</h2>
      <img src={meal.strMealThumb} alt={meal.strMeal} />
      <h3>Instructions:</h3>
      <p>{meal.strInstructions}</p>
      <button onClick={() => window.history.back()}>Go Back</button> {/* Button to go back */}
    </div>
  );
}

export default RecipeDetail;