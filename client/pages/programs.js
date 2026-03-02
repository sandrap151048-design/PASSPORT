import { useState, useEffect } from 'react'
import api from '../utils/api'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Image from 'next/image'
import Link from 'next/link'

export default function Programs() {
  const [activeTab, setActiveTab] = useState('all')
  const [programs, setPrograms] = useState([])
  const [loading, setLoading] = useState(true)
  const [expandedProgram, setExpandedProgram] = useState(null)

  useEffect(() => {
    // Simulating API fetch with demo data tailored for the new design
    const demoPrograms = [
      {
        id: 'demo-[ug1]',
        title: "BA in Management",
        level: "Undergraduate",
        duration: "3 Years",
        description: "Comprehensive study of business management principles and practices, preparing you for leadership roles in the global market.",
        requirements: ["High School Diploma", "English Proficiency", "Personal Statement"],
        career_prospects: ["Business Manager", "Operations Lead", "Strategy Analyst"],
        intakes: ["September", "January"],
        fee_range: "Contact for pricing",
        color: "from-blue-600/20 to-blue-400/20",
        border: "border-blue-500/30"
      },
      {
        id: 'demo-[ug2]',
        title: "BA in Marketing",
        level: "Undergraduate",
        duration: "3 Years",
        description: "Exploration of marketing strategies, consumer behavior, and brand management in a digital-first world.",
        requirements: ["High School Diploma", "Math Proficiency"],
        career_prospects: ["Marketing Executive", "Digital Strategist", "Brand Manager"],
        intakes: ["September", "January"],
        fee_range: "Contact for pricing",
        color: "from-blue-600/20 to-blue-400/20",
        border: "border-blue-500/30"
      },
      {
        id: 'demo-[pg1]',
        title: "Master of Business Administration (MBA)",
        level: "Postgraduate",
        duration: "1-2 Years",
        description: "Advanced leadership and strategic management training for professionals seeking executive-level opportunities.",
        requirements: ["Bachelors Degree", "Work Experience", "GMAT/GRE (optional)"],
        career_prospects: ["CEO/COO", "Management Consultant", "Entrepreneur"],
        intakes: ["September", "January", "May"],
        fee_range: "Contact for pricing",
        color: "from-emerald-600/20 to-emerald-400/20",
        border: "border-emerald-500/30"
      },
      {
        id: 'demo-[pg2]',
        title: "MSc in Logistics and Supply Chain Management",
        level: "Postgraduate",
        duration: "1-2 Years",
        description: "Specialized study of global supply chain logistics, procurement, and inventory optimization.",
        requirements: ["Undergraduate Degree", "Interest in Operations"],
        career_prospects: ["Supply Chain Director", "Logistics Manager", "Procurement Specialist"],
        intakes: ["September"],
        fee_range: "Contact for pricing",
        color: "from-emerald-600/20 to-emerald-400/20",
        border: "border-emerald-500/30"
      },
      {
        id: 'demo-[doc1]',
        title: "Doctor of Business Administration (DBA)",
        level: "Doctoral",
        duration: "3-4 Years",
        description: "A professional doctorate focusing on applied research and integrating high-level theory with complex business practice.",
        requirements: ["Masters Degree", "Research Proposal", "Extensive Experience"],
        career_prospects: ["C-Suite Executive", "Academic Researcher", "Global Consultant"],
        intakes: ["Rolling Admission"],
        fee_range: "Contact for pricing",
        color: "from-purple-600/20 to-blue-400/20",
        border: "border-purple-500/30"
      }
    ]

    const fetchPrograms = async () => {
      try {
        const response = await api.get('/programs')
        const data = response.data
        if (data && data.length > 0) {
          // Map backend properties to frontend generic structures
          const formatted = data.map((p, i) => ({
            id: p._id,
            title: p.name || p.title,
            level: p.type || "Undergraduate",
            duration: p.duration || "N/A",
            description: p.description || "",
            requirements: p.highlights || p.requirements || [],
            career_prospects: p.career_prospects || [],
            intakes: p.intakes || ["September"],
            fee_range: p.fee_range || "Contact for pricing",
            // Give them cycling colors
            color: i % 2 === 0 ? "from-blue-600/20 to-blue-400/20" : "from-emerald-600/20 to-emerald-400/20",
            border: i % 2 === 0 ? "border-blue-500/30" : "border-emerald-500/30"
          }))
          setPrograms(formatted)
        } else {
          setPrograms(demoPrograms)
        }
      } catch (err) {
        console.error('Error fetching programs:', err)
        setPrograms(demoPrograms)
      } finally {
        setLoading(false)
      }
    }
    fetchPrograms()
  }, [])

  const filteredPrograms = activeTab === 'all'
    ? programs
    : programs.filter(p => p.level?.toLowerCase() === activeTab)

  return (
    <div className="min-h-screen bg-white font-outfit text-neutral-900 selection:bg-primary/10">
      <Navbar />

      {/* ═══════ HERO BANNER ═══════ */}
      <section className="relative py-24 overflow-hidden flex items-center min-h-[50vh] bg-neutral-900 border-b border-neutral-100">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/programs-hero.jpg"
            alt="Programs Hero"
            fill
            className="object-cover"
            priority
          />
          {/* Refined Brand Overlay */}
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[1px]" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/60 to-transparent" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl pt-12">
            <div className="animate-fade-in-up inline-flex items-center gap-3 mb-8 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
              <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span className="text-white text-[10px] font-bold tracking-[0.2em] uppercase">Academic Excellence</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black mb-8 tracking-tight text-white animate-fade-in-up leading-[1.1] uppercase">
              DISCOVER YOUR <br />
              <span className="italic font-light text-primary">GLOBAL PATHWAY.</span>
            </h1>

            <p className="text-slate-200 text-lg font-medium mb-12 max-w-2xl animate-fade-in-up normal-case opacity-90 leading-relaxed" style={{ animationDelay: '200ms' }}>
              Explore comprehensive undergraduate, postgraduate, and doctoral programs designed to propel your career on the international stage.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════ PROGRAM FILTER ═══════ */}
      <section className="py-24 relative z-10 bg-white uppercase">
        <div className="container mx-auto px-6 max-w-7xl">
          {/* Premium Tab Navigation */}
          <div className="flex justify-center mb-16 animate-fade-in-up">
            <div className="p-1.5 bg-neutral-50 border border-neutral-100 rounded-2xl inline-flex flex-wrap shadow-sm">
              {['all', 'undergraduate', 'postgraduate', 'doctoral'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500
                           ${activeTab === tab
                      ? 'text-white bg-primary shadow-xl shadow-primary/20'
                      : 'text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100'
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPrograms.map((program, index) => (
              <div
                key={program.id}
                className="group relative rounded-[2.5rem] bg-neutral-50 border border-neutral-100 p-10 hover:bg-white hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 flex flex-col h-full animate-fade-in-up hover:-translate-y-2 overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => setExpandedProgram(expandedProgram === program.id ? null : program.id)}
              >
                {/* Color Accent */}
                <div className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${program.color} opacity-30 group-hover:opacity-100 transition-opacity`} />

                <div className="relative z-10 flex flex-col h-full">
                  <div className="mb-6">
                    <div className="flex justify-between items-start mb-6">
                      <span className="inline-block py-1.5 px-4 rounded-full bg-primary/10 text-primary text-[10px] font-black tracking-widest uppercase mb-0">
                        {program.level}
                      </span>
                      <div className={`w-10 h-10 rounded-2xl border border-neutral-100 flex items-center justify-center transition-all duration-500 group-hover:bg-primary group-hover:text-white ${expandedProgram === program.id ? 'rotate-180 bg-primary text-white shadow-lg' : 'text-neutral-400 bg-white'}`}>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7"></path></svg>
                      </div>
                    </div>
                    <h3 className="text-2xl font-black text-neutral-900 tracking-tight leading-tight mb-4 group-hover:text-primary transition-colors">
                      {typeof program.title === 'object' ? (program.title.name || program.title.text || 'Program Title') : String(program.title)}
                    </h3>
                    <div className="flex items-center gap-2 text-[10px] font-black text-neutral-400 uppercase tracking-[0.1em]">
                      <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      {String(program.duration)}
                    </div>
                  </div>

                  <p className="text-sm font-medium text-neutral-500 leading-relaxed flex-grow normal-case">
                    {typeof program.description === 'object' ? (program.description.text || program.description.content || '') : String(program.description)}
                  </p>

                  <div className={`mt-0 overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${expandedProgram === program.id ? 'max-h-[600px] opacity-100 mt-8' : 'max-h-0 opacity-0'}`}>
                    <div className="pt-8 border-t border-neutral-100 space-y-8">
                      <div>
                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-900 mb-4">Core Requirements</h4>
                        <ul className="text-sm text-neutral-500 space-y-3 font-medium normal-case">
                          {program.requirements.map((req, i) => (
                            <li key={i} className="flex items-center gap-3">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                              {typeof req === 'object' ? (req.name || req.title || 'Requirement') : req}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-900 mb-2">Primary Intakes</h4>
                          <p className="text-sm font-bold text-neutral-600 normal-case">
                            {Array.isArray(program.intakes) ? program.intakes.join(', ') : String(program.intakes)}
                          </p>
                        </div>
                        <div>
                          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-900 mb-2">Pricing Range</h4>
                          <p className="text-sm font-bold text-neutral-600 normal-case">
                            {typeof program.fee_range === 'object' ? JSON.stringify(program.fee_range) : String(program.fee_range)}
                          </p>
                        </div>
                      </div>
                      <Link href="/contact" className="block w-full py-5 rounded-2xl bg-neutral-900 text-white font-black text-center text-[10px] hover:bg-primary transition-all duration-500 uppercase tracking-[0.25em] shadow-xl hover:shadow-primary/30">
                        INITIALIZE APPLICATION
                      </Link>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-neutral-100 flex justify-between items-center">
                    <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400 group-hover:text-primary transition-colors">
                      {expandedProgram === program.id ? 'System Collapse' : 'Module Details'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ FINAL CALL TO ACTION ═══════ */}
      <section className="py-24 bg-white relative overflow-hidden flex items-center justify-center uppercase">
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="max-w-3xl mx-auto">
            <span className="text-secondary font-bold text-[10px] uppercase tracking-[0.4em] mb-8 block">Connect With Us</span>

            <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-neutral-900 tracking-tight leading-none mb-10 uppercase">
              UNCERTAIN OF <br />
              <span className="italic font-light text-primary normal-case tracking-normal">The Pathway.</span>
            </h2>

            <p className="text-lg text-neutral-500 font-medium mb-12 normal-case leading-relaxed max-w-xl mx-auto">
              Our lead counselors are standing by to architect your personalized academic strategy. Secure your global future today.
            </p>

            <div className="flex flex-wrap justify-center items-center gap-6">
              <Link href="/contact" className="group relative inline-flex items-center gap-4 bg-neutral-900 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all shadow-2xl shadow-neutral-200 hover:bg-primary hover:-translate-y-1 hover:shadow-primary/30 active:scale-95">
                <span>Secure Consultation</span>
                <svg className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link href="/services" className="px-10 py-5 bg-white border border-neutral-100 text-neutral-900 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-neutral-50 transition-all hover:shadow-xl hover:shadow-neutral-200 active:scale-95">
                Explore Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

