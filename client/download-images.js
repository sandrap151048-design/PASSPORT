const https = require('https');
const fs = require('fs');
const path = require('path');

// Create images directory if it doesn't exist
const imagesDir = path.join(__dirname, 'public', 'images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Image URLs and filenames
const images = [
  // Hero Images (Home Page)
  {
    url: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=1024&q=60',
    filename: 'hero-1.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1549144511-f099e773c147?w=1024&q=60',
    filename: 'hero-2.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1024&q=60',
    filename: 'hero-3.jpg'
  },
  // Programs Page Images
  {
    url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1024&q=60',
    filename: 'programs-hero.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=480&q=60',
    filename: 'premium-education.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=480&q=60',
    filename: 'bachelor-programs.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=480&q=60',
    filename: 'master-programs.jpg'
  },
  // About Page Images
  {
    url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1024&q=60',
    filename: 'about-hero.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=480&q=60',
    filename: 'mission.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=480&q=60',
    filename: 'vision.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=480&q=60',
    filename: 'values.jpg'
  },
  // Contact Page Hero
  {
    url: 'https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1024&q=60',
    filename: 'contact-hero.jpg'
  },
  // Partners Page Hero
  {
    url: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1024&q=60',
    filename: 'partners-hero.jpg'
  },
  // Service Images
  {
    url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=480&q=60',
    filename: 'service-study-abroad.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=480&q=60',
    filename: 'service-visa.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1569098644584-210bcd375b59?w=480&q=60',
    filename: 'service-immigration.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=480&q=60',
    filename: 'service-work-visa.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=480&q=60',
    filename: 'service-scholarship.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=480&q=60',
    filename: 'service-settlement.jpg'
  },
  // Destination Images
  {
    url: 'https://images.unsplash.com/photo-1549144511-f099e773c147?w=480&q=60',
    filename: 'destination-malta.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=480&q=60',
    filename: 'destination-south-korea.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=480&q=60',
    filename: 'destination-malaysia.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=480&q=60',
    filename: 'destination-new-zealand.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=480&q=60',
    filename: 'destination-singapore.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=480&q=60',
    filename: 'destination-mauritius.jpg'
  },
  // Additional Assets
  {
    url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1024&q=60',
    filename: 'stats-bg.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=480&q=60',
    filename: 'why-choose-us.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1024&q=60',
    filename: 'login-bg.jpg'
  }
];

// Download function
function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const filepath = path.join(imagesDir, filename);

    // Force overwrite for optimization
    const file = fs.createWriteStream(filepath);

    https.get(url, (response) => {
      response.pipe(file);

      file.on('finish', () => {
        file.close();
        console.log(`✓ Downloaded: ${filename}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => { });
      console.error(`✗ Failed to download ${filename}:`, err.message);
      reject(err);
    });
  });
}

// Download all images
async function downloadAllImages() {
  console.log('Starting image downloads...\n');
  console.log(`Total images to download: ${images.length}\n`);

  for (const image of images) {
    try {
      await downloadImage(image.url, image.filename);
    } catch (error) {
      console.error(`Error downloading ${image.filename}`);
    }
  }

  console.log('\n✓ All downloads complete!');
  console.log(`✓ ${images.length} images ready in client/public/images/`);
  console.log('\nRefresh your browser to see the images.');
}

downloadAllImages();
