'use client'

import { ExternalLink } from 'lucide-react'

import Image from 'next/image'

import ImageChatGpt from '@/public/images/fundo-chat-gpt.png'
import ImageCanva from '@/public/images/fundo-canva.png'
import ImageCapCut from '@/public/images/fundo-cap-cut.webp'
import ImageNetflix from '@/public/images/fundo-netflix.webp'
import ImageCrunchyroll from '@/public/images/fundo-crunchyroll.webp'
import Seguidores from '@/public/images/engajamento.png'

const services = [
  {
    title: 'CHAT GPT POR UM MÊS',
    price: 'R$ 20,00',
    image: ImageChatGpt,
    features: [
      'Útil para programadores e empresas',
      'Para criação de imagens',
      'Utilizado para estudo',
      'Conta compartilhada'
    ],
    buyLink: 'https://pay.cakto.com.br/3627vxe_425199'
  },
  {
    title: 'CANVA POR UM ANO',
    price: 'R$ 29,90',
    image: ImageCanva,
    features: [
      'Acesso por um ano',
      'Acesso diretamente no seu e-mail',
      'Todos os recursos premium liberado',
      'Com privacidade'
    ],
    buyLink: 'https://pay.cakto.com.br/ks35m3b_425403'
  },
  {
    title: 'CAP CUT POR UM MÊS',
    price: 'R$ 15,00',
    image: ImageCapCut,
    features: [
      'Edite seus vídeos com ferramentas pro',
      'Compatível com Android, iOS e PC',
      'Você recebe um e-mail e a senha',
      'Tenha o acesso por um mês'
    ],
    buyLink: '#'
  },
  {
    title: 'NETFLIX POR UM MÊS',
    price: 'R$ 15,00',
    image: ImageNetflix,
    features: [
      'Assista suas séries e filmes preferidos',
      'Conta compartilhada',
      'Pague menos e aproveite muito',
      'Tenha o acesso por um mês'
    ],
    buyLink: '#'
  },
  {
    title: 'CRUNCHYROLL POR UM MÊS',
    price: 'R$ 10,00',
    image: ImageCrunchyroll,
    features: [
      'Assista seus anime preferido',
      'Conta compartilhada',
      'Pague menos e aproveite muito',
      'Tenha o acesso por um mês'
    ],
    buyLink: '#'
  },
  {
    title: 'SERVIÇOS DE ENGAJAMENTO',
    price: 'CHAME NO WHATSAPP PARA SABER OS VALORES',
    image: Seguidores,
    features: [
      'Seguidores, curtidas e visualizações',
      'Tiktok, Instagram, YouTube, Kwai, Facebook',
      'Me chame no whatsapp para mais informações',
      'Só clicar no botão comprar'
    ],
    buyLink: '#'
  }
]

export default function Services() {
  return (
    <section id="servicos" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Nossos Serviços
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#ffa800] to-[#ff8c00] mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-[#ffa800]/20 transform hover:-translate-y-2"
            >
              <div className="relative overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  width={500}
                  height={300}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
                <div className="absolute top-4 right-4 bg-[#ffa800] text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {service.price}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 group-hover:text-[#ffa800] transition-colors duration-300">
                  {service.title}
                </h3>

                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-gray-600">
                      <div className="w-2 h-2 bg-[#ffa800] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button onClick={() => window.open(service.buyLink, '_blank')} className="w-full bg-gradient-to-r from-[#ffa800] to-[#ff8c00] text-white py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 group">
                  Comprar
                  <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}