import React, { useEffect, useState } from 'react'
import { FiUserPlus } from 'react-icons/fi'
import ModalAddNewUser from './ModalAddNewUser'
import './ManageUser.scss'
import TableUser from './TableUser'
import { getAllUser } from '../../../services/apiServices'
import ModalUpdateUser from './ModalUpdateUser'
import ModalViewUser from './ModalViewUser'
import ModalDeleteUser from './ModalDeleteUser'

const ManageUser = () => {
  const [showModalAddNewUser, setShowModalAddNewUser] = useState(false)
  const [showModalViewUser, setShowModalViewUser] = useState(false)
  const [showModalUpdateUser, setShowModalUpdateUser] = useState(false)
  const [showModalDeleteUser, setShowModalDeleteUser] = useState(false)

  const [userList, setUserList] = useState([])
  const [userView, setUserView] = useState({})
  const [userUpdate, setUserUpdate] = useState({})
  const [userDelete, setUserDelete] = useState({})

  useEffect(() => {
    fetchUserList()
  }, [])

  async function fetchUserList() {
    const responseUserList = await getAllUser()

    if (responseUserList.EC === 0) return setUserList(responseUserList.DT)
  }

  function handleOnClickViewBtn(userItem) {
    setShowModalViewUser(true)
    setUserView(userItem)
  }

  function handleOnClickUpdateBtn(userItem) {
    setShowModalUpdateUser(true)
    setUserUpdate(userItem)
  }

  function handleOnClickDeleteBtn(userItem) {
    setShowModalDeleteUser(true)
    setUserDelete(userItem)
  }

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
          <TableUser
            userList={userList}
            handleOnClickViewBtn={handleOnClickViewBtn}
            handleOnClickUpdateBtn={handleOnClickUpdateBtn}
            handleOnClickDeleteBtn={handleOnClickDeleteBtn}
          />
        </div>
        <ModalViewUser
          show={showModalViewUser}
          setShow={setShowModalViewUser}
          userView={userView}
          setUserView={setUserView}
        />
        <ModalUpdateUser
          show={showModalUpdateUser}
          setShow={setShowModalUpdateUser}
          userUpdate={userUpdate}
          setUserUpdate={setUserUpdate}
          fetchUserList={fetchUserList}
        />
      </div>
      <ModalDeleteUser
        show={showModalDeleteUser}
        setShow={setShowModalDeleteUser}
        userDelete={userDelete}
        fetchUserList={fetchUserList}
      />
    </div>
  )
}

export default ManageUser
