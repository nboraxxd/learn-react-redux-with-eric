import React from 'react'
import ModalAddNewUser from './ModalAddNewUser'

const ManageUser = () => {
  return (
    <div className="manage-user-container">
      <div className="manage-user-title"></div>
      <div className="manage-user-content">
        <button className="manage-user-button">Add new user</button>
        <ModalAddNewUser />
        <div className="manage-user-table">table user</div>
      </div>
    </div>
  )
}

export default ManageUser
