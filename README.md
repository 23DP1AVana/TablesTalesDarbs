# Tables & Tales (PHP + SQLite)

Academic full-stack web app with role-based access, CRUD, filtering/search/sort, JOIN queries, statistics, and basic PWA support.

## Stack
- Backend: PHP (no framework), PDO, SQLite
- Frontend: HTML, CSS, JavaScript
- Pattern: MVC-like (`Controllers`, `Models`, `views`)

## Project Structure
- `public/` - front controller, assets, PWA files
- `src/Core/` - DB singleton and app bootstrap
- `src/core/` - helpers and security helpers
- `src/Controllers/` - route handlers
- `src/Models/` - DB access (prepared statements)
- `src/views/` - UI pages/templates
- `database/schema.sql` - SQL schema and default admin seed

## Setup
1. Install PHP 8+ with SQLite extension.
2. From project root, run:
   - `php -S localhost:8000 -t public`
3. Open [http://localhost:8000](http://localhost:8000)
4. Default admin:
   - Email: `admin@local.test`
   - Password: `Admin123!`

## Implemented Requirements
- 4 related tables (`users`, `restaurants`, `reservations`, `messages`) with foreign keys
- Authentication and password hashing (`password_hash`, `password_verify`)
- Session-based authentication and role-based authorization:
  - `admin`
  - `representative`
  - `user`
- Required pages:
  - Home
  - Login/Register
  - Restaurants listing
  - Contact Us
  - Dashboard (role-aware)
- Bonus pages:
  - Admin panel
  - User profile
  - Reservation management
- CRUD support for major entities
- Search/filter/sort on restaurants and reservations
- JOIN queries in restaurant owner and reservation list views
- Reservation statistics per restaurant
- OWASP-oriented measures:
  - PDO prepared statements
  - CSRF token checks on forms
  - Output escaping (`htmlspecialchars`)
  - Basic input sanitization/validation
- WCAG-friendly basics:
  - semantic headings/forms
  - labels for fields
  - responsive/mobile layout

## Test Cases (manual)
1. Register a new user with valid data -> account created, can login.
2. Login with wrong password -> error message, no session set.
3. User role creates reservation -> row appears in reservation list.
4. Representative/admin updates reservation status -> status changes correctly.
5. Contact form with invalid email -> rejected; valid message saved in `messages`.
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
