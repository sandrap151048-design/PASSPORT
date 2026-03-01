export default function InfoBanner() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-red-600 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <div className="text-center animate-fade-in">
            <h2 className="text-3xl font-bold text-white mb-2 uppercase tracking-tight">
              Shaping Global Careers Through Quality Education
            </h2>
            <p className="text-lg opacity-90 font-medium">Creating Great Opportunities</p>
          </div>
        </div>
      </div>
    </section>
  )
}
