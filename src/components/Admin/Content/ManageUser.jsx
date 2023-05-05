import React, { useEffect, useState } from 'react'
import { FiUserPlus } from 'react-icons/fi'
import ModalAddNewUser from './ModalAddNewUser'
import './ManageUser.scss'
import TableUser from './TableUser'
import { getAllUser } from '../../../services/apiServices'

const ManageUser = () => {
  const [showModalAddNewUser, setShowModalAddNewUser] = useState(false)
  const [userList, setUserList] = useState([])

  async function fetchUserList() {
    const responseUserList = await getAllUser()

    if (responseUserList.EC === 0) return setUserList(responseUserList.DT)
  }

  useEffect(() => {
    fetchUserList()
  }, [])

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
        <ModalAddNewUser
          show={showModalAddNewUser}
          setShow={setShowModalAddNewUser}
          fetchUserList={fetchUserList}
        />
        <div className="manage-user-table">
          <TableUser userList={userList} />
        </div>
      </div>
    </div>
  )
}

export default ManageUser
