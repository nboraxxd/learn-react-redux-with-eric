import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import './styles/reset.css'
import './App.scss'
import Header from './Header/Header'

const App = () => {
  return (
    <div className="app-container">
      <div className="header-container">
        <Header />
      </div>
      <div className="main-container"></div>
      <div className="sidenav-container"></div>
      <div className="app-content">
        <Outlet />
      </div>
    </div>
  )
}

export default App
