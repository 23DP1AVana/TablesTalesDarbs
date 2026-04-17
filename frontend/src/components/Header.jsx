import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import './Header.css'

const THEME_KEY = 'theme'

const getInitialTheme = () => {
  const saved = localStorage.getItem(THEME_KEY)
  if (saved === 'light' || saved === 'dark') return saved
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [theme, setTheme] = useState(getInitialTheme)
  const location = useLocation()
  const navigate = useNavigate()
  const token = localStorage.getItem('auth_token')
  const user = JSON.parse(localStorage.getItem('auth_user') || 'null')

  const closeMenu = () => setMenuOpen(false)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem(THEME_KEY, theme)
  }, [theme])

  useEffect(() => {
    closeMenu()
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

  const handleRestaurantsClick = (e) => {
    closeMenu()
    if (window.location.pathname !== '/') {
      e.preventDefault()
      window.location.href = '/#restaurants'
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('auth_user')
    closeMenu()
    navigate('/auth')
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
          <Link to="/contact" className="nav-link">Sazinies</Link>
          {token && <Link to="/dashboard" className="nav-link">Dashboard</Link>}
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Ieslēgt gaišo režīmu' : 'Ieslēgt tumšo režīmu'}
            title={theme === 'dark' ? 'Gaisais režīms' : 'Tumšais režīms'}
          >
            {theme === 'dark' ? (
              <svg className="theme-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>
            ) : (
              <svg className="theme-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
            )}
          </button>
          {!token ? (
            <Link to="/auth" className="btn-signin">Pieslēgties</Link>
          ) : (
            <button type="button" className="btn-signin" onClick={handleLogout}>
              Iziet ({user?.username || 'lietotajs'})
            </button>
          )}
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
        <Link to="/contact" className="nav-mobile-link" onClick={closeMenu}>Contact Us</Link>
        {token && <Link to="/dashboard" className="nav-mobile-link" onClick={closeMenu}>Dashboard</Link>}
        <button
          type="button"
          className="nav-mobile-link theme-toggle-mobile"
          onClick={() => { toggleTheme(); closeMenu() }}
          aria-label={theme === 'dark' ? 'Ieslēgt gaišo režīmu' : 'Ieslēgt tumšo režīmu'}
        >
          {theme === 'dark' ? 'Gaišais režīms' : 'Tumšais režīms'}
        </button>
        {!token ? (
          <Link to="/auth" className="nav-mobile-link nav-mobile-btn" onClick={closeMenu}>Pieslēgties</Link>
        ) : (
          <button type="button" className="nav-mobile-link nav-mobile-btn" onClick={handleLogout}>
            Iziet
          </button>
        )}
      </nav>
    </header>
  )
}

export default Header
