import React from 'react'
import './SearchBar.css'

const SearchBar = ({
  searchQuery,
  setSearchQuery,
  location,
  setLocation,
  date,
  setDate,
  time,
  setTime,
  partySize,
  setPartySize
}) => {
  const today = new Date().toISOString().split('T')[0]

  return (
    <div className="search-bar">
      <div className="search-input-group">
        <div className="search-field">
          <label htmlFor="location">Vieta</label>
          <input
            id="location"
            type="text"
            placeholder="Rīga, Jūrmala, Liepāja..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                setTimeout(() => {
                  const element = document.querySelector('.all-restaurants-section')
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }
                }, 100)
              }
            }}
            className="search-input"
          />
        </div>

        <div className="search-field">
          <label htmlFor="date">Datums</label>
          <input
            id="date"
            type="date"
            value={date}
            min={today}
            onChange={(e) => setDate(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="search-field">
          <label htmlFor="time">Laiks</label>
          <select
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="search-input"
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

        <div className="search-field">
          <label htmlFor="party">Viesu skaits</label>
          <select
            id="party"
            value={partySize}
            onChange={(e) => setPartySize(e.target.value)}
            className="search-input"
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

        <div className="search-field search-field-full">
          <label htmlFor="search">Meklēt</label>
          <input
            id="search"
            type="text"
            placeholder="Restorāna nosaukums, virtuve vai pilsēta (piem., Rīga)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                // Scroll uz rezultātiem
                setTimeout(() => {
                  const element = document.querySelector('.all-restaurants-section')
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }
                }, 100)
              }
            }}
            className="search-input"
          />
        </div>
      </div>

      <button 
        className="search-button"
        onClick={() => {
          // Scroll uz rezultātiem
          setTimeout(() => {
            const element = document.querySelector('.all-restaurants-section')
            if (element) {
              element.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }
          }, 100)
        }}
      >
        Meklēt galdu
      </button>
    </div>
  )
}

export default SearchBar
