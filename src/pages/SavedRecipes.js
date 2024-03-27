import { useState, useEffect } from "react";
import useHeaderHeight from "../hooks/useHeaderHeight";
import {
  Container,
  Grid,
  Typography,
  CircularProgress,
  Box,
  Alert,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import {
  setSavedRecipes,
  removeSavedRecipe,
} from "../redux/slices/savedRecipesSlice";
import RecipeCard from "../components/RecipeCard";

const SavedRecipes = () => {
  const headerHeight = useHeaderHeight();

  const userID = localStorage.getItem("userID");
  const [cookies] = useCookies(["access_token"]);

  // Local state
  const [isLoading, setIsLoading] = useState(true);
  // Get current global state  (recipes array)
  const savedRecipes = useSelector((state) => state.savedRecipes.savedRecipes);

  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchSavedRecipes = async () => {
      try {
        const response = await fetch(`https://myvegancookbook-api.onrender.com/api/recipes/savedrecipes/${userID}`, {
          headers: {
            Authorization: `Bearer ${cookies.access_token}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          dispatch(setSavedRecipes(data));
          setIsLoading(false);
        }
      } catch (error) {
        console.error(error);
      }
    };
    // Only logged in user:
    if (cookies.access_token) fetchSavedRecipes();
  }, [dispatch, cookies.access_token, userID]);

  const unSaveRecipe = async (id) => {
    try {
      const response = await fetch(
        `https://myvegancookbook-api.onrender.com/api/recipes/savedrecipes/ids/${userID}&${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies.access_token}`,
          },
          body: JSON.stringify({
            userID,
            recipeID: id,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setIsLoading(false);
        //console.log("UN-Saved Recipe", data);
        dispatch(removeSavedRecipe(data.removedRecipeId));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <Grid container spacing={4}
        sx={{
          display: "flex",
          pb: "70px",
          mt: `${headerHeight + 50}px`
        }}
      >
        <Grid item xs={12}>
          <Typography
            variant="h2"
            component="div"
            sx={{
              fontFamily: '"Ephesis"',
              textAlign: "center",
              color: "secondary.main",
              mb: "3rem",
            }}
          >
            Your Saved Recipes
            <span
              style={{ fontSize: "3rem" }}
              className="material-symbols-outlined"
            >
              eco
            </span>
          </Typography>
        </Grid>
        {!cookies.access_token ? (
          <Grid item xs={12}>
            <Box sx={{ textAlign: "center", pt: "5%", pb: "10%" }}>
              <Alert
                sx={{ justifyContent: "center", mb: 2 }}
                severity="warning"
              >
                You must be logged in to see your saved recipes list!
              </Alert>
            </Box>
          </Grid>
        ) : (
          <>
            {isLoading ? (
              <Grid item xs={12}>
                <Box sx={{ textAlign: "center", pt: "5%", pb: "5%" }}>
                  <CircularProgress color="secondary" />
                  <Typography color="secondary" variant="h6">
                    Wait a moment...
                  </Typography>
                </Box>
              </Grid>
            ) : (
              <>
                {savedRecipes && savedRecipes.length > 0 ? (
                  savedRecipes.map((recipe, index) => (
                    <RecipeCard
                      key={index}
                      recipe={recipe}
                      unSaveRecipe={unSaveRecipe}
                    />
                  ))
                ) : (
                  <Grid
                    item
                    xs={12}
                  >
                    <Box sx={{textAlign: "center"}}>
                      <Typography
                        gutterBottom
                        variant="h3"
                        component="div"
                        sx={{
                          fontFamily: "Ephesis",
                          color: "primary.main",
                        }}
                        >
                        You have no saved recipes!
                      </Typography>
                      </Box>
                  </Grid>
                )}
              </>
            )}
          </>
        )}
      </Grid>
    </Container>
  );
};

export default SavedRecipes;
