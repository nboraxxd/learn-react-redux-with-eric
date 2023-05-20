import { FETCH_CURRENT_QUIZ } from '../action/quizAction'

const INITIAL_STATE = []

export default function quizReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_CURRENT_QUIZ:
      return [...action.payload]

    default:
      return state
  }
}
