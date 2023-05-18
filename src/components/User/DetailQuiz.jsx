import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getDataQuizById } from '../../services/apiServices'
import _ from 'lodash'

const DetailQuiz = () => {
  const { id } = useParams()

  useEffect(() => {
    fetchQuestionListById()
  }, [id])

  async function fetchQuestionListById() {
    const response = await getDataQuizById(id)

    if (response?.EC === 0) {
      const dataQuiz = _.chain(response.DT)
        .groupBy('id')
        .map((quiz, id) => {
          const answerOptions = []
          let quizDescription
          let quizImage

          quiz.forEach((item, index) => {
            if (index === 0) {
              quizDescription = item.description
              quizImage = item.image
            }

            answerOptions.push(item.answers)
          })

          return { id, answerOptions, quizDescription, quizImage }
        })
        .value()
      console.log(dataQuiz)
    }
  }

  return (
    <div>
      <div className="quiz container">
        <div className="quiz-left">
          <h1 className="quiz-left__title">Quiz 1: Lorem ipsum dolor sit amet.</h1>
          <hr />
          <div className="quiz-left__content">{/* <Question /> */}</div>
          <div className="quiz-left__footer">   
            <button className="btn btn-secondary me-3">Back</button>
            <button className="btn btn-secondary me-3">Next</button>
            <button className="btn btn-warning">Finish</button>
          </div>
        </div>
        <div className="quiz-right">Count down</div>
        {/* <ModalResult /> */}
      </div>
    </div>
  )
}

export default DetailQuiz
