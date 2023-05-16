import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'
import './SignUp.scss'
import { postSignUp } from '../../services/apiServices'
import { toast } from 'react-toastify'

const SignUp = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isShowPassword, setIsShowPassWord] = useState(false)

  const navigate = useNavigate()

  function validateEmail(email) {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
  }

  async function handleOnClickSubmitSignUpBtn(e) {
    e.preventDefault()

    // validate
    const isValidateEmail = validateEmail(email)

    if (!isValidateEmail) toast.error('Please check your email')
    if (!password) toast.error('Please check your password')

    if (!validateEmail || !password) return

    const response = await postSignUp(username, email, password)

    if (response.EC === 0) toast.success(response.EM)
    if (response.EC !== 0) toast.error(response.EM)

    setTimeout(() => {
      navigate('/log-in')
    }, 4000)
  }

  return (
    <div className="signup">
      {/* navigate log in page */}
      <div className="login-link">
        <span className="login-link__text">Already have an account?</span>
        <button className="login-link__btn" onClick={() => navigate('/log-in')}>
          Log in
        </button>
      </div>

      {/* Signup content */}
      <div className="signup-content">
        <h1 className="signup-content__brand col-3">PRO QUIZZZ</h1>
        <h2 className="signup-content__title col-5">
          Get better data with conversational forms, surveys, quizzes & more.
        </h2>
        {/* Signup form */}
        <form className="signup-content__form col-3">
          {/* Username input */}
          <div className="signup-username">
            <label htmlFor="signupUsername" className="signup-username__label">
              Username
            </label>
            <input
              type="username"
              id="signupUsername"
              className="signup-username__input form-control"
              placeholder="brucewayne"
              autoComplete="on"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          {/* Email input */}
          <div className="signup-email">
            <label htmlFor="signupEmail" className="signup-email__label">
              Email address (*)
            </label>
            <input
              type="email"
              id="signupEmail"
              className="signup-email__input form-control"
              placeholder="bruce@wayne.com"
              autoComplete="on"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {/* Password input */}
          <div className="signup-password">
            <label htmlFor="signupPassword" className="signup-password__label">
              Password (*)
            </label>
            <div className="signup-password__container">
              <input
                type={isShowPassword ? 'text' : 'password'}
                id="signupPassword"
                className="signup-password__input form-control"
                placeholder="At least 8 characters"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {isShowPassword ? (
                <FaRegEyeSlash
                  className="signup-password__icon"
                  onClick={() => setIsShowPassWord(!isShowPassword)}
                />
              ) : (
                <FaRegEye
                  className="signup-password__icon"
                  onClick={() => setIsShowPassWord(!isShowPassword)}
                />
              )}
            </div>
          </div>
          {/* Sign up button */}
          <button type="submit" className="signup-btn" onClick={handleOnClickSubmitSignUpBtn}>
            Sign up with email
          </button>
          <div className="signup-back" onClick={() => navigate('/')}>
            <span>Go to homepage</span>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUp
