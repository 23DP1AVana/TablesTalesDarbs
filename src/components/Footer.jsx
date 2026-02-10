import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Footer.css'

const Footer = () => {
  const navigate = useNavigate()
  const [selectedCity, setSelectedCity] = useState('')

  const handleRestaurantClick = (filter) => {
    navigate('/')
    setTimeout(() => {
      const element = document.querySelector('.all-restaurants-section')
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }, 100)
  }

  const handleCityClick = (city) => {
    setSelectedCity(city)
    navigate('/')
    setTimeout(() => {
      const element = document.querySelector('.all-restaurants-section')
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }, 100)
  }

  const handleSocialClick = (platform) => {
    const urls = {
      facebook: 'https://facebook.com',
      instagram: 'https://instagram.com',
      twitter: 'https://twitter.com'
    }
    window.open(urls[platform], '_blank')
  }

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section footer-brand">
            <h3 className="footer-title">Tables</h3>
            <p className="footer-description">
              Labākā vieta, lai atrastu un rezervētu galdu Latvijas restorānos.
            </p>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Restorāni</h4>
            <ul className="footer-links">
              <li><button onClick={() => handleRestaurantClick('popular')} className="footer-link-btn">Populārākie restorāni</button></li>
              <li><button onClick={() => handleRestaurantClick('top-rated')} className="footer-link-btn">Augstāk novērtētie</button></li>
              <li><button onClick={() => handleRestaurantClick('featured')} className="footer-link-btn">Ieteicamie restorāni</button></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Pilsētas</h4>
            <ul className="footer-links">
              <li><button onClick={() => handleCityClick('Rīga')} className="footer-link-btn">Rīga</button></li>
              <li><button onClick={() => handleCityClick('Jūrmala')} className="footer-link-btn">Jūrmala</button></li>
              <li><button onClick={() => handleCityClick('Liepāja')} className="footer-link-btn">Liepāja</button></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Sekojiet mums</h4>
            <div className="social-links">
              <button onClick={() => handleSocialClick('facebook')} className="social-link" aria-label="Facebook">
                <span className="social-icon">📘</span>
                <span className="social-text">Facebook</span>
              </button>
              <button onClick={() => handleSocialClick('instagram')} className="social-link" aria-label="Instagram">
                <span className="social-icon">📷</span>
                <span className="social-text">Instagram</span>
              </button>
              <button onClick={() => handleSocialClick('twitter')} className="social-link" aria-label="Twitter">
                <span className="social-icon">🐦</span>
                <span className="social-text">Twitter</span>
              </button>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © 2026 Tables. Visas tiesības aizsargātas.
          </p>
          <div className="footer-legal">
            <Link to="/about" className="footer-legal-link">Par mums</Link>
            <span className="separator">|</span>
            <a href="#privacy" className="footer-legal-link">Privātums</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
