import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Image from 'next/image'

export default function Services() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [universities, setUniversities] = useState([])

  const demoServices = [
    {
      id: 'demo-s1',
      title: 'Global University Admissions',
      description: 'Navigate the complex landscape of international university applications with our elite consulting team. We curate a bespoke list of institutions that align perfectly with your academic profile and career ambitions.',
      features: ['Personalized University Shortlisting', 'Strategic Application Planning', 'Portfolio & Profile Building', 'Interview Masterclasses'],
      image: '/images/service-study-abroad.jpg',
      accent: 'bg-primary'
    },
    {
      id: 'demo-s2',
      title: 'Immigration & Visa Processing',
      description: 'Eliminate the stress of bureaucratic hurdles. Our dedicated visa specialists provide meticulous guidance to ensure your documentation is immaculate and your application is positioned for immediate approval.',
      features: ['Comprehensive File Preparation', 'Mock Visa Interviews', 'Financial Documentation Review', 'Embassy Liaison Services'],
      image: '/images/service-visa.jpg',
      accent: 'bg-secondary'
    },
    {
      id: 'demo-s3',
      title: 'Scholarship & Financial Aid',
      description: 'Unlock exclusive funding opportunities. We possess deep knowledge of global scholarship databases and will aggressively assist you in securing financial aid to dramatically reduce your educational investments.',
      features: ['Grant & Scholarship Matching', 'Financial Aid Appeal Strategy', 'Sponsorship Proposal Writing', 'Budget Modeling'],
      image: '/images/service-scholarship.jpg',
      accent: 'bg-primary'
    },
    {
      id: 'demo-s4',
      title: 'Premium Pre-Departure Suite',
      description: 'Transition seamlessly to your new linguistic and cultural environment. We arrange everything from premium accommodation to local networking events before you even board your flight.',
      features: ['Luxury Accommodation Booking', 'Cultural Integration Seminars', 'Global Banking Setup', 'Travel Itinerary Management'],
      image: '/images/service-immigration.jpg',
      accent: 'bg-secondary'
    },
    {
      id: 'demo-s5',
      title: 'Post-Arrival Concierge Suite',
      description: 'Our support doesn\'t end at the terminal. We provide comprehensive local integration support, from establishing residency to finding the best local amenities, ensuring you feel at home from day one.',
      features: ['Local Residency Registration', 'Part-time Job Assistance', 'Community Networking Events', '24/7 Emergency Support'],
      image: '/images/service-settlement.jpg',
      accent: 'bg-primary'
    }
  ]

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/services')
        const data = await response.json()
        if (data && data.length > 0) {
          const formatted = data.map((s, i) => ({
            id: s._id,
            title: s.title,
            description: s.description,
            features: s.features && s.features.length > 0 ? s.features : ['Personalized Guidance', 'Strategic Planning', 'Expert Support'],
            image: s.imageUrl || s.image || '/images/service-study-abroad.jpg',
            accent: i % 2 === 0 ? 'bg-primary' : 'bg-secondary'
          }))
          setServices(formatted)
        } else {
          setServices(demoServices)
        }
      } catch (err) {
        console.error('Error fetching services:', err)
        setServices(demoServices)
      } finally {
        setLoading(false)
      }
    }

    const fetchUniversities = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/universities')
        const data = await response.json()
        if (data && data.length > 0) {
          setUniversities(data)
        }
      } catch (err) {
        console.error('Error fetching universities:', err)
      }
    }

    fetchServices()
    fetchUniversities()
  }, [])

  // Removed loading block for faster perceived performance

  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900 selection:bg-black selection:text-white">
      <Navbar />

      {/* Premium Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/services-hero.jpg"
            alt="Our Services"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-emerald-900/80 mix-blend-multiply"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl animate-slide-up-fade">
            <span className="inline-block px-4 py-1.5 mb-6 text-[10px] font-bold tracking-[0.2em] text-white uppercase bg-blue-500/20 backdrop-blur-md border border-blue-500/30 rounded-full">
              Comprehensive Support
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1] mb-6 uppercase">
              Bespoke Advisory <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Architecting Futures.</span>
            </h1>
            <p className="text-lg md:text-xl text-blue-50 font-light max-w-2xl leading-relaxed normal-case">
              We provide a seamless ecosystem of international education services, meticulously designed to navigate every facet of your global transition.
            </p>
          </div>
        </div>
      </section>

      {/* Services List - Premium Grid */}
      <section className="py-24 bg-white relative overflow-hidden uppercase">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={service.id}
                id={service.id}
                className="group relative bg-neutral-50 border border-neutral-100 rounded-[2rem] overflow-hidden hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 animate-slide-up-fade"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Image Wrapper */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 to-transparent"></div>

                  {/* Service Number */}
                  <div className="absolute top-4 right-4 w-10 h-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    0{index + 1}
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 pb-10">
                  <div className="flex items-center gap-2 mb-4">
                    <span className={`w-2 h-2 rounded-full ${index % 2 === 0 ? 'bg-blue-600' : 'bg-emerald-600'}`}></span>
                    <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Global Excellence</span>
                  </div>

                  <h3 className="text-xl font-bold text-neutral-900 mb-4 uppercase tracking-tight group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-sm text-neutral-500 font-light leading-relaxed mb-8 normal-case">
                    {service.description}
                  </p>

                  <ul className="space-y-3 mb-8">
                    {service.features.slice(0, 3).map((feature, i) => (
                      <li key={i} className="flex items-center gap-3 text-[11px] font-medium text-neutral-600 normal-case">
                        <svg className={`w-4 h-4 ${index % 2 === 0 ? 'text-blue-600' : 'text-emerald-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Top Partner Universities appended to the University Admissions card */}
                  {service.title.toLowerCase().includes('university') && universities.length > 0 && (
                    <div className="mb-8 pt-4 border-t border-neutral-100">
                      <p className="text-[9px] font-bold text-neutral-400 tracking-widest uppercase mb-3">Partner Universities</p>
                      <div className="flex flex-wrap gap-2">
                        {universities.slice(0, 8).map((uni, idx) => (
                          <span key={idx} className="inline-block px-3 py-1.5 bg-blue-50 text-blue-800 rounded-lg text-[10px] font-bold normal-case tracking-tight border border-blue-100/50 shadow-sm">{uni.name}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  <a
                    href="/contact"
                    className={`inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] transition-all ${index % 2 === 0 ? 'text-blue-600 hover:text-blue-700' : 'text-emerald-600 hover:text-emerald-700'}`}
                  >
                    Discuss Requirements
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology Section - Enhanced */}
      <section className="py-24 bg-neutral-900 text-white relative overflow-hidden uppercase">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px]"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-600/10 rounded-full blur-[120px]"></div>

        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="text-center mb-20 animate-slide-up-fade">
            <span className="text-blue-400 font-bold text-[10px] uppercase tracking-[0.3em] mb-4 block">Process Blueprint</span>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 uppercase tracking-tight">Our <span className="italic font-light text-neutral-400 normal-case">Methodology.</span></h2>
            <p className="text-blue-100/60 font-light max-w-xl mx-auto normal-case leading-relaxed">A systematic, multi-phase approach engineered to ensure surgical precision at every stage of your application.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Pedigree Analysis',
                desc: 'In-depth audit of your academic background, career trajectory, and latent potential.',
                icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path></svg>
              },
              {
                step: '02',
                title: 'Strategic Mapping',
                desc: 'Curating a bespoke roadmap aligning institutional selection with global market demands.',
                icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path></svg>
              },
              {
                step: '03',
                title: 'Elite Execution',
                desc: 'Precision-managed dossier preparation, interview coaching, and compliance oversight.',
                icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              }
            ].map((phase, idx) => (
              <div
                key={idx}
                className="group p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-[2rem] hover:bg-white/10 transition-all duration-500 animate-slide-up-fade"
                style={{ animationDelay: `${idx * 150}ms` }}
              >
                <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-900/40 group-hover:scale-110 transition-transform">
                  {phase.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 uppercase tracking-tight">{phase.title}</h3>
                <p className="text-blue-100/60 text-sm font-light leading-relaxed normal-case">{phase.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium CTA Section */}
      <section className="py-24 bg-white relative overflow-hidden flex items-center justify-center uppercase">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="max-w-3xl mx-auto animate-slide-up-fade">
            <span className="text-blue-600 font-bold text-[10px] uppercase tracking-[0.4em] mb-6 block">Immediate Initiation</span>

            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-neutral-900 tracking-tight leading-none mb-8 uppercase">
              Secure Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600">Consultation.</span>
            </h2>

            <p className="text-lg text-neutral-500 font-light mb-12 normal-case leading-relaxed">
              Consult with our senior partners to begin architecting your global academic identity. Spaces for the upcoming intake are limited.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a href="/contact" className="w-full sm:w-auto px-10 py-5 bg-neutral-900 text-white font-bold text-[10px] uppercase tracking-[0.2em] rounded-xl hover:bg-blue-600 transition-all hover:-translate-y-1 shadow-xl shadow-neutral-200">
                Book Initial Audit
              </a>
              <a href="tel:+919205031277" className="w-full sm:w-auto px-10 py-5 bg-neutral-50 border border-neutral-100 text-neutral-900 font-bold text-[10px] uppercase tracking-[0.2em] rounded-xl hover:bg-white hover:border-blue-200 transition-all hover:-translate-y-1">
                Direct Line
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
