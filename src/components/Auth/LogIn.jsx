import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { userLogin } from '../../redux/action/userAction'
import { postLogin } from '../../services/apiServices'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import './LogIn.scss'
import { isUserLogin } from '../../redux/selector/userselector'

const LogIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isLogged = useSelector(isUserLogin)

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

    // loading
    setIsLoading(true)

    // submit API
    const response = await postLogin(email, password)

    if (response.EC === 0) {
      toast.success(response.EM)
      dispatch(userLogin(response?.DT))

      setIsLoading(false)
      navigate('/users')
    }
    if (response.EC !== 0) {
      toast.error(response.EM)
      setIsLoading(false)
    }
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
          <button
            type="submit"
            className="login-btn"
            onClick={handleOnClickSubmitLogInBtn}
            disabled={isLoading}
          >
            {!isLoading ? (
              'Log in to Pro Quizzz'
            ) : (
              <AiOutlineLoading3Quarters
                className="login-btn__spin"
                color="#fff"
                fontSize="20px"
                style={{ margin: '0 auto' }}
              />
            )}
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
