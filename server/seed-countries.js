const mongoose = require('mongoose');
const Country = require('./models/Country');
require('dotenv').config();

const countries = [
  {
    name: 'United Kingdom',
    description: 'The UK is home to some of the world\'s oldest and most prestigious universities including Oxford and Cambridge. With a rich academic heritage, shorter degree programs, and a multicultural environment, the UK offers exceptional education and global recognition.',
    imageUrl: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=600&fit=crop&q=80',
    highlights: [
      'World-renowned universities with centuries of academic excellence',
      'Shorter degree duration - 3 years for undergraduate, 1 year for master\'s',
      'Post-Study Work Visa allows 2-3 years of work after graduation',
      'Rich cultural heritage and historical significance',
      'Gateway to Europe with easy travel opportunities',
      'English language immersion in its birthplace'
    ],
    universities: ['University of Oxford', 'University of Cambridge', 'Imperial College London', 'London School of Economics', 'University College London', 'University of Edinburgh', 'King\'s College London', 'University of Manchester'],
    whyStudy: 'The UK combines academic excellence with cultural richness. British degrees are recognized worldwide and the shorter program duration means lower overall costs. You\'ll experience diverse perspectives in a truly international environment while being at the heart of European culture and history.',
    intakePeriods: ['September/October (Main)', 'January/February (Limited programs)'],
    tuitionFees: {
      undergraduate: '£10,000 - £38,000 per year',
      postgraduate: '£12,000 - £45,000 per year',
      doctoral: '£15,000 - £35,000 per year'
    },
    costOfLiving: {
      accommodation: '£400 - £1,000 per month (London: £800-£1,500)',
      food: '£150 - £300 per month',
      transport: '£50 - £150 per month',
      overall: '£800 - £1,500 per month (London: £1,200-£2,000)'
    },
    admissionRequirements: {
      academicQualifications: ['A-levels or equivalent for undergraduate', 'Bachelor\'s degree with 60%+ for postgraduate', 'Strong academic record and relevant coursework'],
      languageRequirements: 'IELTS: 6.0-7.0 or TOEFL iBT: 80-100 (varies by university and program)',
      standardizedTests: ['IELTS/TOEFL', 'UKCAT/BMAT (for medicine)', 'LNAT (for law)'],
      documents: ['Valid passport', 'Academic transcripts', 'English language test scores', 'Personal statement', 'Letters of recommendation', 'CV/Resume', 'Portfolio (for creative courses)']
    },
    visaInformation: {
      visaType: 'Student Visa (formerly Tier 4)',
      processingTime: '3 weeks (standard) or 5 days (priority service)',
      requirements: ['Valid passport', 'CAS (Confirmation of Acceptance for Studies)', 'Financial proof (£1,334/month for 9 months)', 'TB test certificate', 'ATAS certificate (for certain courses)', 'Visa application fee payment'],
      workPermit: 'Students can work 20 hours/week during term time and full-time during holidays. Graduate Route visa allows 2 years (3 years for PhD) of post-study work.'
    },
    scholarships: [
      { name: 'Chevening Scholarships', description: 'UK government scholarship for outstanding leaders covering full tuition, living expenses, and flights', amount: 'Full funding' },
      { name: 'Commonwealth Scholarships', description: 'For students from Commonwealth countries covering tuition and living costs', amount: 'Full funding' },
      { name: 'GREAT Scholarships', description: 'Minimum £10,000 towards tuition fees for students from selected countries', amount: '£10,000' },
      { name: 'University Scholarships', description: 'Merit-based scholarships offered by individual universities', amount: '£2,000 - £10,000' }
    ],
    workOpportunities: {
      duringStudy: 'International students can work up to 20 hours per week during term time and full-time during holidays. Many universities have career services to help find part-time work.',
      afterStudy: 'Graduate Route visa allows 2 years of work (3 years for PhD graduates) in any job at any skill level. This provides excellent opportunity to gain UK work experience.',
      partTimeJobs: ['Retail assistant', 'Restaurant server', 'Campus ambassador', 'Library assistant', 'Tutor', 'Administrative assistant', 'Customer service representative'],
      averageWages: '£9-£12 per hour (National Minimum Wage: £10.42 for 21+)'
    },
    studentLife: {
      climate: 'Temperate maritime climate with mild winters and cool summers. Rainfall throughout the year. Temperature ranges from 2°C in winter to 22°C in summer.',
      culture: 'Rich history and cultural diversity. British culture values politeness, queuing, and afternoon tea. Vibrant arts scene with world-class museums, theaters, and music venues. Strong pub culture and sports enthusiasm especially football.',
      transportation: 'Excellent public transport with buses, trains, and underground (in major cities). Student railcards offer 1/3 discount. Most cities are walkable and bike-friendly.',
      activities: ['Football matches and sports events', 'Museum and gallery visits', 'Theater and West End shows', 'Music festivals', 'Pub culture and social gatherings', 'Historical site tours', 'Student societies and clubs', 'Weekend trips across Europe'],
      safety: 'Generally very safe with low crime rates. Good emergency services (999). Universities have 24/7 security and support services.'
    },
    accommodation: {
      types: [
        { name: 'University Halls', description: 'On-campus accommodation with catered or self-catered options. Great for first-year students.', cost: '£400-£800/month' },
        { name: 'Private Student Accommodation', description: 'Purpose-built student housing with modern facilities and social spaces.', cost: '£500-£1,000/month' },
        { name: 'Private Renting', description: 'Shared houses or flats with other students. More independence and often cheaper.', cost: '£350-£700/month' },
        { name: 'Homestay', description: 'Living with a British family. Includes meals and cultural immersion.', cost: '£500-£800/month' }
      ],
      tips: ['Apply for university accommodation early', 'Check what\'s included (bills, internet, etc.)', 'Visit properties before signing', 'Understand tenancy agreements', 'Get contents insurance', 'Join university accommodation Facebook groups']
    },
    healthcare: {
      system: 'National Health Service (NHS) provides free healthcare to residents. High-quality medical care available.',
      insurance: 'International students pay Immigration Health Surcharge (£470/year) as part of visa application. This gives access to NHS services.',
      cost: 'NHS services are free with IHS payment. Prescriptions: £9.65 per item. Dental and optical services may have charges.',
      facilities: ['University health centers', 'NHS hospitals and GP surgeries', 'Walk-in centers', 'Pharmacies', 'Mental health services', 'Emergency services (A&E)']
    },
    applicationProcess: {
      timeline: [
        { phase: 'Research', description: 'Research universities and courses. Check entry requirements and prepare for English tests.', duration: '12-18 months before' },
        { phase: 'UCAS Application', description: 'Apply through UCAS for undergraduate (up to 5 choices) or directly to universities for postgraduate.', duration: 'September-January' },
        { phase: 'Offers', description: 'Receive conditional or unconditional offers from universities.', duration: 'January-May' },
        { phase: 'Accept Offer', description: 'Accept firm and insurance choice. Meet conditions (grades, English test).', duration: 'May-June' },
        { phase: 'CAS & Visa', description: 'Receive CAS from university and apply for student visa.', duration: 'June-August' },
        { phase: 'Arrival', description: 'Attend pre-departure briefing, book accommodation, and travel to UK.', duration: 'August-September' }
      ],
      deadlines: 'UCAS deadline: January 15 for most courses, October 15 for Oxford, Cambridge, and Medicine. Postgraduate: varies by university, typically March-July.',
      tips: ['Use UCAS for undergraduate applications', 'Write a strong personal statement', 'Apply early for better accommodation', 'Check scholarship deadlines', 'Prepare financial documents early', 'Book visa appointment in advance']
    },
    isActive: true
  },
  {
    name: 'Canada',
    description: 'Canada is known for its welcoming immigration policies, high-quality education, and multicultural society. With affordable tuition, excellent research opportunities, and pathways to permanent residency, Canada is a top choice for international students seeking quality education and a better future.',
    imageUrl: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=800&h=600&fit=crop&q=80',
    highlights: [
      'High-quality education at affordable costs compared to US and UK',
      'Welcoming immigration policies with pathways to permanent residency',
      'Safe, peaceful, and multicultural society',
      'Post-Graduation Work Permit (PGWP) up to 3 years',
      'Excellent quality of life and natural beauty',
      'Bilingual environment (English and French)'
    ],
    universities: ['University of Toronto', 'University of British Columbia', 'McGill University', 'University of Waterloo', 'McMaster University', 'University of Alberta', 'Western University', 'Queen\'s University'],
    whyStudy: 'Canada offers world-class education in a safe, welcoming environment. With lower tuition costs than US/UK, excellent work opportunities, and clear pathways to immigration, Canada provides both quality education and a promising future. The multicultural society ensures international students feel at home.',
    intakePeriods: ['Fall (September) - Main intake', 'Winter (January) - Secondary intake', 'Summer (May) - Limited programs'],
    tuitionFees: {
      undergraduate: 'CAD $15,000 - $35,000 per year',
      postgraduate: 'CAD $18,000 - $40,000 per year',
      doctoral: 'CAD $7,000 - $20,000 per year (often funded)'
    },
    costOfLiving: {
      accommodation: 'CAD $600 - $1,500 per month',
      food: 'CAD $300 - $500 per month',
      transport: 'CAD $80 - $150 per month',
      overall: 'CAD $1,200 - $2,000 per month'
    },
    admissionRequirements: {
      academicQualifications: ['High school diploma with 70%+ for undergraduate', 'Bachelor\'s degree with 65%+ for postgraduate', 'Strong academic performance in relevant subjects'],
      languageRequirements: 'IELTS: 6.5 overall (6.0 each band) or TOEFL iBT: 88-100',
      standardizedTests: ['IELTS/TOEFL', 'GRE (for some graduate programs)', 'GMAT (for MBA programs)'],
      documents: ['Valid passport', 'Academic transcripts', 'English test scores', 'Statement of Purpose', 'Letters of recommendation', 'Resume/CV', 'Portfolio (if required)']
    },
    visaInformation: {
      visaType: 'Study Permit',
      processingTime: '4-8 weeks (varies by country)',
      requirements: ['Letter of acceptance from DLI', 'Proof of funds (CAD $10,000 + tuition)', 'Valid passport', 'Passport photos', 'Medical exam (if required)', 'Police certificate', 'Statement of Purpose'],
      workPermit: 'Study permit allows 20 hours/week work during studies and full-time during breaks. PGWP allows 1-3 years of work after graduation (duration based on program length).'
    },
    scholarships: [
      { name: 'Vanier Canada Graduate Scholarships', description: 'For doctoral students showing leadership and high academic achievement', amount: 'CAD $50,000/year for 3 years' },
      { name: 'Ontario Graduate Scholarship', description: 'For graduate students in Ontario universities', amount: 'CAD $15,000' },
      { name: 'University Entrance Scholarships', description: 'Merit-based scholarships for international students', amount: 'CAD $5,000 - $30,000' },
      { name: 'Lester B. Pearson Scholarship', description: 'Full scholarship at University of Toronto for exceptional students', amount: 'Full tuition + living expenses' }
    ],
    workOpportunities: {
      duringStudy: 'International students can work 20 hours per week during academic sessions and full-time during scheduled breaks without a separate work permit.',
      afterStudy: 'Post-Graduation Work Permit (PGWP) allows 8 months to 3 years of work depending on program length. Excellent pathway to permanent residency through Express Entry.',
      partTimeJobs: ['Retail sales', 'Food service', 'Customer service', 'Campus jobs', 'Tutoring', 'Administrative support', 'Delivery services'],
      averageWages: 'CAD $14-$18 per hour (Minimum wage varies by province: $15-$16.50)'
    },
    studentLife: {
      climate: 'Varies by region. Cold winters (-20°C to -30°C) with snow, warm summers (20°C to 30°C). Coastal areas milder. Four distinct seasons.',
      culture: 'Extremely multicultural and welcoming. Canadian values include politeness, diversity, and inclusivity. Strong emphasis on outdoor activities and nature. Bilingual country (English and French).',
      transportation: 'Good public transit in major cities (buses, metro, streetcars). Student discounts available. Many cities are bike-friendly. Car useful in smaller cities.',
      activities: ['Ice hockey and winter sports', 'Hiking and outdoor adventures', 'Multicultural festivals', 'Music and arts events', 'Skiing and snowboarding', 'Summer camping', 'Student clubs and societies', 'Niagara Falls and national parks visits'],
      safety: 'One of the safest countries in the world. Low crime rates, excellent emergency services, and strong rule of law. Universities have campus security.'
    },
    accommodation: {
      types: [
        { name: 'On-Campus Residence', description: 'University dormitories with meal plans. Great for first-year students and making friends.', cost: 'CAD $8,000-$15,000/year' },
        { name: 'Off-Campus Apartments', description: 'Private apartments or condos. More independence and often cheaper for upper years.', cost: 'CAD $600-$1,500/month' },
        { name: 'Shared Housing', description: 'Rent a room in a house with other students. Most affordable option.', cost: 'CAD $400-$800/month' },
        { name: 'Homestay', description: 'Live with a Canadian family. Includes meals and cultural experience.', cost: 'CAD $700-$1,200/month' }
      ],
      tips: ['Apply for residence early', 'Check if utilities are included', 'Understand lease terms (usually 12 months)', 'Get tenant insurance', 'Join university housing groups', 'Consider proximity to campus and transit']
    },
    healthcare: {
      system: 'Universal healthcare system. Quality varies by province. International students may need private insurance.',
      insurance: 'Some provinces provide health coverage to international students (BC, Alberta, Saskatchewan). Others require private insurance (CAD $600-$900/year).',
      cost: 'With provincial coverage: free basic healthcare. Private insurance: CAD $600-$900/year. Doctor visits and prescriptions may have costs.',
      facilities: ['University health services', 'Walk-in clinics', 'Hospitals', 'Pharmacies', 'Mental health services', 'Dental clinics']
    },
    applicationProcess: {
      timeline: [
        { phase: 'Research & Preparation', description: 'Research programs, check requirements, prepare for English tests.', duration: '12-18 months before' },
        { phase: 'Applications', description: 'Apply directly to universities (no centralized system). Each university has own portal.', duration: '9-12 months before' },
        { phase: 'Offers', description: 'Receive admission offers (conditional or unconditional).', duration: '2-4 months after application' },
        { phase: 'Accept & Pay Deposit', description: 'Accept offer and pay tuition deposit to receive Letter of Acceptance.', duration: 'Within deadline' },
        { phase: 'Study Permit', description: 'Apply for study permit online with Letter of Acceptance.', duration: '3-4 months before start' },
        { phase: 'Arrival', description: 'Book flights, arrange accommodation, attend orientation.', duration: '1-2 months before start' }
      ],
      deadlines: 'Fall intake: January-March. Winter intake: September-October. Varies by university and program. Apply early for scholarships.',
      tips: ['Apply to multiple universities', 'Check program-specific requirements', 'Apply early for better scholarship chances', 'Prepare strong SOP', 'Show sufficient funds for visa', 'Get police clearance early', 'Book biometrics appointment quickly']
    },
    isActive: true
  }
];

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/worldpassport')
  .then(async () => {
    console.log('MongoDB connected');
    
    for (const countryData of countries) {
      const existing = await Country.findOne({ name: countryData.name });
      if (existing) {
        console.log(`${countryData.name} already exists, updating...`);
        await Country.findByIdAndUpdate(existing._id, countryData);
        console.log(`${countryData.name} updated!`);
      } else {
        console.log(`Creating ${countryData.name}...`);
        await Country.create(countryData);
        console.log(`${countryData.name} created!`);
      }
    }
    
    console.log('All countries processed successfully!');
    process.exit(0);
  })
  .catch(err => {
    console.error('Error:', err);
    process.exit(1);
  });
