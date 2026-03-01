import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

export default function Stats() {
  const [mounted, setMounted] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [counts, setCounts] = useState({
    universities: 0,
    countries: 0,
    branches: 0,
    admissions: 0
  })
  const sectionRef = useRef(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 } // reduced threshold
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    // Fallback if observer fails
    const fallback = setTimeout(() => setIsVisible(true), 2000)

    return () => {
      observer.disconnect()
      clearTimeout(fallback)
    }
  }, [mounted])

  useEffect(() => {
    if (!isVisible) return

    const duration = 2000 // 2 seconds
    const steps = 60
    const interval = duration / steps

    const targets = {
      universities: 100,
      countries: 3,
      branches: 8,
      admissions: 2500
    }

    let currentStep = 0

    const timer = setInterval(() => {
      currentStep++
      const progress = currentStep / steps

      setCounts({
        universities: Math.floor(targets.universities * progress),
        countries: Math.floor(targets.countries * progress),
        branches: Math.floor(targets.branches * progress),
        admissions: Math.floor(targets.admissions * progress)
      })

      if (currentStep >= steps) {
        setCounts(targets)
        clearInterval(timer)
      }
    }, interval)

    return () => clearInterval(timer)
  }, [isVisible])

  const stats = [
    {
      number: counts.universities,
      suffix: '+',
      label: 'Partner Universities',
      color: 'from-blue-600 to-blue-400'
    },
    {
      number: counts.countries,
      suffix: '+',
      label: 'Countries',
      color: 'from-blue-400 to-blue-500'
    },
    {
      number: counts.branches,
      suffix: '+',
      label: 'Branches',
      color: 'from-green-400 to-green-500'
    },
    {
      number: counts.admissions,
      suffix: '+',
      label: 'Global Admissions',
      color: 'from-purple-400 to-purple-500'
    }
  ]

  return (
    <section
      ref={sectionRef}
      className="relative py-24 bg-brand-blue overflow-hidden uppercase font-outfit text-white"
    >
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-neutral-50/50 -skew-x-12 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full -translate-x-1/2 translate-y-1/2 blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group flex flex-col items-center text-center animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative mb-6">
                <div className={`text-5xl md:text-6xl font-black bg-gradient-to-br ${stat.color} bg-clip-text text-transparent transition-transform duration-500 group-hover:scale-110 inline-block drop-shadow-sm`}>
                  {mounted ? stat.number : 0}{stat.suffix}
                </div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-1.5 bg-blue-900/40 rounded-full group-hover:w-12 transition-all duration-500" />
              </div>
              <p className="text-blue-950 text-[11px] font-black uppercase tracking-[0.25em] max-w-[140px] leading-relaxed drop-shadow-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
