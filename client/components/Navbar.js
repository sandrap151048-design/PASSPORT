import { useState, useEffect } from 'react'
import api from '../utils/api'
import Link from 'next/link'
import { useRouter } from 'next/router'

const LogoIcon = ({ className }) => (
  <svg className={className} width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [studyDropdown, setStudyDropdown] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [countries, setCountries] = useState([])
  const [services, setServices] = useState([])
  const [isScrolled, setIsScrolled] = useState(false)
  const [partnerModalOpen, setPartnerModalOpen] = useState(false)
  const [partnerData, setPartnerData] = useState({ name: '', email: '', phone: '', company: '' })
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const isActive = (path) => router.pathname === path
  const isAboutPage = router.pathname === '/about'
  const isEventsPage = router.pathname === '/events'

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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // Fetch countries
    api.get('/countries')
      .then(res => {
        const data = res.data;
        if (Array.isArray(data)) setCountries(data);
        else if (data && Array.isArray(data.data)) setCountries(data.data);
      })
      .catch(err => console.error('Error fetching countries:', err));
    // Fetch services for dropdown
    api.get('/services')
      .then(res => {
        const data = res.data;
        if (Array.isArray(data)) setServices(data);
        else if (data && Array.isArray(data.data)) setServices(data.data);
      })
      .catch(err => console.error('Error fetching services:', err));
  }, [])

  return (
    <>
      <nav className={`fixed w-full top-0 z-50 transition-all duration-500 shadow-xl ${isAboutPage ? 'bg-[#6345ED]' : isEventsPage ? 'bg-[#1a1045]' : 'bg-brand-blue'} ${isScrolled ? 'py-2' : 'py-4'}`}>
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group transition-all duration-300">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform bg-white shadow-white/10 ${isAboutPage ? 'text-[#6345ED]' : isEventsPage ? 'text-[#1a1045]' : 'text-brand-blue'}`}>
                <LogoIcon className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-lg md:text-xl tracking-tight leading-none text-white uppercase">WORLD<span className="italic">PASSPORT</span></span>
                <span className="font-bold text-[7px] md:text-[8px] tracking-[0.2em] leading-none mt-1 uppercase text-white/70">Education Consultants</span>
              </div>
            </Link>

            <div className="hidden lg:flex items-center flex-1 justify-center space-x-7">
              {[
                { name: 'Programs', path: '/programs' },
                { name: 'Destinations', path: '/destinations' },
                { name: 'Services', path: '/services', hasDropdown: true },
                { name: 'Events', path: '/events' },
                { name: 'About', path: '/about' },
                { name: 'Contact', path: '/contact' }
              ].map((link) => (
                <div key={link.path} className="relative group/nav">
                  <Link
                    href={link.path}
                    className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.15em] transition-all relative text-white/90 hover:text-white group"
                  >
                    {link.name}
                    {link.hasDropdown && (
                      <svg className="w-3 h-3 transition-transform duration-300 group-hover/nav:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path></svg>
                    )}
                    <span className={`absolute -bottom-1.5 left-1/2 -translate-x-1/2 h-0.5 bg-brand-orange transition-all duration-300 ${isActive(link.path) ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                  </Link>

                  {link.hasDropdown && link.name === 'Services' && services.length > 0 && (
                    <div className="absolute top-full left-0 mt-4 w-64 bg-white rounded-2xl shadow-2xl overflow-hidden opacity-0 invisible translate-y-2 group-hover/nav:opacity-100 group-hover/nav:visible group-hover/nav:translate-y-0 transition-all duration-300 border border-neutral-100">
                      <div className="p-4 bg-neutral-50 border-b border-neutral-100 flex items-center justify-between">
                        <span className="text-[9px] font-black uppercase tracking-widest text-neutral-400">Recent Services</span>
                        <div className="flex gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse"></span>
                        </div>
                      </div>
                      <div className="py-2">
                        {services.slice(0, 5).map((service, idx) => (
                          <Link
                            key={service._id}
                            href={`/services/${service._id}`}
                            className="flex items-center gap-3 px-6 py-3 hover:bg-neutral-50 text-neutral-600 hover:text-brand-blue transition-colors group/item"
                          >
                            <span className="text-[10px] font-bold uppercase tracking-wider">{service.title}</span>
                            <svg className="w-3 h-3 opacity-0 group-hover/item:opacity-100 -translate-x-2 group-hover/item:translate-x-0 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7"></path></svg>
                          </Link>
                        ))}
                        <div className="mx-4 my-2 border-t border-dotted border-neutral-200" />
                        <Link
                          href="/services"
                          className="flex items-center justify-center px-6 py-3 text-[9px] font-black text-brand-orange uppercase tracking-widest hover:bg-brand-orange hover:text-white transition-all"
                        >
                          View All Services
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-4">
              <Link href="/login">
                <button className="px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all border border-white/20 text-white hover:bg-white/10 active:scale-95">
                  Portal Login
                </button>
              </Link>
              <button
                onClick={() => setPartnerModalOpen(true)}
                className={`px-5 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all shadow-xl hover:-translate-y-0.5 active:scale-95 flex items-center gap-2 bg-white ${isScrolled ? 'shadow-white/10' : 'shadow-black/5'} ${isAboutPage ? 'text-[#6345ED]' : isEventsPage ? 'text-[#1a1045]' : 'text-brand-blue'}`}
              >
                Become a Partner
              </button>
            </div>

            <div className="flex lg:hidden items-center gap-4">
              <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-white bg-white/10 rounded-lg border border-white/20">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full h-[calc(100vh-80px)] overflow-y-auto bg-white border-t border-neutral-100 p-8 shadow-2xl z-50 animate-fade-in-up">
            <div className="flex flex-col gap-6">
              {/* Mobile Services Dropdown */}
              {[
                { name: 'Home', path: '/' },
                { name: 'Programs', path: '/programs' },
                { name: 'Study Destinations', path: '/destinations' },
                { name: 'Services', path: '/services', hasDropdown: true },
                { name: 'Upcoming Events', path: '/events' },
                { name: 'About', path: '/about' },
                { name: 'Contact', path: '/contact' }
              ].map((item) => (
                <div key={item.path} className="flex flex-col">
                  <div className="flex items-center justify-between">
                    <Link href={item.path} className="text-sm font-bold uppercase tracking-widest text-neutral-600 hover:text-brand-blue transition-colors" onClick={() => !item.hasDropdown && setIsOpen(false)}>
                      {item.name}
                    </Link>
                    {item.hasDropdown && item.name === 'Services' && services.length > 0 && (
                      <button
                        onClick={() => setStudyDropdown(!studyDropdown)}
                        className="p-2 text-neutral-400 hover:text-brand-blue transition-colors"
                      >
                        <svg className={`w-5 h-5 transition-transform duration-300 ${studyDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                      </button>
                    )}
                  </div>
                  {item.hasDropdown && item.name === 'Services' && studyDropdown && services.length > 0 && (
                    <div className="flex flex-col gap-4 mt-4 ml-4 pl-4 border-l-2 border-neutral-100 animate-slide-up-fade">
                      {services.slice(0, 5).map((service) => (
                        <Link
                          key={service._id}
                          href={`/services/${service._id}`}
                          className="text-xs font-bold text-neutral-500 hover:text-brand-blue transition-colors uppercase tracking-widest"
                          onClick={() => setIsOpen(false)}
                        >
                          {service.title}
                        </Link>
                      ))}
                      <Link
                        href="/services"
                        className="text-xs font-black text-brand-orange uppercase tracking-widest"
                        onClick={() => setIsOpen(false)}
                      >
                        View All Services
                      </Link>
                    </div>
                  )}
                </div>
              ))}
              <button
                onClick={() => { setIsOpen(false); setPartnerModalOpen(true); }}
                className="w-full bg-brand-blue text-white py-5 rounded-2xl text-sm font-black uppercase tracking-widest shadow-xl shadow-brand-blue/30 hover:bg-brand-blue-dark transition-all active:scale-95 mt-4"
              >
                Become a Partner
              </button>
            </div>
          </div>
        )}
      </nav>

      {partnerModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-[2rem] w-full max-w-md p-10 relative shadow-2xl animate-scale-up text-neutral-900 border border-neutral-100">
            <button onClick={() => setPartnerModalOpen(false)} className="absolute top-6 right-6 text-neutral-400 hover:text-neutral-900 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <h3 className="text-2xl font-black mb-2 uppercase tracking-tight">Become a Partner</h3>
            <p className="text-neutral-500 text-sm mb-8 font-medium">Join our global network. Submit your details and our team will connect with you.</p>
            <form onSubmit={handlePartnerSubmit} className="space-y-4">
              <input type="text" placeholder="Your Name" required className="w-full px-6 py-4 bg-neutral-50 rounded-xl border border-neutral-100 focus:ring-2 focus:ring-red-500 focus:outline-none font-bold text-sm" value={partnerData.name} onChange={(e) => setPartnerData({ ...partnerData, name: e.target.value })} />
              <input type="email" placeholder="Email Address" required className="w-full px-6 py-4 bg-neutral-50 rounded-xl border border-neutral-100 focus:ring-2 focus:ring-red-500 focus:outline-none font-bold text-sm" value={partnerData.email} onChange={(e) => setPartnerData({ ...partnerData, email: e.target.value })} />
              <input type="tel" placeholder="Phone Number" required className="w-full px-6 py-4 bg-neutral-50 rounded-xl border border-neutral-100 focus:ring-2 focus:ring-red-500 focus:outline-none font-bold text-sm" value={partnerData.phone} onChange={(e) => setPartnerData({ ...partnerData, phone: e.target.value })} />
              <input type="text" placeholder="Company/Agency Name" required className="w-full px-6 py-4 bg-neutral-50 rounded-xl border border-neutral-100 focus:ring-2 focus:ring-red-500 focus:outline-none font-bold text-sm" value={partnerData.company} onChange={(e) => setPartnerData({ ...partnerData, company: e.target.value })} />
              <button type="submit" disabled={loading} className="w-full bg-red-600 text-white py-4 rounded-xl font-black uppercase tracking-widest text-[11px] shadow-xl shadow-red-500/20 hover:bg-red-700 transition-all hover:-translate-y-1 active:scale-95 disabled:opacity-50">
                {loading ? 'Submitting...' : 'Submit Partnership Enquiry'}
              </button>
            </form>
          </div>
        </div>
      )}

      {sidebarOpen && (
        <>
          <div className="fixed inset-0 bg-neutral-900/60 backdrop-blur-sm z-[100] animate-fade-in" onClick={() => setSidebarOpen(false)} />
          <div className="fixed right-0 top-0 h-full w-80 md:w-96 bg-white z-[110] shadow-2xl p-10 animate-slide-left overflow-y-auto">
            <button onClick={() => setSidebarOpen(false)} className="absolute top-6 right-6 text-neutral-400 hover:text-neutral-900 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <div className="mt-8">
              <h2 className="text-2xl font-black tracking-tighter mb-6">WORLD PASSPORT</h2>
              <p className="text-neutral-500 leading-relaxed mb-10 text-base">Empowering students to reach their global potential through trusted institutional partnerships and strategic academic guidance.</p>
              <div className="space-y-8">
                <div>
                  <h3 className="text-sm font-bold text-blue-600 mb-2 uppercase tracking-widest">Connect</h3>
                  <p className="font-bold text-lg">info@worldpassport.in</p>
                  <p className="font-bold text-lg">+91 92050 31277</p>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-blue-600 mb-2 uppercase tracking-widest">Reach Us</h3>
                  <p className="font-medium text-neutral-600">Kandamkulathy Towers, 5th Floor, M.G. Road, KPCC Junction, Shenoys, Ernakulam, Kerala - 682011</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
