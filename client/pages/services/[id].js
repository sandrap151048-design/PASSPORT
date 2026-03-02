import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import api from '../../utils/api'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import Image from 'next/image'
import Link from 'next/link'

export default function ServiceDetail() {
    const router = useRouter()
    const { id } = router.query
    const [service, setService] = useState(null)
    const [allServices, setAllServices] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!id) return

        const fetchData = async () => {
            try {
                const [serviceRes, allRes] = await Promise.all([
                    api.get(`/services/${id}`),
                    api.get('/services')
                ])
                setService(serviceRes.data)
                setAllServices(allRes.data)
            } catch (err) {
                console.error('Error fetching service:', err)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [id])

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-brand-blue border-t-transparent rounded-full animate-spin"></div>
            </div>
        )
    }

    if (!service) {
        return (
            <div className="min-h-screen bg-white">
                <Navbar />
                <div className="container mx-auto px-4 py-32 text-center">
                    <h1 className="text-4xl font-black mb-4">SERVICE NOT FOUND</h1>
                    <Link href="/services" className="text-brand-blue font-bold uppercase tracking-widest text-xs underline">Back to Services</Link>
                </div>
                <Footer />
            </div>
        )
    }

    const currentIndex = allServices.findIndex(s => s._id === service._id)
    const prevService = currentIndex > 0 ? allServices[currentIndex - 1] : null
    const nextService = currentIndex < allServices.length - 1 ? allServices[currentIndex + 1] : null

    return (
        <div className="min-h-screen bg-white font-sans text-neutral-900 selection:bg-brand-blue selection:text-white uppercase">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-24 overflow-hidden bg-brand-blue-dark">
                <div className="absolute inset-0 opacity-20">
                    <Image
                        src={service.imageUrl || '/images/hero-1.jpg'}
                        alt={service.title}
                        fill
                        className="object-cover grayscale"
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-brand-blue-dark via-brand-blue-dark/80 to-transparent"></div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl">
                        <span className="inline-block px-4 py-1.5 mb-6 text-[10px] font-bold tracking-[0.4em] text-brand-orange uppercase bg-white/10 backdrop-blur-md border border-white/20 rounded-full">
                            Premium Module 0{currentIndex + 1}
                        </span>
                        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-none mb-6">
                            {service.title}
                        </h1>
                        <p className="text-lg md:text-xl text-white/60 font-light max-w-2xl leading-relaxed normal-case">
                            {service.description}
                        </p>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/* Features List */}
                        <div className="animate-slide-up-fade">
                            <h2 className="text-2xl font-black mb-10 tracking-tight flex items-center gap-4">
                                <span className="w-8 h-px bg-brand-orange"></span>
                                CORE FEATURES
                            </h2>
                            <div className="grid gap-6">
                                {(service.features || []).map((feature, i) => (
                                    <div key={i} className="group p-6 bg-neutral-50 border border-neutral-100 rounded-3xl hover:bg-white hover:shadow-2xl hover:shadow-brand-blue/5 transition-all duration-500 flex items-start gap-5">
                                        <div className="w-10 h-10 bg-brand-blue text-white rounded-xl flex items-center justify-center shrink-0 font-black text-xs">
                                            {i + 1}
                                        </div>
                                        <div className="normal-case">
                                            <h3 className="font-black text-neutral-900 mb-1 tracking-tight text-sm uppercase">{feature}</h3>
                                            <p className="text-neutral-500 text-[11px] font-medium leading-relaxed">Systematic execution and strategic oversight for optimized results.</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Visual Panel */}
                        <div className="relative aspect-square rounded-[3rem] overflow-hidden group animate-slide-up-fade" style={{ animationDelay: '200ms' }}>
                            <Image
                                src={service.imageUrl || '/images/hero-1.jpg'}
                                alt={service.title}
                                fill
                                className="object-cover transition-all duration-1000 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-tr from-brand-blue-dark/40 to-transparent"></div>

                            {/* Floating Stat */}
                            <div className="absolute bottom-8 left-8 right-8 bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-[2rem] text-white">
                                <p className="text-[10px] font-bold tracking-[0.3em] opacity-60 mb-2 uppercase">Success Framework</p>
                                <p className="text-2xl font-black tracking-tighter">98.4% CLIENT SATISFACTION</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* One by One Navigation */}
            <section className="py-24 border-t border-neutral-100 bg-neutral-50/50">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-12">

                        {/* Prev */}
                        {prevService ? (
                            <Link href={`/services/${prevService._id}`} className="group flex items-center gap-6 text-left w-full md:w-auto">
                                <div className="w-16 h-16 rounded-2xl bg-white border border-neutral-200 flex items-center justify-center group-hover:bg-brand-blue group-hover:text-white transition-all shadow-xl shadow-neutral-200/50">
                                    <svg className="w-6 h-6 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                </div>
                                <div>
                                    <p className="text-[9px] font-black tracking-[0.3em] text-neutral-400 mb-1 uppercase">Previous Service</p>
                                    <p className="font-black text-lg tracking-tight group-hover:text-brand-blue transition-colors">{prevService.title}</p>
                                </div>
                            </Link>
                        ) : <div className="hidden md:block w-64" />}

                        {/* indicator */}
                        <div className="flex gap-2">
                            {allServices.map((_, i) => (
                                <div key={i} className={`w-8 h-1.5 rounded-full transition-all duration-500 ${i === currentIndex ? 'bg-brand-orange w-12' : 'bg-neutral-200'}`} />
                            ))}
                        </div>

                        {/* Next */}
                        {nextService ? (
                            <Link href={`/services/${nextService._id}`} className="group flex items-center gap-6 text-right w-full md:w-auto justify-end">
                                <div>
                                    <p className="text-[9px] font-black tracking-[0.3em] text-neutral-400 mb-1 uppercase">Next Service</p>
                                    <p className="font-black text-lg tracking-tight group-hover:text-brand-blue transition-colors">{nextService.title}</p>
                                </div>
                                <div className="w-16 h-16 rounded-2xl bg-white border border-neutral-200 flex items-center justify-center group-hover:bg-brand-blue group-hover:text-white transition-all shadow-xl shadow-neutral-200/50">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                </div>
                            </Link>
                        ) : (
                            <Link href="/services" className="group flex items-center gap-6 text-right w-full md:w-auto justify-end">
                                <div>
                                    <p className="text-[9px] font-black tracking-[0.3em] text-neutral-400 mb-1 uppercase">Return to</p>
                                    <p className="font-black text-lg tracking-tight group-hover:text-brand-blue transition-colors">ALL SERVICES</p>
                                </div>
                                <div className="w-16 h-16 rounded-2xl bg-white border border-neutral-200 flex items-center justify-center group-hover:bg-brand-orange group-hover:text-white transition-all shadow-xl shadow-neutral-200/50">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                                </div>
                            </Link>
                        )}

                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}
