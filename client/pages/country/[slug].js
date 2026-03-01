import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import Link from 'next/link'
import axios from 'axios'
import fallbackCountries from '../../data/fallbackCountries'

export default function CountryDetail() {
  const router = useRouter()
  const { slug } = router.query
  const [country, setCountry] = useState(null)
  const [loading, setLoading] = useState(true)
  const [relatedCountries, setRelatedCountries] = useState([])
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    if (slug) {
      fetchCountryData()
    }
  }, [slug])

  const useFallback = () => {
    const found = fallbackCountries.find(c => c.slug === slug)
    if (found) {
      setCountry(found)
      const others = fallbackCountries.filter(c => c.slug !== slug)
      setRelatedCountries(others.sort(() => 0.5 - Math.random()).slice(0, 3))
    }
  }

  const fetchCountryData = async () => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'
      const response = await axios.get(`${API_URL}/countries`)
      const countries = response.data

      const foundCountry = countries.find(c =>
        c.name.toLowerCase().replace(/\s+/g, '-') === slug
      )

      if (foundCountry) {
        setCountry(foundCountry)
        const others = countries.filter(c => c._id !== foundCountry._id)
        setRelatedCountries(others.sort(() => 0.5 - Math.random()).slice(0, 3))
      } else {
        useFallback()
      }
    } catch (error) {
      console.error('Error:', error)
      useFallback()
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading country details...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!country) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 uppercase tracking-tighter">Country Not Found</h1>
          <p className="text-xl text-gray-600 mb-10">The country you're looking for doesn't exist.</p>
          <a href="/destinations" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
            View All Destinations
          </a>
        </div>
        <Footer />
      </div>
    )
  }

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'costs', label: 'Costs & Fees' },
    { id: 'admission', label: 'Admission Requirements' },
    { id: 'visa', label: 'Visa Information' },
    { id: 'scholarships', label: 'Scholarships & Financial Aid' },
    { id: 'work', label: 'Work Opportunities' },
    { id: 'lifestyle', label: 'Student Life & Culture' },
    { id: 'accommodation', label: 'Accommodation Options' },
    { id: 'healthcare', label: 'Healthcare & Insurance' },
    { id: 'application', label: 'Application Process' }
  ]

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-brand-blue pt-48 pb-32 overflow-hidden">
        {/* Decorative Floating Elements */}
        <div className="absolute top-20 left-10 w-6 h-6 text-white/20 animate-float opacity-30">
          <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 0l3.09 8.91H24L16.91 14.5 19.91 24 12 18.18 4.09 24l3-9.5L0 8.91h8.91L12 0z" /></svg>
        </div>
        <div className="absolute bottom-40 right-20 w-8 h-8 text-white/10 animate-pulse-slow">
          <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" /></svg>
        </div>
        <div className="absolute top-1/4 left-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-blob"></div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          {/* Enhanced Breadcrumbs */}
          <div className="flex items-center justify-center gap-4 text-white/60 text-xs font-bold uppercase tracking-[0.3em] mb-10 animate-fade-in-down">
            <Link href="/destinations" className="hover:text-white transition-all flex items-center gap-2">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M11 17l-5-5m0 0l5-5m-5 5h12" /></svg>
              Destinations
            </Link>
            <span className="w-1.5 h-1.5 bg-brand-orange rounded-full shadow-[0_0_10px_rgba(255,140,90,0.8)]"></span>
            <span className="text-white brightness-125">{country.name}</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-8xl font-black text-white mb-12 uppercase tracking-tighter leading-none animate-fade-in-up">
            Study in <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-brand-orange drop-shadow-2xl">{country.name}</span>
          </h1>

          {/* Premium Dual Image Layout */}
          <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto mb-20">
            <div className="flex-1 relative h-[400px] rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] border-8 border-white group animate-scale-up">
              <img
                src={country.imageUrl || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80'}
                alt={`${country.name} Landmark`}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-8">
                <span className="text-white text-[10px] font-black uppercase tracking-[0.4em] bg-black/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">Discovery Portal</span>
              </div>
            </div>
            <div className="flex-1 relative h-[400px] rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] border-8 border-white bg-slate-50 group animate-scale-up delay-150">
              <iframe
                src={`https://maps.google.com/maps?q=${encodeURIComponent(country.name)}&t=&z=5&ie=UTF8&iwloc=&output=embed`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full object-cover grayscale opacity-90 transition-all duration-700 group-hover:grayscale-0 group-hover:opacity-100"
              />
              <div className="absolute top-6 right-8 pointer-events-none z-10">
                <div className="w-12 h-12 bg-white/80 backdrop-blur-md shadow-lg rounded-2xl flex items-center justify-center text-brand-orange animate-pulse">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" /></svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Curved Edge Transition */}
        <div className="absolute -bottom-1 left-0 w-full overflow-hidden leading-none z-10 translate-y-[1px]">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-[60px] md:h-[100px] lg:h-[120px] preserve-3d scale-x-105">
            <path d="M1440 120H0V48C0 48 360 0 720 0C1080 0 1440 48 1440 48V120Z" fill="#f8fafc" />
          </svg>
        </div>
      </section>

      {/* Sticky Pill Tabs Navigation */}
      <section className="sticky top-20 z-40 py-6 transition-all duration-300">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex items-center justify-center">
            <div className="flex overflow-x-auto no-scrollbar gap-2 p-2 bg-white/80 backdrop-blur-2xl border border-white rounded-[2rem] shadow-[0_10px_30px_rgba(0,0,0,0.05)]">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-500 whitespace-nowrap ${activeTab === tab.id
                    ? 'bg-brand-blue text-white shadow-xl shadow-brand-blue/30 -translate-y-0.5'
                    : 'text-slate-500 hover:text-brand-blue hover:bg-slate-50'
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">

            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-12">
                {/* Main Content Card */}
                <div className="bg-white rounded-[3rem] p-10 md:p-16 shadow-[0_30px_100px_rgba(0,0,0,0.03)] border border-slate-100 animate-fade-in-up">
                  <div className="flex flex-col lg:flex-row gap-16 items-start">
                    <div className="flex-1">
                      <span className="text-brand-orange font-black text-[10px] uppercase tracking-[0.5em] mb-4 block">Destination Intelligence</span>
                      <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 uppercase tracking-tight leading-none">About {country.name}</h2>
                      <p className="text-slate-500 text-lg md:text-xl leading-relaxed mb-10 normal-case font-medium">
                        {country.description}
                      </p>

                      {country.whyStudy && (
                        <div className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100 relative overflow-hidden group">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
                          <h3 className="text-lg font-black text-slate-900 mb-4 uppercase tracking-tight relative z-10">Strategic Advantage</h3>
                          <p className="text-slate-500 leading-relaxed normal-case relative z-10">{country.whyStudy}</p>
                        </div>
                      )}
                    </div>

                    {/* Side Stats/Quick Info Bento */}
                    <div className="w-full lg:w-80 grid gap-6">
                      <div className="bg-brand-blue text-white p-8 rounded-[2rem] shadow-xl shadow-brand-blue/20">
                        <svg className="w-8 h-8 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                        <h4 className="font-bold text-xs uppercase tracking-[0.2em] mb-1 text-white/70">Top Institutions</h4>
                        <p className="text-3xl font-black">{country.universities?.length || 0}+</p>
                      </div>
                      <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50">
                        <svg className="w-8 h-8 mb-6 text-brand-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                        <h4 className="font-bold text-xs uppercase tracking-[0.2em] mb-1 text-slate-400">Main Intakes</h4>
                        <p className="text-sm font-black text-slate-900 uppercase">{country.intakePeriods?.join(' • ') || 'All Year'}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Key Highlights Bento Grid */}
                {country.highlights && country.highlights.length > 0 && (
                  <div className="animate-fade-in-up delay-200">
                    <div className="mb-8 flex items-center gap-6">
                      <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Key Advantages</h2>
                      <div className="h-[2px] flex-1 bg-slate-100"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {country.highlights.map((highlight, index) => (
                        <div key={index} className="group p-8 bg-white rounded-[2rem] border border-slate-100 hover:border-brand-blue/30 hover:shadow-2xl hover:shadow-brand-blue/5 transition-all duration-500">
                          <div className="w-12 h-12 bg-slate-50 text-brand-blue rounded-xl flex items-center justify-center mb-6 transition-all group-hover:bg-brand-blue group-hover:text-white group-hover:rotate-12">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <p className="text-slate-700 font-bold uppercase tracking-tight text-sm leading-tight">{highlight}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Top Universities Section */}
                {country.universities && country.universities.length > 0 && (
                  <div className="bg-[#0a1025] rounded-[3rem] p-10 md:p-16 text-white relative overflow-hidden animate-fade-in-up delay-300">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-blue/10 -skew-x-12 translate-x-1/2"></div>
                    <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
                      <div className="md:w-1/3">
                        <span className="text-brand-orange font-black text-[10px] uppercase tracking-[0.4em] mb-4 block">Academic Elite</span>
                        <h2 className="text-3xl md:text-5xl font-black mb-6 uppercase tracking-tight">Prestigious <br /> Universities</h2>
                        <p className="text-white/60 text-sm normal-case font-medium leading-relaxed">
                          Access world-class education at these top-tier institutions within {country.name}'s geographic boundary.
                        </p>
                      </div>
                      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {country.universities.map((university, index) => (
                          <div key={index} className="flex items-center gap-4 p-5 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 group hover:bg-white/10 transition-all">
                            <div className="w-10 h-10 bg-brand-orange text-white rounded-xl flex items-center justify-center font-black text-sm">
                              {index + 1}
                            </div>
                            <p className="text-sm font-bold uppercase tracking-tight group-hover:text-brand-orange transition-colors">{university}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Costs Tab */}
            {activeTab === 'costs' && (
              <div className="space-y-12 animate-fade-in-up">
                {country.tuitionFees && (
                  <div className="bg-white rounded-[3rem] p-10 md:p-16 shadow-[0_30px_100px_rgba(0,0,0,0.03)] border border-slate-100">
                    <div className="mb-10">
                      <span className="text-brand-orange font-black text-[10px] uppercase tracking-[0.5em] mb-4 block">Financial Planning</span>
                      <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tight">Tuition Fees</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {['undergraduate', 'postgraduate', 'doctoral'].map((level) => (
                        country.tuitionFees[level] && (
                          <div key={level} className="group p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:rotate-12 ${level === 'undergraduate' ? 'bg-blue-100 text-blue-600' :
                              level === 'postgraduate' ? 'bg-purple-100 text-purple-600' : 'bg-green-100 text-green-600'
                              }`}>
                              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 14l9-5-9-5-9 5 9 5zM12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /></svg>
                            </div>
                            <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-2">{level}</h3>
                            <p className="text-2xl font-black text-slate-900 uppercase tracking-tight">{country.tuitionFees[level]}</p>
                          </div>
                        )
                      ))}
                    </div>
                  </div>
                )}

                {country.costOfLiving && (
                  <div className="animate-fade-in-up delay-150">
                    <div className="mb-8 flex items-center gap-6">
                      <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Living Expenses</h2>
                      <div className="h-[2px] flex-1 bg-slate-100"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {[
                        { key: 'accommodation', icon: '🏠', color: 'bg-orange-100 text-orange-600' },
                        { key: 'food', icon: '🍗', color: 'bg-red-100 text-red-600' },
                        { key: 'transport', icon: '🚇', color: 'bg-blue-100 text-blue-600' },
                        { key: 'overall', icon: '💰', color: 'bg-green-600 text-white', highlight: true }
                      ].map((item) => (
                        country.costOfLiving[item.key] && (
                          <div key={item.key} className={`p-8 rounded-[2rem] border transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${item.highlight ? 'bg-brand-blue border-brand-blue text-white shadow-xl shadow-brand-blue/20' : 'bg-white border-slate-100 text-slate-900'
                            }`}>
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 text-xl ${item.highlight ? 'bg-white/20' : item.color}`}>
                              {item.icon}
                            </div>
                            <h3 className={`text-[10px] font-black uppercase tracking-[0.4em] mb-2 ${item.highlight ? 'text-white/70' : 'text-slate-400'}`}>
                              {item.key.replace(/([A-Z])/g, ' $1')}
                            </h3>
                            <p className={`font-black uppercase tracking-tight ${item.highlight ? 'text-2xl' : 'text-lg text-slate-900'}`}>
                              {country.costOfLiving[item.key]}
                            </p>
                          </div>
                        )
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Admission Tab */}
            {activeTab === 'admission' && country.admissionRequirements && (
              <div className="space-y-12 animate-fade-in-up">
                <div className="bg-white rounded-[3rem] p-10 md:p-16 shadow-[0_30px_100px_rgba(0,0,0,0.03)] border border-slate-100">
                  <div className="mb-12">
                    <span className="text-brand-orange font-black text-[10px] uppercase tracking-[0.5em] mb-4 block">Academic Criteria</span>
                    <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tight">Admission Entry</h2>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-12">
                    {/* Academic Requirements Card */}
                    {country.admissionRequirements.academicQualifications?.length > 0 && (
                      <div className="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100 shadow-sm transition-all hover:bg-white hover:shadow-2xl group">
                        <div className="flex items-center gap-4 mb-8">
                          <div className="w-12 h-12 bg-brand-blue text-white rounded-2xl flex items-center justify-center shadow-lg shadow-brand-blue/20 rotate-3 group-hover:rotate-12 transition-transform">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                          </div>
                          <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Academic Standards</h3>
                        </div>
                        <ul className="space-y-4">
                          {country.admissionRequirements.academicQualifications.map((qual, index) => (
                            <li key={index} className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-slate-100 group/item hover:border-brand-blue/30 transition-all">
                              <span className="text-brand-blue mt-1 bg-brand-blue/10 rounded-full p-1 group-hover/item:scale-110 transition-transform">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                              </span>
                              <span className="text-slate-600 font-bold uppercase tracking-tight text-sm leading-tight">{qual}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="space-y-8">
                      {/* Language Requirements */}
                      {country.admissionRequirements.languageRequirements && (
                        <div className="p-10 bg-[#0a1025] text-white rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                          <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-all duration-700"></div>
                          <div className="flex items-center gap-4 mb-6 relative z-10">
                            <div className="w-10 h-10 bg-brand-orange rounded-xl flex items-center justify-center">
                              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 0H11m3.951 3.512A18.049 18.049 0 0115.732 9M11 9H7m4 0a14.45 14.45 0 003.472 9M11 9a14.55 14.55 0 01-2.207 5.7L7 9" /></svg>
                            </div>
                            <h3 className="text-lg font-black uppercase tracking-tight">Language Proficiency</h3>
                          </div>
                          <p className="text-white/70 font-medium normal-case leading-relaxed relative z-10">{country.admissionRequirements.languageRequirements}</p>
                        </div>
                      )}

                      {/* Standardized Tests */}
                      {country.admissionRequirements.standardizedTests?.length > 0 && (
                        <div className="p-10 bg-white border border-slate-100 rounded-[2.5rem] shadow-xl shadow-slate-200/50">
                          <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Required Assessments</h3>
                          <div className="flex flex-wrap gap-3">
                            {country.admissionRequirements.standardizedTests.map((test, index) => (
                              <div key={index} className="px-6 py-3 bg-slate-50 border border-slate-100 text-brand-blue rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-brand-blue hover:text-white transition-all cursor-default">
                                {test}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Visa Tab */}
            {activeTab === 'visa' && country.visaInformation && (
              <div className="space-y-12 animate-fade-in-up">
                <div className="bg-white rounded-[3rem] p-10 md:p-16 shadow-[0_30px_100px_rgba(0,0,0,0.03)] border border-slate-100 overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full -mr-32 -mt-32"></div>

                  <div className="mb-12 relative z-10">
                    <span className="text-brand-orange font-black text-[10px] uppercase tracking-[0.5em] mb-4 block">Regulatory Framework</span>
                    <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tight">Visa Clearance</h2>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8 mb-12 relative z-10">
                    {[
                      { key: 'visaType', label: 'Primary Visa Category', icon: '🛂' },
                      { key: 'processingTime', label: 'Expected Timeline', icon: '⏱️' }
                    ].map((info) => (
                      country.visaInformation[info.key] && (
                        <div key={info.key} className="p-10 bg-slate-50 border border-slate-100 rounded-[2.5rem] group hover:bg-white hover:shadow-2xl transition-all duration-500">
                          <div className="text-3xl mb-4 group-hover:scale-110 transition-transform inline-block">{info.icon}</div>
                          <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-2">{info.label}</h3>
                          <p className="text-lg font-black text-slate-900 uppercase tracking-tight">{country.visaInformation[info.key]}</p>
                        </div>
                      )
                    ))}
                  </div>

                  {country.visaInformation.requirements?.length > 0 && (
                    <div className="animate-fade-in-up delay-200 relative z-10">
                      <div className="mb-8 flex items-center gap-6">
                        <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Documentation Protocol</h2>
                        <div className="h-[2px] flex-1 bg-slate-100"></div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        {country.visaInformation.requirements.map((req, index) => (
                          <div key={index} className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-slate-100 group hover:border-brand-blue/30 transition-all">
                            <span className="w-8 h-8 rounded-lg bg-brand-blue/5 text-brand-blue flex items-center justify-center font-black text-[10px] group-hover:bg-brand-blue group-hover:text-white transition-all">
                              {index + 1}
                            </span>
                            <span className="text-slate-600 font-bold uppercase tracking-tight text-[11px] leading-tight">{req}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Scholarships Tab */}
            {activeTab === 'scholarships' && country.scholarships && country.scholarships.length > 0 && (
              <div className="space-y-12 animate-fade-in-up">
                <div className="bg-white rounded-[3rem] p-10 md:p-16 shadow-[0_30px_100px_rgba(0,0,0,0.03)] border border-slate-100">
                  <div className="mb-12">
                    <span className="text-brand-orange font-black text-[10px] uppercase tracking-[0.5em] mb-4 block">Financial Support</span>
                    <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tight">Available Grants</h2>
                  </div>
                  <div className="grid gap-6">
                    {country.scholarships.map((scholarship, index) => (
                      <div key={index} className="p-10 bg-slate-50 border border-slate-100 rounded-[2.5rem] relative overflow-hidden group hover:bg-white hover:shadow-2xl transition-all duration-500">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-brand-orange/5 rounded-full -mr-20 -mt-20 group-hover:scale-150 transition-transform duration-1000"></div>
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                          <div className="flex-1">
                            <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight uppercase">{scholarship.name}</h3>
                            <p className="text-slate-500 font-medium normal-case leading-relaxed">{scholarship.description}</p>
                          </div>
                          {scholarship.amount && (
                            <div className="px-10 py-5 bg-brand-orange text-white rounded-2xl font-black text-lg shadow-xl shadow-brand-orange/30 transform group-hover:scale-105 transition-transform">
                              {scholarship.amount}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Work Opportunities Tab */}
            {activeTab === 'work' && country.workOpportunities && (
              <div className="space-y-12 animate-fade-in-up">
                <div className="bg-white rounded-[3rem] p-10 md:p-16 shadow-[0_30px_100px_rgba(0,0,0,0.03)] border border-slate-100">
                  <div className="mb-12">
                    <span className="text-brand-orange font-black text-[10px] uppercase tracking-[0.5em] mb-4 block">Economic Integration</span>
                    <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tight">Post-Graduation</h2>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8 mb-12">
                    {['duringStudy', 'afterStudy'].map((phase) => (
                      country.workOpportunities[phase] && (
                        <div key={phase} className={`p-10 rounded-[2.5rem] border group hover:shadow-2xl transition-all duration-500 ${phase === 'afterStudy' ? 'bg-[#0a1025] text-white border-white/10' : 'bg-slate-50 border-slate-100 text-slate-900'
                          }`}>
                          <h3 className={`text-xs font-black uppercase tracking-[0.2em] mb-6 ${phase === 'afterStudy' ? 'text-white/40' : 'text-slate-400'}`}>
                            {phase === 'afterStudy' ? 'Career Potential' : 'Student Employment'}
                          </h3>
                          <p className={`text-lg font-bold normal-case leading-relaxed ${phase === 'afterStudy' ? 'text-white/80' : 'text-slate-600'}`}>
                            {country.workOpportunities[phase]}
                          </p>
                        </div>
                      )
                    ))}
                  </div>

                  {country.workOpportunities.averageWages && (
                    <div className="p-10 bg-brand-orange/5 border border-brand-orange/20 rounded-[2rem] flex items-center gap-8">
                      <div className="w-16 h-16 bg-brand-orange text-white rounded-2xl flex items-center justify-center shadow-xl shadow-brand-orange/20 text-2xl">⚡</div>
                      <div>
                        <h4 className="text-xs font-black text-brand-orange uppercase tracking-[0.2em] mb-1">Estimated Earnings</h4>
                        <p className="text-2xl font-black text-slate-900 uppercase tracking-tight">{country.workOpportunities.averageWages}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Student Life & Culture Tab */}
            {activeTab === 'lifestyle' && (
              <div className="space-y-12 animate-fade-in-up">
                <div className="bg-white rounded-[3rem] p-10 md:p-16 shadow-[0_30px_100px_rgba(0,0,0,0.03)] border border-slate-100">
                  <div className="mb-12">
                    <span className="text-brand-orange font-black text-[10px] uppercase tracking-[0.5em] mb-4 block">Student Experience</span>
                    <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tight text-center">Culture & Lifestyle</h2>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    {country.studentLife?.climate && (
                      <div className="p-10 bg-blue-50/50 border border-blue-100 rounded-[2.5rem] group hover:bg-white hover:shadow-2xl transition-all duration-500">
                        <div className="text-3xl mb-4 group-hover:scale-110 transition-transform inline-block">☀️</div>
                        <h3 className="text-xs font-black text-blue-400 uppercase tracking-[0.2em] mb-2">Climate Dynamics</h3>
                        <p className="text-slate-600 font-medium normal-case leading-relaxed">{country.studentLife.climate}</p>
                      </div>
                    )}
                    {country.studentLife?.culture && (
                      <div className="p-10 bg-purple-50/50 border border-purple-100 rounded-[2.5rem] group hover:bg-white hover:shadow-2xl transition-all duration-500">
                        <div className="text-3xl mb-4 group-hover:scale-110 transition-transform inline-block">🎭</div>
                        <h3 className="text-xs font-black text-purple-400 uppercase tracking-[0.2em] mb-2">Social Fabric</h3>
                        <p className="text-slate-600 font-medium normal-case leading-relaxed">{country.studentLife.culture}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Accommodation Tab */}
            {activeTab === 'accommodation' && (
              <div className="space-y-12 animate-fade-in-up">
                <div className="bg-white rounded-[3rem] p-10 md:p-16 shadow-[0_30px_100px_rgba(0,0,0,0.03)] border border-slate-100">
                  <div className="mb-12">
                    <span className="text-brand-orange font-black text-[10px] uppercase tracking-[0.5em] mb-4 block">Residential Options</span>
                    <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tight">Living Spaces</h2>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8 mb-12">
                    {country.accommodation?.types?.length > 0 && (
                      <div className="space-y-4">
                        <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Standard Categories</h3>
                        {country.accommodation.types.map((type, index) => (
                          <div key={index} className="flex items-center gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-100 group hover:bg-white hover:shadow-xl transition-all">
                            <div className="w-10 h-10 bg-brand-blue/10 text-brand-blue rounded-xl flex items-center justify-center font-black text-xs group-hover:bg-brand-blue group-hover:text-white transition-all">
                              0{index + 1}
                            </div>
                            <span className="text-slate-900 font-bold uppercase tracking-tight">{type}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="space-y-8">
                      {country.accommodation?.cost && (
                        <div className="p-10 bg-brand-blue text-white rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full -ml-16 -mb-16 group-hover:scale-150 transition-transform duration-700"></div>
                          <h3 className="text-xs font-black text-white/40 uppercase tracking-[0.2em] mb-4">Financial Estimate</h3>
                          <p className="text-2xl font-black uppercase tracking-tight relative z-10">{country.accommodation.cost}</p>
                        </div>
                      )}
                      {country.accommodation?.tips && country.accommodation.tips.length > 0 && (
                        <div className="p-10 bg-white border border-slate-100 rounded-[2.5rem] shadow-lg shadow-slate-200/50">
                          <h3 className="text-xs font-black text-brand-orange uppercase tracking-[0.2em] mb-6">Strategic Advice</h3>
                          <ul className="space-y-4">
                            {country.accommodation.tips.map((tip, index) => (
                              <li key={index} className="flex items-start gap-3">
                                <span className="text-brand-orange font-black mt-1">→</span>
                                <span className="text-slate-600 font-medium normal-case text-sm leading-relaxed">{tip}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Healthcare Tab */}
            {activeTab === 'healthcare' && (
              <div className="space-y-12 animate-fade-in-up">
                <div className="bg-white rounded-[3rem] p-10 md:p-16 shadow-[0_30px_100px_rgba(0,0,0,0.03)] border border-slate-100">
                  <div className="mb-12">
                    <span className="text-brand-orange font-black text-[10px] uppercase tracking-[0.5em] mb-4 block">Medical Systems</span>
                    <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tight">Health & Safety</h2>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-12">
                    {country.healthcare?.system && (
                      <div className="p-10 bg-red-50/50 border border-red-100 rounded-[2.5rem] group hover:bg-white hover:shadow-2xl transition-all duration-500">
                        <div className="w-12 h-12 bg-red-500 text-white rounded-xl flex items-center justify-center mb-6 shadow-xl shadow-red-500/20 group-hover:rotate-12 transition-transform">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                        </div>
                        <h3 className="text-xs font-black text-red-500 uppercase tracking-[0.2em] mb-2">Medical Infrastructure</h3>
                        <p className="text-slate-600 font-medium normal-case leading-relaxed">{country.healthcare.system}</p>
                      </div>
                    )}
                    {country.healthcare?.insurance && (
                      <div className="p-10 bg-slate-900 text-white rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
                        <h3 className="text-xs font-black text-white/40 uppercase tracking-[0.2em] mb-6">Mandatory Protocol</h3>
                        <p className="text-white/80 font-medium normal-case leading-relaxed relative z-10">{country.healthcare.insurance}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Application Process Tab */}
            {activeTab === 'application' && (
              <div className="space-y-12 animate-fade-in-up">
                <div className="bg-white rounded-[3rem] p-10 md:p-16 shadow-[0_30px_100px_rgba(0,0,0,0.03)] border border-slate-100">
                  <div className="mb-12 text-center">
                    <span className="text-brand-orange font-black text-[10px] uppercase tracking-[0.5em] mb-4 block">Strategic Roadmap</span>
                    <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tight">Submission Journey</h2>
                  </div>

                  {country.applicationProcess?.timeline?.length > 0 && (
                    <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
                      {country.applicationProcess.timeline.map((step, index) => (
                        <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group animate-fade-in-up" style={{ animationDelay: `${index * 150}ms` }}>
                          <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-50 text-brand-blue shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 group-hover:bg-brand-blue group-hover:text-white transition-all duration-300">
                            <span className="text-xs font-black">{index + 1}</span>
                          </div>
                          <div className="w-[calc(100%-4rem)] md:w-[45%] p-8 bg-slate-50 border border-slate-100 rounded-[2.5rem] group-hover:bg-white group-hover:shadow-2xl transition-all duration-500">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-black text-slate-900 uppercase tracking-tight">{step.phase}</h4>
                              {step.duration && <span className="text-[10px] font-black text-brand-orange uppercase tracking-widest">{step.duration}</span>}
                            </div>
                            <p className="text-slate-500 text-sm normal-case font-medium">{step.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {country.applicationProcess?.deadlines && (
                    <div className="mt-16 p-10 bg-red-50 border border-red-100 rounded-[2.5rem] animate-pulse-slow">
                      <h3 className="text-xs font-black text-red-500 uppercase tracking-[0.2em] mb-2">Critical Awareness</h3>
                      <p className="text-slate-900 font-bold uppercase tracking-tight leading-relaxed">{country.applicationProcess.deadlines}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section - Premium Curved Design */}
      <section className="py-32 bg-[#0a1025] text-white relative overflow-hidden">
        {/* Curved Top Transition */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-10 -translate-y-[1px]">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-[60px] md:h-[100px] lg:h-[120px] preserve-3d scale-x-105 rotate-180">
            <path d="M1440 120H0V48C0 48 360 0 720 0C1080 0 1440 48 1440 48V120Z" fill="#f8fafc" />
          </svg>
        </div>

        {/* Decorative background elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-blue/10 rounded-full blur-[120px] animate-pulse-slow"></div>

        <div className="container mx-auto px-4 text-center relative z-20">
          <div className="inline-block px-8 py-3 bg-white/5 backdrop-blur-md rounded-full border border-white/10 mb-10 animate-fade-in-down">
            <span className="text-brand-orange font-black text-[10px] uppercase tracking-[0.5em]">Global Readiness</span>
          </div>

          <h2 className="text-4xl md:text-7xl font-black mb-10 uppercase tracking-tight leading-none animate-fade-in-up">
            Ready to Forge Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-orange-400">Future in {country.name}?</span>
          </h2>

          <p className="text-white/60 text-lg md:text-xl mb-16 max-w-3xl mx-auto normal-case font-medium leading-relaxed animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            We provide specialized strategic consulting for students seeking higher education in {country.name}. Join thousands of successful World Passport alumni.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
            <Link
              href="/contact"
              className="group relative w-full sm:w-auto px-12 py-6 bg-brand-orange text-white font-black uppercase tracking-[0.2em] text-xs rounded-2xl shadow-2xl shadow-brand-orange/20 overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
              <span className="relative z-10 flex items-center justify-center gap-3">
                Book Expert Consultation
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </span>
            </Link>
            <Link
              href="/programs"
              className="w-full sm:w-auto px-12 py-6 bg-white/5 backdrop-blur-md border border-white/20 text-white font-black uppercase tracking-[0.2em] text-xs rounded-2xl hover:bg-white/10 transition-all"
            >
              Explore Programs
            </Link>
          </div>
        </div>
      </section>

      {/* Related Countries Section */}
      {relatedCountries?.length > 0 && (
        <section className="py-24 bg-[#f8fafc]">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                <div>
                  <span className="text-brand-orange font-black text-[10px] uppercase tracking-[0.5em] mb-4 block">Alternative Jurisdictions</span>
                  <h2 className="text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter leading-none">Explore More <br /> <span className="text-slate-400">Destinations</span></h2>
                </div>
                <Link href="/destinations" className="group px-8 py-4 bg-white border border-slate-200 text-slate-900 font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl hover:border-brand-blue transition-all flex items-center gap-3">
                  View Comprehensive List
                  <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedCountries.map((related, index) => (
                  <Link
                    key={related.slug}
                    href={`/country/${related.slug}`}
                    className="group relative h-[500px] rounded-[2.5rem] overflow-hidden shadow-2xl animate-fade-in-up"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <img
                      src={related.imageUrl || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80'}
                      alt={related.name}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80"></div>

                    <div className="absolute bottom-8 left-8 right-8 text-white">
                      <span className="text-brand-orange font-black text-[10px] uppercase tracking-[0.5em] mb-2 block">{related.category || 'Elite University'}</span>
                      <h3 className="text-3xl font-black uppercase tracking-tight mb-4">{related.name}</h3>
                      <div className="h-[1px] w-full bg-white/20 mb-6 transition-all duration-700"></div>
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 group-hover:gap-4 transition-all">
                        View Destination Data
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
      <Footer />
    </div>
  );
}
