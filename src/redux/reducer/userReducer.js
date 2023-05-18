import { FETCH_USER_LOGIN_SUCCESS } from '../action/userAction'

const INITIAL_STATE = {
  account: {
    access_token: '',
    refresh_token: '',
    email: '',
    image: '',
    role: '',
  },
  isAuthenticated: false,
}

export default function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_USER_LOGIN_SUCCESS:
      return {
        ...state,
        account: {
          ...state.account,
          access_token: action?.payload?.access_token,
          refresh_token: action?.payload?.refresh_token,
          email: action?.payload?.email,
          image: action?.payload?.image,
          role: action?.payload?.role,
        },
        isAuthenticated: true,
      }

    default:
      return state
  }
}
