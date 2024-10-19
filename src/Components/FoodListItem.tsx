import React from "react";
import styles from "./FoodListItem.module.css";

//Define a type for a Food Item
type FoodItem = {
  id: number;
  title: string;
  image: string;
  //Add other properties as needed
};

//Define the props interface for the FoodListItem Component
interface FoodItemProps {
  food: FoodItem;
  setFoodId: React.Dispatch<React.SetStateAction<string | null>>;
}

//Food List Item Component Logic
const FoodListItem: React.FC<FoodItemProps> = ({ food, setFoodId }) => {
  return (
    <div className={styles.itemContainer}>
      <img className={styles.itemImage} src={food.image} alt="" />
      <div className={styles.itemContent}>
        <p className={styles.itemTitle}>{food.title}</p>
      </div>
      <div className={styles.buttonBox}>
        <button
          onClick={() => {
            setFoodId(food.id.toString());
          }}
          className={styles.itemButton}
        >
          View Recipe
        </button>
      </div>
    </div>
  );
};

export default FoodListItem;
