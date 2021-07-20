import { createSelector } from 'reselect'
import memoize from 'lodash.memoize'

const selectRecipes = (state) => state.recipes

export const selectCreateRecipeProcess = createSelector(
  [selectRecipes],
  (recipes) => recipes.isCreateRecipeProcess
)

export const selectRecipeCreatedStatus = createSelector(
  [selectRecipes],
  (recipes) => recipes.isRecipeCreatedStatus
)

export const selectRecipesList = createSelector(
  [selectRecipes],
  (recipes) => recipes.recipesList
)

export const selectFetchingRecipeListProcess = createSelector(
  [selectRecipes],
  (recipes) => recipes.isFetchingRecipeListProcess
)

export const selectRecipeItemById = memoize((recipeItemId) =>
  createSelector(
    [selectRecipesList],
    (recipesList) => recipesList.find((recipeItem) => recipeItem.id === recipeItemId)
  ))

export const selectRemoveRecipeProcess = createSelector(
  [selectRecipes],
  (recipes) => recipes.isRemoveRecipeProcess
)

export const selectRecipeRemovedStatus = createSelector(
  [selectRecipes],
  (recipes) => recipes.isRecipeRemovedStatus
)

export const selectUpdateRecipeProcess = createSelector(
  [selectRecipes],
  (recipes) => recipes.isUpdateRecipeProcess
)

export const selectRecipeUpdatedStatus = createSelector(
  [selectRecipes],
  (recipes) => recipes.isRecipeUpdatedStatus
)
