import axiosCustomize from '../utils/axiosCustomize'

async function getAllUser() {
  return await axiosCustomize.get('api/v1/participant/all')
}

async function postCreateNewUser(username, email, password, role, image) {
  const newUser = new FormData()
  newUser.append('username', username)
  newUser.append('email', email)
  newUser.append('password', password)
  newUser.append('role', role)
  newUser.append('userImage', image)

  return await axiosCustomize.post('api/v1/participant', newUser)
}

async function putUpdateUser(id, username, role, image) {
  const userUpdate = new FormData()
  userUpdate.append('id', id)
  userUpdate.append('username', username)
  userUpdate.append('role', role)
  userUpdate.append('userImage', image)

  return await axiosCustomize.put('api/v1/participant', userUpdate)
}

async function deleteUser(id) {
  return await axiosCustomize.delete('api/v1/participant', { data: { id } })
}

export { getAllUser, postCreateNewUser, putUpdateUser, deleteUser }
