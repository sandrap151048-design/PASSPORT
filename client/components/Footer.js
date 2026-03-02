import { useState } from 'react'
import api from '../utils/api'
import Link from 'next/link'

export default function Footer() {
  const [subscribeData, setSubscribeData] = useState({ email: '', interest: "I'm Interested in" });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const [partnerModalOpen, setPartnerModalOpen] = useState(false);
  const [partnerData, setPartnerData] = useState({ name: '', email: '', phone: '', company: '' });

  const handlePartnerSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/partners', partnerData);
      setPartnerModalOpen(false);
      setPartnerData({ name: '', email: '', phone: '', company: '' });
      alert('Partner enquiry sent successfully!');
    } catch (err) {
      alert('Error sending enquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = async () => {
    if (!subscribeData.email) {
      setStatus({ type: 'error', message: 'Please enter your email.' });
      return;
    }

    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const res = await api.post('/subscriptions', {
        email: subscribeData.email,
        interest: subscribeData.interest !== "I'm Interested in" ? subscribeData.interest : 'General'
      });

      if (res.status === 201 || res.status === 200) {
        setStatus({ type: 'success', message: 'Successfully subscribed!' });
        setSubscribeData({ email: '', interest: "I'm Interested in" });
      } else {
        setStatus({ type: 'error', message: res.data.message || 'Error subscribing.' });
      }
    } catch (error) {
      console.error('Submission error:', error);
      setStatus({ type: 'error', message: error.response?.data?.message || 'An error occurred. Please try again later.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-[#0a1025] text-white relative overflow-hidden">
      {/* Curved Edge Transition */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-10 -translate-y-[1px]">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-[60px] md:h-[100px] lg:h-[120px] preserve-3d scale-x-105">
          <path d="M0 120C360 0 1080 0 1440 120V0H0V120Z" fill="white" />
        </svg>
      </div>

      {/* Subscription Section - Inspired by Photo */}
      <div className="relative z-20 pt-32 pb-16 border-b border-white/5">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl md:text-4xl font-black text-white mb-10 tracking-tight uppercase leading-none animate-fade-in-up">
            Stay updated with <span className="text-orange-500 italic">World Passport</span>
          </h3>
          <div className="flex flex-col md:flex-row items-center justify-center gap-5 max-w-5xl mx-auto animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <input
              type="email"
              placeholder="Email ID"
              value={subscribeData.email}
              onChange={(e) => setSubscribeData({ ...subscribeData, email: e.target.value })}
              className="w-full md:flex-1 bg-white px-8 py-5 rounded-2xl text-neutral-900 font-bold focus:outline-none focus:ring-4 focus:ring-orange-500/20 shadow-2xl transition-all"
            />
            <div className="relative w-full md:w-72 group">
              <select
                value={subscribeData.interest}
                onChange={(e) => setSubscribeData({ ...subscribeData, interest: e.target.value })}
                className="w-full bg-white px-8 py-5 rounded-2xl text-neutral-900 font-bold focus:outline-none focus:ring-4 focus:ring-orange-500/20 shadow-2xl appearance-none cursor-pointer transition-all"
              >
                <option>I'm Interested in</option>
                <option>Study Abroad</option>
                <option>Visa Assistance</option>
                <option>Scholarships</option>
              </select>
              <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400 group-hover:text-primary transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>
            <button
              onClick={handleSubscribe}
              disabled={loading}
              className="w-full md:w-auto px-12 py-5 bg-gradient-to-r from-orange-500 to-orange-700 text-white font-black rounded-2xl shadow-2xl shadow-orange-950/40 hover:shadow-orange-500/50 hover:scale-105 hover:-translate-y-1 transition-all uppercase tracking-[0.2em] text-[13px] disabled:opacity-50"
            >
              {loading ? 'Subscribing...' : 'Subscribe Now'}
            </button>
          </div>
          {status.message && (
            <p className={`mt-6 text-sm font-black uppercase tracking-widest ${status.type === 'success' ? 'text-green-400' : 'text-orange-500'} animate-fade-in`}>
              {status.message}
            </p>
          )}
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 pt-20 pb-16">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="animate-fade-in">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="font-black text-xl tracking-tight">WORLD<span className="text-primary italic">PASSPORT</span></span>
            </div>
            <p className="text-neutral-400 mb-8 text-[13px] font-medium leading-relaxed">
              KC Overseas' trusted partner, empowering students to reach their global potential through expert guidance and strategic academic partnerships.
            </p>

            <div className="flex gap-4">
              {[
                { name: 'Facebook', url: 'https://facebook.com/worldpassport', icon: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
                { name: 'Instagram', url: 'https://instagram.com/worldpassport', icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' },
                { name: 'LinkedIn', url: 'https://linkedin.com/company/worldpassport', icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' }
              ].map(social => (
                <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className="w-9 h-9 border border-white/10 rounded-lg flex items-center justify-center hover:bg-primary hover:border-primary transition-all group">
                  <svg className="w-4.5 h-4.5 text-neutral-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d={social.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="animate-fade-in md:pl-10">
            <h4 className="text-white font-bold text-sm uppercase tracking-[0.2em] mb-8 relative inline-block">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-8 h-1 bg-primary rounded-full"></span>
            </h4>
            <ul className="space-y-4 text-[13px] font-medium">
              {[
                { name: 'Home', path: '/' },
                { name: 'About Us', path: '/about' },
                { name: 'Services', path: '/services' },
                { name: 'Partnership', path: '/partners' },
                { name: 'Contact Us', path: '/contact' }
              ].map(link => (
                <li key={link.name}>
                  <Link href={link.path} className="text-neutral-400 hover:text-white transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-colors"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Programs */}
          <div className="animate-fade-in">
            <h4 className="text-white font-bold text-sm uppercase tracking-[0.2em] mb-8 relative inline-block">
              Programs
              <span className="absolute -bottom-2 left-0 w-8 h-1 bg-secondary rounded-full"></span>
            </h4>
            <ul className="space-y-4 text-[13px] font-medium">
              {['Undergraduate', 'Postgraduate', 'Doctoral', 'Diploma', 'Language'].map(link => (
                <li key={link}>
                  <Link href="/programs" className="text-neutral-400 hover:text-white transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary/40 group-hover:bg-secondary transition-colors"></span>
                    {link} Programs
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="animate-fade-in">
            <h4 className="text-white font-bold text-sm uppercase tracking-[0.2em] mb-8 relative inline-block">
              Contact
              <span className="absolute -bottom-2 left-0 w-8 h-1 bg-white rounded-full"></span>
            </h4>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
                  <span className="text-lg">📍</span>
                </div>
                <div className="text-[13px] text-neutral-400 leading-relaxed font-medium">
                  <p className="text-white font-bold mb-1">Ernakulam Branch</p>
                  KPCC Junction, Shenoys, Ernakulam, Kerala – 682011
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
                  <span className="text-lg">📞</span>
                </div>
                <div className="text-[13px] text-neutral-400 font-medium">
                  <a href="tel:+919205031277" className="hover:text-white transition-colors block text-white font-bold">+91 92050 31277</a>
                  <a href="mailto:info@worldpassport.in" className="hover:text-white transition-colors block lowercase">info@worldpassport.in</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[11px] font-bold text-neutral-500 uppercase tracking-widest leading-none">
              &copy; 2024 WORLD PASSPORT. ALL RIGHTS RESERVED.
            </p>
            <div className="flex flex-col md:flex-row gap-6 items-center text-[12px] font-bold tracking-widest text-neutral-400 uppercase">
              <div className="flex gap-10">
                <Link href="/contact" className="hover:text-primary transition-colors">Privacy Policy</Link>
                <Link href="/contact" className="hover:text-primary transition-colors">Terms of Service</Link>
              </div>
              <button
                onClick={() => setPartnerModalOpen(true)}
                className="px-8 py-4 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all font-black text-[11px] uppercase tracking-widest shadow-xl shadow-red-900/20 hover:-translate-y-0.5"
              >
                Become a Partner
              </button>
            </div>
          </div>
        </div>
      </div>

      {partnerModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-[2rem] w-full max-w-md p-10 relative shadow-2xl animate-scale-up text-neutral-900 border border-neutral-100">
            <button
              onClick={() => setPartnerModalOpen(false)}
              className="absolute top-6 right-6 text-neutral-400 hover:text-neutral-900 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <h3 className="text-2xl font-black mb-2 uppercase tracking-tight">Become a Partner</h3>
            <p className="text-neutral-500 text-sm mb-8 font-medium">Join our global network. Submit your details and our team will connect with you.</p>

            <form onSubmit={handlePartnerSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                required
                className="w-full px-6 py-4 bg-neutral-50 rounded-xl border border-neutral-100 focus:ring-2 focus:ring-red-500 focus:outline-none font-bold text-sm"
                value={partnerData.name}
                onChange={(e) => setPartnerData({ ...partnerData, name: e.target.value })}
              />
              <input
                type="email"
                placeholder="Email Address"
                required
                className="w-full px-6 py-4 bg-neutral-50 rounded-xl border border-neutral-100 focus:ring-2 focus:ring-red-500 focus:outline-none font-bold text-sm"
                value={partnerData.email}
                onChange={(e) => setPartnerData({ ...partnerData, email: e.target.value })}
              />
              <input
                type="tel"
                placeholder="Phone Number"
                required
                className="w-full px-6 py-4 bg-neutral-50 rounded-xl border border-neutral-100 focus:ring-2 focus:ring-red-500 focus:outline-none font-bold text-sm"
                value={partnerData.phone}
                onChange={(e) => setPartnerData({ ...partnerData, phone: e.target.value })}
              />
              <input
                type="text"
                placeholder="Company/Agency Name"
                required
                className="w-full px-6 py-4 bg-neutral-50 rounded-xl border border-neutral-100 focus:ring-2 focus:ring-red-500 focus:outline-none font-bold text-sm"
                value={partnerData.company}
                onChange={(e) => setPartnerData({ ...partnerData, company: e.target.value })}
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-red-600 text-white py-4 rounded-xl font-black uppercase tracking-widest text-[11px] shadow-xl shadow-red-500/20 hover:bg-red-700 transition-all hover:-translate-y-1 active:scale-95 disabled:opacity-50"
              >
                {loading ? 'Submitting...' : 'Submit Partnership Enquiry'}
              </button>
            </form>
          </div>
        </div>
      )}
    </footer>
  )
}
