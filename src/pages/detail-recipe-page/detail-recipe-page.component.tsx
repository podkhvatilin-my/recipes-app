import { FC, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useComponentLoading, useUnwrapAsyncThunk } from '../../hooks'
import { useParams } from 'react-router-dom'

import { CircularProgress, Grid, makeStyles, Typography } from '@material-ui/core'
import { RecipeInfoImagePreview } from '../../components/recipes/recipe-info-image-preview/recipe-info-image-preview.component'
import { RecipeInfoManageMenu } from '../../components/recipes/recipe-info-manage-menu/recipe-info-manage-menu.component'
import { RecipeInfoIngredientsList } from '../../components/recipes/recipe-info-ingredients-list/recipe-info-ingredients-list.component'

import { selectCurrentRecipe } from '../../redux/modules/recipes/recipes.selectors'
import { selectCurrentUserId } from '../../redux/modules/user/user.selectors'
import { getRecipe } from '../../redux/modules/recipes/recipes.actions'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4)
  },
  titleText: {
    wordBreak: 'break-word'
  },
  descriptionBlock: {
    marginBottom: theme.spacing(3)
  },
  descriptionText: {
    wordBreak: 'break-word'
  },
  manageRecipeBtnWrap: {
    marginBottom: theme.spacing(2)
  },
  loader: {
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%'
  }
}))

const DetailRecipePage: FC = () => {
  const classes = useStyles()
  const { id } = useParams<{ id?: string }>()
  const dispatch = useUnwrapAsyncThunk()

  const {
    loading,
    startLoading,
    stopLoading,
    onLoadingError
  } = useComponentLoading()

  const recipeDetails = useSelector(selectCurrentRecipe)
  const currentUserId = useSelector(selectCurrentUserId)


  useEffect(() => {
    const _getRecipeData = async () => {
      if (!id) return

      try {
        startLoading()

        await dispatch(getRecipe(id))

        stopLoading()
      } catch (err) {
        onLoadingError(err)
      }
    }

    _getRecipeData()
    // eslint-disable-next-line
  }, [])

  if (loading) {
    return (
      <div className={classes.loader}>
        <CircularProgress />
      </div>
    )
  }

  if (!recipeDetails) {
    return (
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <Typography component='h1' variant='h5' align='center' gutterBottom>
            Not found
          </Typography>
        </Grid>
      </Grid>
    )
  }

  const { name, description, imageUrl, ingredients, author } = recipeDetails
  const isAllowManageRecipe = currentUserId === author

  return (
    <Grid container className={classes.root}>
      {
        (id && isAllowManageRecipe) &&
        <Grid item xs={12}>
          <div className={classes.manageRecipeBtnWrap}>
            <RecipeInfoManageMenu id={id} />
          </div>
        </Grid>
      }

      <Grid item xs={12}>
        <RecipeInfoImagePreview imageUrl={imageUrl} />
      </Grid>

      <Grid item xs={12}>
        <Typography
          className={classes.titleText}
          component='h1'
          variant='h5'
          align='center'
          gutterBottom
        >
          {name}
        </Typography>
      </Grid>

      <Grid className={classes.descriptionBlock} item xs={12}>
        <Typography
          className={classes.descriptionText}
          component='p'
          variant='body1'
          gutterBottom
        >
          {description}
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography component='h3' variant='overline' align='center'>
          Ingredients list
        </Typography>

        <RecipeInfoIngredientsList ingredients={ingredients} />
      </Grid>
    </Grid>
  )
}

export default DetailRecipePage
