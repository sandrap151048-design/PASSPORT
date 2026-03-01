# Images Folder

This folder contains all images used throughout the World Passport website.

## Current Status
⚠️ **IMAGES NOT YET ADDED** - The website is configured to use local images, but the actual image files need to be downloaded and placed in this folder.

## Required Images

### Total: 23 images needed

1. **Home Page Hero Slider** (3 images)
   - hero-1.jpg, hero-2.jpg, hero-3.jpg

2. **Destination Cards** (6 images)
   - destination-malta.jpg
   - destination-south-korea.jpg
   - destination-malaysia.jpg
   - destination-new-zealand.jpg
   - destination-singapore.jpg
   - destination-mauritius.jpg

3. **Services Section** (6 images)
   - service-study-abroad.jpg
   - service-visa.jpg
   - service-immigration.jpg
   - service-work-visa.jpg
   - service-scholarship.jpg
   - service-settlement.jpg

4. **Programs Page** (4 images)
   - programs-hero.jpg
   - premium-education.jpg
   - bachelor-programs.jpg
   - master-programs.jpg

5. **About Page** (4 images)
   - about-hero.jpg
   - mission.jpg
   - vision.jpg
   - values.jpg

## How to Add Images

### Option 1: Automatic Download (Recommended)
Run the download script from the client folder:
```bash
cd client
node download-images.js
```

### Option 2: Manual Download
See `DOWNLOAD-INSTRUCTIONS.md` for detailed download links and instructions.

### Option 3: Use Your Own Images
You can use your own images! Just make sure to:
1. Name them exactly as listed above
2. Use JPG format
3. Recommended sizes:
   - Hero images: 1920x800px or larger
   - Card images: 640x480px or larger
   - Service images: 640x480px or larger

## After Adding Images

1. Refresh your browser (Ctrl+F5 or Cmd+Shift+R)
2. Images should appear immediately
3. No need to restart the Next.js server

## Troubleshooting

If images don't appear:
1. Check that filenames match exactly (case-sensitive)
2. Ensure images are in JPG format
3. Check browser console for errors (F12)
4. Clear browser cache and refresh

## Image Sources

All suggested images are from Unsplash (free to use):
- https://unsplash.com

You can also use images from:
- Pexels: https://pexels.com
- Pixabay: https://pixabay.com
- Your own photography

## Need Help?

Check `DOWNLOAD-INSTRUCTIONS.md` for step-by-step guidance.
