import React, { useState } from 'react'
import { FiUserPlus } from 'react-icons/fi'
import ModalAddNewUser from './ModalAddNewUser'
import './ManageUser.scss'

const ManageUser = () => {
  const [showModalAddNewUser, setShowModalAddNewUser] = useState(false)

  function handleOnClickAddNewUserBtn() {}

  return (
    <div className="manage-user">
      <h1 className="manage-user-title">Manage user</h1>
      <div className="manage-user-content">
        <button
          className="btn btn-primary manage-user-btn"
          onClick={() => setShowModalAddNewUser(true)}
        >
          <FiUserPlus style={{ fontSize: '22px' }} /> Add new user
        </button>
        <ModalAddNewUser show={showModalAddNewUser} setShow={setShowModalAddNewUser} />
        <div className="manage-user-table">table user</div>
      </div>
    </div>
  )
}

export default ManageUser
