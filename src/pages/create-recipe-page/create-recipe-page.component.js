import { Grid, makeStyles, Typography } from '@material-ui/core'
import RecipeInfoForm from '../../components/recipe-info-form/recipe-info-form.component'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column'
  }
}))

const CreateRecipePage = () => {
  const classes = useStyles()

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <Typography component='h1' variant='h5' align='center' gutterBottom>
          Create recipe
        </Typography>
      </Grid>


      <Grid item xs={12}>
        <RecipeInfoForm />
      </Grid>
    </Grid>
  )
}

export default CreateRecipePage
