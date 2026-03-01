import { useState } from 'react'
import axios from 'axios'
import Image from 'next/image'

export default function ConsultationForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  })
  const [status, setStatus] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'
      await axios.post(`${API_URL}/consultations`, formData)
      setStatus('success')
      setFormData({ name: '', email: '', phone: '', service: '', message: '' })
      setTimeout(() => setStatus(''), 5000)
    } catch (error) {
      setStatus('error')
      setTimeout(() => setStatus(''), 5000)
    }
  }

  return (
    <section id="consultation" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="relative rounded-3xl overflow-hidden shadow-xl border border-blue-100" style={{ background: 'linear-gradient(135deg, #f0f7ff 0%, #ffffff 50%, #f0f4ff 100%)' }}>

          {/* Subtle decorative blobs */}
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-20 pointer-events-none" style={{ background: 'radial-gradient(circle, #bfdbfe 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-10 pointer-events-none" style={{ background: 'radial-gradient(circle, #93c5fd 0%, transparent 70%)', transform: 'translate(-30%, 30%)' }} />

          <div className="relative z-10 grid lg:grid-cols-2">

            {/* Left Side */}
            <div className="p-12 lg:p-20 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-blue-100">
              <div className="mb-12">
                <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 uppercase tracking-tighter leading-none">
                  INITIALIZE <br />
                  <span className="text-blue-500 italic font-light">Consultation</span>
                </h2>
                <p className="text-gray-500 text-xl max-w-md leading-relaxed">
                  Start your global academic migration sequence with our lead engineers. Verified expert guidance for students.
                </p>
              </div>

              <div className="space-y-10">
                {[
                  { title: "EXPERT NODE SELECTION", desc: "Access to 500+ global institutional nodes.", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
                  { title: "DATA VERIFICATION", desc: "Automated document pre-scoring & verification.", icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" },
                  { title: "SECURE CHANNEL", desc: "Direct uplink to university admission boards.", icon: "M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-6 group">
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-500 flex-shrink-0">
                      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-800 mb-1 uppercase tracking-tight">{item.title}</h4>
                      <p className="text-gray-500 text-base leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="p-12 lg:p-20 bg-white/60 backdrop-blur-sm">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Identity</label>
                    <input
                      type="text" name="name" required value={formData.name} onChange={handleChange}
                      className="w-full bg-white border border-gray-200 rounded-2xl px-6 py-4 text-gray-800 placeholder-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                      placeholder="FULL NAME"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Signal (Email)</label>
                    <input
                      type="email" name="email" required value={formData.email} onChange={handleChange}
                      className="w-full bg-white border border-gray-200 rounded-2xl px-6 py-4 text-gray-800 placeholder-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                      placeholder="EMAIL ADDRESS"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Voice (Phone)</label>
                    <input
                      type="tel" name="phone" required value={formData.phone} onChange={handleChange}
                      className="w-full bg-white border border-gray-200 rounded-2xl px-6 py-4 text-gray-800 placeholder-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                      placeholder="PHONE NUMBER"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Target Service</label>
                    <select
                      name="service" required value={formData.service} onChange={handleChange}
                      className="w-full bg-white border border-gray-200 rounded-2xl px-6 py-4 text-gray-800 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                    >
                      <option value="">SELECT SERVICE</option>
                      <option value="study-abroad">STUDY ABROAD</option>
                      <option value="visa">VISA SERVICES</option>
                      <option value="immigration">IMMIGRATION</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Briefing (Message)</label>
                  <textarea
                    name="message" rows="4" value={formData.message} onChange={handleChange}
                    className="w-full bg-white border border-gray-200 rounded-2xl px-6 py-4 text-gray-800 placeholder-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all outline-none resize-none"
                    placeholder="TELL US ABOUT YOUR PLANS..."
                  ></textarea>
                </div>

                <button type="submit" className="w-full bg-blue-600 text-white py-6 rounded-2xl font-black text-base uppercase tracking-[0.2em] hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-blue-200">
                  Execute Consultation Request
                </button>

                {status === 'success' && (
                  <div className="bg-green-50 border border-green-300 text-green-600 px-6 py-4 rounded-2xl text-center">
                    Transmission status: SUCCESS. We will connect soon.
                  </div>
                )}
                {status === 'error' && (
                  <div className="bg-red-50 border border-red-300 text-red-500 px-6 py-4 rounded-2xl text-center">
                    Signal error. Please retry the transmission.
                  </div>
                )}
              </form>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
