'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, CheckCircle2, MessageCircle, Users } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-sm z-50">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-[#2c2c2c] text-xl font-bold">
            Logo
          </Link>
          <div className="space-x-4">
            <Button variant="ghost" asChild>
              <Link href="/login">Entrar</Link>
            </Button>
            <Button className="bg-[#fbc94c] text-[#2c2c2c] hover:bg-[#fbc94c]/90" asChild>
              <Link href="/register">Criar conta</Link>
            </Button>
          </div>
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <section className="h-screen flex items-center justify-center bg-gradient-to-b from-[#fbc94c]/10 to-white">
          <div className="text-center space-y-6">
            <motion.h1 
              className="text-5xl font-bold text-[#2c2c2c]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Transforme suas ideias em realidade
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              A Hype Fy ajuda a aumentar sua presença online com seguidores e curtidas para Instagram, YouTube, TikTok e Kwai. 
              Mais visibilidade e engajamento para o seu perfil!
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Button 
                size="lg" 
                className="bg-[#fbc94c] text-[#2c2c2c] hover:bg-[#fbc94c]/90"
                asChild
              >
                <Link href="/login">
                  Começar <ArrowRight className="ml-2" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-20 bg-white" id="about">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-[#2c2c2c] mb-12">Sobre Nós</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center space-y-4">
                <Users className="w-12 h-12 mx-auto text-[#fbc94c]" />
                <h3 className="text-xl font-semibold">Nossa Missão</h3>
                <p className="text-gray-600">Ajudar pessoas a alcançarem seus objetivos através de soluções inovadoras</p>
              </div>
              <div className="text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 mx-auto text-[#fbc94c]" />
                <h3 className="text-xl font-semibold">Nossos Valores</h3>
                <p className="text-gray-600">Comprometimento, inovação e excelência em tudo que fazemos</p>
              </div>
              <div className="text-center space-y-4">
                <MessageCircle className="w-12 h-12 mx-auto text-[#fbc94c]" />
                <h3 className="text-xl font-semibold">Nossa Visão</h3>
                <p className="text-gray-600">Ser referência em soluções que transformam vidas</p>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 bg-[#fbc94c]/10" id="services">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-[#2c2c2c] mb-12">Nossos Serviços</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((item) => (
                <div key={item} className="bg-white p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold mb-4">Serviço {item}</h3>
                  <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-white" id="faq">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-[#2c2c2c] mb-12">Perguntas Frequentes</h2>
            <div className="max-w-3xl mx-auto space-y-6">
              {[1, 2, 3].map((item) => (
                <div key={item} className="border-b border-gray-200 pb-6">
                  <h3 className="text-xl font-semibold mb-2">Pergunta {item}?</h3>
                  <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-[#fbc94c]/10" id="testimonials">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-[#2c2c2c] mb-12">Feedbacks</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((item) => (
                <div key={item} className="bg-white p-6 rounded-lg shadow-lg">
                  <p className="text-gray-600 mb-4">"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."</p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                    <div className="ml-4">
                      <p className="font-semibold">Cliente {item}</p>
                      <p className="text-sm text-gray-500">Empresa {item}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#2c2c2c] text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Sua Empresa. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  )
}