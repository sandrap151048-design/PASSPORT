import { useEffect, useRef, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Link from 'next/link'
import Image from 'next/image'

function useCountUp(end, duration = 2000) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true) },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return
    let startTime = null
    const numEnd = parseInt(end)
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * numEnd))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [started, end, duration])

  return { count, ref }
}

export default function About() {
  const stat1 = useCountUp(100, 2000)
  const stat2 = useCountUp(2500, 2500)
  const stat3 = useCountUp(15, 1500)
  const stat4 = useCountUp(99, 2000)

  return (
    <div className="min-h-screen bg-white font-outfit text-neutral-900 overflow-x-hidden">
      <Navbar />

      {/* ═══════ HERO BANNER ═══════ */}
      <section className="relative w-full pt-44 lg:pt-56 pb-40 mb-32 lg:mb-48 bg-[#6345ED] transition-colors duration-500" style={{ borderBottomLeftRadius: '50% 10%', borderBottomRightRadius: '50% 10%' }}>
        <div className="relative z-10 container mx-auto px-6 flex flex-col items-center text-center">

          <h1 className="font-black text-white leading-[1.1] tracking-tight mb-8 animate-fade-in-up uppercase" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}>
            ARCHITECTS OF<br />
            <span className="italic font-light">POSSIBILITY.</span>
          </h1>

          <p className="text-white/90 leading-relaxed mb-12 max-w-2xl mx-auto animate-fade-in-up font-medium normal-case text-xl lg:text-2xl" style={{ animationDelay: '200ms' }}>
            Since 2011, World Passport has been redefining the narrative of global student mobility through precision, integrity, and exclusive institutional reach.
          </p>

          <button
            onClick={() => {
              document.getElementById('legacy-section').scrollIntoView({ behavior: 'smooth' });
            }}
            className="mb-24 lg:mb-32 animate-fade-in-up bg-white text-[#6345ED] hover:bg-neutral-100 px-10 py-5 rounded-2xl font-bold uppercase tracking-widest text-[10px] transition-all shadow-xl shadow-[#6345ED]/40"
          >
            Explore Our Legacy
          </button>
        </div>

        {/* Floating Stars */}
        <div className="absolute top-32 left-[15%] text-white/60 animate-pulse"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" /></svg></div>
        <div className="absolute top-48 right-[15%] text-white/60 animate-pulse" style={{ animationDelay: "1s" }}><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" /></svg></div>
        <div className="absolute bottom-32 left-[25%] text-white/60 animate-pulse" style={{ animationDelay: "2s" }}><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" /></svg></div>
        <div className="absolute top-72 right-[30%] text-white/60 animate-pulse" style={{ animationDelay: "1.5s" }}><svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" /></svg></div>

        {/* Grid Layout overlapping the curve */}
        <div className="absolute -bottom-32 left-0 w-full px-4 lg:px-6 z-20 flex justify-center translate-y-24 lg:translate-y-32">
          <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
            {/* Left Large (col-span-2) */}
            <div className="col-span-1 lg:col-span-2 relative h-[300px] lg:h-[500px] bg-white p-2 rounded-2xl lg:rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] group">
              <div className="relative w-full h-full rounded-xl lg:rounded-[1.5rem] overflow-hidden">
                <Image src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2070&auto=format&fit=crop" fill className="object-cover" alt="World Passport Journey" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500"></div>

                <div className="absolute bottom-6 left-6 lg:bottom-8 lg:left-8 flex items-center gap-4">
                  <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full overflow-hidden bg-brand-blue flex items-center justify-center border-2 border-white shadow-lg">
                    <span className="text-white font-bold text-xs lg:text-sm">WP</span>
                  </div>
                  <h3 className="text-white font-medium text-lg lg:text-2xl drop-shadow-md">World Passport: Guiding Your Global Journey</h3>
                </div>
              </div>
            </div>

            {/* Right Column (2 stacked images) */}
            <div className="flex flex-col gap-4 lg:gap-6 h-[400px] lg:h-[500px]">
              <div className="flex-1 relative bg-white p-2 rounded-2xl lg:rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] group">
                <div className="relative w-full h-full rounded-xl lg:rounded-[1.5rem] overflow-hidden">
                  <Image src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop" fill className="object-cover group-hover:scale-105 transition-transform duration-700" alt="Student Global" />
                  <div className="absolute inset-0 bg-black/10"></div>
                </div>
              </div>
              <div className="flex-1 relative bg-white p-2 rounded-2xl lg:rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] group">
                <div className="relative w-full h-full rounded-xl lg:rounded-[1.5rem] overflow-hidden">
                  <Image src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop" fill className="object-cover group-hover:scale-105 transition-transform duration-700" alt="Consultation" />
                  <div className="absolute inset-0 bg-black/10"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* spacer to account for the absolute positioned overlapping elements */}
      <div className="h-64 lg:h-80 w-full bg-white relative z-0"></div>

      {/* ═══════ STATS BAR ═══════ */}
      <section className="py-16 bg-neutral-50 border-y border-neutral-100">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
            {[
              { ref: stat1.ref, count: stat1.count, suffix: '+', label: 'Global Ties', color: 'text-primary' },
              { ref: stat2.ref, count: stat2.count, suffix: '+', label: 'Successes', color: 'text-secondary' },
              { ref: stat3.ref, count: stat3.count, suffix: '+', label: 'Years Exp', color: 'text-neutral-900' },
              { ref: stat4.ref, count: stat4.count, suffix: '%', label: 'Visa Rate', color: 'text-primary' },
            ].map((s, i) => (
              <div key={i} ref={s.ref} className="animate-scale-in group" style={{ animationDelay: `${i * 100}ms` }}>
                <span className={`text-4xl lg:text-5xl font-black tracking-tighter block mb-2 ${s.color} transition-transform group-hover:scale-110`}>{s.count}{s.suffix}</span>
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-400">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ THE MANIFESTO ═══════ */}
      <section id="legacy-section" className="py-24 bg-white font-outfit">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-slide-in-left">
              <p className="text-primary text-[10px] font-bold mb-4 tracking-[0.4em] uppercase">The Manifesto</p>
              <h2 className="text-4xl lg:text-5xl font-black leading-tight tracking-tight mb-8 uppercase">
                WE DON'T PROCESS APPLICATIONS.<br />
                <span className="italic font-light text-neutral-400 normal-case tracking-normal">We curate futures.</span>
              </h2>
              <div className="space-y-6 text-neutral-500 font-medium normal-case leading-relaxed text-lg">
                <p>
                  Our methodology is built on the belief that every student deserves access to the world's most prestigious academic networks — regardless of background.
                </p>
                <p>
                  Through a decade of rigorous institutional matching and deep-rooted university relationships, we've transformed thousands of aspirations into global success stories.
                </p>
              </div>
            </div>

            <div className="relative h-[450px] animate-slide-in-right group">
              <div className="absolute top-0 right-0 w-4/5 h-4/5 overflow-hidden rounded-[2rem] shadow-2xl border-8 border-white z-10 transition-transform duration-700 group-hover:-translate-y-4">
                <Image src="/images/hero-3.jpg" alt="Manifesto 1" fill className="object-cover" />
              </div>
              <div className="absolute bottom-0 left-0 w-3/5 h-3/5 overflow-hidden rounded-[2rem] shadow-2xl border-8 border-white z-20 transition-transform duration-700 group-hover:translate-x-4">
                <Image src="/images/mission.jpg" alt="Manifesto 2" fill className="object-cover" />
              </div>
              <div className="absolute top-1/2 -left-8 w-24 h-24 bg-secondary rounded-2xl -rotate-12 blur-2xl opacity-20 animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ MISSION & VISION ═══════ */}
      <section className="py-24 bg-neutral-900 text-white overflow-hidden relative uppercase">
        <div className="absolute top-0 left-0 w-1/2 h-full bg-primary/5 -skew-x-12 -translate-x-1/2" />
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="text-center mb-20">
            <p className="text-primary text-[10px] font-bold mb-4 tracking-[0.4em] uppercase">Core Identity</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">MISSION & VISION</h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-12">
            {[
              {
                number: '01',
                label: 'MISSION',
                title: 'Democratizing Excellence.',
                desc: 'To break down institutional barriers and make high-pedigree international education a reality for every ambitious student.',
                img: '/images/master-programs.jpg',
              },
              {
                number: '02',
                label: 'VISION',
                title: 'The Global Standard.',
                desc: 'To define the gold standard for education advisory, where technology meets human empathy to engineer seamless transitions.',
                img: '/images/values.jpg',
              }
            ].map((item, i) => (
              <div key={i} className="group relative bg-white/5 backdrop-blur-md rounded-[2.5rem] border border-white/10 overflow-hidden animate-fade-in-up" style={{ animationDelay: `${i * 200}ms` }}>
                <div className="relative h-64 overflow-hidden">
                  <Image src={item.img} alt={item.label} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-neutral-900/40 group-hover:bg-transparent transition-colors" />
                  <div className="absolute top-6 left-6 bg-primary text-white text-[10px] font-black tracking-widest uppercase px-4 py-1.5 rounded-full">
                    {item.label}
                  </div>
                </div>
                <div className="p-10">
                  <span className="text-6xl font-black text-white/5 block mb-4 group-hover:text-primary/20 transition-colors">{item.number}</span>
                  <h3 className="text-2xl font-black tracking-tight mb-4">{item.title}</h3>
                  <p className="text-slate-400 font-medium normal-case leading-relaxed">{item.desc}</p>
                </div>
                <div className="absolute bottom-0 left-0 w-0 h-1.5 bg-primary group-hover:w-full transition-all duration-700" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ VALUES ═══════ */}
      <section className="py-24 bg-white font-outfit uppercase">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-20">
            <p className="text-primary text-[10px] font-bold mb-4 tracking-[0.4em] uppercase">Our Core</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-neutral-900">VALUES</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Transparency', desc: 'No hidden agendas. Every process is laid bare for our students to see and understand.', icon: '👁️', color: 'bg-primary', text: 'text-white' },
              { title: 'Integrity', desc: 'We maintain the highest ethical standards, ensuring university partners receive only the best-fit candidates.', icon: '🛡️', color: 'bg-neutral-50', text: 'text-neutral-900', border: 'border border-neutral-100' },
              { title: 'Legacy', desc: 'Our commitment doesn\'t end with admission; we build lifelong relationships with our global alumni network.', icon: '🌍', color: 'bg-neutral-900', text: 'text-white' },
            ].map((v, i) => (
              <div key={i} className={`${v.color} ${v.text} ${v.border || ''} rounded-[2rem] p-10 animate-fade-in-up hover:-translate-y-2 transition-all duration-500 group shadow-xl shadow-transparent hover:shadow-neutral-200`} style={{ animationDelay: `${i * 150}ms` }}>
                <div className="text-4xl mb-6 transform group-hover:scale-125 transition-transform duration-500">{v.icon}</div>
                <h4 className="text-xl font-black mb-4 tracking-tight">{v.title}</h4>
                <p className="text-sm leading-relaxed opacity-80 font-medium normal-case">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ FINAL CALL TO ACTION ═══════ */}
      <section className="py-24 bg-white relative overflow-hidden flex items-center justify-center uppercase">
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="max-w-3xl mx-auto">
            <span className="text-secondary font-bold text-[10px] uppercase tracking-[0.4em] mb-8 block">Next Step</span>

            <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-neutral-900 tracking-tight leading-none mb-10 uppercase">
              READY FOR <br />
              <span className="italic font-light text-primary normal-case tracking-normal">The Shift.</span>
            </h2>

            <p className="text-lg text-neutral-500 font-medium mb-12 normal-case leading-relaxed max-w-xl mx-auto">
              Take the first step towards your global future with World Passport. Our advisors are standing by.
            </p>

            <Link href="/contact" className="group relative inline-flex items-center gap-4 bg-neutral-900 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all shadow-2xl shadow-neutral-200 hover:bg-primary hover:-translate-y-1 hover:shadow-primary/30 active:scale-95">
              <span>Begin Consultation</span>
              <svg className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
