import React from 'react'
import { BrowserRouter as Router, Navigate, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import AuthPage from './pages/AuthPage'
import RestaurantDetail from './pages/RestaurantDetail'
import ContactPage from './pages/ContactPage'
import DashboardPage from './pages/DashboardPage'
import './App.css'

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('auth_token')
  if (!token) {
    return <Navigate to="/auth" replace />
  }
  return children
}

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
          <Route path="/contact" element={<ContactPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route path="/restaurant/:id" element={<RestaurantDetail />} />
        </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
