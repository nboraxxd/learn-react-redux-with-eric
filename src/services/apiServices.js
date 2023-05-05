import axiosCustomize from '../utils/axiosCustomize'

async function postCreateNewUser(username, email, password, role, image) {
  const newUser = new FormData()
  newUser.append('username', username)
  newUser.append('email', email)
  newUser.append('password', password)
  newUser.append('role', role)
  newUser.append('userImage', image)

  return await axiosCustomize.post('api/v1/participant', newUser)
}

async function getAllUser() {
  return await axiosCustomize.get('api/v1/participant/all')
}

export { postCreateNewUser, getAllUser }
