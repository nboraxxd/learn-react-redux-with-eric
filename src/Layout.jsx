import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import App from './App'
import Admin from './components/Admin/Admin'
import HomePage from './components/Home/HomePage'
import ManageUser from './components/Admin/Content/ManageUser'
import DashBoard from './components/Admin/Content/DashBoard'
import LogIn from './components/Auth/LogIn'
import SignUp from './components/Auth/SignUp'
import QuizList from './components/User/QuizList'
import DetailQuiz from './components/User/DetailQuiz'
import NotFound from './components/Home/NotFound'

const Layout = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="users" element={<QuizList />} />
        </Route>

        <Route path="/users/quiz/:id" element={<DetailQuiz />} />

        <Route path="admins" element={<Admin />}>
          <Route index element={<DashBoard />} />
          <Route path="manage-users" element={<ManageUser />} />
        </Route>

        <Route path="log-in" element={<LogIn />} />
        <Route path="sign-up" element={<SignUp />} />

        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* pop-up toastify */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  )
}

export default Layout
