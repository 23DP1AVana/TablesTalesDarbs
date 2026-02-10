import React, { useState, useMemo } from 'react'
import SearchBar from '../components/SearchBar'
import RestaurantCard from '../components/RestaurantCard'
import { restaurants } from '../data/restaurants'
import './HomePage.css'

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [location, setLocation] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [partySize, setPartySize] = useState('2')
  const [selectedCuisine, setSelectedCuisine] = useState('')
  const [showAllRestaurants, setShowAllRestaurants] = useState(false)

  const filteredRestaurants = useMemo(() => {
    return restaurants.filter(restaurant => {
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
  }, [searchQuery, location, selectedCuisine])

  const featuredRestaurants = restaurants.filter(r => r.rating >= 4.6).slice(0, 6)
  const topRatedRestaurants = [...restaurants].sort((a, b) => b.rating - a.rating).slice(0, 6)
  
  const cuisines = [...new Set(restaurants.map(r => r.cuisine))]
  
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

const getCuisineIcon = (cuisine) => {
  const icons = {
    'Latvian': '🥘',
    'European': '🍽️',
    'Contemporary': '✨',
    'Mediterranean': '🍅',
    'French': '🥖',
    'Japanese': '🍣',
    'Italian': '🍝',
    'Steakhouse': '🥩',
    'Thai': '🍜',
    'Seafood': '🐟',
    'Vegetarian': '🥗',
    'Pizza': '🍕',
    'Middle Eastern': '🥙',
    'Bakery': '🥐',
    'Medieval': '⚔️',
    'American': '🍔',
    'Indian': '🍛',
    'Scandinavian': '🦌',
    'Argentine': '🥩',
    'Chinese': '🥢'
  }
  return icons[cuisine] || '🍴'
}

const getCuisineStyle = (cuisine) => {
  const gradients = {
    'Latvian': 'linear-gradient(135deg, #c9a961 0%, #8b6914 100%)',
    'European': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'Contemporary': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'Mediterranean': 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    'French': 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
    'Japanese': 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    'Italian': 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    'Steakhouse': 'linear-gradient(135deg, #ff6b6b 0%, #c92a2a 100%)',
    'Thai': 'linear-gradient(135deg, #fad961 0%, #f76b1c 100%)',
    'Seafood': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'Vegetarian': 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'Pizza': 'linear-gradient(135deg, #fa8bff 0%, #2bd2ff 100%)',
    'Middle Eastern': 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)',
    'Bakery': 'linear-gradient(135deg, #fdc830 0%, #f37335 100%)',
    'Medieval': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'American': 'linear-gradient(135deg, #ee0979 0%, #ff6a00 100%)',
    'Indian': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'Scandinavian': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'Argentine': 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    'Chinese': 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)'
  }
  return {
    '--cuisine-gradient': gradients[cuisine] || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  }
}

export default HomePage
