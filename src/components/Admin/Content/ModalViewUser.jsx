import { useEffect, useRef, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import './ModalViewUser.scss'
import _ from 'lodash'

const ModalViewUser = ({ show, setShow, userView, setUserView }) => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('')
  const [image, setImage] = useState(null)
  const [imageReview, setImageReivew] = useState(null)

  useEffect(() => {
    if (_.isEmpty(userView)) return

    setUsername(userView.username)
    setEmail(userView.email)
    setRole(userView.role)
    setImage(userView.image)
    userView.image && setImageReivew(`data:image/jpeg;base64,${userView.image}`)
  }, [userView])

  function handleClose() {
    setShow(false)
    setUserView({})
    setUsername('')
    setEmail('')
    setPassword('')
    setRole('')
    setImage(null)
    setImageReivew(null)
  }

  return (
    <>
      <Modal show={show} size="lg" onHide={handleClose} backdrop="static" className="modal">
        {/* Header modal */}
        <Modal.Header closeButton>
          <Modal.Title>User information modal</Modal.Title>
        </Modal.Header>

        {/* Main modal */}
        <Modal.Body>
          {/* Form add new user */}
          <form className="row g-3">
            {/* Username */}
            <div className="col-md-6">
              <label htmlFor="userName" className="form-label">
                Username
              </label>
              <input
                disabled
                type="text"
                className="form-control"
                id="userName"
                placeholder="Enter your username"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            {/* Email */}
            <div className="col-md-6">
              <label htmlFor="inputEmail" className="form-label">
                Email
              </label>
              <input
                disabled
                type="email"
                className="form-control"
                id="inputEmail"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password */}
            <div className="col-md-6">
              <label htmlFor="inputPassword" className="form-label">
                Password
              </label>
              <input
                disabled
                type="password"
                className="form-control"
                id="inputPassword"
                placeholder="Feature not supported"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Role */}
            <div className="col-md-4">
              <label htmlFor="inputState" className="form-label">
                Role
              </label>
              <select
                disabled
                id="inputState"
                className="form-select"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                style={!role ? { color: '#6D757D' } : { color: '#000' }}
              >
                <option value="" hidden>
                  Choose...
                </option>
                <option value="USER" style={{ color: '#000' }}>
                  User
                </option>
                <option value="ADMIN" style={{ color: '#000' }}>
                  Admin
                </option>
              </select>
            </div>

            {/* user image */}
            <div className="col-md-12 modal-preview">
              {imageReview ? (
                <>
                  <img src={imageReview} alt="" className="modal-preview-img" />
                </>
              ) : (
                <p>This user has no image</p>
              )}
            </div>
          </form>
        </Modal.Body>

        {/* Footer modal */}
        <Modal.Footer>
          {/* Close button */}
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ModalViewUser
