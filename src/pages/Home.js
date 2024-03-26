import { Container, Typography } from '@mui/material';
import Hero from '../components/Hero'
import SearchRecipe from '../components/SearchRecipe';
import RecipesGrid from '../components/RecipesGrid';

const Home = () => {

  return (
    <Container>
      <Hero />
      <Typography
        variant="h3"
        className="logo"
        sx={{
          mt: "4rem",
          mb: "4rem",
          p: "2rem",
          color: "secondary.main",
          fontFamily: '"Ephesis"',
          borderTop: `1px solid #ffb74d`,
          borderBottom: "1px solid #ffb74d",
        }}
      >
        If you don't have an idea what to prepare for your breakfast, lunch,
        dinner, or party, lets find some healthy, all vegan, delicious recipes.
        Be inspired, creative and share your own recipe. You can save a recipe
        and make your own list of favorite recipes.
        <span
          style={{ fontSize: "2rem" }}
          className="material-symbols-outlined"
        >
          eco
        </span>
      </Typography>
      <SearchRecipe />
      <RecipesGrid />
    </Container>
  );
};

export default Home;
