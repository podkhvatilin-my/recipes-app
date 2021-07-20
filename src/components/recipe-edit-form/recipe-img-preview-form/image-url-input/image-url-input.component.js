import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { TextField } from '@material-ui/core'
import { REACT_HOOK_FORM_CONTROLLER_PROPS } from '../../../../constants/propTypes'

import { selectActionRecipeProcess } from '../../../../redux/recipes/recipes.selectors'

const ImageUrlInput = (props) => {
  const {
    field,
    fieldState,
    formState: {
      isValidating
    },
    setValidUrl
  } = props

  const isActionRecipeProcess = useSelector(selectActionRecipeProcess)

  useEffect(() => {
    if (isValidating) return

    const { invalid } = fieldState

    if (invalid) return

    const { value } = field

    setValidUrl(value)

    // eslint-disable-next-line
  }, [isValidating])

  return (
    <TextField
      label='Image preview URL'
      type='text'
      variant='outlined'
      margin='dense'
      fullWidth
      error={!!fieldState.error}
      helperText={!!fieldState.error && fieldState.error.message}
      disabled={isActionRecipeProcess}
      {...field}
    />
  )
}

ImageUrlInput.propTypes = {
  ...REACT_HOOK_FORM_CONTROLLER_PROPS,
  setValidUrl: PropTypes.func.isRequired
}

export default ImageUrlInput
