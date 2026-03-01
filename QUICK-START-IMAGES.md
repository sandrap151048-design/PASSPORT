# Quick Start: Adding Images to Your Website

## The Fastest Way to Get Images

### Step 1: Open Terminal in Client Folder
```bash
cd client
```

### Step 2: Run the Download Script
```bash
node download-images.js
```

This will automatically download all 23 required images from Unsplash.

### Step 3: Refresh Your Browser
Press `Ctrl+F5` (Windows) or `Cmd+Shift+R` (Mac) to hard refresh.

## That's It! 🎉

Your website will now show beautiful photos on:
- Home page hero slider
- All destination cards (Malta, South Korea, Malaysia, etc.)
- Services section
- Programs page
- About page
- All study abroad country pages

## Alternative: Manual Download

If the script doesn't work, you can manually download images:

1. Go to https://unsplash.com
2. Search for relevant images (e.g., "malta valletta", "students studying")
3. Download and save them in `client/public/images/`
4. Use these exact filenames:

**Hero Images:**
- hero-1.jpg
- hero-2.jpg
- hero-3.jpg

**Destinations:**
- destination-malta.jpg
- destination-south-korea.jpg
- destination-malaysia.jpg
- destination-new-zealand.jpg
- destination-singapore.jpg
- destination-mauritius.jpg

**Services:**
- service-study-abroad.jpg
- service-visa.jpg
- service-immigration.jpg
- service-work-visa.jpg
- service-scholarship.jpg
- service-settlement.jpg

**Programs:**
- programs-hero.jpg
- premium-education.jpg
- bachelor-programs.jpg
- master-programs.jpg

**About:**
- about-hero.jpg
- mission.jpg
- vision.jpg
- values.jpg

## Troubleshooting

**Images not showing?**
1. Check filenames match exactly (case-sensitive)
2. Make sure images are in `client/public/images/` folder
3. Hard refresh browser (Ctrl+F5)
4. Check browser console for errors (F12)

**Script not working?**
1. Make sure you're in the `client` folder
2. Check if Node.js is installed: `node --version`
3. Try manual download instead

## Need More Help?

Check these files:
- `IMAGE-SETUP-COMPLETE.md` - Full summary of changes
- `client/public/images/README.md` - Image requirements
- `client/public/images/DOWNLOAD-INSTRUCTIONS.md` - Detailed download links
