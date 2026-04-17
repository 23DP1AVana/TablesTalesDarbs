import React, { useEffect, useMemo, useState } from 'react'
import SearchBar from '../components/SearchBar'
import RestaurantCard from '../components/RestaurantCard'
import { restaurants } from '../data/restaurants'
import './HomePage.css'

const API_RESTAURANT_IMAGES = [
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1473496169904-7c8c43404835?w=800&h=600&fit=crop',
]

const mapApiRestaurantToCard = (item) => ({
  id: `api-${item.id}`,
  backendId: item.id,
  name: item.name,
  description: item.description,
  cuisine: item.cuisine || 'Contemporary',
  rating: Number(item.rating ?? 4.0),
  reviews: 100 + item.id,
  priceRange: item.price_range || '$$',
  location: item.location || 'Rīga, Latvija',
  phone: '+371 20 000 000',
  image: API_RESTAURANT_IMAGES[item.id % API_RESTAURANT_IMAGES.length],
})

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [location, setLocation] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [partySize, setPartySize] = useState('2')
  const [selectedCuisine, setSelectedCuisine] = useState('')
  const [showAllRestaurants, setShowAllRestaurants] = useState(false)
  const [apiRestaurants, setApiRestaurants] = useState([])

  useEffect(() => {
    const loadApiRestaurants = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/restaurants?sort=name_asc')
        const data = await response.json()
        if (!response.ok) return
        setApiRestaurants(data.map(mapApiRestaurantToCard))
      } catch (_error) {
        // Keep page usable with static restaurants if API is unavailable.
      }
    }

    loadApiRestaurants()
  }, [])

  const allRestaurants = useMemo(() => {
    return [...restaurants, ...apiRestaurants]
  }, [apiRestaurants])

  const filteredRestaurants = useMemo(() => {
    return allRestaurants.filter(restaurant => {
      const searchLower = searchQuery.toLowerCase().trim()
      const locationLower = location.toLowerCase().trim()
      
      // Ja nav neviena meklēšanas kritērija, rāda visus
      if (!searchLower && !locationLower && !selectedCuisine) {
        return true
      }
      
      // Meklēšana pēc restorāna nosaukuma, virtuves vai lokācijas
      let matchesSearch = true
      
      if (searchLower) {
        // Meklēšanas lauks meklē pēc nosaukuma, virtuves VAI lokācijas
        matchesSearch = 
          restaurant.name.toLowerCase().includes(searchLower) ||
          restaurant.cuisine.toLowerCase().includes(searchLower) ||
          restaurant.location.toLowerCase().includes(searchLower)
      }
      
      // Location lauks meklē tikai pēc lokācijas
      let matchesLocation = true
      if (locationLower) {
        matchesLocation = restaurant.location.toLowerCase().includes(locationLower)
      }
      
      // Ja ir gan searchQuery, gan location, abiem jāatbilst
      if (searchLower && locationLower) {
        matchesSearch = matchesSearch && matchesLocation
      } else if (locationLower && !searchLower) {
        matchesSearch = matchesLocation
      }
      
      const matchesCuisine = !selectedCuisine || restaurant.cuisine === selectedCuisine
      
      return matchesSearch && matchesCuisine
    })
  }, [allRestaurants, searchQuery, location, selectedCuisine])

  const featuredRestaurants = allRestaurants.filter(r => r.rating >= 4.6).slice(0, 6)
  const topRatedRestaurants = [...allRestaurants].sort((a, b) => b.rating - a.rating).slice(0, 6)
  
  const cuisines = [...new Set(allRestaurants.map(r => r.cuisine))]
  
  const displayedRestaurants = showAllRestaurants 
    ? filteredRestaurants 
    : filteredRestaurants.slice(0, 12)
  
  const hasMoreRestaurants = filteredRestaurants.length > 12

  return (
    <div className="homepage">
      <div className="hero-section">
        <div className="hero-background">
          <div className="hero-pattern"></div>
        </div>
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              <span className="title-line">Atrodiet savu</span>
              <span className="title-line highlight">galdu jebkurai</span>
              <span className="title-line">gadījumam</span>
            </h1>
            <p className="hero-subtitle">Atklājiet labākās restorānu rezervācijas visā Latvijā</p>
          </div>
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            location={location}
            setLocation={setLocation}
            date={date}
            setDate={setDate}
            time={time}
            setTime={setTime}
            partySize={partySize}
            setPartySize={setPartySize}
          />
        </div>
      </div>

      {!searchQuery && !location && !selectedCuisine && (
        <>
          <section className="categories-section">
            <div className="content-container">
              <div className="filter-header">
                <h2 className="section-title">Izvēlieties virtuvi</h2>
                <p className="filter-subtitle">Atklājiet dažādas garšas un kultūras</p>
              </div>
              <div className="cuisine-filter-container">
                <div className="cuisine-filter-wrapper">
                  {cuisines.map(cuisine => (
                    <button
                      key={cuisine}
                      className={`cuisine-filter-pill ${selectedCuisine === cuisine ? 'active' : ''}`}
                      onClick={() => setSelectedCuisine(cuisine)}
                    >
                      <span className="cuisine-filter-text">{cuisine}</span>
                      {selectedCuisine === cuisine && (
                        <span className="cuisine-filter-check">×</span>
                      )}
                    </button>
                  ))}
                </div>
                {selectedCuisine && (
                  <button 
                    className="clear-cuisine-filter"
                    onClick={() => setSelectedCuisine('')}
                  >
                    Notīrīt filtru
                  </button>
                )}
              </div>
            </div>
          </section>

          <section className="featured-section">
            <div className="content-container">
              <div className="section-header">
                <h2 className="section-title">Ieteicamie restorāni</h2>
                <p className="section-subtitle">Labākās vērtējuma restorāni, ko mūsu klienti ieteic</p>
              </div>
              <div className="restaurants-grid">
                {featuredRestaurants.map(restaurant => (
                  <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                ))}
              </div>
            </div>
          </section>

          <section className="top-rated-section">
            <div className="content-container">
              <div className="section-header">
                <h2 className="section-title">Augstāk novērtētie</h2>
                <p className="section-subtitle">Restorāni ar augstākajiem vērtējumiem</p>
              </div>
              <div className="restaurants-grid">
                {topRatedRestaurants.map(restaurant => (
                  <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      <section className="all-restaurants-section">
        <div className="content-container">
          <div className="section-header">
            <div className="section-header-top">
              <h2 className="section-title">
                {selectedCuisine ? `${selectedCuisine} restorāni` : 
                 searchQuery || location ? `Meklēšanas rezultāti${searchQuery ? `: "${searchQuery}"` : ''}${location ? ` ${location}` : ''}` : 
                 'Visi restorāni'}
              </h2>
              {(selectedCuisine || searchQuery || location) && (
                <button className="clear-filter" onClick={() => { 
                  setSelectedCuisine(''); 
                  setSearchQuery(''); 
                  setLocation('');
                  setShowAllRestaurants(false);
                }}>
                  Notīrīt filtru
                </button>
              )}
            </div>
            <div className="quick-search-row">
              <input
                type="text"
                className="quick-restaurant-search"
                placeholder="Ātrā meklēšana pēc restorāna nosaukuma..."
                value={searchQuery}
                onChange={(event) => {
                  setSearchQuery(event.target.value)
                  setShowAllRestaurants(false)
                }}
              />
            </div>
            <p className="section-subtitle">
              Pieejami {filteredRestaurants.length} {filteredRestaurants.length === 1 ? 'restorāns' : 'restorāni'}
              {!showAllRestaurants && hasMoreRestaurants && ` (rāda ${displayedRestaurants.length} no ${filteredRestaurants.length})`}
            </p>
          </div>

          <div className="restaurants-grid">
            {displayedRestaurants.map(restaurant => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
          
          {hasMoreRestaurants && (
            <div className="load-more-container">
              <button 
                className="load-more-button"
                onClick={() => setShowAllRestaurants(!showAllRestaurants)}
              >
                {showAllRestaurants ? 'Rādīt mazāk' : `Rādīt vairāk (vēl ${filteredRestaurants.length - 12})`}
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default HomePage
