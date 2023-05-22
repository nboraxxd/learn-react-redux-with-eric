import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getDataQuizById, postSubmitQuiz } from '../../services/apiServices'
import _ from 'lodash'
import './DetailQuiz.scss'
import Question from './Question'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { quizDetail } from '../../redux/selector/userselector'
import ModalResultQuiz from './ModalResultQuiz'

const DetailQuiz = () => {
  const [dataQuestionList, setDataQuestionList] = useState([])
  const [questionIdx, setQuestionIdx] = useState(0)
  const [isShowModalResult, setIsShowModalResult] = useState(false)
  const [dataResultQuiz, setDataResultQuiz] = useState({})

  const { id } = useParams()
  const dataQuizDetail = useSelector(quizDetail)
  const currentQuizDetail = dataQuizDetail.find((item) => +item.id === +id)

  async function fetchQuestionListById() {
    const response = await getDataQuizById(id)

    if (response?.EC === 0) {
      const data = _.chain(response.DT)
        .groupBy('id')
        .map((quiz, id) => {
          const answerOptions = []
          let quizDescription, quizImage

          quiz.forEach((item, index) => {
            if (index === 0) {
              quizDescription = item.description
              quizImage = item.image
            }

            const answerWithChecked = { ...item.answers, isChecked: false }
            answerOptions.push(answerWithChecked)
          })

          return { id, answerOptions, quizDescription, quizImage }
        })
        .value()

      setDataQuestionList(data)
    }
  }

  function handleOnClickPreviousBtn() {
    if (questionIdx === 0) return

    return setQuestionIdx(questionIdx - 1)
  }

  function handleOnClickNextBtn() {
    if (questionIdx >= dataQuestionList.length - 1) return

    return setQuestionIdx(questionIdx + 1)
  }

  function handleOnChangeOptionCheckbox(isChecked, answerOptionId, currentQuestionId) {
    const cloneDataQuestionList = _.cloneDeep(dataQuestionList)

    const currentQuestion = cloneDataQuestionList.find(
      (questionItem) => questionItem.id === currentQuestionId
    )

    const answerOptionsUpdated = currentQuestion?.answerOptions.map((answerOptionItem) => {
      if (answerOptionItem.id === answerOptionId) {
        return { ...answerOptionItem, isChecked }
      }

      return answerOptionItem
    })

    const currentQuestionUpdated = { ...currentQuestion, answerOptions: answerOptionsUpdated }

    const currentQuestionIndex = cloneDataQuestionList.findIndex(
      (item) => item.id === currentQuestionUpdated.id
    )

    if (currentQuestionIndex >= 0) {
      cloneDataQuestionList[currentQuestionIndex] = currentQuestionUpdated
      setDataQuestionList(cloneDataQuestionList)
    }
  }

  // function handleOnClickFinishBtn() {
  //   if (!Array.isArray(dataQuestionList) || dataQuestionList.length === 0) return
  //   const payload = { quizId: currentQuizDetail.id, answers: [] }
  //   const answers = []
  //   dataQuestionList.forEach((item) => {
  //     const questionId = item.id
  //     const userAnswerId = []
  //     item.answerOptions.forEach((answerOption) => {
  //       if (answerOption.isChecked === true) userAnswerId.push(answerOption.id)
  //     })
  //     return answers.push({
  //       questionId,
  //       userAnswerId,
  //     })
  //   })
  //   payload.answers = answers
  //   console.log(payload)
  // }

  async function handleOnClickFinishBtn() {
    if (!Array.isArray(dataQuestionList) || dataQuestionList.length === 0) return

    const answers = dataQuestionList.map((item) => {
      const questionId = +item.id
      const userAnswerId = item.answerOptions
        .filter((answerOption) => answerOption.isChecked === true)
        .map((answerOption) => answerOption.id)

      return {
        questionId,
        userAnswerId,
      }
    })

    const payload = { quizId: currentQuizDetail.id, answers }
    const response = await postSubmitQuiz(payload)
    if (response && response.EC === 0) {
      setIsShowModalResult(true)
      setDataResultQuiz(response.DT)
    } else {
      console.log('something wrongs...')
    }
  }

  useEffect(() => {
    fetchQuestionListById()
  }, [id])

  return (
    <div>
      <div className="quiz container">
        <div className="quiz-left">
          <h1 className="quiz-left__title">
            Quiz {currentQuizDetail.id}. {currentQuizDetail.description}
          </h1>
          <hr />
          <div className="quiz-left__content">
            <Question
              dataQuestionItem={dataQuestionList?.length > 0 && dataQuestionList[questionIdx]}
              questionIdx={questionIdx}
              handleOnChangeOptionCheckbox={handleOnChangeOptionCheckbox}
            />
          </div>
          <div className="quiz-left__footer">
            <button
              className="btn btn-secondary me-3"
              disabled={questionIdx === 0}
              onClick={handleOnClickPreviousBtn}
            >
              Previous
            </button>
            <button
              className="btn btn-secondary me-3"
              disabled={questionIdx >= dataQuestionList.length - 1}
              onClick={handleOnClickNextBtn}
            >
              Next
            </button>
            <button className="btn btn-warning" onClick={handleOnClickFinishBtn}>
              Finish
            </button>
          </div>
        </div>
        <div className="quiz-right">Count down</div>
        <ModalResultQuiz show={isShowModalResult} setShow={setIsShowModalResult} dataResultQuiz={dataResultQuiz} />
      </div>
    </div>
  )
}

export default DetailQuiz
