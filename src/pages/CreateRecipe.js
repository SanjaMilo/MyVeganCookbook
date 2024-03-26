import { useEffect, useState } from "react";
import useHeaderHeight from "../hooks/useHeaderHeight";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Grid,
  TextField,
  FormControl,
  Card,
  CardContent,
  Button,
  Typography,
  Alert,
} from "@mui/material";
import { useCookies } from "react-cookie";
import { addRecipe } from "../redux/slices/recipesSlice";
import { useDispatch } from "react-redux";

const CreateRecipe = () => {
  const headerHeight = useHeaderHeight();
  const [cookies, setCookies] = useCookies(["access_token"]);
  const userID = localStorage.getItem("userID");
  // local state
  const [error, setError] = useState(null);
  const [recipe, setRecipe] = useState({
    title: "",
    servings: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    tags: [],
    userOwner: userID,
  });

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value});
  };

  const handleRecipePropertyChange = (e, inx, property) => {
    const { value } = e.target;

    const propertyArray = recipe[property];
    propertyArray[inx] = value;

    setRecipe({ ...recipe, [property]: propertyArray });
  };

  const addInputFiled = (objProperty) => {
    // add empty string as a new ingredient
    setRecipe({ ...recipe, [objProperty]: [...recipe[objProperty], ""] });
  };

  const submitCreateRecipe = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${cookies.access_token}`,
        },
        body: JSON.stringify(recipe),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error);
      } else {
        alert("New Recipe Created!");
        // Update global state at the same time we add new recipe to the Database
        dispatch(addRecipe(data));
        // After creating a recipe, go to Home page (all recipes)
        navigate("/");
      }
    } catch (error) {
      console.error(error);
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
          {!userID && (
            <Alert sx={{ justifyContent: "center", mb: 2 }} severity="warning">
              To create a recipe, you must be logged in!
            </Alert>
          )}
          <Card sx={{ pb: 4 }}>
            <Grid container sx={{ justifyContent: "center" }}>
              <Grid item xs={10} sx={{ pt: 3, pb: 6 }}>
                <Typography
                  gutterBottom
                  variant="h2"
                  component="div"
                  sx={{
                    fontFamily: "Ephesis",
                    color: "info.main",
                    borderBottom: "1px solid #b39ddb",
                    textAlign: "center",
                  }}
                >
                  Create New Recipe
                  <span
                    style={{ fontSize: "3rem" }}
                    className="material-symbols-outlined"
                  >
                    eco
                  </span>
                </Typography>
              </Grid>
            </Grid>
            <CardContent>
              <Grid container sx={{ justifyContent: "center" }}>
                <Grid item xs={10}>
                  <form onSubmit={submitCreateRecipe}>
                    <FormControl fullWidth>
                      <TextField
                        onChange={handleChange}
                        name="title"
                        value={recipe.title}
                        sx={{ mb: 4 }}
                        variant="standard"
                        label="Recipe's Title"
                      />
                      <TextField
                        onChange={handleChange}
                        name="cookingTime"
                        value={recipe.cookingTime}
                        sx={{ mb: 4 }}
                        variant="standard"
                        label="Cooking Time (in minutes)"
                        type="number"
                      />
                      <TextField
                        onChange={handleChange}
                        name="servings"
                        value={recipe.servings}
                        sx={{ mb: 4 }}
                        variant="standard"
                        label="Servings"
                        type="number"
                      />
                      {recipe.tags.map((item, inx) => (
                        <TextField
                          onChange={(e) =>
                            handleRecipePropertyChange(e, inx, "tags")
                          }
                          name="tags"
                          value={item}
                          key={inx}
                          sx={{ mb: 4 }}
                          variant="standard"
                          label="#Tag"
                        />
                      ))}
                      <Button
                        onClick={() => {
                          addInputFiled("tags");
                        }}
                        sx={{
                          width: "120px",
                          mb: 3,
                          mt: 2,
                          color: "info.main",
                          borderColor: "info.main",
                          "&:hover": {
                            borderColor: "info.dark",
                            color: "info.dark",
                          },
                        }}
                        variant="outlined"
                      >
                        Add #Tag
                      </Button>
                      <TextField
                        onChange={handleChange}
                        name="imageUrl"
                        value={recipe.imageUrl}
                        sx={{ mb: 4 }}
                        variant="standard"
                        label="Image URL (find here: https://www.freepik.com)"
                      />
                      {recipe.ingredients.map((item, inx) => (
                        <TextField
                          onChange={(e) =>
                            handleRecipePropertyChange(e, inx, "ingredients")
                          }
                          name="tags"
                          value={item}
                          key={inx}
                          sx={{ mb: 4 }}
                          variant="standard"
                          label="Ingredient"
                        />
                      ))}
                      <Button
                        onClick={() => {
                          addInputFiled("ingredients");
                        }}
                        sx={{
                          width: "150px",
                          mb: 3,
                          mt: 2,
                          color: "info.main",
                          borderColor: "info.main",
                          "&:hover": {
                            borderColor: "info.dark",
                            color: "info.dark",
                          },
                        }}
                        variant="outlined"
                      >
                        Add ingredient
                      </Button>
                      <TextField
                        onChange={handleChange}
                        name="instructions"
                        value={recipe.instructions}
                        sx={{ mb: 4 }}
                        variant="standard"
                        label="Instructions (separate paragraphs with 2 empty lines)"
                        multiline
                      />
                    </FormControl>
                    <Button
                      type="submit"
                      disabled={!userID}
                      sx={{ mt: 3, mb: 2 }}
                      variant="contained"
                    >
                      Create Recipe
                    </Button>
                  </form>
                  {error && (
                    <Typography
                      variant="body1"
                      sx={{ color: "secondary.dark" }}
                    >
                      {error}
                    </Typography>
                  )}
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CreateRecipe;
