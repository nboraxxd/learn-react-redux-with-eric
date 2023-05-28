import React from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { toast } from 'react-toastify'
import { deleteQuiz } from '../../../services/apiServices'

const ModalDeleteQuiz = (props) => {
  const { show, setShow, quizDelete, fetchQuizList } = props

  function handleClose() {
    setShow(false)
  }

  async function handleConfirmBtn() {
    const dataResponse = await deleteQuiz(quizDelete.id)
    console.log(dataResponse)

    if (dataResponse.EC === 0) {
      toast.success(dataResponse?.EM)
      handleClose()

      await fetchQuizList()
    } else {
      toast.error(dataResponse?.EM)
    }

    return dataResponse
  }

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Delete quiz modal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to permanently delete quiz with name is{' '}
          <strong>{quizDelete.name}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirmBtn}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ModalDeleteQuiz
