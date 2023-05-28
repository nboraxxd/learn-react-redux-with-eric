import React, { useEffect, useState } from 'react'
import { FiUserPlus } from 'react-icons/fi'
import ModalAddNewQuiz from './ModalAddNewQuiz'
import TableQuiz from './TableQuiz'
import './ManageQuiz.scss'
import { getAllQuizForAdmin } from '../../../services/apiServices'
import ModalDeleteQuiz from './ModalDeleteQuiz'
import ModalUpdateQuiz from './ModalUpdateQuiz'

const ManageQuiz = () => {
  const [showAddNewQuizModal, setShowAddNewQuizModal] = useState(false)
  const [showDeleteQuizModal, setShowDeleteQuizModal] = useState(false)
  const [showUpdateQuizModal, setShowUpdateQuizModal] = useState(false)

  const [quizList, setQuizList] = useState([])
  const [quizDeleteItem, setQuizDeleteItem] = useState({})
  const [quizUpdateItem, setQuizUpdateItem] = useState({})

  useEffect(() => {
    fetchQuizList()
  }, [])

  async function fetchQuizList() {
    const response = await getAllQuizForAdmin()

    if (response?.EC === 0) return setQuizList(response.DT)
  }

  function handleOnClickDeleteBtn(quizDeleteData) {
    setShowDeleteQuizModal(true)
    setQuizDeleteItem(quizDeleteData)
  }

  function handleOnClickUpdateBtn(quizUpdateData) {
    setShowUpdateQuizModal(true)
    setQuizUpdateItem(quizUpdateData)
  }

  return (
    <div className="manage-quiz">
      <h1 className="manage-quiz__title">Manage quizzes</h1>
      <div className="manage-quiz__content">
        <button
          className="btn btn-primary manage-quiz__btn"
          onClick={() => setShowAddNewQuizModal(true)}
        >
          <FiUserPlus style={{ fontSize: '22px' }} /> Add new user
        </button>

        <ModalAddNewQuiz
          show={showAddNewQuizModal}
          setShow={setShowAddNewQuizModal}
          fetchQuizList={fetchQuizList}
        />

        <div className="manage-quiz__table">
          <TableQuiz
            quizList={quizList}
            handleOnClickDeleteBtn={handleOnClickDeleteBtn}
            handleOnClickUpdateBtn={handleOnClickUpdateBtn}
          />
          <ModalUpdateQuiz
            show={showUpdateQuizModal}
            setShow={setShowUpdateQuizModal}
            quizUpdate={quizUpdateItem}
            setQuizUpdate={setQuizUpdateItem}
            fetchQuizList={fetchQuizList}
          />
          <ModalDeleteQuiz
            show={showDeleteQuizModal}
            setShow={setShowDeleteQuizModal}
            quizDelete={quizDeleteItem}
            fetchQuizList={fetchQuizList}
          />
        </div>
      </div>
    </div>
  )
}

export default ManageQuiz
