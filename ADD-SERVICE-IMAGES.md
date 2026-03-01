# How to Add Photos to Service Cards

## The Issue
External image URLs (Unsplash, Picsum) are being blocked in your environment, so you're seeing gradient fallback colors instead of actual photos.

## Solution: Add Local Images

### Step 1: Download Images
Download 6 images for the service cards and save them with these exact names:

1. **service-study-abroad.jpg** - Students studying, classroom, or university campus
2. **service-visa.jpg** - Passport, visa stamps, or travel documents
3. **service-immigration.jpg** - Airport, immigration desk, or international travel
4. **service-work-visa.jpg** - Business professional, office, or workplace
5. **service-scholarship.jpg** - Graduation, student with books, or academic achievement
6. **service-settlement.jpg** - New home, family moving, or accommodation

### Step 2: Save Images
Place all 6 images in: `client/public/images/`

### Step 3: Update the Code
The code is already configured to use local images. Just make sure the files exist in the correct location.

## Quick Test
1. Download ANY image from the internet
2. Rename it to `service-study-abroad.jpg`
3. Put it in `client/public/images/`
4. Refresh the home page
5. You should see your image in the Study Abroad card!

## Where to Get Images
- **Unsplash.com** - Free high-quality photos
- **Pexels.com** - Free stock photos
- **Pixabay.com** - Free images
- Or use your own photos

## Current Status
✅ Code is configured for both external URLs and local images
✅ Gradient fallbacks are in place (that's the violet color you're seeing)
⚠️ Actual image files need to be added to `client/public/images/`

## Alternative: Use the Download Script
Run this command to automatically download images:
```bash
cd client
node download-images.js
```

This will download all required images including the service card images.
