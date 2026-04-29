import React, { useState } from 'react'
import './ContactPage.css'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:9100/api'

const ContactPage = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('')

    try {
      const response = await fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!response.ok) {
        throw new Error('Neizdevas nosutit zinju')
      }

      setForm({ name: '', email: '', message: '' })
      setStatus('Zinja veiksmigi nosutita')
    } catch (error) {
      setStatus(error.message)
    }
  }

  return (
    <div className="contact-page">
      <div className="contact-container">
        <div className="contact-intro">
          <h1>Contact Us</h1>
          <p>Ir jautajumi par rezervacijam vai sadarbibu? Uzraksti mums un atbildesim tuvaka laika.</p>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <label>
            Vards
            <input name="name" value={form.name} onChange={handleChange} placeholder="Tavs vards" required />
          </label>

          <label>
            E-pasts
            <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="epasts@example.com" required />
          </label>

          <label>
            Zina
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Apraksti savu jautajumu"
              rows="6"
              required
            />
          </label>

          <button type="submit" className="contact-submit-btn">Nosutit zinu</button>
        </form>

        {status && <p className="contact-status">{status}</p>}
      </div>
    </div>
  )
}

export default ContactPage
