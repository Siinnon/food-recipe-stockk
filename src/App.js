import React, { useState } from "react";
import Axios from "axios";
import styled from "styled-components";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
// api from youtube guy
// const APP_ID = "a52b4d43";
// const APP_KEY = "e0e5c667605f5e91d8275c973531b80a";

// my own api
const APP_ID= "98ae43c9";
const APP_KEY= "5dadbe216d63560310fe00f37bd98dec"

const RecipeComponent = (props) => {
  const [show, setShow] = useState("");

  const { label, image, ingredients, url } = props.recipe;
  return (
    <RecipeContainer>
      <Dialog
        onClose={() => console.log("hi")}
        aria-labelledby="simple-dialog-title"
        open={!!show}
      >
        <DialogTitle>Ingredients</DialogTitle>
        <DialogContent>
          <RecipeName>{label}</RecipeName>
          <table>
            <thead>
              <th>Ingredient</th>
              <th>Weight</th>
            </thead>
            <tbody>
              {ingredients.map((ingredient, index) => (
                <tr key={index} className="ingredient-list">
                  <td>{ingredient.text}</td>
                  <td>{ingredient.weight}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </DialogContent>
        <DialogActions>
          <SeeNewTab onClick={() => window.open(url)}>See More</SeeNewTab>
          <SeeMoreText onClick={() => setShow("")}>Close</SeeMoreText>
        </DialogActions>
      </Dialog>
      <CoverImage src={image} alt={label} />
      <RecipeName>{label}</RecipeName>
      <IngredientsText onClick={() => setShow(!show)}>
        Ingredients
      </IngredientsText>
      <SeeMoreText onClick={() => window.open(url)}>
        Full description
      </SeeMoreText>
    </RecipeContainer>
  );
};

// CSS for App.js in same file
const RecipeContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 200px;
  box-shadow: 0 3px 10px 0 #aaa;
  white-space: initial;
`;
const CoverImage = styled.img`
  object-fit: cover;
  height: 200px;
`;
const RecipeName = styled.span`
  font-size: 18px;
  font-weight: 700;
  color: purple;
  margin: 5px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: 'Dancing Script', cursive;
`;
const SeeMoreText = styled.span`
  color: black;
  font-size: 15px;
  text-align: center;
  border: solid 3px black;
  border-radius: 3px;
  padding: 10px 15px;
  cursor: pointer;
  background-color: #ECE1EF;
`;
const IngredientsText = styled(SeeMoreText)`
  color: black;
  border: solid 3px black;
  margin-bottom: 10px;
  background-color: #DDF6D3;
`;
const SeeNewTab = styled(SeeMoreText)`
  color: black;
  border: solid 2px black;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const AppName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const Header = styled.div`
  background-color: #0B0623;
  color: #ADF9FE;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  padding: 4px;
  font-size: 20px;
  font-weight: bold;
  box-shadow: 0px 2px 0 #555;
  font-family: 'Acme', sans-serif;
`;
const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 5px 5px;
  border-radius: 10px;
  margin-left: 20px;
  width: 50%;
  background-color: #DCD6F7;
  font-family: 'Acme', sans-serif;

`;
const SearchIcon = styled.img`
  width: 32px;
  height: 32px;
`;
const RecipeImage = styled.img`
  width: 36px;
  height: 36px;
  margin: 15px;
`;
const Placeholder = styled.img`
  width: 120px;
  height: 120px;
  margin: 200px;
  opacity: 50%;
`;
const SearchInput = styled.input`
  color: black;
  font-size: 16px;
  font-weight: bold;
  border: none;
  outline: none;
  margin-left: 15px;
  background-color: #DCD6F7;
  font-family: 'Acme', sans-serif;

`;
const RecipeListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 20px;
  justify-content: space-evenly;
  font-family: 'Dosis', sans-serif;
font-family: 'Xanh Mono', monospace;
`;


// to run app 
const AppComponent = () => {
  const [searchQuery, updateSearchQuery] = useState("");
  const [recipeList, updateRecipeList] = useState([]);
  const [timeoutId, updateTimeoutId] = useState();
  const fetchData = async (searchString) => {
    const response = await Axios.get(
      `https://api.edamam.com/search?q=${searchString}&app_id=${APP_ID}&app_key=${APP_KEY}`,
    );
    updateRecipeList(response.data.hits);
  };

  const onTextChange = (e) => {
    clearTimeout(timeoutId);
    updateSearchQuery(e.target.value);
    const timeout = setTimeout(() => fetchData(e.target.value), 500);
    updateTimeoutId(timeout);
  };

  return (
    <Container>
      <Header>
        <AppName>
          <RecipeImage src="/react-recipe-finder/pineapple.svg" />
          Food Recipe Stock
        </AppName>
        <SearchBox>
          <SearchIcon src="/react-recipe-finder/search-icon.svg" />
          <SearchInput
            placeholder="Search Recipe"
            value={searchQuery}
            onChange={onTextChange}
          />
        </SearchBox>
      </Header>
      <RecipeListContainer>
        {recipeList?.length ? (
          recipeList.map((recipe, index) => (
            <RecipeComponent key={index} recipe={recipe.recipe} />
          ))
        ) : (
          <Placeholder src="/react-recipe-finder/rice.svg" />
        )}
      </RecipeListContainer>
    </Container>
  );
};

export default AppComponent;
