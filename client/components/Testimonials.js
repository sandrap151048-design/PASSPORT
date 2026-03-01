export default function Testimonials() {
  const testimonials = [
    {
      name: 'Priya Sharma',
      country: 'Malta',
      text: 'World Passport guided me through every step of my application. From course selection to visa approval, the process was smooth and stress-free.',
      rating: 5
    },
    {
      name: 'Rahul Kumar',
      country: 'Malaysia',
      text: 'I am grateful to World Passport for their transparent guidance. Their counseling helped me choose the right country and course for my career aspirations.',
      rating: 5
    },
    {
      name: 'Anita Patel',
      country: 'New Zealand',
      text: 'From admission to accommodation, World Passport provided complete support. Their team ensured my transition abroad was comfortable and filled with confidence.',
      rating: 5
    }
  ]

  return (
    <section className="py-24 bg-neutral-50 uppercase overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-end justify-between mb-4 gap-4 animate-fade-in-up">
          <div className="max-w-xl">
            <p className="text-blue-600 text-xs font-bold mb-2 tracking-[0.4em] uppercase">Student Voices</p>
            <h2 className="shrunk-title text-neutral-900 mb-0">SUCCESS <br /><span className="italic font-light text-neutral-400">ARCHIVES</span></h2>
          </div>
          <p className="max-w-xs text-neutral-500 shrunk-text normal-case">Verified migration outcomes from our global academic network nodes.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-white p-8 border border-neutral-100 hover:shadow-lg transition-all duration-700 animate-fade-in-up"
              style={{ animationDelay: `${i * 200}ms` }}
            >
              <div className="p-0">
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, starIndex) => (
                    <svg key={starIndex} className="w-2 h-2 text-orange-500 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                  ))}
                </div>
                <p className="text-neutral-600 shrunk-text mb-3 italic normal-case leading-snug">"{t.text}"</p>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-black uppercase">{t.name[0]}</div>
                  <div>
                    <p className="text-sm font-black text-neutral-900 leading-none uppercase">{t.name}</p>
                    <p className="text-xs text-blue-600 font-bold uppercase tracking-widest">{t.country}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
