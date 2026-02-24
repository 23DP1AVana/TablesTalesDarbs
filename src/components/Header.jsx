import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Header.css'

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  const closeMenu = () => setMenuOpen(false)

  useEffect(() => {
    closeMenu()
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const handleRestaurantsClick = (e) => {
    closeMenu()
    if (window.location.pathname !== '/') {
      e.preventDefault()
      window.location.href = '/#restaurants'
    }
  }

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo" onClick={closeMenu}>
          <span className="logo-text">Garšo</span>
        </Link>

        <nav className="nav nav-desktop">
          <a href="/#restaurants" className="nav-link">Restorāni</a>
          <Link to="/about" className="nav-link">Par mums</Link>
          <Link to="/auth" className="btn-signin">Pieslēgties</Link>
        </nav>

        <button
          type="button"
          className={`burger-btn ${menuOpen ? 'burger-open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Aizvērt izvēlni' : 'Atvērt izvēlni'}
          aria-expanded={menuOpen}
        >
          <span className="burger-line" />
          <span className="burger-line" />
          <span className="burger-line" />
        </button>
      </div>

      <div className={`nav-mobile-overlay ${menuOpen ? 'nav-mobile-open' : ''}`} onClick={closeMenu} aria-hidden="true" />
      <nav className={`nav nav-mobile ${menuOpen ? 'nav-mobile-open' : ''}`} aria-label="Navigācija">
        <a href="/#restaurants" className="nav-mobile-link" onClick={handleRestaurantsClick}>Restorāni</a>
        <Link to="/about" className="nav-mobile-link" onClick={closeMenu}>Par mums</Link>
        <Link to="/auth" className="nav-mobile-link nav-mobile-btn" onClick={closeMenu}>Pieslēgties</Link>
      </nav>
    </header>
  )
}

export default Header
