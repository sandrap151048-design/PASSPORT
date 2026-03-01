import Image from 'next/image'

export default function About() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16">

          {/* Left - Text Content */}
          <div className="lg:w-1/2 animate-slide-in-left">
            <div className="inline-block px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-bold tracking-widest uppercase mb-6">
              Our Legacy
            </div>
            <h2 className="text-4xl lg:text-5xl font-black text-neutral-900 leading-tight mb-8">
              WORLD PASSPORT: <br />
              <span className="text-blue-600 italic font-light">Architecting Careers</span>
            </h2>
            <p className="text-lg text-neutral-600 leading-relaxed mb-10">
              Empowering students with trusted guidance and global university partnerships.
              From selection to settlement, we architect transparent, career-focused journeys.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="p-6 bg-white rounded-2xl border border-blue-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="font-bold text-neutral-900 mb-2">Integrity First</h4>
                <p className="text-base text-neutral-500">Transparent and ethical counseling workflows.</p>
              </div>
              <div className="p-6 bg-white rounded-2xl border border-blue-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                  </svg>
                </div>
                <h4 className="font-bold text-neutral-900 mb-2">Global Edge</h4>
                <p className="text-base text-neutral-500">Access to high-frequency mobility networks.</p>
              </div>
            </div>
          </div>

          {/* Right - Image using a proper sized wrapper */}
          <div className="lg:w-1/2 animate-slide-in-right">
            <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-1000" style={{ aspectRatio: '1 / 1' }}>
              <Image
                src="/images/about-hero-new.png"
                alt="About World Passport"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover hover:scale-105 transition-transform duration-[2000ms]"
                priority
              />
            </div>
            {/* Floating badge */}
            <div className="flex items-center gap-4 mt-4 bg-white border border-blue-100 rounded-2xl shadow-md p-4 w-fit">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <div>
                <span className="text-3xl font-black text-blue-600 block leading-none">15+</span>
                <p className="text-sm font-bold text-neutral-400 uppercase tracking-widest mt-1">Years of Excellence</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
