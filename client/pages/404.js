import Link from 'next/link'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Custom404() {
    return (
        <div className="min-h-screen bg-white flex flex-col">
            <Navbar />

            <main className="flex-grow flex items-center justify-center relative overflow-hidden pt-20">
                {/* Animated Background Elements */}
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-brand-blue/5 rounded-full blur-3xl animate-pulse-slow"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-orange/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>

                <div className="container mx-auto px-4 text-center relative z-10">
                    <div className="animate-fade-in-up">
                        <h1 className="text-[12rem] md:text-[18rem] font-black text-brand-blue/10 leading-none select-none tracking-tighter">
                            404
                        </h1>

                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
                            <h2 className="text-4xl md:text-6xl font-black text-neutral-900 mb-6 uppercase tracking-tighter">
                                Lost in <span className="text-brand-orange">Transit?</span>
                            </h2>
                            <p className="text-xl text-neutral-500 max-w-lg mx-auto mb-10 font-medium">
                                The gateway you're looking for seems to have moved or doesn't exist in our global database.
                            </p>

                            <div className="flex flex-wrap justify-center gap-4">
                                <Link href="/">
                                    <button className="bg-brand-blue text-white px-10 py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-brand-blue-dark transition-all transform hover:scale-105 shadow-2xl hover:shadow-brand-blue/20">
                                        Return to Reality
                                    </button>
                                </Link>
                                <Link href="/contact">
                                    <button className="bg-transparent border-2 border-neutral-200 text-neutral-600 px-10 py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-neutral-50 transition-all transform hover:scale-105">
                                        Help Me Find It
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Decorative Plane Animation */}
                    <div className="mt-72 md:mt-96 opacity-20 relative h-20">
                        <div className="absolute left-0 animate-fly-across flex items-center gap-4">
                            <div className="w-40 h-px bg-dash-border"></div>
                            <svg className="w-8 h-8 text-brand-blue transform rotate-90" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />

            <style jsx>{`
        @keyframes fly-across {
          0% { left: -10%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { left: 110%; opacity: 0; }
        }
        .animate-fly-across {
          animation: fly-across 8s linear infinite;
        }
        .bg-dash-border {
          background-image: linear-gradient(to right, #2563eb 50%, transparent 50%);
          background-size: 10px 1px;
          background-repeat: repeat-x;
        }
      `}</style>
        </div>
    )
}
