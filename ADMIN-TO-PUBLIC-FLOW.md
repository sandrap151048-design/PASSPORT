# Admin Dashboard to Public Pages Flow

## How It Works

When you add content in the admin dashboard, it automatically appears on the public pages. Here's the complete flow:

## 1. Programs Management

### Admin Side (`/admin/programs`)
- Add/Edit/Delete programs
- Set program type: Undergraduate, Postgraduate, or Doctoral
- Toggle Active/Inactive status

### Public Side (`/programs`)
- **API Endpoint**: `GET /api/programs`
- **Filters**: Only shows programs where `isActive: true`
- **Display**: Programs are grouped by type (UG/PG/Doctoral)
- **Auto-refresh**: Page fetches latest data on load

### Test Flow:
1. Go to `http://localhost:3000/admin/programs`
2. Click "+ Add Program"
3. Fill in:
   - Name: "Bachelor of Computer Science"
   - Type: Undergraduate
   - Duration: "3-4 years"
   - Description: "Comprehensive CS program"
   - Active: ✓ Checked
4. Click "Save Program"
5. Open `http://localhost:3000/programs` in a new tab
6. You'll see your program in the "Undergraduate" section!

---

## 2. Services Management

### Admin Side (`/admin/services`)
- Add/Edit/Delete services
- Add service icon (emoji or text)
- Toggle Active/Inactive status

### Public Side (`/services`)
- **API Endpoint**: `GET /api/services`
- **Filters**: Only shows services where `isActive: true`
- **Display**: Grid layout with service cards
- **Auto-refresh**: Page fetches latest data on load

### Test Flow:
1. Go to `http://localhost:3000/admin/services`
2. Click "+ Add Service"
3. Fill in:
   - Title: "Study Abroad Consulting"
   - Description: "Complete guidance for international education"
   - Icon: "🎓" (optional)
   - Active: ✓ Checked
4. Click "Save Service"
5. Open `http://localhost:3000/services` in a new tab
6. You'll see your service card displayed!

---

## 3. Countries Management

### Admin Side (`/admin/countries`)
- Add/Edit/Delete countries
- Add country image URL
- Add highlights and universities
- Toggle Active/Inactive status

### Public Side (`/destinations`)
- **API Endpoint**: `GET /api/countries`
- **Filters**: Only shows countries where `isActive: true`
- **Display**: Grid layout with country cards
- **Auto-refresh**: Page fetches latest data on load

### Test Flow:
1. Go to `http://localhost:3000/admin/countries`
2. Click "+ Add Country"
3. Fill in:
   - Name: "United Kingdom"
   - Description: "World-class education with rich history"
   - Image URL: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad"
   - Active: ✓ Checked
4. Click "Save Country"
5. Open `http://localhost:3000/destinations` in a new tab
6. You'll see your country card displayed!

---

## API Endpoints Summary

### Programs
- `GET /api/programs` - Public (active only)
- `GET /api/programs/admin` - Admin (all programs)
- `POST /api/programs` - Create
- `PUT /api/programs/:id` - Update
- `DELETE /api/programs/:id` - Delete

### Services
- `GET /api/services` - Public (active only)
- `GET /api/services/admin` - Admin (all services)
- `POST /api/services` - Create
- `PUT /api/services/:id` - Update
- `DELETE /api/services/:id` - Delete

### Countries
- `GET /api/countries` - Public (active only)
- `GET /api/countries/admin` - Admin (all countries)
- `POST /api/countries` - Create
- `PUT /api/countries/:id` - Update
- `DELETE /api/countries/:id` - Delete

---

## Important Notes

### Active/Inactive Toggle
- **Active (✓)**: Content appears on public pages
- **Inactive (✕)**: Content hidden from public, only visible in admin

### Real-time Updates
- Changes in admin are saved to MongoDB
- Public pages fetch fresh data on each page load
- To see updates, refresh the public page

### Data Flow
```
Admin Dashboard → API (POST/PUT) → MongoDB → API (GET) → Public Pages
```

---

## Quick Test Checklist

- [ ] Add a program in admin → Check `/programs` page
- [ ] Add a service in admin → Check `/services` page
- [ ] Add a country in admin → Check `/destinations` page
- [ ] Toggle program to inactive → Verify it disappears from public page
- [ ] Edit a service → Verify changes appear on public page
- [ ] Delete a country → Verify it's removed from public page

---

## Troubleshooting

### Content not appearing on public pages?
1. Check if the item is marked as "Active" in admin
2. Refresh the public page (Ctrl+F5 or Cmd+Shift+R)
3. Check browser console for API errors
4. Verify MongoDB is connected (check server terminal)

### Changes not saving?
1. Check server terminal for errors
2. Verify MongoDB connection
3. Check network tab in browser DevTools
4. Ensure all required fields are filled

### API Connection Issues?
1. Verify server is running on port 5000
2. Verify client is running on port 3000
3. Check CORS settings in server.js
4. Check API_URL in client pages
