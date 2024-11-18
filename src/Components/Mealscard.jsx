import React, { useState } from 'react';
import './Mealscard.css';

const Mealscard = ({ meals = [] }) => {
  const [selectedMeal, setSelectedMeal] = useState(null);

  const handleViewRecipe = (meal) => {
    setSelectedMeal(meal);
  };

  return (
    <div className="card-container">
      {selectedMeal ? (
        <div className="recipe-details">
          <h2>{selectedMeal.strMeal}</h2>
          <img src={selectedMeal.strMealThumb} alt={selectedMeal.strMeal} />
          <p>{selectedMeal.strInstructions}</p>
          <button className='closebtn' onClick={() => setSelectedMeal(null)}>Close</button>
        </div>
      ) : (
        meals.length > 0 ? (
          meals.map((meal, index) => (
            <div className="card" key={index}>
              <img src={meal.strMealThumb} className="card-img-top" alt={meal.strMeal} />
              <div className="card-body">
                <h5 className="card-title">{meal.strMeal}</h5>
                <p className="card-text">{meal.strInstructions.slice(0, 100)}...</p>
                <button className="btn btn-primary" onClick={() => handleViewRecipe(meal)}>View Recipe</button>
              </div>
            </div>
          ))
        ) : (
          <div></div>
        )
      )}
    </div>
  );
}

export default Mealscard;