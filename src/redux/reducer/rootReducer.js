import { combineReducers } from 'redux'
import counterReducer from './counterReducer'
import quizReducer from './quizReducer'
import userReducer from './userReducer'

const rootReducer = combineReducers({
  counter: counterReducer,
  user: userReducer,
  quiz: quizReducer,
})

export default rootReducer
