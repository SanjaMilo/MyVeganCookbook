import { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  Typography,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  CircularProgress,
  Box,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useSelector, useDispatch } from "react-redux";
import { singleRecipe } from "../redux/slices/recipesSlice";
import { setSavedRecipesIdsList, addNewRecipeInIdsList } from "../redux/slices/savedRecipesSlice";
import { useParams, useNavigate } from "react-router-dom";
import useHeaderHeight from "../hooks/useHeaderHeight";
import moment from "moment";
import { useCookies } from "react-cookie";


const RecipeDetails = () => {
  const headerHeight = useHeaderHeight();
  // Get a recipe Id from the URL params
  const { _id } = useParams(); // path='/recipe-details/:_id'
  const userID = localStorage.getItem('userID');
  const [cookies] = useCookies(["access_token"]);
  // Local state
  const [isLoading, setIsLoading] = useState(true);
  // Get one recipe from global state
  const recipe = useSelector((state) => state.recipes.recipe); 

  const savedRecipesList = useSelector((state) => state.savedRecipes.recipesIds);

  const isRecipeSaved = (id) => savedRecipesList.includes(id); // returns boolean

  // dispatch actions to update state
  const dispatch = useDispatch();

  const navigate = useNavigate();

  // Get a single recipe by Id
  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchRecipeDetails = async () => {
      try {
        const response = await fetch(`https://myvegancookbook-api.onrender.com/api/recipes/${_id}`);
        const data = await response.json();
        if (response.ok) {
          dispatch(singleRecipe(data));
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

    fetchRecipeDetails();
    // Only logged in user:
    if (cookies.access_token) fetchSavedRecipesIdsList();
    
  }, [dispatch, _id, userID, cookies.access_token]);

  const saveRecipe = async (id) => {
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
            recipeID: id
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

  const timeFormatting = (num) => {
    const [hours, minutes] = [Math.floor(num / 60), num % 60];

    if (hours && minutes) {
      return `${hours} h and ${minutes} min`;
    } else if (hours && minutes === 0) {
      return `${hours} h`;
    } else if (hours === 0 && minutes) {
      return `${minutes} min`;
    } else {
      return;
    }
  };


  return (
    <Container>
      <Grid
        container
        sx={{
          mt: `${headerHeight + 50}px`,
          justifyContent: "center",
          pb: "70px",
        }}
      >
        <Grid item xs={12}>
          {isLoading ? (
            <Box sx={{textAlign: 'center', pt: '15%', pb: '15%'}}>
              <CircularProgress color="secondary" />
              <Typography color="secondary" variant="h6">Wait a moment...</Typography>
            </Box> 
          ) : (
            <Card sx={{ pb: 4 }}>
              {recipe && (
                <>
                  <Grid container sx={{ justifyContent: "center" }}>
                    <Grid item xs={10} sx={{ pt: 3, pb: 1 }}>
                      <Typography
                        gutterBottom
                        variant="h2"
                        component="div"
                        sx={{
                          fontFamily: "Ephesis",
                          color: "primary.main",
                          borderBottom: "1px solid #00bfa5",
                          textAlign: "center",
                        }}
                      >
                        {recipe.title}
                      </Typography>
                      <CardMedia
                        component="img"
                        height="500"
                        image={recipe.imageUrl}
                        alt={recipe.title}
                      />
                      <CardHeader
                        avatar={
                          <Avatar
                            sx={{
                              bgcolor: "primary.main",
                              fontFamily: '"Ephesis"',
                            }}
                            aria-label="recipe"
                          >
                            {recipe.title && recipe.title[0]}
                          </Avatar>
                        }
                        title={recipe.title}
                        subheader={moment(recipe.createdAt).format(
                          "MMMM Do YYYY, HH:mm"
                        )}
                        sx={{ borderBottom: "1px solid #00bfa5" }}
                      />
                      <CardContent>
                        {recipe.tags &&
                          recipe.tags.length > 0 &&
                          recipe.tags.map((tag, index) => (
                            <Typography
                              key={index}
                              variant="h6"
                              color="secondary.main"
                              sx={{
                                display: "inline-block",
                                mr: "10px",
                                cursor: "pointer",
                                mb: 3,
                              }}
                            >
                              #{tag}
                            </Typography>
                          ))}
                        <Typography gutterBottom variant="h5" sx={{ mb: 4 }}>
                          Cooking time:
                          <span style={{ color: "#00bfa5" }}>
                            {" "}
                            {timeFormatting(recipe.cookingTime)}
                          </span>
                        </Typography>
                        <Typography gutterBottom variant="h5" sx={{ mb: 4 }}>
                          Servings:
                          <span style={{ color: "#00bfa5" }}>
                            {" "}
                            {recipe.servings}
                          </span>
                        </Typography>
                        <Typography gutterBottom variant="h5" sx={{ mb: 4 }}>
                          Ingredients:
                        </Typography>
                        <FormControl component="fieldset" sx={{ mb: 4 }}>
                          <FormGroup aria-label="position">
                            {recipe.ingredients &&
                              recipe.ingredients.map((item, inx) => (
                                <FormControlLabel
                                  key={inx}
                                  value={item}
                                  control={<Checkbox />}
                                  label={item}
                                  labelPlacement="end"
                                />
                              ))}
                          </FormGroup>
                        </FormControl>
                        <Typography gutterBottom variant="h5" sx={{ mb: 4 }}>
                          Instructions:
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ whiteSpace: "pre-wrap" }}
                        >
                          {recipe.instructions}
                        </Typography>
                      </CardContent>
                      <CardActions
                        disableSpacing
                        sx={{ justifyContent: "space-between" }}
                      >
                        <Button
                          onClick={() => saveRecipe(recipe._id)}
                          disabled={(isRecipeSaved(recipe._id) || !userID) || !userID}
                          sx={{
                            mt: 2,
                            mb: 2,
                            color: "secondary.main",
                            borderColor: "secondary.main",
                            "&:hover": {
                              borderColor: "secondary.dark",
                              color: "secondary.dark",
                            },
                          }}
                          variant="outlined"
                        >
                          <FavoriteIcon sx={{ mr: 1 }} />
                          {isRecipeSaved(recipe._id) ? "Saved recipe" : "Save this recipe!"}
                        </Button>
                        <Button
                          onClick={() => {
                            navigate("/");
                          }}
                          variant="contained"
                          sx={{ mt: 2, mb: 2 }}
                        >
                          Return to recipes{" "}
                          <span className="material-symbols-outlined">
                            arrow_right_alt
                          </span>
                        </Button>
                      </CardActions>
                    </Grid>
                  </Grid>
                </>
              )}
            </Card>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default RecipeDetails;
