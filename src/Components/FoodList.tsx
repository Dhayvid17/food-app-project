// import { Dispatch, SetStateAction } from "react";
import React from "react";
import { Dispatch, SetStateAction } from "react";
import FoodListItem from "./FoodListItem";

// Define a type for a food item (adjust according to your actual data structure)
type FoodItem = {
  // Add properties that a food item would have, for example:
  id: number;
  title: string;
  image: string;
  // Add other properties as needed
};

// Define the props interface for the Search component
interface SearchProps {
  foodData: FoodItem[];
  setFoodId: Dispatch<SetStateAction<string | null>>;
  //   setFoodData: Dispatch<SetStateAction<FoodItem[]>>;
}
const FoodList: React.FC<SearchProps> = ({ foodData, setFoodId }) => {
  return (
    <div>
      {foodData.map((food) => (
        <FoodListItem setFoodId={setFoodId} key={food.id} food={food} />
      ))}
    </div>
  );
};

export default FoodList;
