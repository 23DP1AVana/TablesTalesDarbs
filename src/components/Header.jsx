import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <span className="logo-icon"></span>
          <span className="logo-text">TableTales</span>
        </Link>
        <nav className="nav">
          <a href="#restaurants" className="nav-link">Restorāni</a>
          <Link to="/about" className="nav-link">Par mums</Link>
          <button className="btn-signin">Pieslēgties</button>
        </nav>
      </div>
    </header>
  )
}

export default Header
