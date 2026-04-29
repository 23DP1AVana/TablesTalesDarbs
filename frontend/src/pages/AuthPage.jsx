import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './AuthPage.css'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:9100/api'

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [status, setStatus] = useState('')
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
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

      const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
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
      if (error instanceof TypeError) {
        setStatus('Neizdevas sasniegt serveri. Parbaudi, vai backend ir palaists un API adrese ir pareiza.')
        return
      }
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
                : 'Izveidojiet jaunu lietotāja kontu, lai rezervētu galdus.'}
            </p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="form-group">
                <label htmlFor="name">
                  Vārds
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Jūsu vārds"
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
