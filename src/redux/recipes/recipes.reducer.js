import RecipesActionsTypes from './recipes.actions.types'
import { removeRecipe, updateRecipe } from './recipes.utils'

const INITIAL_STATE = {
  recipesList: [],
  error: null,
  isFetchingRecipeListProcess: false,
  isCreateRecipeProcess: false,
  isRecipeCreatedStatus: false,
  isRemoveRecipeProcess: false,
  isRecipeRemovedStatus: false,
  isUpdateRecipeProcess: false,
  isRecipeUpdatedStatus: false
}

const recipeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RecipesActionsTypes.CREATE_RECIPE_START:
      return {
        ...state,
        error: null,
        isCreateRecipeProcess: true,
        isRecipeCreatedStatus: false
      }
    case RecipesActionsTypes.CREATE_RECIPE_SUCCESS:
      return {
        ...state,
        recipesList: [action.payload, ...state.recipesList],
        error: null,
        isCreateRecipeProcess: false,
        isRecipeCreatedStatus: true
      }
    case RecipesActionsTypes.CREATE_RECIPE_FAILURE:
      return {
        ...state,
        error: action.payload,
        isCreateRecipeProcess: false
      }
    case RecipesActionsTypes.CHANGE_RECIPE_CREATED_STATUS:
      return {
        ...state,
        isRecipeUpdatedStatus: !!action.payload
      }
    case RecipesActionsTypes.CHANGE_RECIPE_REMOVED_STATUS:
      return {
        ...state,
        isRecipeRemovedStatus: !!action.payload
      }
    case RecipesActionsTypes.CHANGE_RECIPE_UPDATED_STATUS:
      return {
        ...state,
        isRecipeUpdatedStatus: !!action.payload
      }
    case RecipesActionsTypes.FETCH_RECIPE_LIST_START:
      return {
        ...state,
        error: null,
        isFetchingRecipeListProcess: true
      }
    case RecipesActionsTypes.FETCH_RECIPE_LIST_SUCCESS:
      return {
        ...state,
        recipesList: action.payload,
        isFetchingRecipeListProcess: false
      }
    case RecipesActionsTypes.FETCH_RECIPE_LIST_FAILURE:
      return {
        ...state,
        error: action.payload,
        isFetchingRecipeListProcess: false
      }
    case RecipesActionsTypes.REMOVE_RECIPE_START:
      return {
        ...state,
        error: null,
        isRemoveRecipeProcess: true,
        isRecipeRemovedStatus: false
      }
    case RecipesActionsTypes.REMOVE_RECIPE_SUCCESS:
      return {
        ...state,
        recipesList: removeRecipe(state.recipesList, action.payload),
        isRemoveRecipeProcess: false,
        isRecipeRemovedStatus: true
      }
    case RecipesActionsTypes.REMOVE_RECIPE_FAILURE:
      return {
        ...state,
        error: action.payload,
        isRemoveRecipeProcess: false
      }
    case RecipesActionsTypes.UPDATE_RECIPE_START:
      return {
        ...state,
        error: null,
        isUpdateRecipeProcess: true,
        isRecipeUpdatedStatus: false
      }
    case RecipesActionsTypes.UPDATE_RECIPE_SUCCESS:
      return {
        ...state,
        recipesList: updateRecipe(state.recipesList, action.payload),
        isUpdateRecipeProcess: false,
        isRecipeUpdatedStatus: true
      }
    case RecipesActionsTypes.UPDATE_RECIPE_FAILURE:
      return {
        ...state,
        error: action.payload,
        isUpdateRecipeProcess: false
      }
    default:
      return state
  }
}

export default recipeReducer
