const mongoose = require('mongoose');
const Destination = require('./models/Destination');
const Consultation = require('./models/Consultation');
const Contact = require('./models/Contact');
const Program = require('./models/Program');
const User = require('./models/User');
require('dotenv').config();

// Destinations data
const destinations = [
  {
    name: 'Malta',
    country: 'Europe',
    description: 'Affordable EU education, English-speaking environment with Mediterranean lifestyle',
    features: ['Student Visa & Admission Support', 'Work Visa & Internship Guidance', 'Scholarship & Financial Guidance', 'EU Access'],
    imageUrl: '/images/malta.jpg',
    isActive: true
  },
  {
    name: 'South Korea',
    country: 'Asia',
    description: 'Advanced technology hub with quality education and vibrant culture',
    features: ['Student Visa Support', 'Cultural Orientation', 'Accommodation Assistance', 'Language Support'],
    imageUrl: '/images/south-korea.jpg',
    isActive: true
  },
  {
    name: 'Malaysia',
    country: 'Asia',
    description: 'Affordable, high-quality education in multicultural environment',
    features: ['Student Visa & Admission', 'Scholarship Assistance', 'Pre-Departure Support', 'Low Cost of Living'],
    imageUrl: '/images/malaysia.jpg',
    isActive: true
  },
  {
    name: 'New Zealand',
    country: 'Oceania',
    description: 'World-class education with attractive scholarships and stunning landscapes',
    features: ['Student Visa & University Admission', 'Visitor Visa Guidance', 'Business Visa Support', 'Post-Study Work Options'],
    imageUrl: '/images/new-zealand.jpg',
    isActive: true
  },
  {
    name: 'Singapore',
    country: 'Asia',
    description: 'Global business center with top universities and excellent career opportunities',
    features: ['Student Visa Support', 'Skill Development', 'Cultural Orientation', 'Career Guidance'],
    imageUrl: '/images/singapore.jpg',
    isActive: true
  },
  {
    name: 'Mauritius',
    country: 'Africa',
    description: 'World-class universities with rich cultural exposure and tropical paradise',
    features: ['Student Visa & Admission', 'Scholarship Assistance', 'Accommodation Support', 'Beach Lifestyle'],
    imageUrl: '/images/mauritius.jpg',
    isActive: true
  }
];

// Sample consultations data
const consultations = [
  {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1234567890',
    service: 'Student Visa',
    message: 'Interested in studying in Malta',
    status: 'pending'
  },
  {
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '+9876543210',
    service: 'Work Visa',
    message: 'Looking for work opportunities in Singapore',
    status: 'completed'
  }
];

// Sample contacts data
const contacts = [
  {
    name: 'Alice Johnson',
    email: 'alice.j@example.com',
    phone: '+1122334455',
    subject: 'General Inquiry',
    message: 'I would like to know more about your services'
  }
];

// Programs data - Undergraduate
const undergraduatePrograms = [
  { name: 'BA in Management', type: 'undergraduate', duration: '3 Years', description: 'Comprehensive business management program covering leadership, strategy, and operations.', highlights: [{ name: 'Leadership Skills', detail: 'Develop essential leadership qualities' }, { name: 'Strategic Planning', detail: 'Learn to create effective business strategies' }], isActive: true },
  { name: 'BA in Marketing', type: 'undergraduate', duration: '3 Years', description: 'Focus on marketing strategies, consumer behavior, and digital marketing.', highlights: [{ name: 'Digital Marketing', detail: 'Master social media and SEO' }, { name: 'Brand Management', detail: 'Build strong brand identities' }], isActive: true },
  { name: 'BA in Management with Human Resources Management', type: 'undergraduate', duration: '3 Years', description: 'Specialized program combining management with HR expertise.', highlights: [{ name: 'Talent Acquisition', detail: 'Master recruitment strategies' }, { name: 'Employee Relations', detail: 'Build positive workplace culture' }], isActive: true },
  { name: 'BA in Tourism and Events Management', type: 'undergraduate', duration: '3 Years', description: 'Prepare for careers in tourism, hospitality, and event planning.', highlights: [{ name: 'Event Planning', detail: 'Organize conferences and events' }, { name: 'Tourism Marketing', detail: 'Promote destinations effectively' }], isActive: true },
  { name: 'BA in Accounting and Finance', type: 'undergraduate', duration: '3 Years', description: 'Strong foundation in accounting principles and financial management.', highlights: [{ name: 'Financial Accounting', detail: 'Prepare financial statements' }, { name: 'Corporate Finance', detail: 'Analyze investments' }], isActive: true },
  { name: 'BA in Management and Psychology', type: 'undergraduate', duration: '3 Years', description: 'Unique blend of business management and organizational psychology.', highlights: [{ name: 'Organizational Behavior', detail: 'Study workplace dynamics' }, { name: 'Leadership Psychology', detail: 'Understand psychological aspects of leadership' }], isActive: true },
  { name: 'BA Information Technology for Business', type: 'undergraduate', duration: '3 Years', description: 'IT skills combined with business acumen for digital enterprises.', highlights: [{ name: 'Business Systems', detail: 'Design IT systems for business' }, { name: 'Data Analytics', detail: 'Analyze business data' }], isActive: true },
  { name: 'Bachelor of Arts Top-Up Degree in Business and Management', type: 'undergraduate', duration: '1 Year', description: 'Fast-track completion for students with relevant diplomas.', highlights: [{ name: 'Advanced Management', detail: 'Deep dive into strategic management' }, { name: 'Quick Completion', detail: 'Complete degree in one year' }], isActive: true },
  { name: 'Undergraduate Diploma in Management', type: 'undergraduate', duration: '2 Years', description: 'Foundational management qualification for career starters.', highlights: [{ name: 'Business Fundamentals', detail: 'Learn core business concepts' }, { name: 'Practical Skills', detail: 'Gain hands-on experience' }], isActive: true },
  { name: 'Award in Foundation in Business and Management', type: 'undergraduate', duration: '1 Year', description: 'Preparatory program for undergraduate business studies.', highlights: [{ name: 'Academic Preparation', detail: 'Build essential academic skills' }, { name: 'University Readiness', detail: 'Prepare for undergraduate programs' }], isActive: true },
  { name: 'Award in Business Studies', type: 'undergraduate', duration: '3 Years', description: 'Broad business education covering multiple disciplines.', highlights: [{ name: 'Business Strategy', detail: 'Develop strategic thinking' }, { name: 'Entrepreneurship', detail: 'Learn to start your own business' }], isActive: true },
  { name: 'Diploma in Financial Crime Compliance & Anti-Money Laundering', type: 'undergraduate', duration: '1 Year', description: 'Specialized program in financial compliance and AML.', highlights: [{ name: 'Compliance Framework', detail: 'Understand regulatory requirements' }, { name: 'Risk Management', detail: 'Identify and mitigate financial crimes' }], isActive: true },
  { name: 'Undergraduate Diploma in Foundation of Medical Science', type: 'undergraduate', duration: '1 Year', description: 'Foundation program for medical and health sciences.', highlights: [{ name: 'Medical Basics', detail: 'Learn fundamental medical concepts' }, { name: 'Science Foundation', detail: 'Build strong science background' }], isActive: true },
  { name: 'Award in General Intensive English (as a Foreign Language)', type: 'undergraduate', duration: '6 Months', description: 'Intensive English language program for international students.', highlights: [{ name: 'Language Proficiency', detail: 'Achieve fluency in English' }, { name: 'Academic English', detail: 'Prepare for university-level studies' }], isActive: true }
];

// Programs data - Postgraduate
const postgraduatePrograms = [
  { name: 'Master of Business Administration (MBA)', type: 'postgraduate', duration: '1-2 Years', description: 'Premier postgraduate business degree for aspiring leaders.', highlights: [{ name: 'Executive Leadership', detail: 'Develop advanced leadership capabilities' }, { name: 'Strategic Management', detail: 'Master corporate strategy' }], isActive: true },
  { name: 'MBA in Logistics and Supply Chain Management', type: 'postgraduate', duration: '1-2 Years', description: 'Specialized MBA focusing on supply chain optimization.', highlights: [{ name: 'Supply Chain Strategy', detail: 'Design end-to-end solutions' }, { name: 'Operations Management', detail: 'Improve operational efficiency' }], isActive: true },
  { name: 'Master of Science in Health and Social Care Management', type: 'postgraduate', duration: '1 Year', description: 'Management expertise for healthcare sectors.', highlights: [{ name: 'Healthcare Management', detail: 'Lead healthcare organizations' }, { name: 'Quality Care', detail: 'Implement quality assurance' }], isActive: true },
  { name: 'Master of Science in Management', type: 'postgraduate', duration: '1 Year', description: 'Advanced management principles and business practices.', highlights: [{ name: 'Advanced Management', detail: 'Master sophisticated management theories' }, { name: 'Business Innovation', detail: 'Drive innovation and change' }], isActive: true },
  { name: 'Master of Science in Marketing Management', type: 'postgraduate', duration: '1 Year', description: 'Advanced marketing strategies for the digital age.', highlights: [{ name: 'Digital Marketing', detail: 'Master omnichannel marketing' }, { name: 'Brand Strategy', detail: 'Build powerful brands' }], isActive: true },
  { name: 'Master of Science in Management with Human Resources', type: 'postgraduate', duration: '1 Year', description: 'Strategic HR management for organizational success.', highlights: [{ name: 'Strategic HRM', detail: 'Align HR with business objectives' }, { name: 'Talent Development', detail: 'Design learning programs' }], isActive: true },
  { name: 'Master of Science in Tourism and Events Management', type: 'postgraduate', duration: '1 Year', description: 'Advanced tourism and event management.', highlights: [{ name: 'Tourism Strategy', detail: 'Develop destination strategies' }, { name: 'Event Leadership', detail: 'Manage large-scale events' }], isActive: true },
  { name: 'MS in Leadership and Change Management', type: 'postgraduate', duration: '1 Year', description: 'Develop leadership skills for managing change.', highlights: [{ name: 'Leadership Development', detail: 'Build authentic leadership style' }, { name: 'Change Strategy', detail: 'Design transformation programs' }], isActive: true },
  { name: 'Executive Master of Business Administration (EMBA)', type: 'postgraduate', duration: '1-2 Years', description: 'MBA designed for experienced professionals.', highlights: [{ name: 'Executive Leadership', detail: 'Enhance C-level leadership skills' }, { name: 'Strategic Vision', detail: 'Develop long-term strategic vision' }], isActive: true },
  { name: 'Postgraduate Diploma in Management (with pathways available)', type: 'postgraduate', duration: '9 Months', description: 'Flexible postgraduate qualification with specializations.', highlights: [{ name: 'Multiple Pathways', detail: 'Choose from various specializations' }, { name: 'Flexible Learning', detail: 'Study at your own pace' }], isActive: true }
];

// Programs data - Doctoral
const doctoralPrograms = [
  { name: 'Doctor of Business Administration (DBA)', type: 'doctoral', duration: '3-4 Years', description: 'Advanced research degree for business professionals.', highlights: [{ name: 'Research Excellence', detail: 'Conduct original business research' }, { name: 'Academic Leadership', detail: 'Contribute to business knowledge' }], isActive: true }
];

async function seedDatabase() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/worldpassport');
    console.log('✓ Connected to MongoDB');

    // Clear existing data
    console.log('\nClearing existing data...');
    await Destination.deleteMany({});
    await Consultation.deleteMany({});
    await Contact.deleteMany({});
    await Program.deleteMany({});
    await User.deleteMany({});
    console.log('✓ Cleared all collections');

    // Seed destinations
    console.log('\nSeeding destinations...');
    const createdDestinations = await Destination.insertMany(destinations);
    console.log(`✓ Created ${createdDestinations.length} destinations`);

    // Seed consultations
    console.log('\nSeeding consultations...');
    const createdConsultations = await Consultation.insertMany(consultations);
    console.log(`✓ Created ${createdConsultations.length} consultations`);

    // Seed contacts
    console.log('\nSeeding contacts...');
    const createdContacts = await Contact.insertMany(contacts);
    console.log(`✓ Created ${createdContacts.length} contacts`);

    // Seed programs
    console.log('\nSeeding programs...');
    const allPrograms = [...undergraduatePrograms, ...postgraduatePrograms, ...doctoralPrograms];
    const createdPrograms = await Program.insertMany(allPrograms);
    console.log(`✓ Created ${createdPrograms.length} programs`);
    console.log(`  - ${undergraduatePrograms.length} undergraduate programs`);
    console.log(`  - ${postgraduatePrograms.length} postgraduate programs`);
    console.log(`  - ${doctoralPrograms.length} doctoral programs`);

    // Seed users
    console.log('\nSeeding users...');
    const users = [
      {
        name: 'Admin User',
        email: 'admin@worldpassport.in',
        password: 'admin123', // In production, this should be hashed
        role: 'admin',
        phone: '+91 92050 31277',
        isVerified: true
      },
      {
        name: 'Partner University',
        email: 'partner@university.edu',
        password: 'partner123',
        role: 'partner',
        organization: 'Sample University',
        phone: '+1 234 567 8900',
        isVerified: true
      },
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'user123',
        role: 'user',
        phone: '+91 98765 43210',
        isVerified: false
      }
    ];
    const createdUsers = await User.insertMany(users);
    console.log(`✓ Created ${createdUsers.length} users`);

    console.log('\n✓ Database seeded successfully!');
    console.log('\nCollections created:');
    console.log('  - destinations (6 records)');
    console.log('  - consultations (2 records)');
    console.log('  - contacts (1 record)');
    console.log(`  - programs (${allPrograms.length} records)`);
    console.log('  - users (3 records)');
    console.log('\nSample Login Credentials:');
    console.log('  Admin: admin@worldpassport.in / admin123');
    console.log('  Partner: partner@university.edu / partner123');
    console.log('  User: john@example.com / user123');

    mongoose.connection.close();
    console.log('\n✓ Database connection closed');
  } catch (error) {
    console.error('\n✗ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
