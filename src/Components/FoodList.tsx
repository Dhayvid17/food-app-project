import React from "react";
import { Dispatch, SetStateAction } from "react";
import FoodListItem from "./FoodListItem";

//Define a type for a food item
type FoodItem = {
  id: number;
  title: string;
  image: string;
  //Add other properties as needed
};

//Define the props interface for the Food List Component
interface SearchProps {
  foodData: FoodItem[];
  setFoodId: Dispatch<SetStateAction<string | null>>;
}

//Food List Component Logic
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
