import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import api from '../utils/api'

export default function Services() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await api.get('/services')
        const formatted = res.data.map(s => ({
          ...s,
          id: s._id,
          image: s.imageUrl || '/images/service-study-abroad.jpg'
        }))
        setServices(formatted)
      } catch (error) {
        console.error('Error fetching services, using fallback data:', error)
        setServices([
          { id: 'ser_1', title: 'Overseas Education', description: 'Comprehensive guidance for students to choose the best universities and courses globally.', image: '/images/service-overseas-education.png' },
          { id: 'ser_2', title: 'Visa Assistance', description: 'Expert help in processing all types of visas for travel, study, and work.', image: '/images/service-visa-assistance.png' },
          { id: 'ser_3', title: 'Flight Booking', description: 'Affordable flight booking services for students and travelers worldwide.', image: '/images/service-flight-booking.png' },
          { id: 'ser_4', title: 'Hotel Booking', description: 'Secure and comfortable accommodation bookings globally.', image: '/images/service-hotel-booking.png' },
          { id: 'ser_5', title: 'Tour Booking', description: 'Customized tour packages and vacation planning for global destinations.', image: '/images/service-tour-booking.png' }
        ])
      } finally {
        setLoading(false)
      }
    }
    fetchServices()
  }, [])

  if (services.length === 0) return null

  return (
    <section className="py-24 bg-white font-outfit uppercase">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8 animate-fade-in-up">
          <div className="max-w-xl">
            <p className="text-primary text-[10px] font-bold mb-3 tracking-[0.4em] uppercase">Core Solutions</p>
            <h2 className="text-4xl md:text-5xl font-black text-neutral-900 leading-tight">
              A COMPLETE <br />
              <span className="italic font-light text-neutral-400">SERVICE FRAMEWORK.</span>
            </h2>
          </div>
          <p className="max-w-xs text-neutral-500 text-sm font-medium normal-case leading-relaxed">
            Architecting end-to-end support systems for your global academic and professional migration.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.id || index}
              className="group relative bg-neutral-50 p-8 rounded-3xl border border-neutral-100 hover:border-primary/20 hover:bg-white hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 animate-slide-up-fade flex flex-col h-full overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Background Accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full translate-x-12 -translate-y-12 blur-2xl group-hover:bg-primary/10 transition-colors" />

              {/* Icon / Image Placeholder Replacement */}
              <div className="relative w-16 h-16 mb-8 rounded-2xl bg-white shadow-sm flex items-center justify-center overflow-hidden border border-neutral-100 group-hover:scale-110 transition-transform duration-500">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                />
                <div className="absolute inset-0 bg-primary/5" />
              </div>

              <div className="relative z-10 flex flex-col flex-grow">
                <h3 className="text-xl font-black text-neutral-900 mb-4 tracking-tight">
                  {service.title}
                </h3>
                <p className="text-neutral-500 text-sm font-medium leading-relaxed mb-8 normal-case flex-grow">
                  {service.description}
                </p>

                {/* Bottom Action */}
                <Link
                  href={`/services#${service.id}`}
                  className="flex items-center gap-3 text-primary text-[10px] font-black tracking-widest group-hover:gap-5 transition-all cursor-pointer"
                >
                  <span>EXPLORE MODULE</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>

              {/* Hover Line */}
              <div className="absolute bottom-0 left-0 h-1.5 bg-primary w-0 group-hover:w-full transition-all duration-700" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
