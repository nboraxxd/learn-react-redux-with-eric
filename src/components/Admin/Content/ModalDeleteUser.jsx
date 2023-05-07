import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { toast } from 'react-toastify'
import { deleteUser } from '../../../services/apiServices'

const ModalDeleteUser = ({ show, setShow, userDelete, fetchUserList }) => {
  function handleClose() {
    setShow(false)
  }

  async function handleConfirmBtn() {
    const dataResponse = await deleteUser(userDelete.id)
    console.log(dataResponse)

    if (dataResponse.EC === 0) {
      toast.success(dataResponse?.EM)
      handleClose()
      fetchUserList()
    }

    return dataResponse
  }

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Delete user modal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to permanently delete user with email is{' '}
          <strong>{userDelete.email}</strong>?
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

export default ModalDeleteUser
