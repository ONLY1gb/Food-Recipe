import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './Mainpage.css'; // Import your CSS file
import Mealscard from './Mealscard'; // Import the Mealscard component
import RecipeDetails from './RecipeDetails'; // Import the RecipeDetails component

const Mainpage = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInput = (e) => {
    setSearch(e.target.value);
  };

  const myFun = async () => {
    if (!search) {
      return; // Do nothing if the search input is empty
    }

    setLoading(true); // Set loading to true while fetching data
    setError(null); // Reset any previous error

    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`);
      const jsonData = await response.json();

      if (jsonData.meals) {
        setData(jsonData.meals); // Set the meal data if found
      } else {
        setData([]); // Set to an empty array if no meals found
        setError('No meals found for your search.'); // Set an error message
      }
    } catch (error) {
      setError('Failed to fetch data. Please try again.'); // Handle fetch error
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      myFun(); // Call the search function when Enter is pressed
    }
  };

  return (
    <Router>
      <>
        <h1 className='head'>Food Recipe App</h1>
        <div className='container'>
          <div className='search'>
            <input
              type='text'
              className='search-input'
              placeholder='Enter Dish'
              onChange={handleInput}
              onKeyDown={handleKeyDown} // Add onKeyDown event handler
            />
            <button className='search-button' onClick={myFun}>Search</button>
          </div>
        </div>
        {loading && <div>Loading...</div>} {/* Show loading indicator */}
        {error && <div className="error-message">{error}</div>} {/* Show error message */}
        <div className="meals-container">
          {data.length > 0 && <Mealscard meals={data} />} {/* Render Mealscard only if there are meals */}
        </div>
        <Routes>
          <Route path="/recipe" element={<RecipeDetails />} /> {/* Route for RecipeDetails */}
        </Routes>
      </>
    </Router>
  );
};

export default Mainpage;