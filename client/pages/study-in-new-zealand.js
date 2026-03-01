import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Image from 'next/image'

export default function StudyInNewZealand() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Premium Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/destination-new-zealand.jpg"
            alt="Study in New Zealand"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-emerald-900/80 mix-blend-multiply"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl animate-slide-up-fade">
            <span className="inline-block px-4 py-1.5 mb-6 text-[10px] font-bold tracking-[0.2em] text-white uppercase bg-blue-500/20 backdrop-blur-md border border-blue-500/30 rounded-full">
              Southern Excellence
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1] mb-6 uppercase">
              Study In <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">New Zealand.</span>
            </h1>
            <p className="text-lg md:text-xl text-blue-50 font-light max-w-2xl leading-relaxed normal-case">
              World-class education in paradise. Accelerate your career with globally recognized qualifications amidst breathtaking natural beauty.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 bg-white uppercase">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid lg:grid-cols-12 gap-16 lg:gap-24">

            {/* Left Column: Overview & Highlights */}
            <div className="lg:col-span-8 space-y-20">
              <div className="animate-slide-up-fade">
                <h3 className="text-sm font-bold tracking-widest text-blue-600 uppercase mb-6 flex items-center gap-3">
                  <span className="w-8 h-[1px] bg-blue-600"></span>
                  Why Choose New Zealand?
                </h3>
                <p className="text-xl text-neutral-800 leading-relaxed font-light normal-case">
                  New Zealand offers world-class education, a safe and welcoming environment, and excellent post-study work opportunities. With research excellence and a high quality of life, it's an ideal global destination.
                </p>
              </div>

              {/* Highlights Grid */}
              <div className="grid sm:grid-cols-2 gap-6 animate-slide-up-fade" style={{ animationDelay: '100ms' }}>
                {[
                  { icon: '🎓', title: 'World-Class Tier', desc: 'Secure internationally recognized qualifications from elite global universities.' },
                  { icon: '💼', title: 'Post-Study Work', desc: 'Gain incredible career leverage with flexible post-study work visa protocols.' },
                  { icon: '🏔️', title: 'Stunning Nature', desc: 'Experience the world\'s most breathtaking landscapes and outdoor adventures.' },
                  { icon: '🛡️', title: 'Global Safety', desc: 'Live in one of the safest and most harmonious countries on the planet.' },
                  { icon: '🔬', title: 'Research Prowess', desc: 'Engage with a strong institutional focus on innovation and research excellence.' },
                  { icon: '🌟', title: 'Quality Framework', desc: 'Benefit from high living standards and a famously friendly community.' }
                ].map((item, i) => (
                  <div key={i} className="p-6 bg-neutral-50 border border-neutral-100 rounded-3xl hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/5 transition-all">
                    <div className="text-3xl mb-4">{item.icon}</div>
                    <h4 className="text-lg font-bold text-neutral-900 mb-2 uppercase tracking-tight">{item.title}</h4>
                    <p className="text-sm text-neutral-500 normal-case leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>

              {/* Top Universities */}
              <div className="animate-slide-up-fade" style={{ animationDelay: '200ms' }}>
                <h3 className="text-sm font-bold tracking-widest text-emerald-600 uppercase mb-8 flex items-center gap-3">
                  <span className="w-8 h-[1px] bg-emerald-600"></span>
                  Top Institutions
                </h3>
                <div className="space-y-4">
                  {[
                    { name: 'University of Auckland', desc: 'New Zealand\'s premier institution, globally ranked for research and academic diversity.' },
                    { name: 'University of Otago', desc: 'The oldest university, world-renowned for medical and health sciences excellence.' },
                    { name: 'Victoria University of Wellington', desc: 'Strategic capital city location with leading research capabilities.' },
                    { name: 'University of Canterbury', desc: 'Highly regarded for engineering breakthroughs and scientific research.' }
                  ].map((uni, i) => (
                    <div key={i} className="group p-6 bg-white border border-neutral-100 rounded-2xl hover:border-emerald-600 transition-all flex justify-between items-center">
                      <div>
                        <h4 className="text-lg font-bold text-neutral-900 uppercase tracking-tight mb-1 group-hover:text-emerald-600 transition-colors">{uni.name}</h4>
                        <p className="text-xs text-neutral-500 normal-case">{uni.desc}</p>
                      </div>
                      <div className="w-10 h-10 bg-neutral-50 rounded-full flex items-center justify-center text-neutral-400 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Requirements & Costs */}
            <div className="lg:col-span-4 space-y-12">
              <div className="sticky top-24 space-y-12">

                {/* Requirements Card */}
                <div className="bg-neutral-900 text-white p-8 rounded-[2rem] shadow-2xl animate-slide-up-fade" style={{ animationDelay: '300ms' }}>
                  <h3 className="text-xl font-bold mb-8 uppercase tracking-tight">Entry Protocols</h3>
                  <ul className="space-y-6">
                    {[
                      { label: 'English Proficiency', val: 'IELTS 6.5 (No Band Less Than 6.0)' },
                      { label: 'Academic Standards', val: 'Transcripts & Graduate Certificates' },
                      { label: 'Statement of Purpose', val: 'Well-Defined Goals & Intent' },
                      { label: 'Financial Verification', val: 'Full Tuition & Living Evidence' },
                      { label: 'Passport Status', val: 'Valid for Full Study Duration' }
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-4">
                        <div className="mt-1 w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center flex-shrink-0">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-1">{item.label}</p>
                          <p className="text-sm font-medium text-white normal-case">{item.val}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Costs Card */}
                <div className="bg-neutral-50 border border-neutral-100 p-8 rounded-[2rem] animate-slide-up-fade" style={{ animationDelay: '400ms' }}>
                  <h3 className="text-xl font-bold text-neutral-900 mb-8 uppercase tracking-tight">Financial Model</h3>

                  <div className="space-y-8">
                    <div>
                      <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-4">Academic Fees</p>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-neutral-500 normal-case">Undergraduate</span>
                          <span className="font-bold text-neutral-900">NZ$22k - $28k/yr</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-neutral-500 normal-case">Postgraduate</span>
                          <span className="font-bold text-neutral-900">NZ$26k - $32k/yr</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-4">Living Expenses</p>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-neutral-500 normal-case">Total Estimate</span>
                          <span className="font-bold text-neutral-900">NZ$15k - $18k/yr</span>
                        </div>
                        <p className="text-[10px] text-neutral-400 normal-case leading-tight">
                          Includes accommodation, food, transport, and personal expenses.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Student Life Section */}
          <div className="mt-32 pb-16 border-b border-neutral-100 animate-slide-up-fade">
            <h3 className="text-sm font-bold tracking-widest text-neutral-900 uppercase mb-12 flex items-center justify-center gap-3">
              <span className="w-12 h-[1px] bg-neutral-900"></span>
              The Student Experience
              <span className="w-12 h-[1px] bg-neutral-900"></span>
            </h3>
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="relative aspect-video rounded-[2.5rem] overflow-hidden group shadow-2xl">
                <Image
                  src="/images/destination-new-zealand-grid.jpg"
                  alt="Student Life"
                  fill
                  className="object-cover transition-transform duration-[10s] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-8 left-8">
                  <p className="text-white text-2xl font-bold uppercase tracking-tight">Prime Landscapes</p>
                </div>
              </div>
              <div className="space-y-8">
                <p className="text-xl text-neutral-600 font-light leading-relaxed normal-case">
                  Experience a lifestyle prioritizing work-life balance and deep connection with nature. New Zealand's 'Kiwi' culture is famously friendly and inclusive.
                </p>
                <div className="grid gap-6">
                  {[
                    "Immerse yourself in rich Māori culture and traditions.",
                    "Explore stunning landscapes featured in cinematic history.",
                    "Access adventure sports and premium outdoor activities."
                  ].map((text, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-neutral-900 text-white flex items-center justify-center text-[10px] font-bold">{i + 1}</div>
                      <p className="text-sm text-neutral-500 font-medium normal-case">{text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Redesigned CTA */}
          <div className="mt-32 relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-[3rem] blur-2xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
            <div className="relative bg-neutral-900 text-white p-12 md:p-20 rounded-[3rem] text-center overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] -mr-48 -mt-48"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] -ml-48 -mb-48"></div>

              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight uppercase leading-none relative z-10">
                Architect Your Future <br />
                <span className="text-blue-400 italic font-light lowercase">in New Zealand.</span>
              </h2>
              <p className="text-blue-100/60 font-light text-lg mb-12 normal-case max-w-2xl mx-auto relative z-10">
                Our advisors are standing by to manage your transition to New Zealand's prestigious academic ecosystem with professional precision.
              </p>

              <div className="flex flex-wrap gap-6 justify-center relative z-10">
                <a href="/contact" className="px-12 py-5 bg-white text-neutral-900 font-bold text-[10px] uppercase tracking-[0.2em] rounded-2xl hover:bg-blue-400 transition-all hover:scale-105 shadow-xl shadow-black/20">
                  Book Free Audit
                </a>
                <a href="/programs" className="px-12 py-5 bg-transparent border border-white/20 text-white font-bold text-[10px] uppercase tracking-[0.2em] rounded-2xl hover:bg-white/5 transition-all">
                  Browse Programs
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <Footer />
    </div >
  )
}
