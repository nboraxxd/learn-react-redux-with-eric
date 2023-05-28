import React, { useState } from 'react'
import Select from 'react-select'
import { BiPlus, BiMinus } from 'react-icons/bi'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { v4 as uuidv4 } from 'uuid'
import Lightbox from 'react-awesome-lightbox'
import _ from 'lodash'
import './QuestionList.scss'

const QuestionList = () => {
  const [selectQuizItem, setSelectQuizItem] = useState()
  const [imageReview, setImageReview] = useState({ title: '', imageFile: null })
  const [isLighboxShow, setIsLighboxShow] = useState(false)
  const [questionList, setQuestionList] = useState([
    {
      id: uuidv4(),
      questionItem: '',
      imageFile: null,
      imageName: '',
      optionList: [
        {
          id: uuidv4(),
          optionItem: '',
          isCorrect: false,
        },
        {
          id: uuidv4(),
          optionItem: '',
          isCorrect: false,
        },
      ],
    },
  ])

  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ]

  function handleOnClickActionQuestion(type, id) {
    if (type.toLowerCase() === 'add') {
      const newQuestionItem = {
        id: uuidv4(),
        questionItem: '',
        imageFile: null,
        imageName: '',
        optionList: [
          {
            id: uuidv4(),
            optionItem: '',
            isCorrect: false,
          },
          {
            id: uuidv4(),
            optionItem: '',
            isCorrect: false,
          },
        ],
      }

      setQuestionList([...questionList, newQuestionItem])
    }

    if (type.toLowerCase() === 'remove') {
      const questionListClone = _.cloneDeep(questionList)

      setQuestionList(questionListClone.filter((questionItem) => questionItem.id !== id))
    }
  }

  function handleOnClickActionOption(type, questionId, optionId) {
    const questionListClone = _.cloneDeep(questionList)

    if (type.toLowerCase() === 'add') {
      const newOptionItem = {
        id: uuidv4(),
        optionItem: '',
        isCorrect: false,
      }

      const questionToUpdate = questionListClone.find(
        (questionItem) => questionItem.id === questionId
      )

      questionToUpdate?.optionList?.push(newOptionItem)
      setQuestionList(questionListClone)
    }

    if (type.toLowerCase() === 'remove') {
      const questionToUpdate = questionListClone.find((item) => item.id === questionId)

      if (questionToUpdate) {
        questionToUpdate.optionList = questionToUpdate.optionList?.filter(
          (optionItem) => optionItem.id !== optionId
        )
      }
      setQuestionList(questionListClone)
    }
  }

  function handleOnChangeInput(type, questionId, value) {
    const questionListClone = _.cloneDeep(questionList)

    if (type.toLowerCase() === 'question') {
      const questionToUpdate = questionListClone.find((item) => item.id === questionId)

      if (questionToUpdate) {
        questionToUpdate.questionItem = value
        setQuestionList(questionListClone)
      }
    }
  }

  function handleOnChangeImageQuestion(type, questionId, event) {
    const questionListClone = _.cloneDeep(questionList)
    const questionToUpdate = questionListClone.find((item) => item.id === questionId)

    if (type.toLowerCase() === 'add') {
      const file = event.target?.files[0]
      if (!questionToUpdate && !file) return

      questionToUpdate.imageFile = file
      questionToUpdate.imageName = file.name
    }

    if (type.toLowerCase() === 'remove') {
      questionToUpdate.imageFile = ''
      questionToUpdate.imageName = null
    }

    setQuestionList(questionListClone)
  }

  function handleOnClickImage(imageName, imageFile) {
    setIsLighboxShow(true)
    setImageReview({ title: imageName, imageFile: imageFile })
  }

  function handleOnChangeOptionCheckbox(questionId, optionId, value) {
    const questionListClone = _.cloneDeep(questionList)
    const questionToUpdate = questionListClone.find((item) => item.id === questionId)

    if (questionToUpdate) {
      const optionToUpdate = questionToUpdate.optionList?.find((item) => item.id === optionId)
      optionToUpdate.isCorrect = value

      setQuestionList(questionListClone)
    }
  }

  function handleOnChangeOptionInput(questionId, optionId, value) {
    const questionListClone = _.cloneDeep(questionList)
    const questionToUpdate = questionListClone.find((item) => item.id === questionId)

    if (questionToUpdate) {
      const optionToUpdate = questionToUpdate.optionList?.find((item) => item.id === optionId)
      optionToUpdate.optionItem = value

      setQuestionList(questionListClone)
    }
  }

  function handleOnClickCreateQuiz() {
    console.log(questionList)
  }

  return (
    <div className="container">
      <h1 className="pb-3 fs-2">Manage questions</h1>

      {/* choose quiz */}
      <Select
        value={selectQuizItem}
        onChange={setSelectQuizItem}
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

      <fieldset className="border rounded-3 my-3 py-1 px-3 d-flex flex-column">
        {/* title */}
        <legend className="float-none w-auto px-2 fs-5">Question of strawberry</legend>
        {/* *********** start question main *********** */}
        {Array.isArray(questionList) &&
          questionList.length > 0 &&
          questionList.map((questionItem, index) => {
            console.log(questionList)
            return (
              <div key={questionItem.id} className="question-list mb-3">
                <div className="mb-3">
                  <div className="action-question">
                    <BiPlus
                      className="action-question__btn"
                      onClick={() => handleOnClickActionQuestion('Add')}
                    />
                    {questionList.length > 1 && (
                      <BiMinus
                        className="action-question__btn"
                        onClick={() => handleOnClickActionQuestion('Remove', questionItem.id)}
                      />
                    )}
                  </div>
                  {/* question */}
                  <input
                    type="text"
                    className="form-control"
                    id="questionInput"
                    placeholder={`Question ${index + 1}`}
                    value={questionItem.questionItem}
                    onChange={(event) =>
                      handleOnChangeInput('Question', questionItem.id, event.target.value)
                    }
                  />
                </div>

                {/* image */}
                <div className="col-md-4 mb-3 question-list__image">
                  <input
                    type="file"
                    accept="image/png, image/jpeg, image/gif, image/svg+xml"
                    className=""
                    id={`inputImage${questionItem.id}`}
                    onChange={(event) => handleOnChangeImageQuestion('add', questionItem.id, event)}
                  />
                  {questionItem.imageFile ? (
                    <img
                      src={URL.createObjectURL(questionItem.imageFile)}
                      alt=""
                      className="question-list__review"
                      onClick={() =>
                        handleOnClickImage(questionItem.imageName, questionItem.imageFile)
                      }
                    />
                  ) : (
                    <label htmlFor={`inputImage${questionItem.id}`}>Choose an image...</label>
                  )}

                  {questionItem.imageFile && (
                    <RiDeleteBin5Line
                      className="question-list__delete"
                      onClick={() => handleOnChangeImageQuestion('remove', questionItem.id)}
                    />
                  )}
                </div>

                {/* option anwers */}
                <div className="ps-2 mp-3">
                  {/* option item */}
                  {questionItem?.optionList?.map((optionItem, index) => {
                    return (
                      <div key={optionItem.id} className="input-group mb-3">
                        <div className="action-option">
                          <BiPlus
                            className="action-option__btn"
                            onClick={() => handleOnClickActionOption('Add', questionItem.id)}
                          />

                          <BiMinus
                            className="action-option__btn"
                            onClick={() =>
                              handleOnClickActionOption('Remove', questionItem.id, optionItem.id)
                            }
                          />
                        </div>
                        <div className="input-group-text">
                          <input
                            className="form-check-input mt-0"
                            type="checkbox"
                            checked={optionItem.isCorrect}
                            onChange={(event) =>
                              handleOnChangeOptionCheckbox(
                                questionItem.id,
                                optionItem.id,
                                event.target.checked
                              )
                            }
                          />
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          placeholder={`Option ${index + 1}`}
                          onChange={(event) =>
                            handleOnChangeOptionInput(
                              questionItem.id,
                              optionItem.id,
                              event.target.value
                            )
                          }
                        />
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        {/* *********** end question main *********** */}

        {/* image review lighbox */}
        {isLighboxShow === true && (
          <Lightbox
            image={URL.createObjectURL(imageReview.imageFile)}
            title={imageReview.title}
            onClose={() => setIsLighboxShow(false)}
          />
        )}

        <button className="btn btn-primary btn-lg m-auto" onClick={handleOnClickCreateQuiz}>
          Create quiz
        </button>
      </fieldset>
    </div>
  )
}

export default QuestionList
