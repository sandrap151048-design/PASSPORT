import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Footer from '../components/Footer'

export default function Partners() {
  return (
    <div className="min-h-screen bg-[#1F2B5B] font-outfit text-white selection:bg-blue-500/30">

      {/* ═══════ CUSTOM NAVBAR ═══════ */}
      <nav className="absolute top-0 left-0 w-full z-50 px-6 py-6 lg:px-12 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl font-black tracking-tight text-white group-hover:text-blue-400 transition-colors">worldpassport.ai<span className="text-blue-500">®</span></span>
        </Link>
        <div className="flex items-center gap-8">
          <Link href="/careers" className="text-white font-bold hover:text-blue-300 transition-colors hidden sm:block">Careers</Link>
          <Link href="/login" className="bg-white text-[#1F2B5B] hover:bg-neutral-100 px-8 py-3 rounded-full font-bold transition-all shadow-xl shadow-black/10 hover:-translate-y-0.5">
            Login for Partners
          </Link>
        </div>
      </nav>

      {/* ═══════ PREMIUM HERO SECTION ═══════ */}
      <section className="relative pt-40 pb-32 min-h-screen flex items-center overflow-hidden">
        {/* Background Gradients & Effects */}
        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left Content */}
            <div className="max-w-2xl animate-fade-in-up">
              <h1 className="text-5xl md:text-6xl lg:text-[5rem] font-bold mb-8 leading-[1.1] tracking-tight">
                End to End Study <br /> Abroad Recruitment <br /> Platform
              </h1>
              <p className="text-xl text-blue-100 font-medium mb-12 max-w-xl leading-relaxed opacity-90 normal-case">
                worldpassport.ai is an innovative student-recruitment platform that helps access to tailored solutions for seamless operations. Connect with thousands of universities globally.
              </p>

              <div className="flex items-center gap-6">
                <Link href="/contact" className="bg-[#2B6DF8] hover:bg-[#1f56d1] text-white px-10 py-4 rounded-full font-bold transition-all shadow-xl shadow-[#2B6DF8]/40 hover:-translate-y-1">
                  Register with us
                </Link>
                <Link href="/login" className="bg-transparent border border-white/40 hover:bg-white/10 hover:border-white text-white px-8 py-4 rounded-full font-bold transition-all backdrop-blur-sm">
                  Login to worldpassport.ai
                </Link>
              </div>
            </div>

            {/* Right Content - Mock UI / Dashboard Preview */}
            <div className="relative animate-fade-in-left hidden lg:block perspective-1000">
              {/* Main Dashboard Panel */}
              <div className="bg-white rounded-2xl shadow-2xl p-4 transform rotate-y-[-10deg] rotate-x-[5deg] translate-z-10 shadow-black/40 border border-white/20">
                {/* Mock Header */}
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">WP</div>
                    <div className="w-48 h-8 rounded-md bg-gray-100/50 flex items-center px-4">
                      <span className="text-[10px] text-gray-400">Search students, courses...</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-[10px]">DA</div>
                  </div>
                </div>

                {/* Mock Content */}
                <div className="flex gap-4">
                  {/* Sidebar */}
                  <div className="w-32 space-y-4">
                    <div className="h-4 bg-gray-100 rounded w-full"></div>
                    <div className="h-4 bg-gray-100 rounded w-4/5"></div>
                    <div className="h-4 bg-gray-100 rounded w-full"></div>
                    <div className="h-4 bg-gray-100 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-100 rounded w-5/6"></div>
                  </div>
                  {/* Main View */}
                  <div className="flex-1 bg-gray-50 rounded-xl p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100/50 rounded-full blur-2xl"></div>
                    <h3 className="text-gray-800 font-bold mb-2">Good Morning Partner!</h3>
                    <p className="text-xs text-gray-500 mb-6">Let's accelerate your recruitment today.</p>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                        <div className="w-8 h-8 bg-green-100 rounded-full mb-3 flex items-center justify-center">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        </div>
                        <div className="text-[10px] text-gray-400 mb-1">Total Applications</div>
                        <div className="text-lg font-bold text-gray-800">1,248</div>
                      </div>
                      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                        <div className="w-8 h-8 bg-blue-100 rounded-full mb-3 flex items-center justify-center">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        </div>
                        <div className="text-[10px] text-gray-400 mb-1">Active Students</div>
                        <div className="text-lg font-bold text-gray-800">432</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Element 1 - University Card */}
              <div className="absolute -left-12 bottom-12 bg-white rounded-xl shadow-2xl p-3 w-48 transform -rotate-6 animate-float z-20">
                <img src="/images/dest-uk.png" className="w-full h-24 object-cover rounded-lg mb-3" alt="University" />
                <h4 className="text-sm font-bold text-[#1F2B5B] mb-1">University of Oxford</h4>
                <p className="text-[10px] text-gray-500">United Kingdom</p>
                <div className="mt-2 text-[8px] text-blue-500 flex justify-between">
                  <span>94% Acceptance</span>
                  <span>View Details</span>
                </div>
              </div>

              {/* Floating Element 2 - Event Card */}
              <div className="absolute -right-8 -top-8 bg-white rounded-xl shadow-2xl p-4 w-56 transform rotate-6 animate-float-delayed z-20">
                <h4 className="text-xs font-bold text-gray-800 mb-2 border-b border-gray-100 pb-2">Upcoming Events</h4>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-col leading-none">
                      <span className="text-[8px] font-bold text-orange-500">APR</span>
                      <span className="text-sm font-black text-orange-600">12</span>
                    </div>
                    <div>
                      <h5 className="text-[10px] font-bold text-[#1F2B5B]">Global Education Fair</h5>
                      <p className="text-[8px] text-gray-400">London, UK</p>
                    </div>
                  </div>
                  <button className="w-full bg-blue-50 text-blue-600 text-[10px] font-bold py-2 rounded border border-blue-100 hover:bg-blue-100 transition-colors">Register Now</button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Adding the rest of details about the platform */}
      <section className="py-24 bg-white text-neutral-900 border-t border-blue-100">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-4">Empowering the Future of Education</h2>
            <p className="text-neutral-500 text-lg max-w-2xl mx-auto">World Passport unites the smartest recruitment strategies with state-of-the-art AI technology to supercharge enrollment.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 bg-neutral-50 rounded-3xl border border-neutral-100 hover:shadow-2xl hover:shadow-blue-500/10 transition-all">
              <div className="w-14 h-14 bg-blue-100 text-blue-600 flex justify-center items-center rounded-2xl mb-6 text-2xl font-black">1</div>
              <h3 className="text-xl font-bold mb-4">Register Student</h3>
              <p className="text-neutral-500">Insert student details directly into the platform and leverage robust analytics to assess profile strength instantly.</p>
            </div>
            <div className="p-8 bg-neutral-50 rounded-3xl border border-neutral-100 hover:shadow-2xl hover:shadow-blue-500/10 transition-all">
              <div className="w-14 h-14 bg-orange-100 text-orange-600 flex justify-center items-center rounded-2xl mb-6 text-2xl font-black">2</div>
              <h3 className="text-xl font-bold mb-4">Search & Shortlist</h3>
              <p className="text-neutral-500">Match student credentials with our global database of 10,000+ universities within milliseconds using AI.</p>
            </div>
            <div className="p-8 bg-neutral-50 rounded-3xl border border-neutral-100 hover:shadow-2xl hover:shadow-blue-500/10 transition-all">
              <div className="w-14 h-14 bg-green-100 text-green-600 flex justify-center items-center rounded-2xl mb-6 text-2xl font-black">3</div>
              <h3 className="text-xl font-bold mb-4">Apply & Track</h3>
              <p className="text-neutral-500">Execute mass applications securely and monitor visa processes via a real-time, unified dashboard.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
