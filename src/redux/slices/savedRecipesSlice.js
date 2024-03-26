import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    recipesIds: [], // only recipes Ids
    savedRecipes: [] // full recipes
};

export const savedRecipesSlice = createSlice({
    name: 'savedRecipes',
    initialState,
    reducers: {
        setSavedRecipesIdsList: (state, action) => {
            state.recipesIds = action.payload
        },
        addNewRecipeInIdsList: (state, action) => {
            state.recipesIds = [...state.recipesIds, action.payload]
        },
        setSavedRecipes: (state, action) => {
            state.savedRecipes = action.payload
        },
        removeSavedRecipe: (state, action) => {
            state.savedRecipes = state.savedRecipes.filter(item => item._id !== action.payload)
            state.recipesIds = state.recipesIds.filter(id => id !== action.payload)
        }
    }
});

export const { setSavedRecipesIdsList, addNewRecipeInIdsList, setSavedRecipes, removeSavedRecipe } = savedRecipesSlice.actions;

export default savedRecipesSlice.reducer; 