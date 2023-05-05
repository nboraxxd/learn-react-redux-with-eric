import React, { useState } from 'react'
import { useEffect } from 'react'
import { getAllUser } from '../../../services/apiServices'

const TableUser = ({userList}) => {
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
                  <button className="btn btn-info me-2">View</button>
                  <button className="btn btn-warning  me-2">Update</button>
                  <button className="btn btn-danger">Delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  )
}

export default TableUser
