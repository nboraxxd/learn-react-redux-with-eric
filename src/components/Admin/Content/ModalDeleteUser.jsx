import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { toast } from 'react-toastify'
import { deleteUser } from '../../../services/apiServices'

const ModalDeleteUser = (props) => {
  const {
    show,
    setShow,
    userList,
    userDelete,
    currentPage,
    setCurrentPage,
    fetchUserListWithPaginate,
  } = props

  function handleClose() {
    setShow(false)
  }

  async function handleConfirmBtn() {
    const dataResponse = await deleteUser(userDelete.id)

    if (dataResponse.EC === 0) {
      toast.success(dataResponse?.EM)
      handleClose()
      userList.length === 1 ? setCurrentPage(currentPage - 1) : setCurrentPage(currentPage)

      await fetchUserListWithPaginate(currentPage)
    } else {
      toast.error(dataResponse?.EM)
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
