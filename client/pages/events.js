import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import EventCarousel from '../components/EventCarousel'

export default function Events() {
    return (
        <div className="min-h-screen bg-white font-sans text-neutral-900 selection:bg-red-50">
            <Navbar />

            {/* Premium Hero Section with Curve */}
            <section className="relative pt-40 pb-32 md:pb-48 overflow-hidden bg-[#1a1045]">
                {/* Decorative Elements */}
                <div className="absolute top-20 left-10 w-4 h-4 text-white/40 animate-pulse">
                    <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 0l3.09 8.91H24L16.91 14.5 19.91 24 12 18.18 4.09 24l3-9.5L0 8.91h8.91L12 0z" /></svg>
                </div>
                <div className="absolute top-40 right-10 w-5 h-5 text-white/30 animate-bounce">
                    <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 0l3.09 8.91H24L16.91 14.5 19.91 24 12 18.18 4.09 24l3-9.5L0 8.91h8.91L12 0z" /></svg>
                </div>

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <div className="max-w-4xl mx-auto animate-fade-in-up">
                        <span className="inline-block px-4 py-1.5 mb-8 text-[10px] font-bold tracking-[0.4em] text-white uppercase bg-white/10 backdrop-blur-md border border-white/20 rounded-full">
                            Global Education Protocol
                        </span>
                        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-[1.1] mb-8 uppercase">
                            Upcoming <span className="text-orange-500 italic">Events.</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-blue-50/90 font-light mb-12 normal-case max-w-3xl mx-auto leading-relaxed">
                            Experience the future of international education. Connect with global university leaders through our exclusive virtual and physical engagement protocols.
                        </p>
                    </div>
                </div>

                {/* The Curve SVG */}
                <div className="absolute -bottom-1 left-0 w-full overflow-hidden leading-none z-10 translate-y-[1px]">
                    <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-[60px] md:h-[100px] lg:h-[150px] preserve-3d scale-x-105">
                        <path d="M1440 120H0V48C0 48 360 0 720 0C1080 0 1440 48 1440 48V120Z" fill="white" />
                    </svg>
                </div>
            </section>

            {/* Carousel Section */}
            <section className="py-24 bg-white relative -mt-32 md:-mt-48 z-20">
                <EventCarousel />
            </section>

            {/* Additional Events Grid / Info */}
            <section className="py-24 bg-neutral-50 relative overflow-hidden">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="flex flex-col lg:flex-row items-end justify-between mb-16 gap-8">
                        <div className="max-w-2xl text-left">
                            <span className="text-blue-600 font-bold text-[10px] uppercase tracking-[0.4em] mb-4 block">Event Logistics</span>
                            <h2 className="text-3xl md:text-5xl font-black text-[#1a1045] mb-0 leading-none tracking-tight uppercase">
                                WHY JOIN OUR <br />
                                <span className="italic font-light text-neutral-400 normal-case tracking-normal">Engagements?</span>
                            </h2>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Direct Access",
                                desc: "bypass traditional gatekeepers and speak directly with official university admission directors.",
                                icon: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"
                            },
                            {
                                title: "Priority Admission",
                                desc: "Certain events offer on-the-spot application fee waivers and priority processing pathways.",
                                icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                            },
                            {
                                title: "Scholarship Maps",
                                desc: "Discover hidden scholarship opportunities and detailed funding protocols for 2026/27.",
                                icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            }
                        ].map((item, idx) => (
                            <div key={idx} className="p-10 bg-white border border-neutral-100 rounded-[2rem] hover:shadow-xl transition-all group">
                                <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d={item.icon} />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-bold text-[#1a1045] mb-4 uppercase tracking-tight">{item.title}</h3>
                                <p className="text-neutral-500 text-sm leading-relaxed normal-case font-medium">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}
