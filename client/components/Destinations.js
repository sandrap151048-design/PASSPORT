import { useState, useEffect } from 'react'
import Image from 'next/image'
import axios from 'axios'
import Link from 'next/link'

export default function Destinations() {
  const [destinations, setDestinations] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedDestination, setSelectedDestination] = useState(null)

  // Function to get destination image
  const getDestinationImage = (name) => {
    const images = {
      'Malta': '/images/destination-malta.jpg',
      'South Korea': '/images/destination-south-korea.jpg',
      'Malaysia': '/images/destination-malaysia.jpg',
      'New Zealand': '/images/destination-new-zealand.jpg',
      'Singapore': '/images/destination-singapore.jpg',
      'Mauritius': '/images/destination-mauritius.jpg',
      'United Kingdom': '/images/dest-uk.png',
      'United States': '/images/dest-usa.png',
      'Canada': '/images/dest-canada.png',
      'Australia': '/images/dest-australia.png',
      'Germany': '/images/dest-germany.png',
      'France': '/images/hero-1.jpg',
      'Japan': '/images/hero-2.jpg',
      'Netherlands': '/images/hero-3.jpg',
      'Ireland': '/images/destinations-hero.jpg',
      'UAE': '/images/about-hero.jpg',
      'Sweden': '/images/premium-education.jpg',
      'Italy': '/images/bachelor-programs.jpg',
      'Switzerland': '/images/master-programs.jpg'
    }
    return images[name] || '/images/hero-1.jpg'
  }

  // Detailed information for each destination
  const destinationDetails = {
    'Malta': {
      highlights: ['EU Member State', 'English-Speaking', 'Affordable Tuition', 'Mediterranean Climate', 'Work While Study'],
      universities: ['University of Malta', 'Malta College of Arts, Science and Technology', 'American University of Malta'],
      requirements: ['IELTS 6.0 or equivalent', 'High School Diploma', 'Proof of Funds', 'Valid Passport'],
      costs: 'Tuition: €8,000-€12,000/year, Living: €700-€900/month'
    },
    'South Korea': {
      highlights: ['Advanced Technology', 'Quality Education', 'Scholarship Opportunities', 'Rich Culture', 'Safe Environment'],
      universities: ['Seoul National University', 'KAIST', 'Yonsei University', 'Korea University'],
      requirements: ['TOPIK Level 3+ or English Proficiency', 'Academic Transcripts', 'Statement of Purpose', 'Financial Proof'],
      costs: 'Tuition: $3,000-$10,000/year, Living: $700-$1,000/month'
    },
    'Malaysia': {
      highlights: ['Multicultural Society', 'Affordable Education', 'English Programs', 'Strategic Location', 'Quality Universities'],
      universities: ['University of Malaya', 'Universiti Teknologi Malaysia', 'Taylor\'s University', 'Monash University Malaysia'],
      requirements: ['IELTS 5.5-6.0', 'Academic Certificates', 'Passport Copy', 'Medical Report'],
      costs: 'Tuition: $3,000-$8,000/year, Living: $400-$700/month'
    },
    'New Zealand': {
      highlights: ['World-Class Education', 'Post-Study Work Visa', 'Beautiful Nature', 'Safe Country', 'Research Opportunities'],
      universities: ['University of Auckland', 'University of Otago', 'Victoria University', 'Canterbury University'],
      requirements: ['IELTS 6.5', 'Academic Transcripts', 'Statement of Purpose', 'Financial Evidence'],
      costs: 'Tuition: NZ$22,000-$32,000/year, Living: NZ$15,000-$18,000/year'
    },
    'Singapore': {
      highlights: ['Global Business Hub', 'Top Universities', 'Multicultural', 'Safe & Clean', 'Career Opportunities'],
      universities: ['National University of Singapore', 'Nanyang Technological University', 'Singapore Management University'],
      requirements: ['IELTS 6.5-7.0', 'Strong Academic Record', 'SAT/ACT Scores', 'Financial Proof'],
      costs: 'Tuition: S$20,000-$40,000/year, Living: S$1,000-$1,500/month'
    },
    'Mauritius': {
      highlights: ['Island Paradise', 'Affordable Living', 'English & French', 'Growing Education Hub', 'Beautiful Beaches'],
      universities: ['University of Mauritius', 'Middlesex University Mauritius', 'Aberystwyth University Mauritius'],
      requirements: ['IELTS 6.0', 'Academic Certificates', 'Passport', 'Medical Certificate'],
      costs: 'Tuition: $3,000-$7,000/year, Living: $400-$600/month'
    },
    'United Kingdom': {
      highlights: ['Academic Excellence', 'Shorter Degrees', 'Work Rights', 'Rich Culture', 'Global Recognition'],
      universities: ['Oxford', 'Cambridge', 'Imperial College', 'LSE'],
      requirements: ['IELTS 6.5-7.0', 'Academic Transcripts', 'SOP', 'LORs'],
      costs: 'Tuition: £12,000-£25,000/year, Living: £1,000-£1,300/month'
    },
    'United States': {
      highlights: ['Top Universities', 'F-1 Student Visa', 'Optional Practical Training', 'Innovation', 'Diversity'],
      universities: ['Harvard', 'MIT', 'Stanford', 'UC Berkeley'],
      requirements: ['TOEFL/IELTS', 'SAT/ACT/GRE/GMAT', 'Transcripts', 'SOP'],
      costs: 'Tuition: $25,000-$55,000/year, Living: $1,200-$1,800/month'
    },
    'Canada': {
      highlights: ['PR Pathways', 'Work While Study', 'Safe & Welcoming', 'Quality Education', 'Bilingual'],
      universities: ['Toronto', 'UBC', 'McGill', 'Waterloo'],
      requirements: ['IELTS 6.5', 'Transcripts', 'SOP', 'Financial Proof'],
      costs: 'Tuition: CAD $18,000-$35,000/year, Living: CAD $1,200-$1,500/month'
    },
    'Australia': {
      highlights: ['Post-Study Work', 'High Quality of Life', 'Beautiful Climate', 'Strong Economy', 'Multicultural'],
      universities: ['Melbourne', 'Sydney', 'ANU', 'UNSW'],
      requirements: ['IELTS 6.5', 'Transcripts', 'GTE Requirement', 'Financial Proof'],
      costs: 'Tuition: AUD $22,000-$38,000/year, Living: AUD $1,500-$2,000/month'
    },
    'Germany': {
      highlights: ['Free/Low Tuition', 'Engineering Hub', 'Job-Seeker Visa', 'Central Location', 'High Standards'],
      universities: ['TUM', 'LMU Munich', 'Heidelberg', 'RWTH Aachen'],
      requirements: ['IELTS 6.5 / TestDaF', 'APS Certificate (for some)', 'Blocked Account', 'Transcripts'],
      costs: 'Tuition: €0-€3,000/year, Living: €861/month (Blocked Account)'
    },
    'France': {
      highlights: ['Affordable Tuition', 'Art & Culture Hub', 'Strong Research', 'EU Membership', 'French Language'],
      universities: ['Sorbonne University', 'École Polytechnique', 'Sciences Po', 'HEC Paris'],
      requirements: ['DELF/DALF or IELTS 6.0', 'Academic Transcripts', 'Campus France Application', 'Financial Proof'],
      costs: 'Tuition: €2,770-€3,770/year, Living: €900-€1,200/month'
    },
    'Japan': {
      highlights: ['World-Class Tech', 'Scholarship Programs', 'Safe & Orderly', 'Rich Culture', 'Innovation Hub'],
      universities: ['University of Tokyo', 'Kyoto University', 'Osaka University', 'Waseda University'],
      requirements: ['JLPT N2 or English Proficiency', 'Academic Transcripts', 'Certificate of Eligibility', 'Financial Proof'],
      costs: 'Tuition: ¥535,800/year, Living: ¥80,000-¥120,000/month'
    },
    'Netherlands': {
      highlights: ['English Programs', 'Innovation Leader', 'Cycling Culture', 'Work Opportunities', 'EU Access'],
      universities: ['Delft University of Technology', 'University of Amsterdam', 'Leiden University', 'Eindhoven University'],
      requirements: ['IELTS 6.5', 'Academic Transcripts', 'MVV Visa', 'Financial Proof'],
      costs: 'Tuition: €8,000-€20,000/year, Living: €800-€1,100/month'
    },
    'Ireland': {
      highlights: ['English Speaking', 'Tech Hub', 'EU Residence', 'Post-Study Work', 'Welcoming Culture'],
      universities: ['Trinity College Dublin', 'University College Dublin', 'NUI Galway', 'University College Cork'],
      requirements: ['IELTS 6.0-6.5', 'Academic Transcripts', 'Study Visa', 'Proof of Funds'],
      costs: 'Tuition: €9,000-€25,000/year, Living: €700-€1,000/month'
    },
    'UAE': {
      highlights: ['Tax-Free Income', 'Multicultural', 'Modern Infrastructure', 'Global Business', 'Post-Study Work'],
      universities: ['American University of Sharjah', 'UAE University', 'Khalifa University', 'University of Dubai'],
      requirements: ['IELTS 6.0', 'Academic Certificates', 'Health Insurance', 'Passport Copy'],
      costs: 'Tuition: AED 40,000-80,000/year, Living: AED 2,000-3,500/month'
    },
    'Sweden': {
      highlights: ['Innovation Nation', 'Work-Life Balance', 'Free PhD Programs', 'Sustainability Focus', 'Safe Society'],
      universities: ['KTH Royal Institute', 'Lund University', 'Stockholm University', 'Uppsala University'],
      requirements: ['IELTS 6.5', 'Academic Transcripts', 'Swedish Migration Board Permit', 'Financial Proof'],
      costs: 'Tuition: SEK 80,000-180,000/year, Living: SEK 8,000-10,000/month'
    },
    'Italy': {
      highlights: ['Art & Architecture', 'Affordable Education', 'Rich History', 'Mediterranean Climate', 'EU Benefits'],
      universities: ['University of Bologna', 'Sapienza University', 'Politecnico di Milano', 'University of Padua'],
      requirements: ['IELTS 6.0', 'Academic Transcripts', 'Study Visa', 'Accommodation Proof'],
      costs: 'Tuition: €900-€4,000/year, Living: €700-€1,000/month'
    },
    'Switzerland': {
      highlights: ['Top-Ranked Universities', 'High Salaries', 'Innovation Hub', 'Multilingual', 'Stunning Nature'],
      universities: ['ETH Zurich', 'EPFL', 'University of Zurich', 'University of Geneva'],
      requirements: ['IELTS 7.0', 'Academic Transcripts', 'Residence Permit', 'Financial Guarantee'],
      costs: 'Tuition: CHF 1,000-2,000/year, Living: CHF 2,000-3,000/month'
    }
  }

  useEffect(() => {
    fetchDestinations()
  }, [])

  const fetchDestinations = async () => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'
      const response = await axios.get(`${API_URL}/destinations`)
      if (response.data.length > 0) {
        setDestinations(response.data)
      } else {
        setDestinations([
          { name: 'United Kingdom', country: 'Europe', description: 'World-renowned academic excellence with Oxford & Cambridge' },
          { name: 'United States', country: 'North America', description: 'Global innovation hub with Ivy League institutions' },
          { name: 'Canada', country: 'North America', description: 'Quality education with clear pathways to residency' },
          { name: 'Australia', country: 'Oceania', description: 'Vibrant lifestyle and top-tier institutions' },
          { name: 'Germany', country: 'Europe', description: 'Free/low tuition and world-class engineering programs' },
          { name: 'France', country: 'Europe', description: 'Elite Grandes Écoles and affordable public universities' },
          { name: 'Singapore', country: 'Asia', description: 'Global business & education hub in the heart of Asia' },
          { name: 'Japan', country: 'Asia', description: 'Cutting-edge technology and rich cultural experience' },
          { name: 'Netherlands', country: 'Europe', description: 'Innovation-driven education with 100% English programs' },
          { name: 'Ireland', country: 'Europe', description: 'English-speaking EU hub with thriving tech ecosystem' },
          { name: 'UAE', country: 'Middle East', description: 'World-class campuses with global career pathways' },
          { name: 'Sweden', country: 'Europe', description: 'Sustainability-focused innovation and free PhD programs' },
          { name: 'Malta', country: 'Europe', description: 'Affordable EU education in a Mediterranean paradise' },
          { name: 'South Korea', country: 'Asia', description: 'Advanced technology hub with generous scholarships' },
          { name: 'Malaysia', country: 'Asia', description: 'Multicultural environment with affordable quality education' },
          { name: 'New Zealand', country: 'Oceania', description: 'World-class education with stunning natural landscapes' },
          { name: 'Italy', country: 'Europe', description: 'Historic universities with affordable tuition fees' },
          { name: 'Switzerland', country: 'Europe', description: 'Top-ranked ETH Zurich and EPFL with minimal tuition' },
          { name: 'Mauritius', country: 'Africa', description: 'Emerging education hub on a tropical island paradise' }
        ])
      }
    } catch (error) {
      console.error('Error fetching destinations:', error)
      setDestinations([
        { name: 'Malta', country: 'Europe', description: 'Affordable EU education' },
        { name: 'South Korea', country: 'Asia', description: 'Advanced technology hub' },
        { name: 'Malaysia', country: 'Asia', description: 'Multicultural environment' }
      ])
    } finally {
      setLoading(false)
    }
  }

  // Removed loading skeleton to prevent page lag
  return (
    <section className="py-24 bg-neutral-50 font-outfit uppercase overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row items-end justify-between mb-16 gap-8 animate-fade-in-up">
          <div className="max-w-xl">
            <p className="text-primary text-[10px] font-bold mb-3 tracking-[0.4em] uppercase">Global Network</p>
            <h2 className="text-4xl md:text-5xl font-black text-neutral-900 leading-tight">
              ELITE ACADEMIC <br />
              <span className="italic font-light text-neutral-400">DESTINATIONS.</span>
            </h2>
          </div>
          <p className="max-w-xs text-neutral-500 text-sm font-medium normal-case leading-relaxed">
            Strategizing your entry into high-tier academic landscapes across the global grid.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((dest, i) => (
            <div
              key={i}
              className="group relative bg-white rounded-3xl border border-neutral-100 hover:border-primary/20 transition-all duration-700 animate-slide-up-fade overflow-hidden flex flex-col"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {/* Image Section */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={dest.imageUrl || getDestinationImage(dest.name)}
                  alt={dest.name}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                {/* Region Tag */}
                <div className="absolute top-6 left-6 z-10">
                  <span className="bg-white/95 backdrop-blur-md px-4 py-1.5 text-[10px] font-black tracking-widest text-neutral-900 rounded-full shadow-lg">
                    {dest.country}
                  </span>
                </div>

                {/* Icon Badge */}
                <div className="absolute bottom-6 left-6 z-10 flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-xl shadow-primary/30">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-white text-xl font-black tracking-tight">{dest.name}</span>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-8 flex flex-col flex-grow">
                <p className="text-neutral-500 text-sm font-medium leading-relaxed mb-8 line-clamp-2 normal-case flex-grow">
                  {dest.description}
                </p>

                <Link
                  href={`/country/${dest.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="group/btn relative w-full flex items-center justify-center bg-neutral-900 text-white py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] overflow-hidden transition-all hover:bg-primary shadow-xl hover:shadow-primary/30 active:scale-95"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    EXPLORE NODE
                    <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7-7 7" />
                    </svg>
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Destination Details */}
      {selectedDestination && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fade-in" onClick={() => setSelectedDestination(null)}>
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-zoom-spread" onClick={(e) => e.stopPropagation()}>
            {/* Header with Image */}
            <div className="relative h-64 overflow-hidden bg-blue-100">
              <Image
                src={getDestinationImage(selectedDestination.name)}
                alt={`Study in ${selectedDestination.name}`}
                fill
                className="absolute inset-0 w-full h-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"></div>
              <button
                onClick={() => setSelectedDestination(null)}
                className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition z-20"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="absolute bottom-6 left-6 text-white z-10">
                <h2 className="text-4xl font-bold mb-2">{selectedDestination.name}</h2>
                <p className="text-lg">{selectedDestination.country}</p>
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              {/* Description */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-blue-900 mb-3">About</h3>
                <p className="text-gray-700 leading-relaxed">{selectedDestination.description}</p>
              </div>

              {destinationDetails[selectedDestination.name] && (
                <>
                  {/* Highlights */}
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-blue-900 mb-4">Why Choose {selectedDestination.name}?</h3>
                    <div className="grid md:grid-cols-2 gap-3">
                      {destinationDetails[selectedDestination.name].highlights.map((highlight, i) => (
                        <div key={i} className="flex items-center gap-2 bg-blue-50 p-3 rounded-lg">
                          <svg className="w-5 h-5 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-700">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Top Universities */}
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-blue-900 mb-4">Top Universities</h3>
                    <div className="grid md:grid-cols-2 gap-3">
                      {destinationDetails[selectedDestination.name].universities.map((uni, i) => (
                        <div key={i} className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg hover:border-blue-300 transition">
                          <svg className="w-5 h-5 text-red-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                          </svg>
                          <span className="text-gray-700 text-sm">{uni}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Requirements */}
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-blue-900 mb-4">Entry Requirements</h3>
                    <ul className="space-y-2">
                      {destinationDetails[selectedDestination.name].requirements.map((req, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-red-600 mt-1">•</span>
                          <span className="text-gray-700">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Costs */}
                  <div className="bg-gradient-to-br from-blue-50 to-red-50 p-6 rounded-lg">
                    <h3 className="text-2xl font-bold text-blue-900 mb-3">Estimated Costs</h3>
                    <p className="text-gray-700">{destinationDetails[selectedDestination.name].costs}</p>
                  </div>
                </>
              )}

              {/* CTA Button */}
              <div className="mt-8 flex gap-4">
                <button className="flex-1 bg-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-700 transition-all duration-300 transform hover:scale-105">
                  Apply Now
                </button>
                <button className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105">
                  Book Consultation
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
