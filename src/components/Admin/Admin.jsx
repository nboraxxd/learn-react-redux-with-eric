import SideBar from './SideBar'
import './Admin.scss'
import { FaBars } from 'react-icons/fa'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'

const Admin = () => {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <SideBar collapsed={collapsed}></SideBar>
      </div>
      <div className="admin-content">
        <div className="admin-header">
          <FaBars className="btn-toggle" onClick={() => setCollapsed(!collapsed)} />
        </div>
        <div className="admin-main">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Admin
