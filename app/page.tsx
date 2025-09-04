'use client'

import Header from '@/app/components/Header'
import Hero from '@/app/components/Hero'
import Services from '@/app/components/Services'
import Testimonials from '@/app/components/Testimonials'
import WhatsAppFloat from '@/app/components/WhatsAppFloat'
import About from './components/About'
import FAQ from './components/FAQ'
import Footer from './components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Services />
      <Testimonials />
      <About />
      <FAQ />
      <Footer />
      <WhatsAppFloat />
    </main>
  )
}