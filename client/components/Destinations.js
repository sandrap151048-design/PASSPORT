import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import api from '../utils/api'
import fallbackCountries from '../data/fallbackCountries'

export default function Destinations() {
  const [destinations, setDestinations] = useState([])
  const [loading, setLoading] = useState(true)

  // Function to get destination image (fallback helper)
  const getDestinationImage = (name) => {
    const images = {
      'United Kingdom': '/images/dest-uk.png',
      'United States': '/images/dest-usa.png',
      'Canada': '/images/dest-canada.png',
      'Australia': '/images/dest-australia.png',
      'Germany': '/images/dest-germany.png',
      'South Korea': '/images/destination-south-korea.jpg',
      'Malaysia': '/images/destination-malaysia.jpg',
      'New Zealand': '/images/destination-new-zealand.jpg',
      'Singapore': '/images/destination-singapore.jpg',
      'Mauritius': '/images/destination-mauritius.jpg',
      'Malta': '/images/destination-malta.jpg'
    }
    return images[name] || '/images/hero-1.jpg'
  }

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await api.get('/countries')
        if (response.data && response.data.length > 0) {
          const formatted = response.data.map(dest => ({
            ...dest,
            highlights: dest.highlights && dest.highlights.length > 0 ? dest.highlights : []
          }))
          setDestinations(formatted)
        } else {
          setDestinations(fallbackCountries.slice(0, 6))
        }
      } catch (error) {
        console.error('Error fetching destinations:', error)
        setDestinations(fallbackCountries.slice(0, 6))
      } finally {
        setLoading(false)
      }
    }
    fetchDestinations()
  }, [])

  if (loading) {
    return (
      <div className="py-24 bg-neutral-50 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <section className="py-24 bg-neutral-50 font-outfit uppercase overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row items-end justify-between mb-16 gap-8 animate-fade-in-up">
          <div className="max-w-xl text-left">
            <p className="text-primary text-[10px] font-bold mb-3 tracking-[0.4em] uppercase">Global Network</p>
            <h2 className="text-4xl md:text-5xl font-black text-neutral-900 leading-tight">
              ELITE ACADEMIC <br />
              <span className="italic font-light text-neutral-400">DESTINATIONS.</span>
            </h2>
          </div>
          <p className="max-w-xs text-neutral-500 text-sm font-medium normal-case leading-relaxed text-left">
            Strategizing your entry into high-tier academic landscapes across the global grid.
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {destinations.map((dest, i) => (
            <div
              key={dest._id || i}
              className="group relative bg-white rounded-[2.5rem] border border-neutral-100 hover:border-primary/20 transition-all duration-700 animate-slide-up-fade overflow-hidden flex flex-col"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {/* Image Section */}
              <div className="relative h-72 overflow-hidden">
                <Image
                  src={dest.imageUrl || getDestinationImage(dest.name)}
                  alt={dest.name}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/90 via-neutral-900/20 to-transparent" />

                {/* Branding Tag */}
                <div className="absolute top-6 left-6 z-10 flex items-center gap-2">
                  <span className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 text-[9px] font-black tracking-widest text-white rounded-full uppercase">
                    {dest.country || 'International'}
                  </span>
                </div>

                {/* Name Label */}
                <div className="absolute bottom-6 left-6 z-10">
                  <h3 className="text-white text-3xl font-black tracking-tighter uppercase mb-0">{dest.name}</h3>
                  <div className="w-12 h-1 bg-primary mt-2 group-hover:w-20 transition-all duration-500" />
                </div>
              </div>

              {/* Textual Content */}
              <div className="p-10 flex flex-col flex-grow text-left">
                {/* Description - FULL TEXT NO CLAMP */}
                <p className="text-neutral-500 text-[13px] font-medium leading-relaxed mb-8 normal-case opacity-90">
                  {dest.description}
                </p>

                {/* Highlights / Bullet Points for Alignment */}
                {dest.highlights && dest.highlights.length > 0 && (
                  <div className="mb-10 space-y-4">
                    {dest.highlights.slice(0, 3).map((item, idx) => (
                      <div key={idx} className="flex items-start gap-4">
                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                        <span className="text-neutral-900 text-[11px] font-bold uppercase tracking-wider leading-none">
                          {typeof item === 'object' ? (item.name || item.title || 'Feature') : String(item)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-auto pt-6 border-t border-neutral-100">
                  <Link
                    href={`/country/${dest.name.toLowerCase().replace(/\s+/g, '-')}`}
                    className="group/btn relative w-full flex items-center justify-between bg-neutral-50 text-neutral-900 p-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] overflow-hidden transition-all hover:bg-neutral-900 hover:text-white shadow-sm active:scale-95"
                  >
                    <span className="relative z-10">EXPLORE {dest.name}</span>
                    <svg className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
  )
}
