import axios from 'axios'
import axiosCustomize from '../utils/axiosCustomize'

async function getAllUser() {
  return await axiosCustomize.get('api/v1/participant/all')
}

async function getAllUserWithPaginate(page, limit) {
  return await axiosCustomize.get(`api/v1/participant?page=${page}&limit=${limit}`)
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

async function postLogin(email, password) {
  return await axiosCustomize.post('api/v1/login', { email, password, delay: 1000 })
}

async function postSignUp(username, email, password) {
  return await axiosCustomize.post('api/v1/register', { username, email, password })
}

function getQuizByUser() {
  return axiosCustomize.get('/api/v1/quiz-by-participant')
}

function getDataQuizById(id) {
  return axiosCustomize.get(`/api/v1/questions-by-quiz?quizId=${id}`)
}

function postSubmitQuiz(answersQuiz) {
  return axiosCustomize.post('/api/v1/quiz-submit', answersQuiz)
}

function postAddNewQuiz({ description, name, difficulty, quizImage }) {
  const newQuiz = new FormData()
  newQuiz.append('description', description)
  newQuiz.append('name', name)
  newQuiz.append('difficulty', difficulty)
  newQuiz.append('quizImage', quizImage)

  return axiosCustomize.post('/api/v1/quiz', newQuiz)
}

export {
  getAllUser,
  getAllUserWithPaginate,
  postCreateNewUser,
  putUpdateUser,
  deleteUser,
  postLogin,
  postSignUp,
  getQuizByUser,
  getDataQuizById,
  postSubmitQuiz,
  postAddNewQuiz,
}
