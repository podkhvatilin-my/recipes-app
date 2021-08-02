import { generatePath, Redirect, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ROUTES } from '../../constants/routes'

import { selectCurrentRecipe } from '../../redux/modules/recipes/recipes.selectors'
import { selectCurrentUserId } from '../../redux/modules/user/user.selectors'

const withRecipeAuthorRoute = (WrappedComponent) => () => {
  const { id } = useParams()
  const recipeDetails = useSelector(selectCurrentRecipe)
  const currentUserId = useSelector(selectCurrentUserId)

  if (recipeDetails) {
    const isRecipeAuthor = currentUserId === recipeDetails?.author
    return isRecipeAuthor
      ? <WrappedComponent />
      : <Redirect to={generatePath(ROUTES.RECIPES_ROUTES.DETAIL_RECIPE_PAGE, { id })} />
  }

  return <Redirect to={generatePath(ROUTES.RECIPES_ROUTES.DETAIL_RECIPE_PAGE, { id })} />
}

export default withRecipeAuthorRoute