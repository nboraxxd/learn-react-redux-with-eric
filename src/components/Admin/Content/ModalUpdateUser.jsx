import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import './ModalUpdateUser.scss'
import { MdImageSearch } from 'react-icons/md'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { putUpdateUser } from '../../../services/apiServices'
import _ from 'lodash'

const ModalUpdateUser = ({ show, setShow, fetchUserList, userUpdate, setUserUpdate }) => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('')
  const [image, setImage] = useState(null)
  const [imageReview, setImageReivew] = useState(null)
  const imageRef = useRef()

  useEffect(() => {
    if (_.isEmpty(userUpdate)) return

    setUsername(userUpdate.username)
    setEmail(userUpdate.email)
    setRole(userUpdate.role)
    setImage(userUpdate.image)
    userUpdate.image && setImageReivew(`data:image/jpeg;base64,${userUpdate.image}`)
  }, [userUpdate])

  function handleClose() {
    setShow(false)
    setUserUpdate({})
    setUsername('')
    setEmail('')
    setPassword('')
    setRole('')
    setImage(null)
    setImageReivew(null)
  }

  function validateEmail(email) {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
  }

  function handleClickDeleteImgIcon() {
    imageRef.current.value = null
    setImage(null)
    setImageReivew(null)
  }

  function handleChooseAnImage(e) {
    const objectImg = e.target.files[0]

    if (e.target?.files[0]) {
      setImage(objectImg)
      setImageReivew(URL.createObjectURL(objectImg))
    }
  }

  async function handleSubmitUpdateUser() {
    // validate
    const isValidateEmail = validateEmail(email)

    !isValidateEmail && toast.error('Please check your email')
    if (role !== 'ADMIN' && role !== 'USER')
      toast.error('Please select one of the two roles in the above select')

    if (!isValidateEmail || !role) return

    // submit update user
    const dataResponse = await putUpdateUser(userUpdate.id, username, role, image)

    if (dataResponse.EC === 0) {
      toast.success(dataResponse?.EM)
      handleClose()
      await fetchUserList()
    } else {
      toast.error(dataResponse?.EM)
    }

    return dataResponse
  }

  return (
    <>
      <Modal show={show} size="lg" onHide={handleClose} backdrop="static" className="modal">
        {/* Header modal */}
        <Modal.Header closeButton>
          <Modal.Title>Update user</Modal.Title>
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

            {/* Choose an image */}
            <div className="col-md-12">
              <label htmlFor="inputImage" className="form-label modal-label btn btn-primary">
                <MdImageSearch style={{ fontSize: '24px' }} />
                Choose an image
              </label>
              <input
                type="file"
                accept="image/png, image/jpeg, image/gif, image/svg+xml"
                id="inputImage"
                ref={imageRef}
                hidden
                onChange={(e) => handleChooseAnImage(e)}
              />
            </div>
            <div className="col-md-12 modal-preview">
              {imageReview ? (
                <>
                  <img src={imageReview} alt="" className="modal-preview-img" />
                  <RiDeleteBin5Line
                    className="modal-preview-delete"
                    onClick={handleClickDeleteImgIcon}
                  />
                </>
              ) : (
                <label htmlFor="inputImage">Chose an image...</label>
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

          {/* Update button */}
          <Button variant="primary" onClick={handleSubmitUpdateUser}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ModalUpdateUser
