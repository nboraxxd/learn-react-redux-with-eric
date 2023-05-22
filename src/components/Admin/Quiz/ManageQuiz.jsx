import React, { useState } from 'react'
import Select from 'react-select'
import { MdImageSearch } from 'react-icons/md'
import { RiDeleteBin5Line } from 'react-icons/ri'
import './ManageQuiz.scss'

const options = [
  { value: 'EASY', label: 'Easy' },
  { value: 'MEDIUM', label: 'Medium' },
  { value: 'HARD', label: 'Hard' },
]

const ManageQuiz = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [type, setType] = useState('')
  const [image, setImage] = useState('')
  const [imageReview, setImageReview] = useState(null)

  function handleOnChangeImage(event) {
    const file = event.target.files[0]

    if (file) {
      setImage(file)
      setImageReview(URL.createObjectURL(file))
    }
  }

  return (
    <div className="manage-quiz container">
      <h1 className="manage-quiz__title">title</h1>
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
              defaultValue={type}
              // onChange={setType}
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
          <div className="modal-preview" style={{ marginTop: '16px' }}>
            {imageReview ? (
              <img src={imageReview} alt="image review" className="modal-preview-img" />
            ) : (
              <label htmlFor="inputImage">Choose an image...</label>
            )}

            <RiDeleteBin5Line className="modal-preview-delete" />
          </div>

          {/* Save button */}
          <div style={{ textAlign: 'center' }}>
            <button className="manage-quiz__btn">Add</button>
          </div>
        </fieldset>
      </div>
      <div className="manage-quiz__detail">table</div>
    </div>
  )
}

export default ManageQuiz
