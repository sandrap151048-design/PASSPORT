const fs = require('fs');
const path = require('path');

const services = [
    {
        _id: 'ser_1',
        title: 'Overseas Education',
        description: 'Comprehensive guidance for students to choose the best universities and courses globally.',
        imageUrl: '/images/service-study-abroad.jpg',
        isActive: true,
        createdAt: new Date().toISOString()
    },
    {
        _id: 'ser_2',
        title: 'Visa Assistance',
        description: 'Expert help in processing all types of visas for travel, study, and work.',
        imageUrl: '/images/service-visa.jpg',
        isActive: true,
        createdAt: new Date().toISOString()
    },
    {
        _id: 'ser_3',
        title: 'Flight Booking',
        description: 'Affordable flight booking services for students and travelers worldwide.',
        imageUrl: '/images/service-immigration.jpg',
        isActive: true,
        createdAt: new Date().toISOString()
    },
    {
        _id: 'ser_4',
        title: 'Hotel Booking',
        description: 'Secure and comfortable accommodation bookings globally.',
        imageUrl: '/images/service-settlement.jpg',
        isActive: true,
        createdAt: new Date().toISOString()
    },
    {
        _id: 'ser_5',
        title: 'Tour Booking',
        description: 'Customized tour packages and vacation planning for global destinations.',
        imageUrl: '/images/service-work-visa.jpg',
        isActive: true,
        createdAt: new Date().toISOString()
    }
];

const dataPath = path.join(__dirname, 'data', 'services.json');
fs.writeFileSync(dataPath, JSON.stringify(services, null, 2));
console.log('Services seeded successfully!');
