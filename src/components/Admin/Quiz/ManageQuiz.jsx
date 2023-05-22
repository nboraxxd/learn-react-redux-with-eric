import React, { useState } from 'react'
import Select from 'react-select'
import { MdImageSearch } from 'react-icons/md'
import { RiDeleteBin5Line } from 'react-icons/ri'
import './ManageQuiz.scss'
import { postAddNewQuiz } from '../../../services/apiServices'
import { toast } from 'react-toastify'

const options = [
  { value: 'EASY', label: 'Easy' },
  { value: 'MEDIUM', label: 'Medium' },
  { value: 'HARD', label: 'Hard' },
]

const ManageQuiz = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [difficulty, setDifficulty] = useState('')
  const [image, setImage] = useState(null)
  const [imageReview, setImageReview] = useState(null)

  function handleOnChangeImage(event) {
    const file = event.target.files[0]

    if (file) {
      setImage(file)
      setImageReview(URL.createObjectURL(file))
    }
  }

  function handleOnClickDeleteImageBtn() {
    setImage(null)
    setImageReview(null)
  }

  async function handleOnClickAddBtn() {
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
      setName('')
      setDescription('')
      setDifficulty('')
      setImage(null)
      setImageReview(null)
    } else {
      toast.error(response.EM)
    }
  }

  return (
    <div className="manage-quiz container">
      <h1 className="manage-quiz__title">Manage quizzes</h1>
      <br />
      {/* Add new quizzz */}
      <div className="manage-quiz__new">
        <fieldset className="border rounded-3 p-3">
          <legend className="float-none w-auto px-3">Add Quizzz</legend>
          {/* Name quizzz */}
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="Name Quizzz"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <label htmlFor="floatingInput">Name Quizzz</label>
          </div>

          {/* Description quizzz */}
          <div className="form-floating mb-3">
            <textarea
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="Description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
            <label htmlFor="floatingInput">Description</label>
          </div>

          {/* Select quizzz */}
          <div className="form-floating mb-3">
            <Select
              value={difficulty}
              onChange={setDifficulty}
              options={options}
              placeholder={'Quizzz style'}
              styles={{
                control: (baseStyles) => ({
                  ...baseStyles,
                  height: '48px',
                }),
              }}
            />
          </div>

          {/* Image quizzz */}
          <div>
            {/* Choose image button */}
            <label htmlFor="inputImage" className="form-label modal-label btn btn-primary">
              <MdImageSearch style={{ fontSize: '24px' }} />
              Choose an image
            </label>
            <input
              type="file"
              accept="image/png, image/jpeg, image/gif, image/svg+xml"
              id="inputImage"
              className="form-control"
              hidden
              onChange={handleOnChangeImage}
            />
          </div>
          {/* preview image */}
          <div className="modal-preview" style={{ marginTop: '8px' }}>
            {imageReview ? (
              <img src={imageReview} alt="image review" className="modal-preview-img" />
            ) : (
              <label htmlFor="inputImage">Choose an image...</label>
            )}
            {/* delete image button */}
            <RiDeleteBin5Line
              className="modal-preview-delete"
              onClick={handleOnClickDeleteImageBtn}
            />
          </div>

          {/* Save button */}
          <div style={{ textAlign: 'center' }}>
            <button className="manage-quiz__btn" onClick={handleOnClickAddBtn}>
              Add
            </button>
          </div>
        </fieldset>
      </div>
      <div className="manage-quiz__detail">table</div>
    </div>
  )
}

export default ManageQuiz
