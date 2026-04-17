import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { restaurants } from '../data/restaurants'
import ReservationForm from '../components/ReservationForm'
import './RestaurantDetail.css'

const RestaurantDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [apiRestaurant, setApiRestaurant] = useState(null)
  const isApiRestaurant = id?.startsWith('api-')
  const backendId = isApiRestaurant ? id.replace('api-', '') : null
  const staticRestaurant = restaurants.find((r) => r.id === parseInt(id, 10))
  const restaurant = isApiRestaurant ? apiRestaurant : staticRestaurant

  const [showReservationForm, setShowReservationForm] = useState(false)
  const fallbackBanner = `https://picsum.photos/seed/restaurant-${id}/1400/900`

  useEffect(() => {
    if (!isApiRestaurant || !backendId) return

    const loadApiRestaurant = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/restaurants/${backendId}`)
        const data = await response.json()
        if (!response.ok) return
        setApiRestaurant({
          id: `api-${data.id}`,
          backendId: data.id,
          name: data.name,
          description: data.description,
          cuisine: 'Contemporary',
          rating: 4.4 + ((data.id % 5) * 0.1),
          reviews: 100 + data.id,
          priceRange: '$$',
          location: 'Rīga, Latvija',
          phone: '+371 20 000 000',
          image: `https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=800&fit=crop&sig=${data.id}`,
        })
      } catch (_error) {
        // Keep fallback "not found" state if API call fails.
      }
    }

    loadApiRestaurant()
  }, [backendId, isApiRestaurant])

  if (!restaurant) {
    return (
      <div className="restaurant-detail">
        <div className="content-container">
          <h2>Restorāns nav atrasts</h2>
          <button onClick={() => navigate('/')}>Atpakaļ uz sākumlapu</button>
        </div>
      </div>
    )
  }

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0
    const stars = []

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="star filled">★</span>)
    }
    if (hasHalfStar) {
      stars.push(<span key="half" className="star half">★</span>)
    }
    const emptyStars = 5 - Math.ceil(rating)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="star">★</span>)
    }

    return stars
  }

  return (
    <div className="restaurant-detail">
      <div className="restaurant-hero">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="hero-image"
          onError={(event) => {
            if (event.currentTarget.src !== fallbackBanner) {
              event.currentTarget.src = fallbackBanner
            }
          }}
        />
        <div className="hero-overlay">
          <div className="content-container">
            <button className="back-button" onClick={() => navigate('/')}>
              ← Atpakaļ uz meklēšanu
            </button>
            <h1 className="restaurant-title">{restaurant.name}</h1>
          </div>
        </div>
      </div>

      <div className="content-container">
        <div className="detail-layout">
          <div className="detail-main">
            <div className="restaurant-header-info">
              <div className="rating-section">
                <div className="stars-large">{renderStars(restaurant.rating)}</div>
                <div className="rating-text">
                  <span className="rating-number-large">{restaurant.rating}</span>
                  <span className="review-count-large">({restaurant.reviews} atsauksmes)</span>
                </div>
              </div>
              <div className="restaurant-tags">
                <span className="tag">{restaurant.cuisine}</span>
                <span className="tag">{restaurant.priceRange}</span>
                <span className="tag">{restaurant.location}</span>
              </div>
            </div>

            <div className="section">
              <h2 className="section-title">Par restorānu</h2>
              <p className="description">{restaurant.description}</p>
            </div>

            <div className="section">
              <h2 className="section-title">Detaļas</h2>
              <div className="details-grid">
                <div className="detail-item">
                  <strong>Virtuve:</strong> {restaurant.cuisine}
                </div>
                <div className="detail-item">
                  <strong>Cenu diapazons:</strong> {restaurant.priceRange}
                </div>
                <div className="detail-item">
                  <strong>Adrese:</strong> {restaurant.location}
                </div>
                <div className="detail-item">
                  <strong>Tālrunis:</strong> {restaurant.phone}
                </div>
              </div>
            </div>
          </div>

          <div className="detail-sidebar">
            <div className="reservation-card">
              <h3 className="reservation-title">Rezervēt galdu</h3>
              {!showReservationForm ? (
                <div className="reservation-preview">
                  <p className="reservation-text">Izvēlieties datumu un laiku, lai rezervētu galdu</p>
                  <button
                    className="btn-reserve"
                    onClick={() => setShowReservationForm(true)}
                  >
                    Atrast galdu
                  </button>
                </div>
              ) : (
                <ReservationForm
                  restaurant={restaurant}
                  restaurantId={restaurant.backendId || restaurant.id}
                  onCancel={() => setShowReservationForm(false)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RestaurantDetail
