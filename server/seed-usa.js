const mongoose = require('mongoose');
const Country = require('./models/Country');
require('dotenv').config();

const usaData = {
  name: 'United States',
  description: 'The USA hosts the largest number of international students worldwide, offering diverse programs, cutting-edge research opportunities, and world-renowned universities. With its innovation-driven education system and multicultural environment, the US provides an unparalleled academic experience.',
  imageUrl: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=800&h=600&fit=crop&q=80',
  
  highlights: [
    'Home to top-ranked universities globally including Harvard, MIT, and Stanford',
    'Extensive scholarship and financial aid opportunities for international students',
    'Optional Practical Training (OPT) allows up to 3 years of work experience',
    'Diverse range of programs across all fields of study',
    'Innovation and research-focused education system',
    'Multicultural campus environment with students from 200+ countries'
  ],
  
  universities: [
    'Harvard University',
    'Massachusetts Institute of Technology (MIT)',
    'Stanford University',
    'Yale University',
    'Princeton University',
    'Columbia University',
    'University of California, Berkeley',
    'University of Chicago'
  ],
  
  whyStudy: 'The United States offers unmatched academic excellence, cutting-edge research facilities, and a flexible education system that encourages critical thinking and innovation. With the world\'s largest international student population, you\'ll experience diverse perspectives and build a global network. The US degree is highly valued worldwide, opening doors to career opportunities globally.',
  
  intakePeriods: ['Fall (August/September)', 'Spring (January)', 'Summer (May/June)'],
  
  // Costs & Fees
  tuitionFees: {
    undergraduate: '$20,000 - $50,000 per year',
    postgraduate: '$25,000 - $60,000 per year',
    doctoral: '$28,000 - $55,000 per year (often funded with assistantships)'
  },
  
  costOfLiving: {
    accommodation: '$800 - $1,500 per month (varies by city)',
    food: '$300 - $600 per month',
    transport: '$100 - $200 per month',
    overall: '$1,500 - $2,500 per month depending on location'
  },
  
  // Admission Requirements
  admissionRequirements: {
    academicQualifications: [
      'High school diploma with strong GPA (3.0+) for undergraduate',
      'Bachelor\'s degree with good grades for postgraduate',
      'Relevant coursework and prerequisites for chosen program',
      'Strong academic transcripts and letters of recommendation'
    ],
    languageRequirements: 'TOEFL iBT: 80-100 or IELTS: 6.5-7.5 (varies by university)',
    standardizedTests: ['TOEFL/IELTS', 'SAT/ACT (for undergrad)', 'GRE/GMAT (for grad programs)'],
    documents: [
      'Valid passport',
      'Academic transcripts and certificates',
      'Standardized test scores (TOEFL, SAT, GRE, etc.)',
      'Letters of recommendation (2-3)',
      'Statement of Purpose/Personal Essay',
      'Resume/CV',
      'Financial documents showing proof of funds',
      'Application fee payment'
    ]
  },
  
  // Visa Information
  visaInformation: {
    visaType: 'F-1 Student Visa',
    processingTime: '3-5 weeks (apply 120 days before program start)',
    requirements: [
      'Valid passport (valid for at least 6 months)',
      'Form I-20 from your university',
      'SEVIS fee payment receipt',
      'Visa application form (DS-160)',
      'Visa interview appointment',
      'Financial proof (bank statements, scholarship letters)',
      'Academic documents',
      'Passport-sized photographs'
    ],
    workPermit: 'F-1 students can work on-campus up to 20 hours/week during semester. After first year, eligible for CPT (Curricular Practical Training) and OPT (Optional Practical Training) for 12-36 months post-graduation.'
  },
  
  // Scholarships
  scholarships: [
    {
      name: 'Fulbright Foreign Student Program',
      description: 'Fully funded scholarship for graduate students covering tuition, living expenses, airfare, and health insurance',
      amount: 'Full tuition + $20,000-$30,000 stipend'
    },
    {
      name: 'Hubert Humphrey Fellowship',
      description: 'Non-degree program for experienced professionals providing tuition, living allowance, and professional development',
      amount: 'Full funding'
    },
    {
      name: 'University Merit Scholarships',
      description: 'Most universities offer merit-based scholarships ranging from partial to full tuition',
      amount: '$5,000 - Full tuition'
    },
    {
      name: 'Athletic Scholarships',
      description: 'For talented student-athletes in various sports',
      amount: 'Partial to full tuition'
    },
    {
      name: 'Graduate Assistantships',
      description: 'Teaching or research positions that cover tuition and provide stipend',
      amount: 'Full tuition + $15,000-$30,000 stipend'
    }
  ],
  
  // Work Opportunities
  workOpportunities: {
    duringStudy: 'F-1 students can work on-campus up to 20 hours per week during the academic year and full-time during breaks. After the first academic year, students may be eligible for off-campus work through CPT (Curricular Practical Training) if it\'s part of their curriculum.',
    afterStudy: 'OPT (Optional Practical Training) allows students to work for 12 months after graduation. STEM graduates can extend OPT for an additional 24 months (total 36 months). This provides valuable US work experience.',
    partTimeJobs: [
      'Campus library assistant',
      'Research assistant',
      'Teaching assistant',
      'Campus cafeteria staff',
      'Student center receptionist',
      'IT help desk support',
      'Tutoring services',
      'Resident advisor'
    ],
    averageWages: '$12-$20 per hour for on-campus jobs, $15-$25 per hour for off-campus internships'
  },
  
  // Student Life & Culture
  studentLife: {
    climate: 'Varies greatly by region - from tropical in Florida to cold winters in the Northeast, mild in California, and continental in the Midwest. Most universities have all four seasons.',
    culture: 'Highly diverse and multicultural society with people from all backgrounds. American culture values independence, innovation, and individual achievement. Campus life is vibrant with numerous clubs, sports, cultural events, and social activities. Strong emphasis on extracurricular involvement and community service.',
    transportation: 'Most cities have public transportation (buses, metro, light rail). Many students use bicycles on campus. Car ownership is common but not necessary in major cities. Uber and Lyft are widely available. Many universities provide free shuttle services.',
    activities: [
      'College sports (football, basketball, baseball)',
      'Greek life (fraternities and sororities)',
      'Student clubs and organizations (300+ at major universities)',
      'Cultural festivals and international student events',
      'Outdoor activities (hiking, skiing, beach trips)',
      'Music concerts and theater performances',
      'Volunteer and community service programs',
      'Career fairs and networking events'
    ],
    safety: 'Generally safe with good campus security. Universities have 24/7 campus police, emergency call boxes, and escort services. Crime rates vary by location - research your specific city and campus. Most campuses have safety apps and alert systems.'
  },
  
  // Accommodation
  accommodation: {
    types: [
      {
        name: 'On-Campus Dormitories',
        description: 'University-owned residence halls with shared or private rooms. Includes meal plans, utilities, and internet. Great for freshmen and international students.',
        cost: '$8,000 - $15,000 per academic year'
      },
      {
        name: 'Off-Campus Apartments',
        description: 'Private apartments near campus. More independence and often cheaper. Requires furniture, utilities setup, and 12-month lease.',
        cost: '$600 - $1,500 per month (varies by city)'
      },
      {
        name: 'Shared Housing',
        description: 'Rent a room in a house or apartment with other students. Most affordable option with shared kitchen and living spaces.',
        cost: '$400 - $900 per month'
      },
      {
        name: 'Homestay',
        description: 'Live with an American family. Includes meals and cultural immersion. Good for improving English and understanding American culture.',
        cost: '$800 - $1,200 per month'
      }
    ],
    tips: [
      'Book on-campus housing early as it fills up quickly',
      'Research neighborhood safety before renting off-campus',
      'Consider proximity to campus and public transportation',
      'Budget for utilities (electricity, water, internet) if off-campus',
      'Read lease agreements carefully before signing',
      'Get renter\'s insurance to protect your belongings',
      'Join university housing Facebook groups to find roommates'
    ]
  },
  
  // Healthcare
  healthcare: {
    system: 'Private healthcare system with high-quality medical facilities. Healthcare is expensive without insurance. Most universities require international students to have health insurance.',
    insurance: 'Mandatory health insurance for all international students. Universities offer student health insurance plans ($1,500-$3,000 per year) or you can purchase private insurance. Coverage includes doctor visits, emergency care, prescriptions, and mental health services.',
    cost: '$1,500 - $3,000 per year for student health insurance. Doctor visits: $100-$300 without insurance, $20-$50 copay with insurance.',
    facilities: [
      'University health centers (free or low-cost for students)',
      'Hospitals and emergency rooms',
      'Urgent care clinics',
      'Pharmacies (CVS, Walgreens)',
      'Mental health counseling services',
      'Dental and vision clinics'
    ]
  },
  
  // Application Process
  applicationProcess: {
    timeline: [
      {
        phase: 'Research & Preparation',
        description: 'Research universities, programs, and requirements. Prepare for standardized tests (TOEFL, SAT, GRE). Start working on essays and gathering documents.',
        duration: '6-12 months before deadline'
      },
      {
        phase: 'Take Standardized Tests',
        description: 'Complete TOEFL/IELTS and other required tests (SAT, ACT, GRE, GMAT). Send official scores to universities.',
        duration: '4-8 months before deadline'
      },
      {
        phase: 'Application Submission',
        description: 'Complete online applications, submit essays, transcripts, test scores, and letters of recommendation. Pay application fees.',
        duration: '2-4 months before deadline'
      },
      {
        phase: 'Wait for Decisions',
        description: 'Universities review applications and send admission decisions. Some may require interviews.',
        duration: '2-4 months after submission'
      },
      {
        phase: 'Accept Offer & Get I-20',
        description: 'Accept admission offer, pay deposit, and receive Form I-20 from university for visa application.',
        duration: '1-2 months after admission'
      },
      {
        phase: 'Visa Application',
        description: 'Pay SEVIS fee, complete DS-160 form, schedule visa interview, and attend interview at US Embassy.',
        duration: '2-3 months before departure'
      },
      {
        phase: 'Pre-Departure',
        description: 'Book flights, arrange accommodation, attend pre-departure orientation, pack, and prepare for arrival.',
        duration: '1-2 months before departure'
      }
    ],
    deadlines: 'Fall intake: Applications due November-January (priority), February-March (regular). Spring intake: Applications due September-October. Early Decision/Action: November 1. Regular Decision: January 1-15.',
    tips: [
      'Start early - applications take 3-6 months to prepare properly',
      'Apply to 6-10 universities (2 reach, 4 target, 2 safety schools)',
      'Tailor your Statement of Purpose for each university',
      'Get strong letters of recommendation from professors who know you well',
      'Highlight unique experiences and achievements in your essays',
      'Demonstrate genuine interest in the university and program',
      'Proofread everything multiple times',
      'Keep track of deadlines using a spreadsheet',
      'Apply for scholarships separately - don\'t rely only on university aid',
      'Prepare financially - show sufficient funds for visa application'
    ]
  },
  
  isActive: true
};

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/worldpassport')
  .then(async () => {
    console.log('MongoDB connected');
    
    // Check if USA already exists
    const existing = await Country.findOne({ name: 'United States' });
    if (existing) {
      console.log('USA already exists, updating...');
      await Country.findByIdAndUpdate(existing._id, usaData);
      console.log('USA updated successfully!');
    } else {
      console.log('Creating USA...');
      await Country.create(usaData);
      console.log('USA created successfully!');
    }
    
    process.exit(0);
  })
  .catch(err => {
    console.error('Error:', err);
    process.exit(1);
  });
