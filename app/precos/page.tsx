'use client'

import { useState, useEffect } from 'react'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import WhatsAppFloat from '@/app/components/WhatsAppFloat'
import PricingCard from '@/app/components/PricingCard'
import { Settings } from 'lucide-react'
import Link from 'next/link'

// Tipos para os dados de preços
interface PricingData {
  instagram: {
    mundial: number
    brasileiro: number
  }
  tiktok: {
    mundial: number
    brasileiro: number
    curtidas: number
    visualizacoes: number
  }
  youtube: {
    inscricoes: number
    visualizacoes: number
    curtidas: number
  }
  kwai: {
    seguidores: number
    curtidas: number
  }
  facebook: {
    seguidores: number
    curtidas: number
  }
}

// Dados padrão
const defaultPricing: PricingData = {
  instagram: {
    mundial: 26, // preço para 1000 seguidores mundiais
    brasileiro: 45 // preço para 1000 seguidores brasileiros
  },
  tiktok: {
    mundial: 18, // preço para 1000 seguidores mundiais
    brasileiro: 30, // preço para 1000 seguidores brasileiros
    curtidas: 15, // preço para 1000 curtidas
    visualizacoes: 15 // preço para 1000 visualizações
  },
  youtube: {
    inscricoes: 35, // preço para 1000 inscrições
    visualizacoes: 12, // preço para 1000 visualizações
    curtidas: 18 // preço para 1000 curtidas
  },
  kwai: {
    seguidores: 25, // preço para 1000 seguidores
    curtidas: 12 // preço para 1000 curtidas
  },
  facebook: {
    seguidores: 28, // preço para 1000 seguidores
    curtidas: 10 // preço para 1000 curtidas
  }
}

export default function PrecosPage() {
  const [pricing, setPricing] = useState<PricingData>(defaultPricing)

  useEffect(() => {
    // Carregar dados do localStorage
    const savedPricing = localStorage.getItem('hypefy-pricing')
    if (savedPricing) {
      setPricing(JSON.parse(savedPricing))
    }
  }, [])

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Nossos <span className="text-[#ffa800]">Preços</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Escolha o pacote ideal para impulsionar suas redes sociais com os melhores preços do mercado
            </p>
            
            {/* Link para admin */}
            <Link 
              href="/precos/admin"
              className="inline-flex items-center gap-2 mt-6 text-gray-500 hover:text-[#ffa800] transition-colors text-xs"
            >
              <Settings size={16} />
              <span>Admin</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
            
            {/* Instagram */}
            <PricingCard
              platform="Instagram"
              icon="📷"
              color="from-pink-500 to-purple-600"
              services={[
                {
                  name: "Seguidores Mundiais",
                  type: "seguidores",
                  quality: "Qualidade Boa",
                  priceFor1000: pricing.instagram.mundial,
                  whatsappMessage: "seguidores mundiais para Instagram"
                },
                {
                  name: "Seguidores Brasileiros",
                  type: "seguidores",
                  quality: "Qualidade Premium",
                  priceFor1000: pricing.instagram.brasileiro,
                  whatsappMessage: "seguidores brasileiros para Instagram"
                }
              ]}
            />

            {/* TikTok */}
            <PricingCard
              platform="TikTok"
              icon="🎵"
              color="from-black to-gray-800"
              services={[
                {
                  name: "Seguidores Mundiais",
                  type: "seguidores",
                  quality: "Qualidade Boa",
                  priceFor1000: pricing.tiktok.mundial,
                  whatsappMessage: "seguidores mundiais para TikTok"
                },
                {
                  name: "Seguidores Brasileiros",
                  type: "seguidores",
                  quality: "Qualidade Premium",
                  priceFor1000: pricing.tiktok.brasileiro,
                  whatsappMessage: "seguidores brasileiros para TikTok"
                },
                {
                  name: "Curtidas",
                  type: "curtidas",
                  quality: "Qualidade Premium",
                  priceFor1000: pricing.tiktok.curtidas,
                  whatsappMessage: "curtidas para TikTok"
                },
                {
                  name: "Visualizações",
                  type: "visualizações",
                  quality: "Qualidade Premium",
                  priceFor1000: pricing.tiktok.visualizacoes,
                  whatsappMessage: "visualizações para TikTok"
                }
              ]}
            />

            {/* YouTube */}
            <PricingCard
              platform="YouTube"
              icon="📺"
              color="from-red-500 to-red-600"
              services={[
                {
                  name: "Inscrições",
                  type: "inscrições",
                  quality: "Qualidade Premium",
                  priceFor1000: pricing.youtube.inscricoes,
                  whatsappMessage: "inscrições para YouTube"
                },
                {
                  name: "Visualizações",
                  type: "visualizações",
                  quality: "Qualidade Premium",
                  priceFor1000: pricing.youtube.visualizacoes,
                  whatsappMessage: "visualizações para YouTube"
                },
                {
                  name: "Curtidas",
                  type: "curtidas",
                  quality: "Qualidade Premium",
                  priceFor1000: pricing.youtube.curtidas,
                  whatsappMessage: "curtidas para YouTube"
                }
              ]}
            />

            {/* Kwai */}
            <PricingCard
              platform="Kwai"
              icon="🎬"
              color="from-orange-500 to-yellow-500"
              services={[
                {
                  name: "Seguidores",
                  type: "seguidores",
                  quality: "Qualidade Premium",
                  priceFor1000: pricing.kwai.seguidores,
                  whatsappMessage: "seguidores para Kwai"
                },
                {
                  name: "Curtidas",
                  type: "curtidas",
                  quality: "Qualidade Premium",
                  priceFor1000: pricing.kwai.curtidas,
                  whatsappMessage: "curtidas para Kwai"
                }
              ]}
            />

            {/* Facebook */}
            <PricingCard
              platform="Facebook"
              icon="👥"
              color="from-blue-600 to-blue-700"
              services={[
                {
                  name: "Seguidores",
                  type: "seguidores",
                  quality: "Qualidade Premium",
                  priceFor1000: pricing.facebook.seguidores,
                  whatsappMessage: "seguidores para Facebook"
                },
                {
                  name: "Curtidas",
                  type: "curtidas",
                  quality: "Qualidade Premium",
                  priceFor1000: pricing.facebook.curtidas,
                  whatsappMessage: "curtidas para Facebook"
                }
              ]}
            />
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
    </main>
  )
}