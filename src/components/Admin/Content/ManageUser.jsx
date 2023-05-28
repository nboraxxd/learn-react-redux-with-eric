import React, { useEffect, useState } from 'react'
import { FiUserPlus } from 'react-icons/fi'
import ModalAddNewUser from './ModalAddNewUser'
import './ManageUser.scss'
import TableUser from './TableUser'
import { getAllUser, getAllUserWithPaginate } from '../../../services/apiServices'
import ModalUpdateUser from './ModalUpdateUser'
import ModalViewUser from './ModalViewUser'
import ModalDeleteUser from './ModalDeleteUser'
import TableUserPaginate from './TableUserPaginate'

const ManageUser = () => {
  const LIMIT_USER = 6

  const [currentPage, setCurrentPage] = useState(1)
  const [pageTotal, setPageTotal] = useState(1)
  const [showModalAddNewUser, setShowModalAddNewUser] = useState(false)
  const [showModalViewUser, setShowModalViewUser] = useState(false)
  const [showModalUpdateUser, setShowModalUpdateUser] = useState(false)
  const [showModalDeleteUser, setShowModalDeleteUser] = useState(false)

  const [userList, setUserList] = useState([])
  const [userView, setUserView] = useState({})
  const [userUpdate, setUserUpdate] = useState({})
  const [userDelete, setUserDelete] = useState({})

  useEffect(() => {
    fetchUserListWithPaginate(currentPage)
  }, [currentPage])

  async function fetchUserList() {
    const responseUserList = await getAllUser()

    if (responseUserList.EC === 0) return setUserList(responseUserList.DT)
  }

  async function fetchUserListWithPaginate(page) {
    const responseUserListWithPaginate = await getAllUserWithPaginate(page, LIMIT_USER)

    if (responseUserListWithPaginate.EC === 0) {
      setPageTotal(responseUserListWithPaginate.DT?.totalPages)
      setUserList(responseUserListWithPaginate.DT?.users)
    }
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
          setCurrentPage={setCurrentPage}
          fetchUserListWithPaginate={fetchUserListWithPaginate}
        />
        <div className="manage-user-table">
          {/* <TableUser
            userList={userList}
            handleOnClickViewBtn={handleOnClickViewBtn}
            handleOnClickUpdateBtn={handleOnClickUpdateBtn}
            handleOnClickDeleteBtn={handleOnClickDeleteBtn}
          /> */}
          <TableUserPaginate
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            pageTotal={pageTotal}
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
          currentPage={currentPage}
          fetchUserListWithPaginate={fetchUserListWithPaginate}
        />
        <ModalDeleteUser
          show={showModalDeleteUser}
          setShow={setShowModalDeleteUser}
          userList={userList}
          userDelete={userDelete}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          fetchUserListWithPaginate={fetchUserListWithPaginate}
        />
      </div>
    </div>
  )
}

export default ManageUser
