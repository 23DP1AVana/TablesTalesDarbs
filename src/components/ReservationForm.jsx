import React, { useState } from 'react'
import './ReservationForm.css'

const ReservationForm = ({ restaurant, onCancel }) => {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    partySize: '2',
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  })

  const [submitted, setSubmitted] = useState(false)

  const today = new Date().toISOString().split('T')[0]

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simulate form submission
    setTimeout(() => {
      setSubmitted(true)
    }, 500)
  }

  if (submitted) {
    return (
      <div className="reservation-success">
        <div className="success-icon">✓</div>
        <h3>Reservation Confirmed!</h3>
        <p>Your reservation at {restaurant.name} has been confirmed.</p>
        <p className="reservation-details">
          {formData.date} at {formData.time} for {formData.partySize} {formData.partySize === '1' ? 'person' : 'people'}
        </p>
        <p className="confirmation-text">A confirmation email has been sent to {formData.email}</p>
        <button className="btn-secondary" onClick={onCancel}>
          Make Another Reservation
        </button>
      </div>
    )
  }

  return (
    <form className="reservation-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="date">Date</label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          min={today}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="time">Time</label>
        <select
          id="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
        >
          <option value="">Select time</option>
          <option value="17:00">5:00 PM</option>
          <option value="17:30">5:30 PM</option>
          <option value="18:00">6:00 PM</option>
          <option value="18:30">6:30 PM</option>
          <option value="19:00">7:00 PM</option>
          <option value="19:30">7:30 PM</option>
          <option value="20:00">8:00 PM</option>
          <option value="20:30">8:30 PM</option>
          <option value="21:00">9:00 PM</option>
          <option value="21:30">9:30 PM</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="partySize">Party Size</label>
        <select
          id="partySize"
          name="partySize"
          value={formData.partySize}
          onChange={handleChange}
          required
        >
          <option value="1">1 person</option>
          <option value="2">2 people</option>
          <option value="3">3 people</option>
          <option value="4">4 people</option>
          <option value="5">5 people</option>
          <option value="6">6 people</option>
          <option value="7">7 people</option>
          <option value="8">8 people</option>
        </select>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="phone">Phone</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="(555) 123-4567"
          required
        />
      </div>

      <div className="form-actions">
        <button type="button" className="btn-cancel" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn-submit">
          Confirm Reservation
        </button>
      </div>
    </form>
  )
}

export default ReservationForm
