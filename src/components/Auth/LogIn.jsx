import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { postLogin } from '../../services/apiServices'
import './LogIn.scss'

const LogIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  function validateEmail(email) {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
  }

  async function handleOnClickSubmitLogInBtn(e) {
    e.preventDefault()

    // validate
    const isValidateEmail = validateEmail(email)

    if (!isValidateEmail) toast.error('Please check your email')
    if (!password) toast.error('Please check your password')
    if (!isValidateEmail || !password) return

    const response = await postLogin(email, password)

    if (response.EC === 0) toast.success(response.EM)
    if (response.EC !== 0) toast.error(response.EM)

    setTimeout(() => {
      navigate('/')
    }, 4000)
  }

  return (
    <div className="login">
      {/* navigate sign up page */}
      <div className="signup-link">
        <span className="signup-link__text">Don't have an account yet?</span>
        <button className="signup-link__btn" onClick={() => navigate('/sign-up')}>
          Sign up
        </button>
      </div>

      {/* Login form */}
      <div className="login-content">
        <div className="login-content__brand col-3">PRO QUIZZZ</div>
        <h2 className="login-content__title col-3">Hello, who's this?</h2>
        <form className="login-content__form col-3">
          <div className="login-email">
            <label htmlFor="loginEmail" className="login-email__label">
              Email address
            </label>
            <input
              type="email"
              id="loginEmail"
              className="login-email__input form-control"
              placeholder="bruce@wayne.com"
              autoComplete="on"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="login-password">
            <label htmlFor="loginPassword" className="login-password__label">
              Password
            </label>
            <input
              type="password"
              id="loginPassword"
              className="login-password__input form-control"
              placeholder="At least 8 characters"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="login-forgot">
            <a href="#!">Forgot password?</a>
          </div>
          <button type="submit" className="login-btn" onClick={handleOnClickSubmitLogInBtn}>
            Log in to Pro Quizzz
          </button>
          <div className="login-back" onClick={() => navigate('/')}>
            <span>Go to homepage</span>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LogIn
