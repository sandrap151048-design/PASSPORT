# World Passport Clone - MERN + Next.js

A complete passport/visa services and study abroad consultancy platform inspired by worldpassport.in

## Tech Stack
- **Frontend**: Next.js 14, React 18, Tailwind CSS
- **Backend**: Node.js, Express, MongoDB
- **Database**: MongoDB with Mongoose

## Features
✅ Responsive navigation bar
✅ Hero slider with 3 rotating slides
✅ About section with company highlights
✅ Services showcase (6 services)
✅ Study abroad destinations (fetched from backend)
✅ Student testimonials
✅ Consultation booking form (connected to backend)
✅ Footer with contact info
✅ Orange/Gold color theme matching original site
✅ Full backend API integration

## Project Structure
```
worldpassport-clone/
├── client/                 # Next.js frontend
│   ├── components/        # React components
│   ├── pages/            # Next.js pages
│   ├── styles/           # CSS styles
│   └── package.json
├── server/                # Express backend
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   └── server.js
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (running locally or MongoDB Atlas)

### Backend Setup
```bash
cd server
npm install
node seed.js          # Seed sample data
npm run dev          # Start backend on port 5000
```

### Frontend Setup
```bash
cd client
npm install
npm run dev          # Start frontend on port 3000
```

## Environment Variables

### Server (.env)
```
MONGODB_URI=mongodb://localhost:27017/worldpassport
PORT=5000
```

### Client (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## API Endpoints

- `GET /api/destinations` - Get all destinations
- `POST /api/destinations` - Create new destination
- `POST /api/consultations` - Submit consultation request
- `GET /api/consultations` - Get all consultations
- `POST /api/contacts` - Submit contact message

## Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

## Features Implemented

1. **Navigation Bar** - Sticky header with mobile menu
2. **Hero Section** - Carousel with 3 slides
3. **About Section** - Company overview with key features
4. **Services** - 6 service cards with icons
5. **Destinations** - Dynamic destinations from database
6. **Testimonials** - Student reviews
7. **Consultation Form** - Connected to backend API
8. **Footer** - Contact info and links

## Color Scheme
- Primary: Orange (#ff6b35, #ffa500)
- Secondary: White, Gray
- Accent: Dark gray for footer

## Notes
- Both servers run in watch mode (auto-reload on changes)
- MongoDB must be running before starting the backend
- Sample data is seeded using `node seed.js`
- Frontend fetches destinations from backend API
- Form submissions are stored in MongoDB
