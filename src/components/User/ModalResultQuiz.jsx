import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

const ModalResultQuiz = ({ show, setShow, dataResultQuiz }) => {
  function handleClose() {
    setShow(false)
  }

  console.log(dataResultQuiz)

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Your result...</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Total correct answers: <strong>{dataResultQuiz.countCorrect}</strong>
          </p>
          <p>
            Total question: <strong>{dataResultQuiz.countTotal}</strong>
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Show result
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ModalResultQuiz
