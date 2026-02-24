import React from 'react'
import { Link } from 'react-router-dom'
import './RestaurantCard.css'

const RestaurantCard = ({ restaurant }) => {
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
    <Link to={`/restaurant/${restaurant.id}`} className="restaurant-card">
      <div className="restaurant-image-container">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="restaurant-image"
        />
        <div className="restaurant-badge">{restaurant.cuisine}</div>
      </div>
      <div className="restaurant-info">
        <h3 className="restaurant-name">{restaurant.name}</h3>
        <div className="restaurant-rating">
          <div className="stars">{renderStars(restaurant.rating)}</div>
          <span className="rating-number">{restaurant.rating}</span>
          <span className="review-count">({restaurant.reviews} atsauksmes)</span>
        </div>
        <div className="restaurant-meta">
          <span className="cuisine">{restaurant.cuisine}</span>
          <span className="price-range">{restaurant.priceRange}</span>
          <span className="location">{restaurant.location}</span>
        </div>
      </div>
    </Link>
  )
}

export default RestaurantCard
