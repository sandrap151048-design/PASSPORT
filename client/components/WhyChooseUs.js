import Image from 'next/image'

export default function WhyChooseUs() {
  const features = [
    {
      icon: (
        <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 18c-3.86-.93-7-5.43-7-10V8.3l7-3.11 7 3.11V10c0 4.57-3.14 9.07-7 10z" />
          <path d="M9.5 11L8 12.5l3 3 5-5L14.5 9l-3.5 3.5z" />
        </svg>
      ),
      title: "Global University Partnerships",
      description: "We collaborate with trusted international universities across multiple destinations, offering students globally recognized education and strong career opportunities."
    },
    {
      icon: (
        <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          <path d="M19 8h-2v3h-3v2h3v3h2v-3h3v-2h-3z" />
        </svg>
      ),
      title: "Personalized Student Guidance",
      description: "Our expert counselors provide tailored advice on country, course, and career choices, helping students make confident decisions for their future."
    },
    {
      icon: (
        <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
          <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z" />
        </svg>
      ),
      title: "End-to-End Support",
      description: "From application to visa processing and post-arrival assistance, we provide complete support throughout your study abroad journey."
    },
    {
      icon: (
        <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
        </svg>
      ),
      title: "Transparent Process",
      description: "We maintain complete transparency in our counseling, application process, and fee structure, ensuring you have clarity at every step."
    }
  ]

  return (
    <section className="py-32 overflow-hidden" style={{ background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 40%, #e0f2fe 100%)' }}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 animate-slide-in-left">
            <h2 className="text-5xl lg:text-6xl font-black mb-10 leading-[0.9] uppercase tracking-tighter text-gray-900">
              WHY CHOOSE <br />
              <span className="italic font-light text-blue-500">PASSPORT EDGE?</span>
            </h2>
            <p className="text-gray-600 text-xl mb-14 max-w-xl leading-relaxed">
              Technical precision in academic mobility. We engineer your global transition with trusted partnerships and strategic counseling.
            </p>

            <div className="grid sm:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="group p-8 bg-white/70 backdrop-blur-sm rounded-2xl hover:bg-white transition-all duration-500 border border-blue-100 shadow-sm hover:shadow-md">
                  <div className="mb-6 text-blue-500 group-hover:scale-110 transition-transform duration-500">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3 uppercase tracking-tight">{feature.title}</h3>
                  <p className="text-gray-500 text-base leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:w-1/2 relative animate-slide-in-right h-[500px] w-full">
            <div className="relative h-full w-full overflow-hidden rounded-3xl shadow-2xl transition-all duration-1000 border border-white/10">
              <Image
                src="/images/why-choose-us.jpg"
                alt="Global Education"
                fill
                className="object-cover hover:scale-105 transition-transform duration-[2000ms]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
