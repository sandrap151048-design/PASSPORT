import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import InfoBanner from '../components/InfoBanner'
import About from '../components/About'
import WhyChooseUs from '../components/WhyChooseUs'
import Stats from '../components/Stats'
import Services from '../components/Services'
import Destinations from '../components/Destinations'
import Testimonials from '../components/Testimonials'
import ConsultationForm from '../components/ConsultationForm'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <InfoBanner />
      <About />
      <WhyChooseUs />
      <Stats />
      <Services />
      <Destinations />
      <Testimonials />
      <ConsultationForm />
      <Footer />
    </div>
  )
}
