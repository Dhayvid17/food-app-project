import React, { useEffect, useState } from "react";
import styles from "./FoodDetails.module.css";

type Ingredient = {
  id: number;
  name: string;
};

type Equipment = {
  id: number;
  name: string;
};

type Length = {
  number: number;
  unit: string;
};

type Step = {
  number: number;
  step: string;
  ingredients: Ingredient[];
  equipment: Equipment[];
  length?: Length;
};

type AnalyzedInstruction = {
  name: string;
  steps: Step[];
  // Add other properties as needed
};

type ExtendedIngredients = {
  id: number;
  image: string;
  amount: number;
  name: string;
  unit: string;
};

//Define a type for a food item (adjust according to your actual data structure)
type FoodRecipe = {
  //Add properties that a food item would have, for example:
  id: number;
  title: string;
  image: string;
  readyInMinutes: number;
  vegetarian: boolean;
  servings: number;
  vegan: boolean;
  pricePerServing: number;
  analyzedInstructions: AnalyzedInstruction[];
  extendedIngredients: ExtendedIngredients[];
  //Add other properties as needed
};

//Define the props interface for the Food Details component
interface FoodIdProps {
  foodId: string;
}
const FoodDetails: React.FC<FoodIdProps> = ({ foodId }) => {
  const [foodRecipe, setFoodRecipe] = useState({} as FoodRecipe);
  const [isLoading, setIsLoading] = useState(true);

  const URL = `https://api.spoonacular.com/recipes/${foodId}/information`;
  const apiKey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const fetchRecipes = async () => {
      const res = await fetch(`${URL}?apiKey=${apiKey}`);
      const data = await res.json();
      setFoodRecipe(data);
      setIsLoading(false);
    };
    fetchRecipes();
  }, [foodId]);

  //Check If analyzed instructions are available
  if (
    !foodRecipe.analyzedInstructions ||
    foodRecipe.analyzedInstructions.length === 0
  ) {
    return (
      <p className={styles.analyzedCheckings}>No instructions available.</p>
    );
  }

  //Check If steps are available
  const steps = foodRecipe.analyzedInstructions[0]?.steps;
  if (!steps) {
    return <p className={styles.stepsCheckings}>No steps available.</p>;
  }

  return (
    <div>
      <div className={styles.recipeCard}>
        <h1 className={styles.recipeTitle}>{foodRecipe.title}</h1>
        <img
          className={styles.recipeImage}
          src={foodRecipe.image}
          alt={foodRecipe.title}
        />
      </div>

      <div className={styles.recipeDetails}>
        <span>
          <strong>Ready In: ⏰ {foodRecipe.readyInMinutes} Minutes</strong>
        </span>
        <span>
          <strong>Serves: {foodRecipe.servings} Person(s)</strong>
        </span>
        <span>
          <strong>
            {foodRecipe.vegetarian ? "Vegetarian" : "Non- Vegetarian"}
          </strong>
        </span>
        <span>
          <strong> {foodRecipe.vegan ? "Vegan" : ""} </strong>
        </span>
      </div>
      <div className={styles.pricePerServing}>
        <span>
          <strong>
            Price Per Serving: 💲{(foodRecipe.pricePerServing / 100).toFixed(2)}
          </strong>
        </span>
      </div>

      <div className={styles.ingredientContainer}>
        <h2>Ingredients</h2>
        {foodRecipe.extendedIngredients.map((ingredient) => (
          <div key={ingredient.id}>
            <div className={styles.ingredientBox}>
              <div className={styles.imageBox}>
                <img
                  src={
                    `https://spoonacular.com/cdn/ingredients_100x100/` +
                    ingredient.image
                  }
                  alt=""
                />
              </div>
              <div className={styles.ingredientName}>
                <h3>{ingredient.name}</h3>
                <h4>
                  {ingredient.amount}
                  {ingredient.unit}
                </h4>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.instructionsContainer}>
        <h2 className={styles.h2}>Instructions</h2>
        <div className={styles.recipeInstructions}>
          {isLoading ? (
            <h3>Loading...</h3>
          ) : (
            <ol>
              {steps.map((step) => (
                <li key={step.number}>{step.step}</li>
              ))}
            </ol>
          )}
        </div>
      </div>
    </div>
  );
};
export default FoodDetails;
