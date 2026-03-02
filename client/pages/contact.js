import { useState } from 'react'
import api from '../utils/api'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Image from 'next/image'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [status, setStatus] = useState('')
  const [activeFaq, setActiveFaq] = useState(null)

  const faqs = [
    {
      q: "What is your typical response time?",
      a: "Our advisory team reviews inquiries continuously. You can expect a personalized response within 4-6 business hours."
    },
    {
      q: "Do you offer preliminary evaluations?",
      a: "Yes. We provide a complimentary initial profile assessment to determine the most viable pathways for your academic journey."
    },
    {
      q: "Are your consultations conducted remotely?",
      a: "We operate a global digital-first infrastructure. All consultations are securely conducted via enterprise-grade video conferencing platforms."
    },
    {
      q: "Where is your corporate headquarters?",
      a: "Our central operations are based in India, strategically positioned to manage our global network of institutional partners and international students."
    }
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus({ type: 'loading', message: 'Sending...' })
    try {
      await api.post('/contacts', formData)
      setStatus({ type: 'success', message: 'Transmission Successful' })
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
      setTimeout(() => setStatus(null), 4000)
    } catch (error) {
      console.error('Contact submission error:', error);
      const errorMsg = error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : 'Error sending message. Please try again.';
      setStatus({ type: 'error', message: typeof errorMsg === 'object' ? JSON.stringify(errorMsg) : String(errorMsg) });
      setTimeout(() => setStatus(null), 4000)
    }
  }

  return (
    <div className="min-h-screen bg-white font-sans text-neutral-900 selection:bg-neutral-900 selection:text-white">
      <Navbar />

      {/* Premium Hero Section with Curve */}
      <section className="relative pt-32 pb-32 md:pb-48 overflow-hidden bg-[#1b67f1]">
        {/* Floating Decorative Elements */}
        <div className="absolute top-20 left-10 w-4 h-4 text-white/40 animate-pulse">
          <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 0l3.09 8.91H24L16.91 14.5 19.91 24 12 18.18 4.09 24l3-9.5L0 8.91h8.91L12 0z" /></svg>
        </div>
        <div className="absolute top-40 right-10 w-5 h-5 text-white/30 animate-bounce">
          <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 0l3.09 8.91H24L16.91 14.5 19.91 24 12 18.18 4.09 24l3-9.5L0 8.91h8.91L12 0z" /></svg>
        </div>
        <div className="absolute top-1/2 left-1/4 w-3 h-3 bg-white/20 rounded-full animate-float"></div>
        <div className="absolute top-1/3 right-1/4 w-4 h-4 border-2 border-white/20 rounded-full animate-spin-slow"></div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="max-w-4xl mx-auto animate-fade-in-up">
            {/* Breadcrumbs */}
            <nav className="flex items-center justify-center gap-2 mb-8 text-blue-100/80 text-sm font-medium">
              <span className="hover:text-white transition-colors cursor-pointer">Home</span>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-300"></span>
              <span className="text-white">Contact Us</span>
            </nav>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1] mb-8 uppercase">
              We are transcending borders and <br />
              expanding our global reach.
            </h1>

            <p className="text-xl md:text-2xl text-blue-50/90 font-light mb-12 normal-case max-w-3xl mx-auto">
              Contact us through our office that is most convenient to you.
            </p>

            <div className="flex justify-center">
              <button className="px-10 py-4 bg-gradient-to-r from-orange-400 to-orange-600 text-white font-bold rounded-xl shadow-lg shadow-orange-900/20 hover:shadow-orange-900/40 hover:-translate-y-1 transition-all">
                Get in Touch With Us
              </button>
            </div>
          </div>
        </div>

        {/* The Curve SVG */}
        <div className="absolute -bottom-1 left-0 w-full overflow-hidden leading-none z-10 translate-y-[1px]">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-[60px] md:h-[100px] lg:h-[150px] preserve-3d scale-x-105">
            <path d="M1440 120H0V48C0 48 360 0 720 0C1080 0 1440 48 1440 48V120Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Main Content & Form Grid */}
      <section className="py-16 md:py-24 bg-white relative">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">

            {/* Contact Information */}
            <div className="lg:col-span-5 space-y-12 animate-slide-up-fade" style={{ animationDelay: '100ms' }}>
              <div>
                <h3 className="text-sm font-bold tracking-widest text-blue-600 uppercase mb-6 flex items-center gap-3">
                  <span className="w-8 h-[1px] bg-blue-600"></span>
                  Contact Information
                </h3>
                <div className="space-y-8">
                  <div className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-50 text-blue-600 flex items-center justify-center rounded-xl">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1">Email Us</p>
                      <a href="mailto:info@worldpassport.in" className="text-xl font-medium text-neutral-900 hover:text-blue-600 transition-colors normal-case">info@worldpassport.in</a>
                    </div>
                  </div>

                  <div className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 bg-emerald-50 text-emerald-600 flex items-center justify-center rounded-xl">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1">Call Us</p>
                      <a href="tel:+919205031277" className="text-xl font-medium text-neutral-900 hover:text-emerald-600 transition-colors">+91 92050 31277</a>
                    </div>
                  </div>

                  <div className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-50 text-blue-600 flex items-center justify-center rounded-xl">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1">Headquarters</p>
                      <p className="text-xl font-medium text-neutral-900 normal-case leading-snug">World Passport Advisory<br />Operations Center, India</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold tracking-widest text-emerald-600 uppercase mb-6 flex items-center gap-3">
                  <span className="w-8 h-[1px] bg-emerald-600"></span>
                  Strategic Support
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { city: 'London', role: 'UK Liaison' },
                    { city: 'Dubai', role: 'Middle East' },
                    { city: 'Toronto', role: 'North America' },
                    { city: 'Singapore', role: 'Asia Pacific' }
                  ].map((hub, idx) => (
                    <div key={idx} className="p-4 border border-neutral-100 bg-neutral-50/50 rounded-xl hover:border-blue-200 transition-colors group">
                      <p className="text-sm font-bold text-neutral-900 mb-1 uppercase tracking-tight">{hub.city}</p>
                      <p className="text-[10px] font-medium text-neutral-500 uppercase tracking-widest group-hover:text-blue-600 transition-colors">{hub.role}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Form Section */}
            <div className="lg:col-span-7 animate-slide-up-fade" style={{ animationDelay: '200ms' }}>
              <div className="bg-neutral-50 border border-neutral-100 p-8 md:p-12 rounded-[2rem] shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100/50 rounded-full blur-3xl -mr-32 -mt-32"></div>

                <div className="relative z-10">
                  <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-2 uppercase tracking-tight">Send a Message</h2>
                  <p className="text-neutral-500 font-light mb-8 normal-case">Complete the form below and an advisor will contact you within 4-6 business hours.</p>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-[0.2em] ml-1">Full Name</label>
                        <input
                          type="text"
                          required
                          className="w-full px-5 py-4 bg-white border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all placeholder:text-neutral-300 uppercase text-sm"
                          placeholder="E.G. ALEX JOHNSON"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-[0.2em] ml-1">Email Address</label>
                        <input
                          type="email"
                          required
                          className="w-full px-5 py-4 bg-white border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all placeholder:text-neutral-300 normal-case text-sm"
                          placeholder="alex@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-[0.2em] ml-1">Phone Number</label>
                        <input
                          type="tel"
                          className="w-full px-5 py-4 bg-white border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all placeholder:text-neutral-300 text-sm"
                          placeholder="+91 XXXXX XXXXX"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-[0.2em] ml-1">Area of Interest</label>
                        <input
                          type="text"
                          className="w-full px-5 py-4 bg-white border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all placeholder:text-neutral-300 text-sm uppercase"
                          placeholder="E.G. MASTERS IN GERMANY"
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-[0.2em] ml-1">Detailed Inquiry</label>
                      <textarea
                        required
                        rows="4"
                        className="w-full px-5 py-4 bg-white border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all placeholder:text-neutral-300 normal-case text-sm resize-none"
                        placeholder="Tell us about your background and goals..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      />
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-4">
                      <div className="order-2 md:order-1 text-center md:text-left">
                        {status?.type === 'success' && (
                          <p className="text-emerald-600 font-bold text-[10px] uppercase tracking-widest flex items-center gap-2">
                            <span className="w-2 h-2 bg-emerald-600 rounded-full animate-pulse"></span>
                            {status.message || 'Transmission Successful'}
                          </p>
                        )}
                        {status?.type === 'error' && (
                          <p className="text-red-600 font-bold text-[10px] uppercase tracking-widest flex items-center gap-2">
                            <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                            {status.message || 'Transmission Failed'}
                          </p>
                        )}
                      </div>

                      <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="order-1 md:order-2 w-full md:w-auto px-10 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold text-[10px] uppercase tracking-[0.2em] rounded-xl shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-blue-300 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                      >
                        <span className="flex items-center justify-center gap-3">
                          {status === 'loading' ? 'Processing...' : 'Submit Inquiry'}
                          {!status && <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>}
                        </span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modernized FAQ Section */}
      <section className="py-24 bg-neutral-50 relative overflow-hidden uppercase">
        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <div className="text-center mb-16 animate-slide-up-fade">
            <span className="text-blue-600 font-bold text-[10px] uppercase tracking-[0.3em] mb-4 block">Knowledge Base</span>
            <h2 className="text-3xl md:text-5xl font-bold text-neutral-900 mb-6 uppercase tracking-tight leading-none">Protocol <span className="italic font-light text-neutral-400 normal-case">Answers.</span></h2>
            <p className="text-neutral-500 font-light max-w-xl mx-auto normal-case leading-relaxed">Everything you need to know about our selection process, timelines, and advisory protocols.</p>
          </div>

          <div className="space-y-4 animate-slide-up-fade" style={{ animationDelay: '100ms' }}>
            {faqs.map((faq, i) => (
              <div key={i} className={`bg-white border rounded-2xl transition-all duration-300 ${activeFaq === i ? 'border-blue-200 shadow-xl shadow-blue-500/5' : 'border-neutral-100'}`}>
                <button
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full px-6 py-6 text-left flex justify-between items-center focus:outline-none group"
                >
                  <span className={`text-base font-bold tracking-tight transition-colors duration-300 ${activeFaq === i ? 'text-blue-600' : 'text-neutral-800'}`}>
                    {faq.q}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${activeFaq === i ? 'bg-blue-600 text-white rotate-45' : 'bg-neutral-100 text-neutral-400'}`}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6v12M6 12h12"></path></svg>
                  </div>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${activeFaq === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <div className="px-6 pb-6 text-neutral-500 font-light text-sm leading-relaxed border-t border-neutral-50 pt-4 normal-case">
                    {faq.a}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
