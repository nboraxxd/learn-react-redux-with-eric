import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import Select from 'react-select'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import './ModalUpdateQuiz.scss'
import { MdImageSearch } from 'react-icons/md'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { putUpdateQuiz } from '../../../services/apiServices'
import _ from 'lodash'

const ModalUpdateQuiz = (props) => {
  const { show, setShow, quizUpdate, setQuizUpdate, fetchQuizList } = props

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [difficulty, setDifficulty] = useState('')
  const [selectedOption, setSelectedOption] = useState('')
  const [image, setImage] = useState(null)
  const [imageReview, setImageReview] = useState(null)
  // const imageRef = useRef()

  const options = [
    { value: 'EASY', label: 'Easy' },
    { value: 'MEDIUM', label: 'Medium' },
    { value: 'HARD', label: 'Hard' },
  ]

  function handleClose() {
    setShow(false)
    setQuizUpdate({})
    setName('')
    setDescription('')
    setDifficulty('')
    setImage(null)
    setImageReview(null)
  }

  function handleOnChangeDifficulty(e) {
    setDifficulty(e.value)
  }

  function handleClickDeleteImgIcon() {
    // imageRef.current.value = null
    setImage(null)
    setImageReview(null)
  }

  function handleChooseAnImage(e) {
    const objectImg = e.target.files[0]

    if (e.target?.files[0]) {
      setImage(objectImg)
      setImageReview(URL.createObjectURL(objectImg))
    }
  }

  async function handleSubmitUpdateUser() {
    !name && toast.error('Please check name input')
    !description && toast.error('Please check description input')
    !difficulty && toast.error('Please check difficulty select')
    !image && toast.error('Please add image of quiz')
    if (!name || !description || !difficulty || !image) return

    // submit update quiz
    const updateQuiz = {
      ...quizUpdate,
      id: quizUpdate.id,
      name,
      description,
      difficulty,
      quizImage: image,
    }

    const dataResponse = await putUpdateQuiz(updateQuiz)

    if (dataResponse.EC === 0) {
      toast.success(dataResponse?.EM)
      handleClose()
      await fetchQuizList()
    } else {
      toast.error(dataResponse?.EM)
    }

    return dataResponse
  }

  useEffect(() => {
    if (_.isEmpty(quizUpdate)) return

    setName(quizUpdate.name)
    setDescription(quizUpdate.description)
    setDifficulty(quizUpdate.difficulty)
    setImage(quizUpdate.image)
    quizUpdate.image && setImageReview(`data:image/jpeg;base64,${quizUpdate.image}`)
  }, [quizUpdate])

  return (
    <>
      <Modal show={show} size="lg" onHide={handleClose} backdrop="static" className="modal">
        {/* Header modal */}
        <Modal.Header closeButton>
          <Modal.Title>Update quiz</Modal.Title>
        </Modal.Header>

        {/* Main modal */}
        <Modal.Body>
          {/* Form add new user */}
          <form className="row g-2">
            {/* name */}
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
                value={options.filter((option) => option.value === difficulty)}
                onChange={handleOnChangeDifficulty}
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
                // ref={imageRef}
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

export default ModalUpdateQuiz
