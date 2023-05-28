import { useRef, useState } from 'react'
import axios from 'axios'
import Select from 'react-select'
import { toast } from 'react-toastify'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import './ModalAddNewQuiz.scss'
import { MdImageSearch } from 'react-icons/md'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { postAddNewQuiz, postCreateNewUser } from '../../../services/apiServices'

const ModalAddNewQuiz = ({ show, setShow, fetchQuizList }) => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [difficulty, setDifficulty] = useState('')
  const [image, setImage] = useState(null)
  const [imageReview, setImageReview] = useState(null)

  const options = [
    { value: 'EASY', label: 'Easy' },
    { value: 'MEDIUM', label: 'Medium' },
    { value: 'HARD', label: 'Hard' },
  ]

  function handleClose() {
    setShow(false)
    setName('')
    setDescription('')
    setDifficulty('')
    setImage(null)
    setImageReview(null)
  }

  function handleChooseAnImage(event) {
    const file = event.target.files[0]

    if (file) {
      setImage(file)
      setImageReview(URL.createObjectURL(file))
    }
  }

  function handleOnClickDeleteImgIcon() {
    setImage(null)
    setImageReview(null)
  }

  async function handleSubmitCreateUser() {
    !name && toast.error('Please check name input')
    !description && toast.error('Please check description input')
    !difficulty && toast.error('Please check difficulty select')
    !image && toast.error('Please add image of quiz')
    if (!name || !description || !difficulty || !image) return

    const newQuiz = {
      description,
      name,
      difficulty: difficulty?.value,
      quizImage: image,
    }

    const response = await postAddNewQuiz(newQuiz)
    if (response.EC === 0) {
      toast.success(response.EM)
      handleClose()
      await fetchQuizList()
    } else {
      toast.error(response.EM)
    }
  }

  return (
    <>
      <Modal show={show} size="lg" onHide={handleClose} backdrop="static" className="modal">
        {/* Header modal */}
        <Modal.Header closeButton>
          <Modal.Title>Add new quiz</Modal.Title>
        </Modal.Header>

        {/* Main modal */}
        <Modal.Body>
          {/* Form add new quiz */}
          <form className="row g-2">
            {/* Name quiz */}
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="nameQuizInput"
                placeholder="Name Quizzz"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
              <label htmlFor="nameQuizInput">Name quiz</label>
            </div>

            {/* Description quizzz */}
            <div className="form-floating">
              <textarea
                type="text"
                className="form-control"
                id="descriptionQuizInput"
                placeholder="Description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
              <label htmlFor="descriptionQuizInput">Description</label>
            </div>

            {/* Select quizzz */}
            <div className="form-floating">
              <Select
                value={difficulty}
                onChange={setDifficulty}
                options={options}
                placeholder={'Difficulty quiz'}
                isSearchable={false}
                styles={{
                  control: (baseStyles) => ({
                    ...baseStyles,
                    height: '48px',
                  }),
                }}
              />
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
                hidden
                onChange={(e) => handleChooseAnImage(e)}
              />
            </div>
            <div className="col-md-12 modal-preview">
              {imageReview ? (
                <img src={imageReview} alt="" className="modal-preview-img" />
              ) : (
                <label htmlFor="inputImage">Choose an image...</label>
              )}
              <RiDeleteBin5Line
                className="modal-preview-delete"
                onClick={handleOnClickDeleteImgIcon}
              />
            </div>
          </form>
        </Modal.Body>

        {/* Footer modal */}
        <Modal.Footer>
          {/* Close button */}
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>

          {/* Create button */}
          <Button variant="primary" onClick={handleSubmitCreateUser}>
            Create quiz
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ModalAddNewQuiz
