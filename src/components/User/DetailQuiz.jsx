import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getDataQuizById } from '../../services/apiServices'

const DetailQuiz = () => {
  const { id } = useParams()
  console.log(id)

  useEffect(() => {
    fetchQuestionListById()
  }, [id])

  async function fetchQuestionListById() {
    const response = await getDataQuizById(id)

    console.log(response)
  }

  return <div>Detail Quiz</div>
}

export default DetailQuiz
