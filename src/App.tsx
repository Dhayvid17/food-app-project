import { useState } from "react";
import Search from "./Components/SearchBar";
import FoodList from "./Components/FoodList";
import Nav from "./Components/Nav";
import "./App.css";
import Container from "./Components/Container";
import FlexContainer from "./Components/FlexContainer";
import FoodDetails from "./Components/FoodDetails";

//Define the FoodItem type (make sure this matches the one in SearchBar.tsx)
type FoodItem = {
  id: number;
  title: string;
  image: string;
  //Add other properties as needed
};

function App() {
  const [foodData, setFoodData] = useState<FoodItem[]>([]);
  const [foodId, setFoodId] = useState<string | null>(null);

  return (
    <div className="App">
      <Nav />
      <Search foodData={foodData} setFoodData={setFoodData} />
      <Container>
        <FlexContainer>
          <FoodList foodData={foodData} setFoodId={setFoodId} />
        </FlexContainer>
        <FlexContainer>
          {foodId && <FoodDetails foodId={foodId} />}
        </FlexContainer>
      </Container>
    </div>
  );
}

export default App;
