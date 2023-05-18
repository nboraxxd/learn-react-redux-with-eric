import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getQuizByUser } from '../../services/apiServices'
import './QuizList.scss'

const QuizList = () => {
  const [quizList, setQuizList] = useState([])

  const navigate = useNavigate()

  async function fetchQuizList() {
    try {
      const responseQuizList = await getQuizByUser()
      if (responseQuizList.EC === 0) setQuizList(responseQuizList.DT)
    } catch (error) {
      console.log('Failed to fetch quiz list. Please try again.')
    }
  }

  useEffect(() => {
    fetchQuizList()
  }, [])

  return (
    <div className="container card-list">
      {quizList.length === 0 ? (
        <p>You don't have any quiz now...</p>
      ) : (
        quizList.map((quizItem) => (
          <div key={quizItem.id} className="card" style={{ width: '18rem' }}>
            <img
              className="card-img-top"
              src={`data:image/png;base64,${quizItem.image}`}
              alt="Card image cap"
            />
            <div className="card-body">
              <h5 className="card-title">Quizzz {quizItem.id}</h5>
              <div className="card-text">
                <p className="card-desc">{quizItem.description}</p>
              </div>
              <button className="btn btn-primary" onClick={() => navigate(`quiz/${quizItem.id}`)}>
                Start now
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default QuizList
