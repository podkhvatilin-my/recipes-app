import { combineReducers } from 'redux'
import user from './modules/user/user.reducer'

const rootReducer = combineReducers({
  user
})

export default rootReducer
