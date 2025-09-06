'use client'

import { useState, useEffect } from 'react'
import { Save, ArrowLeft, DollarSign } from 'lucide-react'
import Link from 'next/link'

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

const defaultPricing: PricingData = {
  instagram: {
    mundial: 26,
    brasileiro: 45
  },
  tiktok: {
    mundial: 18,
    brasileiro: 30,
    curtidas: 15,
    visualizacoes: 15
  },
  youtube: {
    inscricoes: 35,
    visualizacoes: 12,
    curtidas: 18
  },
  kwai: {
    seguidores: 25,
    curtidas: 12
  },
  facebook: {
    seguidores: 28,
    curtidas: 10
  }
}

export default function AdminPage() {
  const [pricing, setPricing] = useState<PricingData>(defaultPricing)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    // Carregar dados do localStorage
    const savedPricing = localStorage.getItem('hypefy-pricing')
    if (savedPricing) {
      setPricing(JSON.parse(savedPricing))
    }
  }, [])

  const handleSave = () => {
    localStorage.setItem('hypefy-pricing', JSON.stringify(pricing))
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const updatePrice = (platform: keyof PricingData, service: string, value: number) => {
    setPricing(prev => ({
      ...prev,
      [platform]: {
        ...prev[platform],
        [service]: value
      }
    }))
  }

  const PriceInput = ({ 
    label, 
    value, 
    onChange, 
    platform 
  }: { 
    label: string
    value: number
    onChange: (value: number) => void
    platform: string 
  }) => (
    <div className="bg-white p-4 rounded-lg border border-gray-200 hover:border-[#ffa800] transition-colors">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="relative">
        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffa800] focus:border-transparent"
          step="0.01"
          min="0"
        />
      </div>
      <p className="text-xs text-gray-500 mt-1">
        Preço para 1000 {label.toLowerCase()}
      </p>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link 
                href="/precos"
                className="flex items-center gap-2 text-gray-600 hover:text-[#ffa800] transition-colors"
              >
                <ArrowLeft size={20} />
                <span>Voltar</span>
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">
                Administração de Preços
              </h1>
            </div>
            
            <button
              onClick={handleSave}
              className={`flex items-center gap-2 px-6 py-2 rounded-lg font-semibold transition-all ${
                saved 
                  ? 'bg-green-500 text-white' 
                  : 'bg-[#ffa800] text-white hover:bg-[#ff8c00]'
              }`}
            >
              <Save size={16} />
              {saved ? 'Salvo!' : 'Salvar'}
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          
          {/* Instagram */}
          <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-6 rounded-2xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">📷</span>
              <h2 className="text-xl font-bold text-gray-900">Instagram</h2>
            </div>
            <div className="space-y-4">
              <PriceInput
                label="Seguidores Mundiais"
                value={pricing.instagram.mundial}
                onChange={(value) => updatePrice('instagram', 'mundial', value)}
                platform="instagram"
              />
              <PriceInput
                label="Seguidores Brasileiros"
                value={pricing.instagram.brasileiro}
                onChange={(value) => updatePrice('instagram', 'brasileiro', value)}
                platform="instagram"
              />
            </div>
          </div>

          {/* TikTok */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-2xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">🎵</span>
              <h2 className="text-xl font-bold text-gray-900">TikTok</h2>
            </div>
            <div className="space-y-4">
              <PriceInput
                label="Seguidores Mundiais"
                value={pricing.tiktok.mundial}
                onChange={(value) => updatePrice('tiktok', 'mundial', value)}
                platform="tiktok"
              />
              <PriceInput
                label="Seguidores Brasileiros"
                value={pricing.tiktok.brasileiro}
                onChange={(value) => updatePrice('tiktok', 'brasileiro', value)}
                platform="tiktok"
              />
              <PriceInput
                label="Curtidas"
                value={pricing.tiktok.curtidas}
                onChange={(value) => updatePrice('tiktok', 'curtidas', value)}
                platform="tiktok"
              />
              <PriceInput
                label="Visualizações"
                value={pricing.tiktok.visualizacoes}
                onChange={(value) => updatePrice('tiktok', 'visualizacoes', value)}
                platform="tiktok"
              />
            </div>
          </div>

          {/* YouTube */}
          <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-2xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">📺</span>
              <h2 className="text-xl font-bold text-gray-900">YouTube</h2>
            </div>
            <div className="space-y-4">
              <PriceInput
                label="Inscrições"
                value={pricing.youtube.inscricoes}
                onChange={(value) => updatePrice('youtube', 'inscricoes', value)}
                platform="youtube"
              />
              <PriceInput
                label="Visualizações"
                value={pricing.youtube.visualizacoes}
                onChange={(value) => updatePrice('youtube', 'visualizacoes', value)}
                platform="youtube"
              />
              <PriceInput
                label="Curtidas"
                value={pricing.youtube.curtidas}
                onChange={(value) => updatePrice('youtube', 'curtidas', value)}
                platform="youtube"
              />
            </div>
          </div>

          {/* Kwai */}
          <div className="bg-gradient-to-br from-orange-50 to-yellow-50 p-6 rounded-2xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">🎬</span>
              <h2 className="text-xl font-bold text-gray-900">Kwai</h2>
            </div>
            <div className="space-y-4">
              <PriceInput
                label="Seguidores"
                value={pricing.kwai.seguidores}
                onChange={(value) => updatePrice('kwai', 'seguidores', value)}
                platform="kwai"
              />
              <PriceInput
                label="Curtidas"
                value={pricing.kwai.curtidas}
                onChange={(value) => updatePrice('kwai', 'curtidas', value)}
                platform="kwai"
              />
            </div>
          </div>

          {/* Facebook */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">👥</span>
              <h2 className="text-xl font-bold text-gray-900">Facebook</h2>
            </div>
            <div className="space-y-4">
              <PriceInput
                label="Seguidores"
                value={pricing.facebook.seguidores}
                onChange={(value) => updatePrice('facebook', 'seguidores', value)}
                platform="facebook"
              />
              <PriceInput
                label="Curtidas"
                value={pricing.facebook.curtidas}
                onChange={(value) => updatePrice('facebook', 'curtidas', value)}
                platform="facebook"
              />
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-white p-6 rounded-2xl shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            📋 Instruções
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <p className="mb-2">
                • <strong>Preços base:</strong> Todos os valores são para 1000 unidades
              </p>
              <p className="mb-2">
                • <strong>Cálculo automático:</strong> Os preços são calculados proporcionalmente
              </p>
            </div>
            <div>
              <p className="mb-2">
                • <strong>Salvamento:</strong> Os dados são salvos no navegador
              </p>
              <p className="mb-2">
                • <strong>Atualização:</strong> As mudanças aparecem imediatamente na página de preços
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}