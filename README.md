# Tables - Restaurant Reservation Platform

A professional React application inspired by OpenTable, allowing users to search for restaurants, view details, and make reservations.

## Features

- 🍽️ Restaurant search and filtering
- 📍 Location-based search
- ⭐ Restaurant ratings and reviews
- 📅 Date and time selection
- 👥 Party size selection
- 📋 Detailed restaurant pages
- ✅ Reservation booking system
- 📱 Responsive design

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Tech Stack

- React 18
- React Router DOM
- Vite
- CSS3

## Project Structure

```
src/
├── components/      # Reusable components
│   ├── Header.jsx
│   ├── SearchBar.jsx
│   ├── RestaurantCard.jsx
│   └── ReservationForm.jsx
├── pages/          # Page components
│   ├── HomePage.jsx
│   └── RestaurantDetail.jsx
├── data/           # Sample data
│   └── restaurants.js
├── App.jsx         # Main app component
└── main.jsx        # Entry point
```

## Features Overview

### Homepage
- Hero section with search functionality
- Restaurant grid display
- Real-time search filtering

### Restaurant Detail Page
- Large hero image
- Restaurant information and ratings
- Reservation form
- Contact details

### Reservation System
- Date and time selection
- Party size options
- Guest information form
- Confirmation screen
