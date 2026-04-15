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
        <h3>Rezervācija apstiprināta!</h3>
        <p>Jūsu rezervācija restorānā {restaurant.name} ir apstiprināta.</p>
        <p className="reservation-details">
          {formData.date} plkst. {formData.time} uz {formData.partySize} {formData.partySize === '1' ? 'personu' : 'personām'}
        </p>
        <p className="confirmation-text">Apstiprinājuma e-pasts nosūtīts uz {formData.email}</p>
        <button className="btn-secondary" onClick={onCancel}>
          Veikt vēl vienu rezervāciju
        </button>
      </div>
    )
  }

  return (
    <form className="reservation-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="date">Datums</label>
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
        <label htmlFor="time">Laiks</label>
        <select
          id="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
        >
          <option value="">Izvēlieties laiku</option>
          <option value="17:00">17:00</option>
          <option value="17:30">17:30</option>
          <option value="18:00">18:00</option>
          <option value="18:30">18:30</option>
          <option value="19:00">19:00</option>
          <option value="19:30">19:30</option>
          <option value="20:00">20:00</option>
          <option value="20:30">20:30</option>
          <option value="21:00">21:00</option>
          <option value="21:30">21:30</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="partySize">Viesu skaits</label>
        <select
          id="partySize"
          name="partySize"
          value={formData.partySize}
          onChange={handleChange}
          required
        >
          <option value="1">1 persona</option>
          <option value="2">2 personas</option>
          <option value="3">3 personas</option>
          <option value="4">4 personas</option>
          <option value="5">5 personas</option>
          <option value="6">6 personas</option>
          <option value="7">7 personas</option>
          <option value="8">8 personas</option>
        </select>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="firstName">Vārds</label>
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
          <label htmlFor="lastName">Uzvārds</label>
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
        <label htmlFor="email">E-pasts</label>
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
        <label htmlFor="phone">Tālrunis</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+371 2X XXX XXX"
          required
        />
      </div>

      <div className="form-actions">
        <button type="button" className="btn-cancel" onClick={onCancel}>
          Atcelt
        </button>
        <button type="submit" className="btn-submit">
          Apstiprināt rezervāciju
        </button>
      </div>
    </form>
  )
}

export default ReservationForm
