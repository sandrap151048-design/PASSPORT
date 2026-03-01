# Admin Dashboard Setup Guide

## Overview
The admin dashboard allows you to manage Programs (UG/PG/Doctoral), Services, and Countries. All data added through the admin panel will automatically appear on the public pages.

## Features Created

### 1. Admin Dashboard
- **Location**: `/admin` (redirects to `/admin/programs`)
- **Sidebar Navigation**: Programs, Services, Countries
- **Responsive Design**: Works on desktop and mobile

### 2. Admin Pages

#### Programs Management (`/admin/programs`)
- Add/Edit/Delete programs
- Program types: Undergraduate, Postgraduate, Doctoral
- Fields: Name, Type, Duration, Description, Status (Active/Inactive)
- Public page: `/programs` - displays programs by type

#### Services Management (`/admin/services`)
- Add/Edit/Delete services
- Fields: Title, Description, Icon (emoji), Features, Status
- Public page: `/services` - displays all active services

#### Countries Management (`/admin/countries`)
- Add/Edit/Delete countries
- Fields: Name, Description, Image URL, Highlights, Universities, Status
- Public page: `/destinations` - displays all active countries

## Database Models

### Service Model
```javascript
{
  title: String (required),
  description: String (required),
  icon: String,
  features: [String],
  isActive: Boolean (default: true),
  createdAt: Date
}
```

### Country Model
```javascript
{
  name: String (required),
  description: String (required),
  imageUrl: String,
  highlights: [String],
  universities: [String],
  isActive: Boolean (default: true),
  createdAt: Date
}
```

### Program Model (Updated)
```javascript
{
  name: String (required),
  type: String (undergraduate/postgraduate/doctoral),
  duration: String (required),
  description: String,
  highlights: [{name: String, detail: String}],
  isActive: Boolean (default: true),
  createdAt: Date
}
```

## API Endpoints

### Programs
- `GET /api/programs` - Get all active programs
- `GET /api/programs/admin` - Get all programs (admin)
- `POST /api/programs` - Create program
- `PUT /api/programs/:id` - Update program
- `DELETE /api/programs/:id` - Delete program

### Services
- `GET /api/services` - Get all active services
- `GET /api/services/admin` - Get all services (admin)
- `POST /api/services` - Create service
- `PUT /api/services/:id` - Update service
- `DELETE /api/services/:id` - Delete service

### Countries
- `GET /api/countries` - Get all active countries
- `GET /api/countries/admin` - Get all countries (admin)
- `POST /api/countries` - Create country
- `PUT /api/countries/:id` - Update country
- `DELETE /api/countries/:id` - Delete country

## How to Use

### 1. Start the Server
```bash
cd server
npm start
```

### 2. Start the Client
```bash
cd client
npm run dev
```

### 3. Access Admin Dashboard
Navigate to: `http://localhost:3000/admin`

### 4. Add Content
1. Click on the sidebar menu (Programs, Services, or Countries)
2. Click "+ Add" button
3. Fill in the form
4. Click "Save"
5. View the content on the public pages

### 5. Public Pages
- Programs: `http://localhost:3000/programs`
- Services: `http://localhost:3000/services`
- Destinations: `http://localhost:3000/destinations`

## Features

### Admin Dashboard Features
- ✅ Sidebar navigation
- ✅ Add/Edit/Delete functionality
- ✅ Active/Inactive status toggle
- ✅ Responsive table view
- ✅ Form validation
- ✅ Real-time updates

### Public Page Features
- ✅ Fetch data from database
- ✅ Display only active items
- ✅ Loading states
- ✅ Responsive design
- ✅ Animations

## Next Steps

### Optional Enhancements
1. Add authentication for admin access
2. Add image upload functionality
3. Add rich text editor for descriptions
4. Add search and filter in admin tables
5. Add pagination for large datasets
6. Add bulk operations (delete multiple items)
7. Add export/import functionality

## Notes
- All admin pages are currently accessible without authentication
- Consider adding authentication before deploying to production
- The admin panel uses the same styling as the public pages (Tailwind CSS)
- Data is stored in MongoDB and fetched via REST API
