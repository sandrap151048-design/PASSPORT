import { useState, useEffect } from 'react'
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
  const [isScrolled, setIsScrolled] = useState(false)
  const router = useRouter()


  const isActive = (path) => router.pathname === path

  const isAboutPage = router.pathname === '/about'
  const isEventsPage = router.pathname === '/events'

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    fetch('http://localhost:5000/api/countries')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setCountries(data)
        else if (data && Array.isArray(data.data)) setCountries(data.data)
      })
      .catch(err => console.error('Error fetching countries:', err))
  }, [])

  return (
    <>
      {/* Main Navbar */}
      {/* Main Navbar */}
      <nav className={`fixed w-full top-0 z-50 transition-all duration-500 shadow-xl ${isAboutPage ? 'bg-[#6345ED]' : isEventsPage ? 'bg-[#1a1045]' : 'bg-brand-blue'} ${isScrolled ? 'py-2' : 'py-4'}`}>
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group transition-all duration-300">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform bg-white shadow-white/10 ${isAboutPage ? 'text-[#6345ED]' : isEventsPage ? 'text-[#1a1045]' : 'text-brand-blue'}`}>
                <LogoIcon className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-lg md:text-xl tracking-tight leading-none text-white uppercase">WORLD<span className="italic">PASSPORT</span></span>
                <span className="font-bold text-[7px] md:text-[8px] tracking-[0.2em] leading-none mt-1 uppercase text-white/70">Education Consultants</span>
              </div>
            </Link>

            {/* Desktop Menu */}
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

                  {/* World Passport Services Dropdown */}
                  {link.hasDropdown && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 opacity-0 invisible group-hover/nav:opacity-100 group-hover/nav:visible transition-all duration-300 w-72 bg-white rounded-2xl shadow-2xl shadow-brand-blue/20 flex flex-col pt-2 pb-2 border border-neutral-100/50 z-50">
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45 border-t border-l border-neutral-100/50 rounded-tl-sm"></div>

                      <div className="relative z-10 p-2">
                        <div className="px-4 py-2 border-b border-neutral-50 mb-2">
                          <span className="text-[9px] font-black text-brand-orange uppercase tracking-[0.2em]">World Passport Exclusives</span>
                        </div>
                        {[
                          { name: 'University Admissions', path: '/services#demo-s1' },
                          { name: 'Visa Processing', path: '/services#demo-s2' },
                          { name: 'Scholarships', path: '/services#demo-s3' },
                          { name: 'Pre-Departure', path: '/services#demo-s4' },
                          { name: 'Post-Arrival', path: '/services#demo-s5' }
                        ].map((subItem, idx) => (
                          <Link
                            key={idx}
                            href={subItem.path}
                            className="block px-4 py-3 text-[9px] font-extrabold uppercase tracking-widest text-neutral-600 hover:text-brand-blue hover:bg-neutral-50 hover:pl-6 rounded-xl transition-all"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="hidden lg:flex items-center gap-4">
              <Link href="/login">
                <button className="px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all border border-white/20 text-white hover:bg-white/10 active:scale-95">
                  Portal Login
                </button>
              </Link>
              <Link href="/contact">
                <button className={`px-5 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all shadow-xl hover:-translate-y-0.5 active:scale-95 flex items-center gap-2 bg-white ${isScrolled ? 'shadow-white/10' : 'shadow-black/5'} ${isAboutPage ? 'text-[#6345ED]' : isEventsPage ? 'text-[#1a1045]' : 'text-brand-blue'}`}>
                  Enquire Now
                </button>
              </Link>
            </div>

            {/* Mobile Actions */}
            <div className="flex lg:hidden items-center gap-4">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-white bg-white/10 rounded-lg border border-white/20"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full h-[calc(100vh-80px)] overflow-y-auto bg-white border-t border-neutral-100 p-8 shadow-2xl z-50 animate-fade-in-up">
            <div className="flex flex-col gap-6">
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
                    <Link
                      href={item.path}
                      className="text-sm font-bold uppercase tracking-widest text-neutral-600 hover:text-brand-blue transition-colors"
                      onClick={() => !item.hasDropdown && setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                    {item.hasDropdown && (
                      <button onClick={() => setStudyDropdown(!studyDropdown)} className="p-2 -mr-2 text-neutral-500 hover:text-brand-blue transition-colors bg-neutral-50 rounded-lg">
                        <svg className={`w-4 h-4 transition-transform duration-300 ${studyDropdown ? 'rotate-180 text-brand-blue' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"></path>
                        </svg>
                      </button>
                    )}
                  </div>

                  {item.hasDropdown && studyDropdown && (
                    <div className="mt-4 pl-4 py-2 border-l-2 border-brand-orange/30 flex flex-col gap-5 animate-slide-up-fade">
                      {[
                        { name: 'Global University Admissions', path: '/services#demo-s1' },
                        { name: 'Immigration & Visa Processing', path: '/services#demo-s2' },
                        { name: 'Scholarship & Financial Aid', path: '/services#demo-s3' },
                        { name: 'Premium Pre-Departure Suite', path: '/services#demo-s4' },
                        { name: 'Post-Arrival Concierge Suite', path: '/services#demo-s5' }
                      ].map((subItem, idx) => (
                        <Link
                          key={idx}
                          href={subItem.path}
                          onClick={() => setIsOpen(false)}
                          className="text-[11px] font-bold uppercase tracking-widest text-neutral-500 hover:text-brand-blue transition-colors"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}


              <Link href="/contact" onClick={() => setIsOpen(false)}>
                <button className="w-full bg-brand-blue text-white py-4 rounded-xl text-xs font-bold uppercase tracking-widest shadow-xl shadow-brand-blue/20 hover:bg-brand-blue-dark transition-colors">
                  Enquire Now
                </button>
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Sidebar Panel */}
      {sidebarOpen && (
        <>
          <div className="fixed inset-0 bg-neutral-900/60 backdrop-blur-sm z-[100] animate-fade-in" onClick={() => setSidebarOpen(false)} />
          <div className="fixed right-0 top-0 h-full w-80 md:w-96 bg-white z-[110] shadow-2xl p-10 animate-slide-left overflow-y-auto">
            <button onClick={() => setSidebarOpen(false)} className="absolute top-6 right-6 text-neutral-400 hover:text-neutral-900 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>

            <div className="mt-8">
              <h2 className="text-2xl font-black tracking-tighter mb-6">WORLD PASSPORT</h2>
              <p className="text-neutral-500 leading-relaxed mb-10 text-base">
                Empowering students to reach their global potential through trusted institutional partnerships and strategic academic guidance.
              </p>

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

              <div className="mt-12 flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg></a>
                <a href="#" className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center hover:bg-blue-400 hover:text-white transition-all"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" /></svg></a>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
