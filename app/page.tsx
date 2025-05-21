'use client'

import { useState } from 'react'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'
import { faqs, socialServices, testimonials } from '@/lib/home-page-variable'
import { ArrowRight, ChevronDown, Facebook, Instagram, Phone } from 'lucide-react'

import 'swiper/css'
import 'swiper/css/autoplay'
import 'swiper/css/pagination'

import Link from 'next/link'

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      <header className="fixed top-0 w-full bg-[#1a1a1a]/80 backdrop-blur-sm z-50 border-b border-gray-800">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-white text-xl font-bold">
            Hype Fy
          </Link>
          <div className="space-x-4">
            <Button variant="ghost" className="text-white hover:text-[#fbc94c]" asChild>
              <Link href="/login">Entrar</Link>
            </Button>
            <Button className="bg-[#fbc94c] text-[#1a1a1a] hover:bg-[#fbc94c]/90" asChild>
              <Link href="/register">Criar conta</Link>
            </Button>
          </div>
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center bg-[#1a1a1a] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#fbc94c]/10 to-transparent pointer-events-none" />
          <div className="text-center space-y-8 relative z-10 px-4">
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Potencialize sua presença digital
            </motion.h1>
            <motion.p 
              className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Aumente seu alcance e engajamento nas redes sociais com a Hype Fy.
              Seguidores reais, curtidas e visualizações para impulsionar seu crescimento.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Button 
                size="lg" 
                className="bg-[#fbc94c] text-[#1a1a1a] hover:bg-[#fbc94c]/90 text-lg px-8"
                asChild
              >
                <Link href="/login">
                  Começar agora <ArrowRight className="ml-2" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 bg-[#222222]" id="services">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
              Nossos Serviços
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {socialServices.map((service, index) => (
                <motion.div
                  key={service.name}
                  className="bg-[#2a2a2a] rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="h-48 relative">
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2a2a2a] to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-2">{service.name}</h3>
                    <p className="text-gray-400 mb-4">{service.description}</p>
                    <ul className="space-y-2">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-center text-gray-300">
                          <span className="w-2 h-2 bg-[#fbc94c] rounded-full mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-[#1a1a1a]" id="faq">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
              Perguntas Frequentes
            </h2>
            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  className="bg-[#2a2a2a] rounded-xl overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <button
                    className="w-full p-6 text-left flex justify-between items-center"
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  >
                    <span className="text-lg font-medium text-white">{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#fbc94c] transition-transform ${
                        openFaq === index ? 'transform rotate-180' : ''
                      }`}
                    />
                  </button>
                  <motion.div
                    initial={false}
                    animate={{ height: openFaq === index ? 'auto' : 0 }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-6 text-gray-400">{faq.answer}</p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-[#222222]" id="testimonials">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
              O que dizem nossos clientes
            </h2>
            <div className="max-w-4xl mx-auto">
              <Swiper
                modules={[Pagination, Autoplay]}
                spaceBetween={30}
                slidesPerView={1}
                pagination={{ clickable: true }}
                autoplay={{ delay: 5000 }}
                className="pb-12"
              >
                {testimonials.map((testimonial, index) => (
                  <SwiperSlide key={index}>
                    <div className="bg-[#2a2a2a] rounded-xl p-8 shadow-xl">
                      <div className="flex items-center space-x-4 mb-6">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        <div>
                          <h3 className="text-xl font-semibold text-white">{testimonial.name}</h3>
                          <p className="text-[#fbc94c]">{testimonial.role}</p>
                        </div>
                      </div>
                      <p className="text-gray-300 text-lg">{testimonial.content}</p>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#1a1a1a] text-white py-16 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6">Hype Fy</h3>
              <p className="text-gray-400">
                Transformando sua presença digital com soluções inovadoras e resultados comprovados.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contato</h4>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-400">
                  <Phone className="w-5 h-5 mr-2 text-[#fbc94c]" />
                  <a href="https://wa.me/5511999999999" className="hover:text-[#fbc94c]">
                    +55 (11) 99999-9999
                  </a>
                </li>
                <li className="flex items-center text-gray-400">
                  <Instagram className="w-5 h-5 mr-2 text-[#fbc94c]" />
                  <a href="https://instagram.com/hypefy" className="hover:text-[#fbc94c]">
                    @hypefy
                  </a>
                </li>
                <li className="flex items-center text-gray-400">
                  <Facebook className="w-5 h-5 mr-2 text-[#fbc94c]" />
                  <a href="https://facebook.com/hypefy" className="hover:text-[#fbc94c]">
                    /hypefy
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Serviços</h4>
              <ul className="space-y-2">
                {socialServices.map((service) => (
                  <li key={service.name}>
                    <a href="#" className="text-gray-400 hover:text-[#fbc94c]">
                      {service.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Suporte</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#faq" className="text-gray-400 hover:text-[#fbc94c]">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-[#fbc94c]">
                    Política de Privacidade
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-[#fbc94c]">
                    Termos de Serviço
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; 2024 Hype Fy. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}