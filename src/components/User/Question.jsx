import React from 'react'

const Question = ({ dataQuestionItem, questionIdx, handleOnChangeOptionCheckbox }) => {
  return (
    <>
      <div className="quiz-left__image">
        {dataQuestionItem.quizImage && (
          <img
            src={`data:image/jpeg;base64,${dataQuestionItem.quizImage}`}
            alt="image question"
            className="img-fluid img-thumbnail"
          />
        )}
      </div>

      <p className="quiz-left__question">
        Question {questionIdx + 1}. {dataQuestionItem.quizDescription}
      </p>
      <div className="quiz-left__anwer">
        {dataQuestionItem?.answerOptions?.map((answerOptionItem) => {
          return (
            <div key={answerOptionItem.id} className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id={`flexCheck${answerOptionItem.id}`}
                checked={answerOptionItem.isChecked}
                onChange={(event) =>
                  handleOnChangeOptionCheckbox(
                    event.target.checked,
                    answerOptionItem.id,
                    dataQuestionItem.id
                  )
                }
              />
              <label className="form-check-label" htmlFor={`flexCheck${answerOptionItem.id}`}>
                {answerOptionItem.description}
              </label>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Question
