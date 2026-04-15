import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './AuthPage.css'

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [accountType, setAccountType] = useState('user')
  const [status, setStatus] = useState('')
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    restaurantName: '',
    phone: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('')

    if (!isLogin && formData.password !== formData.confirmPassword) {
      setStatus('Paroles nesakrit.')
      return
    }

    try {
      const endpoint = isLogin ? 'login' : 'register'
      const payload = isLogin
        ? { email: formData.email, password: formData.password }
        : { username: formData.name, email: formData.email, password: formData.password }

      const response = await fetch(`http://127.0.0.1:8000/api/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || 'Neizdevas pieslegties')
      }

      localStorage.setItem('auth_token', data.token)
      localStorage.setItem('auth_user', JSON.stringify(data.user))
      navigate('/dashboard')
    } catch (error) {
      setStatus(error.message)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h1 className="auth-title">{isLogin ? 'Pieslēgties' : 'Reģistrēties'}</h1>
            <p className="auth-subtitle">
              {isLogin 
                ? 'Ielogojieties savā kontā' 
                : 'Izveidojiet jaunu kontu, lai sāktu'}
            </p>
          </div>

          {!isLogin && (
            <div className="account-type-selector">
              <label className="account-type-label">Konta tips:</label>
              <div className="account-type-buttons">
                <button
                  type="button"
                  className={`account-type-btn ${accountType === 'user' ? 'active' : ''}`}
                  onClick={() => setAccountType('user')}
                >
                  <span className="account-icon account-icon-letter">L</span>
                  <span>Lietotājs</span>
                </button>
                <button
                  type="button"
                  className={`account-type-btn ${accountType === 'admin' ? 'active' : ''}`}
                  onClick={() => setAccountType('admin')}
                >
                  <span className="account-icon account-icon-letter">A</span>
                  <span>Administrators</span>
                </button>
                <button
                  type="button"
                  className={`account-type-btn ${accountType === 'restaurant' ? 'active' : ''}`}
                  onClick={() => setAccountType('restaurant')}
                >
                  <span className="account-icon account-icon-letter">R</span>
                  <span>Restorāna pārstāvis</span>
                </button>
              </div>
            </div>
          )}

          <form className="auth-form" onSubmit={handleSubmit}>
            {!isLogin && accountType === 'restaurant' && (
              <div className="form-group">
                <label htmlFor="restaurantName">Restorāna nosaukums</label>
                <input
                  type="text"
                  id="restaurantName"
                  name="restaurantName"
                  value={formData.restaurantName}
                  onChange={handleChange}
                  required
                  placeholder="Ievadiet restorāna nosaukumu"
                />
              </div>
            )}

            {!isLogin && (
              <div className="form-group">
                <label htmlFor="name">
                  {accountType === 'restaurant' ? 'Kontakta persona' : 'Vārds'}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder={accountType === 'restaurant' ? 'Kontakta personas vārds' : 'Jūsu vārds'}
                />
              </div>
            )}

            {!isLogin && accountType === 'restaurant' && (
              <div className="form-group">
                <label htmlFor="phone">Tālrunis</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="+371 2X XXX XXX"
                />
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email">E-pasta adrese</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="jūsu@epasts.lv"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Parole</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
                minLength="6"
              />
            </div>

            {!isLogin && (
              <div className="form-group">
                <label htmlFor="confirmPassword">Apstiprināt paroli</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  minLength="6"
                />
              </div>
            )}

            {isLogin && (
              <div className="form-options">
                <label className="checkbox-label">
                  <input type="checkbox" />
                  <span>Atcerēties mani</span>
                </label>
                <span className="forgot-password">Aizmirsi paroli?</span>
              </div>
            )}

            <button type="submit" className="auth-submit-btn">
              {isLogin ? 'Pieslēgties' : 'Reģistrēties'}
            </button>
            {status && <p className="auth-status">{status}</p>}
          </form>

          <div className="auth-footer">
            <p>
              {isLogin ? 'Nav konta? ' : 'Jau ir konts? '}
              <button 
                type="button"
                className="auth-toggle"
                onClick={() => {
                  setIsLogin(!isLogin)
                  setFormData({
                    email: '',
                    password: '',
                    confirmPassword: '',
                    name: '',
                    restaurantName: '',
                    phone: ''
                  })
                }}
              >
                {isLogin ? 'Reģistrēties' : 'Pieslēgties'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthPage
