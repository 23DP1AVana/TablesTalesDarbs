import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import AuthPage from './pages/AuthPage'
import RestaurantDetail from './pages/RestaurantDetail'
import './App.css'

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="app-main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/restaurant/:id" element={<RestaurantDetail />} />
        </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
