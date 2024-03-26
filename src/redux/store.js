import { configureStore } from '@reduxjs/toolkit';
import recipesReducer from './slices/recipesSlice';
import userReducer from './slices/userSlice';
import savedRecipeReducer from './slices/savedRecipesSlice';

export const store = configureStore({
    reducer: {
        recipes: recipesReducer,
        user: userReducer,
        savedRecipes: savedRecipeReducer
    }
});