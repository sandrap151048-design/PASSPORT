import { useState, useEffect } from 'react'
import Link from 'next/link'
import NextImage from 'next/image'

export default function Hero() {
  const slides = [
    {
      title: "Your Gateway to Elite Global Education",
      subtitle: "Unlock 19+ world-class destinations with expert guidance, visa support, and scholarship opportunities tailored to your ambitions.",
      image: "/images/hero-1.jpg",
      tag: "🌍 Global Education Hub"
    },
    {
      title: "Study Abroad with Confidence & Clarity",
      subtitle: "From application to arrival — our specialists navigate every step of your international academic journey across Europe, Asia, and beyond.",
      image: "/images/hero-2.jpg",
      tag: "🎓 Premium Consulting"
    },
    {
      title: "Immigration & Visa Solutions Made Simple",
      subtitle: "Complete immigration and visa services for USA, Canada, UK, Australia & 15 more countries — with a 98% success rate.",
      image: "/images/hero-3.jpg",
      tag: "📋 Visa Expert"
    }
  ]

  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    slides.forEach(slide => {
      const img = new Image()
      img.src = slide.image
    })
  }, [])

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length)
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length)
  const goToSlide = (index) => setCurrent(index)

  return (
    <section className="relative min-h-[90vh] flex items-center bg-brand-blue overflow-hidden pt-48 pb-40">
      {/* Background Image transition */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === current ? 'opacity-20' : 'opacity-0'}`}
          >
            <NextImage src={slide.image} alt="" fill className="object-cover" />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-blue via-brand-blue/80 to-transparent"></div>
      </div>

      {/* Upward Curve Decoration */}
      <div className="absolute -bottom-1 left-0 w-full overflow-hidden leading-none z-10 translate-y-[1px]">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-[60px] md:h-[100px] lg:h-[150px] preserve-3d scale-x-105">
          <path d="M1440 120H0V48C0 48 360 0 720 0C1080 0 1440 48 1440 48V120Z" fill="white" />
        </svg>
      </div>

      <div className="w-full px-6 lg:px-12 relative z-10 transition-all duration-300">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Text Content */}
          <div className="w-full lg:w-3/5 text-white">
            <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg text-xs font-bold tracking-[0.3em] uppercase mb-6 animate-fade-in">
              {slides[current].tag}
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black leading-tight mb-8 animate-fade-in-up" key={current}>
              {slides[current].title.split(' ').map((word, i) => (
                ['education', 'careers', 'destination', 'elite', 'global', 'abroad', 'immigration', 'visa'].includes(word.toLowerCase().replace(/[^a-z]/g, '')) ?
                  <span key={i} className="text-brand-orange"> {word}</span> : ` ${word}`
              ))}
            </h1>
            <p className="text-base md:text-lg font-medium opacity-90 mb-10 max-w-xl leading-relaxed animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              {slides[current].subtitle}
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
              <Link href="/contact" className="w-full md:w-auto">
                <button className="w-full md:w-auto bg-brand-orange hover:bg-[#ff7a3d] text-white px-10 py-4 rounded-xl font-bold uppercase tracking-widest transition-all shadow-xl hover:-translate-y-1">
                  Start Your Journey
                </button>
              </Link>
              <div className="flex gap-2">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => goToSlide(idx)}
                    className={`h-2 transition-all duration-300 rounded-full ${idx === current ? 'w-8 bg-brand-orange' : 'w-2 bg-white/30'}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Feature Image Area */}
          <div className="w-full lg:w-2/5 relative animate-fade-in-right">
            <div className="relative z-10 w-full aspect-square md:aspect-auto md:h-[500px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20">
// removed overlay text
              <NextImage
                src={slides[current].image}
                alt="Highlight Image"
                fill
                className="object-cover transition-all duration-700"
              />
            </div>
          </div>
        </div>

        {/* Integrated Stats Row */}
        <div className="mt-20 lg:mt-32 pt-12 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-8 animate-fade-in-up" style={{ animationDelay: '600ms' }}>
          {[
            { value: '1000+', label: 'Global Ties' },
            { value: '65+', label: 'Offices' },
            { value: '27+', label: 'Years Exp' },
            { value: '80k+', label: 'Success' },
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col gap-1 border-l border-white/20 pl-6 h-fit">
              <span className="text-white text-3xl md:text-4xl font-black">{item.value}</span>
              <span className="text-white/60 text-[10px] font-bold uppercase tracking-[0.2em]">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
