import PropTypes from 'prop-types'
import { Link, makeStyles } from '@material-ui/core'
import { Link as RouterLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useUnwrapAsyncThunk } from '../../../hooks/useUnwrapAsyncThunk'

import { selectIsAuthenticatedUser } from '../../../redux/modules/user/user.selectors'
import { signOut } from '../../../redux/modules/user/user.actions'

const useStyles = makeStyles((theme) => ({
  link: {
    margin: '0 7px',
    fontSize: theme.typography.htmlFontSize
  }
}))

const HeaderNavList = ({ routeLinks }) => {
  const classes = useStyles()
  const dispatch = useUnwrapAsyncThunk()
  const isAuthenticatedUser = useSelector(selectIsAuthenticatedUser)

  async function onLogOutClick() {
    try {
      await dispatch(signOut())
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      {
        routeLinks.map((linkData) => {
          if (linkData.key === 'login') {
            return (
              isAuthenticatedUser ?
                <Link
                  key={linkData.key}
                  className={classes.link}
                  color='inherit'
                  component='button'
                  onClick={onLogOutClick}
                >
                  Log Out
                </Link>
                :
                <Link
                  key={linkData.key}
                  className={classes.link}
                  color='inherit'
                  component={RouterLink}
                  to={linkData.path}
                >
                  {linkData.text}
                </Link>
            )
          }

          return (
            <Link
              key={linkData.key}
              className={classes.link}
              color='inherit'
              component={RouterLink}
              to={linkData.path}
            >
              {linkData.text}
            </Link>
          )
        })
      }
    </>
  )
}

HeaderNavList.propTypes = {
  routeLinks: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    text: PropTypes.string,
    path: PropTypes.string
  })).isRequired
}

export default HeaderNavList
