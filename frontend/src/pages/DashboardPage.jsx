import React, { useEffect, useState } from 'react'
import './DashboardPage.css'

const DashboardPage = () => {
  const token = localStorage.getItem('auth_token')
  const user = JSON.parse(localStorage.getItem('auth_user') || 'null')
  const [restaurants, setRestaurants] = useState([])
  const [reservations, setReservations] = useState([])
  const [stats, setStats] = useState(null)
  const [messages, setMessages] = useState([])
  const [reservationStatusFilter, setReservationStatusFilter] = useState('')
  const [restaurantSearch, setRestaurantSearch] = useState('')
  const [restaurantForm, setRestaurantForm] = useState({ id: null, name: '', description: '' })
  const [reservationStatusMap, setReservationStatusMap] = useState({})
  const [info, setInfo] = useState('')
  const [error, setError] = useState('')

  const authHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  }

  const canManageRestaurants = user?.role === 'admin' || user?.role === 'representative'
  const canManageReservationStatus = user?.role === 'admin' || user?.role === 'representative'

  const loadData = async () => {
    try {
      setError('')
      const restaurantsResponse = await fetch('http://127.0.0.1:8000/api/restaurants?sort=name_asc')
      const restaurantsData = await restaurantsResponse.json()
      if (restaurantsResponse.ok) {
        setRestaurants(restaurantsData)
      }

      const reservationUrl = reservationStatusFilter
        ? `http://127.0.0.1:8000/api/reservations?status=${reservationStatusFilter}`
        : 'http://127.0.0.1:8000/api/reservations'
      const reservationResponse = await fetch(reservationUrl, { headers: authHeaders })
      const reservationData = await reservationResponse.json()
      if (reservationResponse.ok) {
        setReservations(reservationData)
      }

      if (user?.role === 'admin' || user?.role === 'representative') {
        const statsResponse = await fetch('http://127.0.0.1:8000/api/stats', { headers: authHeaders })
        const statsData = await statsResponse.json()
        if (statsResponse.ok) {
          setStats(statsData)
        }
      }

      if (user?.role === 'admin') {
        const messageResponse = await fetch('http://127.0.0.1:8000/api/messages', { headers: authHeaders })
        const messageData = await messageResponse.json()
        if (messageResponse.ok) {
          setMessages(messageData)
        }
      }
    } catch (requestError) {
      setError(requestError.message)
    }
  }

  useEffect(() => {
    loadData()
  }, [reservationStatusFilter, token, user?.role])

  const onRestaurantFormChange = (event) => {
    setRestaurantForm((prev) => ({ ...prev, [event.target.name]: event.target.value }))
  }

  const startEditRestaurant = (restaurant) => {
    setRestaurantForm({
      id: restaurant.id,
      name: restaurant.name,
      description: restaurant.description,
    })
  }

  const resetRestaurantForm = () => {
    setRestaurantForm({ id: null, name: '', description: '' })
  }

  const saveRestaurant = async (event) => {
    event.preventDefault()
    setError('')
    setInfo('')
    try {
      const payload = {
        name: restaurantForm.name,
        description: restaurantForm.description,
      }
      const isUpdate = Boolean(restaurantForm.id)
      const url = isUpdate
        ? `http://127.0.0.1:8000/api/restaurants/${restaurantForm.id}`
        : 'http://127.0.0.1:8000/api/restaurants'
      const method = isUpdate ? 'PUT' : 'POST'
      const response = await fetch(url, {
        method,
        headers: authHeaders,
        body: JSON.stringify(payload),
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || 'Neizdevas saglabat restoranu')
      }
      setInfo(isUpdate ? 'Restorans atjaunots.' : 'Restorans izveidots.')
      resetRestaurantForm()
      await loadData()
    } catch (requestError) {
      setError(requestError.message)
    }
  }

  const deleteRestaurant = async (id) => {
    setError('')
    setInfo('')
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/restaurants/${id}`, {
        method: 'DELETE',
        headers: authHeaders,
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || 'Neizdevas dzest restoranu')
      }
      setInfo('Restorans izdzests.')
      await loadData()
    } catch (requestError) {
      setError(requestError.message)
    }
  }

  const updateReservationStatus = async (reservationId) => {
    const selectedStatus = reservationStatusMap[reservationId] || 'pending'
    setError('')
    setInfo('')
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/reservations/${reservationId}`, {
        method: 'PUT',
        headers: authHeaders,
        body: JSON.stringify({ status: selectedStatus }),
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || 'Neizdevas mainit statusu')
      }
      setInfo('Rezervacijas statuss atjaunots.')
      await loadData()
    } catch (requestError) {
      setError(requestError.message)
    }
  }

  const deleteReservation = async (reservationId) => {
    setError('')
    setInfo('')
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/reservations/${reservationId}`, {
        method: 'DELETE',
        headers: authHeaders,
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || 'Neizdevas dzest rezervaciju')
      }
      setInfo('Rezervacija izdzesta.')
      await loadData()
    } catch (requestError) {
      setError(requestError.message)
    }
  }

  const filteredRestaurants = restaurants.filter((restaurant) => {
    return restaurant.name.toLowerCase().includes(restaurantSearch.toLowerCase())
  })

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>Dashboard</h1>
          <p>
            Sveiks, <strong>{user?.username}</strong> ({user?.role})
          </p>
        </div>

        {(user?.role === 'admin' || user?.role === 'representative') && stats && (
          <section className="dashboard-section">
            <h2>Statistika</h2>
            <div className="dashboard-stats-grid">
              <div className="dashboard-stat-card">
                <span>Lietotaji</span>
                <strong>{stats.total_users}</strong>
              </div>
              <div className="dashboard-stat-card">
                <span>Restorani</span>
                <strong>{stats.total_restaurants}</strong>
              </div>
              <div className="dashboard-stat-card">
                <span>Rezervacijas</span>
                <strong>{stats.total_reservations}</strong>
              </div>
            </div>
          </section>
        )}

        <section className="dashboard-section">
          <div className="dashboard-section-title-row">
            <h2>Restorani</h2>
            <input
              className="dashboard-inline-input"
              placeholder="Meklet restoranu"
              value={restaurantSearch}
              onChange={(event) => setRestaurantSearch(event.target.value)}
            />
          </div>

          {canManageRestaurants && (
            <form className="dashboard-form" onSubmit={saveRestaurant}>
              <input
                name="name"
                placeholder="Restorana nosaukums"
                value={restaurantForm.name}
                onChange={onRestaurantFormChange}
                required
              />
              <textarea
                name="description"
                placeholder="Restorana apraksts"
                value={restaurantForm.description}
                onChange={onRestaurantFormChange}
                rows="3"
                required
              />
              <div className="dashboard-btn-row">
                <button type="submit">
                  {restaurantForm.id ? 'Atjaunot restoranu' : 'Pievienot restoranu'}
                </button>
                {restaurantForm.id && (
                  <button type="button" className="btn-secondary" onClick={resetRestaurantForm}>
                    Atcelt redigesanu
                  </button>
                )}
              </div>
            </form>
          )}

          <div className="dashboard-list">
            {filteredRestaurants.map((restaurant) => (
              <div className="dashboard-list-item" key={restaurant.id}>
                <p><strong>{restaurant.name}</strong></p>
                <p>{restaurant.description}</p>
                <p>Owner: {restaurant.owner?.username || 'Nav piesaistits'}</p>
                {canManageRestaurants && (
                  <div className="dashboard-btn-row">
                    <button type="button" onClick={() => startEditRestaurant(restaurant)}>Rediget</button>
                    <button type="button" className="btn-danger" onClick={() => deleteRestaurant(restaurant.id)}>
                      Dzest
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="dashboard-section">
          <div className="dashboard-section-title-row">
            <h2>Rezervacijas</h2>
            <select
              className="dashboard-inline-input"
              value={reservationStatusFilter}
              onChange={(event) => setReservationStatusFilter(event.target.value)}
            >
              <option value="">Visi statusi</option>
              <option value="pending">pending</option>
              <option value="approved">approved</option>
              <option value="cancelled">cancelled</option>
            </select>
          </div>

          {reservations.length === 0 ? (
            <p>Pagaidam nav rezervaciju.</p>
          ) : (
            <div className="dashboard-list">
              {reservations.map((item) => (
                <div className="dashboard-list-item" key={item.id}>
                  <p><strong>{item.restaurant?.name}</strong></p>
                  <p>Statuss: {item.status}</p>
                  <p>Laiks: {new Date(item.reservation_at).toLocaleString()}</p>
                  <p>Lietotajs: {item.user?.username || 'N/A'}</p>
                  <div className="dashboard-btn-row">
                    {canManageReservationStatus && (
                      <>
                        <select
                          value={reservationStatusMap[item.id] || item.status}
                          onChange={(event) =>
                            setReservationStatusMap((prev) => ({ ...prev, [item.id]: event.target.value }))
                          }
                        >
                          <option value="pending">pending</option>
                          <option value="approved">approved</option>
                          <option value="cancelled">cancelled</option>
                        </select>
                        <button type="button" onClick={() => updateReservationStatus(item.id)}>
                          Saglabat statusu
                        </button>
                      </>
                    )}
                    <button type="button" className="btn-danger" onClick={() => deleteReservation(item.id)}>
                      Dzest rezervaciju
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {user?.role === 'admin' && (
          <section className="dashboard-section">
            <h2>Contact ziņas</h2>
            <div className="dashboard-list">
              {messages.map((item) => (
                <div className="dashboard-list-item" key={item.id}>
                  <p><strong>{item.name}</strong> ({item.email})</p>
                  <p>{item.message}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {info && <p className="dashboard-info">{info}</p>}
        {error && <p className="dashboard-error">{error}</p>}
      </div>
    </div>
  )
}

export default DashboardPage
