import { useState, useEffect } from 'react'
import api from '../utils/api'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Link from 'next/link'
import Image from 'next/image'
import fallbackCountries from '../data/fallbackCountries'

export default function Destinations() {
  const [destinations, setDestinations] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDestinations()
  }, [])

  const fetchDestinations = async () => {
    try {
      const response = await api.get('/countries')

      if (response.data && response.data.length > 0) {
        const formatted = response.data.map(dest => ({
          ...dest,
          _id: dest._id || dest.id,
          imageUrl: dest.imageUrl || '/images/hero-1.jpg',
          highlights: dest.highlights && dest.highlights.length > 0 ? dest.highlights : ['Global Academic Standards', 'Cultural Immersion', 'Career Growth']
        }));
        setDestinations(formatted);
      } else {
        setDestinations(fallbackCountries);
      }
    } catch (error) {
      console.error('Error fetching destinations:', error);
      setDestinations(fallbackCountries);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-white font-sans text-neutral-900 selection:bg-neutral-100">
      <Navbar />

      {/* Premium Hero Section */}
      <section className="relative bg-brand-blue pt-52 pb-32 overflow-hidden">
        {/* Curvy background decorations */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 -skew-x-12 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-full h-24 bg-white" style={{ clipPath: 'ellipse(70% 100% at 50% 100%)' }}></div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="max-w-4xl mx-auto animate-slide-up-fade">
            <span className="inline-block px-4 py-1.5 mb-6 text-[10px] font-bold tracking-[0.4em] text-white uppercase bg-white/10 backdrop-blur-md border border-white/20 rounded-full">
              Global Education Network
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-8 uppercase leading-tight">
              Study <span className="text-brand-orange">Destinations</span>
            </h1>
            <p className="text-xl text-white/90 font-light max-w-2xl mx-auto leading-relaxed">
              Architect your global future across the world's most prestigious academic landscapes. From historic European institutions to modern innovation hubs.
            </p>
          </div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-24 pt-12 bg-white relative">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {destinations.map((dest, i) => (
              <div
                key={i}
                className="group relative bg-neutral-50 border border-neutral-100 rounded-[2.5rem] overflow-hidden hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-700 animate-slide-up-fade flex flex-col"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="h-64 relative overflow-hidden">
                  {dest.imageUrl && (
                    <Image
                      src={dest.imageUrl || '/images/hero-1.jpg'}
                      alt={dest.name}
                      fill
                      className="object-cover transition-all duration-1000 group-hover:scale-110"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                  <div className="absolute bottom-6 left-6">
                    <span className="px-4 py-1.5 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-[10px] font-bold tracking-[0.2em] text-white uppercase">
                      {dest.name}
                    </span>
                  </div>
                </div>

                <div className="p-10 flex flex-col flex-grow text-left">
                  <p className="text-neutral-500 text-[13px] font-medium leading-relaxed mb-8 normal-case opacity-90">
                    {dest.description}
                  </p>

                  {dest.highlights && dest.highlights.length > 0 && (
                    <div className="mb-10 space-y-4 flex-grow">
                      <ul className="space-y-4">
                        {dest.highlights.slice(0, 3).map((highlight, j) => (
                          <li key={j} className="text-[11px] font-bold text-neutral-900 flex items-center gap-4 uppercase tracking-wider">
                            <div className="w-1.5 h-1.5 rounded-full bg-brand-orange shrink-0"></div>
                            {typeof highlight === 'object' ? (highlight.name || highlight.title || 'Highlight') : String(highlight)}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="mt-auto pt-8 border-t border-neutral-100">
                    <Link
                      href={`/country/${dest.name.toLowerCase().replace(/\s+/g, '-')}`}
                      className="group/btn relative w-full flex items-center justify-between bg-neutral-900 text-white p-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] overflow-hidden transition-all hover:bg-brand-orange shadow-xl active:scale-95"
                    >
                      <span>EXPLORE {dest.name}</span>
                      <svg className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Study Abroad - Redesigned Section */}
      <section className="py-24 bg-brand-blue-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-orange/10 rounded-full blur-[120px]"></div>

        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="flex flex-col lg:flex-row items-end justify-between mb-16 gap-8 animate-slide-up-fade">
            <div className="max-w-2xl text-left">
              <span className="text-brand-orange font-black text-[10px] uppercase tracking-[0.4em] mb-4 block">Rational Excellence</span>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-black mb-0 leading-none tracking-tight uppercase">
                WHY STUDY <br />
                <span className="italic font-light text-white/40 normal-case tracking-normal">Abroad?</span>
              </h2>
            </div>
            <p className="max-w-xs text-white/60 font-light text-sm normal-case tracking-normal text-left leading-relaxed">
              International education is more than a degree; it's a strategic architectural shift in your career path and global identity.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Global Perspective", icon: "🌍", desc: "Gain a deeper understanding of the world and different cultures through immersive experience." },
              { title: "Career Growth", icon: "📈", desc: "Graduates with international exposure command the highest value in global markets." },
              { title: "Personal Development", icon: "🌱", desc: "Engineer independence, ultimate resilience, and radical adaptability in new environments." },
              { title: "Global Network", icon: "🤝", desc: "Architect a direct line to peers and mentors from every corner of the professional globe." }
            ].map((benefit, i) => (
              <div
                key={i}
                className="group p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-[2rem] hover:bg-white/10 transition-all duration-700 animate-slide-up-fade"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="text-3xl mb-6 transition-transform duration-500 group-hover:scale-110">{benefit.icon}</div>
                <h3 className="text-sm font-bold mb-4 uppercase tracking-tight">{benefit.title}</h3>
                <p className="text-white/60 text-[11px] font-light leading-relaxed normal-case tracking-normal">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
