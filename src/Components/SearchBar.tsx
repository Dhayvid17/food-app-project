import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "./SearchBar.module.css";

const URL = "https://api.spoonacular.com/recipes/complexSearch";
const apiKey = import.meta.env.VITE_API_KEY;

//Define a type for a food item
type FoodItem = {
  id: number;
  title: string;
  image: string;
  //Add other properties as needed
};

//Define the props interface for the Search component
interface SearchProps {
  foodData: FoodItem[];
  setFoodData: Dispatch<SetStateAction<FoodItem[]>>;
}

//Search Component Logic
const Search: React.FC<SearchProps> = ({ foodData, setFoodData }) => {
  const [query, setQuery] = useState<string>("");
  const [noResults, setNoResults] = useState<boolean>(false); //Add a state to track if no results were found

  const fetchFood = async () => {
    setNoResults(false); //Reset the noResults state before making the API call
    if (query) {
      //Check if the query is not empty before making the API call
      const res = await fetch(`${URL}?query=${query}&apiKey=${apiKey}`);
      const data = await res.json();
      console.log(data);
      if (data.results && data.results.length > 0) {
        setFoodData(data.results);
      } else {
        setNoResults(true); // Set noResults to true if no results were found
      }
    }
  };

  useEffect(() => {
    fetchFood();
  }, [query]);

  //Handle Search Logic
  const handleSearch = () => {
    if (query.trim()) {
      fetchFood();
    }
  };

  //Handle Keydown Logic
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div>
      <div className={styles.searchBox}>
        <input
          className={styles.input}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          type="text"
          placeholder="Type your food here..."
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className={styles.noResults}>
        {noResults && <h2>No results found for "{query}"</h2>}
      </div>
    </div>
  );
};
export default Search;
