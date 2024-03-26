import './App.css';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import theme from './Theme';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CreateRecipe from './pages/CreateRecipe';
import RecipeDetails from './pages/RecipeDetails';
import PageNotFound from './pages/PageNotFound';
import SavedRecipes from './pages/SavedRecipes';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Footer from './components/Footer';
import { useCookies } from 'react-cookie';


function App() {
  const [cookies, _] = useCookies(['access_token']);

  return (
    <ThemeProvider theme={theme}>
        <div className="App">
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/recipe-details/:_id' element={<RecipeDetails />} />
              <Route path='/create-recipe' element={<CreateRecipe />} />
              <Route path='/saved-recipes' element={<SavedRecipes />} />
              <Route path='/login' element={!cookies.access_token ? <Login /> : <Navigate to='/' />} />
              <Route path='/signup' element={!cookies.access_token ? <Signup /> : <Navigate to='/' />} />
              <Route path='*' element={<PageNotFound />} />
            </Routes>
          </BrowserRouter>
          <Footer />
        </div>
    </ThemeProvider>
  );
}

export default App;
