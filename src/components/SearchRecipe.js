import { Grid } from "@mui/material";
import { Typography } from "@mui/material";
import { setRecipes } from "../redux/slices/recipesSlice";
import { useDispatch } from 'react-redux';
import { useEffect, useState } from "react";
import useDebouncedValue from "../hooks/useDebouncedValue";

const SearchRecipe = () => {
  const [keyword, setKeyword] = useState("");
  const debouncedKeyword = useDebouncedValue(keyword, 500); // 500 milliseconds delay
  // dispatch action setRecipes to update state
  const dispatch = useDispatch();

  useEffect(() => {

    const searchRecipes = (value) => {
      fetch('/api/recipes/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({payload: value})
      })
      .then(res => res.json())
      .then(data => dispatch(setRecipes(data))) 
      .catch(err => console.log(err));
    };

    if (debouncedKeyword) searchRecipes(debouncedKeyword);
  }, [debouncedKeyword, dispatch]);
  
  

  return (
    <Grid container spacing={3} sx={{ flexGrow: 1, mb: '6rem'}} justifyContent="center"
      alignItems="center">
      <Grid item md={8} xs={12} sx={{textAlign: 'center'}}>
        <Typography className="search-title" variant="h2" sx={{fontFamily: '"Ephesis"', color: 'info.main', mb: '3rem'}}>
            What are we cooking today?
        </Typography>
        <input
          onChange={(e) => setKeyword(e.target.value)}
          type="text"
          id="search"
          className="search"
          placeholder="Search recipe by name..."
        />
      </Grid>
    </Grid>
  );
};

export default SearchRecipe;
