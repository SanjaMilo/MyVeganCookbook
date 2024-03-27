import { useEffect, useState } from "react";
import { Grid, CircularProgress, Box, Typography } from "@mui/material";
import RecipeCard from "./RecipeCard";
import { useSelector, useDispatch } from "react-redux";
import { setRecipes } from "../redux/slices/recipesSlice";
import { setSavedRecipesIdsList, addNewRecipeInIdsList } from "../redux/slices/savedRecipesSlice";
import { useCookies } from "react-cookie";

const RecipesGrid = () => {
  const userID = localStorage.getItem("userID");
  const [cookies] = useCookies(["access_token"]);
  // Local state
  const [isLoading, setIsLoading] = useState(true);
  // Get current global state  (recipes array)
  const recipes = useSelector((state) => state.recipes.recipes); 

  const savedRecipesList = useSelector((state) => state.savedRecipes.recipesIds);
  // dispatch actions to update state
  const dispatch = useDispatch();

  // Get all recipes
  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchRecipes = async () => {
      try {
        const response = await fetch("https://myvegancookbook-api.onrender.com/api/recipes");
        const data = await response.json();
        if (response.ok) {
          dispatch(setRecipes(data));
          setIsLoading(false);
        }
      } catch (error) {
        console.error(error);
      }
    };

    const fetchSavedRecipesIdsList = async () => {
      try {
        const response = await fetch(
          `https://myvegancookbook-api.onrender.com/api/recipes/savedrecipes/ids/${userID}`,
          {
            headers: {
              "Authorization": `Bearer ${cookies.access_token}`,
            },
          }
        );
        const data = await response.json();
        if (response.ok) {
          dispatch(setSavedRecipesIdsList(data.savedRecipes)); // data is savedRecipes (userModel)
          setIsLoading(false);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchRecipes();
    // Only logged in user:
    if (cookies.access_token) fetchSavedRecipesIdsList();
    
  }, [dispatch, cookies.access_token, userID]);

  const saveRecipe = async (recipeID) => {
    try {
      const response = await fetch(
        "https://myvegancookbook-api.onrender.com/api/recipes",
        {
          method: 'PUT',
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${cookies.access_token}`,
          },
          body: JSON.stringify({
            userID,
            recipeID
          })
        }
      );
      const data = await response.json();
      if (response.ok) {
        //console.log("Saved Recipe", data.savedRecipe);
        dispatch(addNewRecipeInIdsList(data.savedRecipe._id)); 
      }

    } catch (error) {
      console.error(error);
    }
  };

  const isRecipeSaved = (id) => savedRecipesList.includes(id); // boolean

  return (
    <Grid container spacing={4} sx={{ pb: "70px", display: "flex" }}>
      {isLoading ? (
        <Grid item xs={12}>
          <Box sx={{ textAlign: "center", pt: "15%", pb: "15%" }}>
            <CircularProgress color="secondary" />
            <Typography color="secondary" variant="h6">
              Wait a moment...
            </Typography>
          </Box>
        </Grid>
      ) : (
        <>
          {recipes && recipes.length > 0 ? (
            recipes.map((recipe, index) => (
              <RecipeCard key={index} recipe={recipe} isRecipeSaved={isRecipeSaved} saveRecipe={saveRecipe} />
            ))
          ) : (
            <Grid
              item
              xs={12}
              sx={{ justifyContent: "center", alignItems: "center" }}
            >
              <Box>
                <Typography
                  gutterBottom
                  variant="h3"
                  component="div"
                  sx={{
                    fontFamily: "Ephesis",
                    color: "primary.main",
                    textAlign: "center",
                  }}
                >
                  Sorry, no recipes found!
                </Typography>
              </Box>
            </Grid>
          )}
        </>
      )}
    </Grid>
  );
};

export default RecipesGrid;
