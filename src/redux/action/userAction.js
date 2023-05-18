export const FETCH_USER_LOGIN_SUCCESS = 'FETCH_USER_LOGIN_SUCCESS'

export const userLogin = (userLoginData) => {
  return {
    type: FETCH_USER_LOGIN_SUCCESS,
    payload: userLoginData,
  }
}
