import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { restaurants } from '../data/restaurants'
import ReservationForm from '../components/ReservationForm'
import './RestaurantDetail.css'

const RestaurantDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const restaurant = restaurants.find(r => r.id === parseInt(id))

  const [showReservationForm, setShowReservationForm] = useState(false)
  const fallbackBanner = `https://picsum.photos/seed/restaurant-${id}/1400/900`

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
