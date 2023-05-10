import React from 'react'
import ReactPaginate from 'react-paginate'

const TableUserPaginate = (props) => {
  const {
    currentPage,
    setCurrentPage,
    pageTotal,
    userList,
    handleOnClickViewBtn,
    handleOnClickUpdateBtn,
    handleOnClickDeleteBtn,
  } = props

  return (
    <>
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {userList.length === 0 && (
            <tr>
              <td scope="row" colSpan="5">
                Data not found
              </td>
            </tr>
          )}

          {userList.length > 0 &&
            userList.map((userItem) => (
              <tr key={userItem.id}>
                <th scope="row">{userItem.id}</th>
                <td>{userItem.username}</td>
                <td>{userItem.email}</td>
                <td>{`${userItem.role.charAt(0).toUpperCase()}${userItem.role
                  .slice(1)
                  .toLowerCase()}`}</td>
                <td>
                  <button
                    className="btn btn-info me-2"
                    onClick={() => handleOnClickViewBtn(userItem)}
                  >
                    View
                  </button>
                  <button
                    className="btn btn-warning me-2"
                    onClick={() => handleOnClickUpdateBtn(userItem)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleOnClickDeleteBtn(userItem)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {userList.length > 0 && (
        <ReactPaginate
          className="pagination justify-content-center"
          nextLabel="next >"
          onPageChange={(event) => setCurrentPage(+event.selected + 1)}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageTotal}
          forcePage={currentPage - 1}
          previousLabel="< previous"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
        />
      )}
    </>
  )
}

export default TableUserPaginate
