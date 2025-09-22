'use client'

import { useState, useEffect } from 'react'
import { Save, DollarSign } from 'lucide-react'

interface PricingData {
  instagram: {
    mundial: number
    brasileiro: number
    curtidas: number
    visualizacoes: number
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
    visualizacoesShorts: number
  }
  kwai: {
    seguidores: number
    curtidas: number
    visualizacoes: number
  }
  facebook: {
    seguidores: number
    curtidas: number
    visualizacoes: number
  }
}

const defaultPricing: PricingData = {
  instagram: { mundial: 26, brasileiro: 45, curtidas: 15, visualizacoes: 15 },
  tiktok: { mundial: 18, brasileiro: 30, curtidas: 15, visualizacoes: 15 },
  youtube: { inscricoes: 80, visualizacoes: 15, curtidas: 12, visualizacoesShorts: 20 },
  kwai: { seguidores: 22, curtidas: 12, visualizacoes: 12 },
  facebook: { seguidores: 16, curtidas: 16, visualizacoes: 12.90 }
}

export default function PricingManager() {
  const [pricing, setPricing] = useState<PricingData>(defaultPricing)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const savedPricing = localStorage.getItem('hypefy-pricing')
    if (savedPricing) {
      setPricing(JSON.parse(savedPricing))
    }
  }, [])

  const handleSavePricing = () => {
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
    onChange 
  }: { 
    label: string
    value: number
    onChange: (value: number) => void
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
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-semibold text-gray-900">Gerenciar Preços</h2>
        <button
          onClick={handleSavePricing}
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

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {/* Instagram */}
        <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">📷</span>
            <h3 className="text-xl font-bold text-gray-900">Instagram</h3>
          </div>
          <div className="space-y-4">
            <PriceInput
              label="Seguidores Mundiais"
              value={pricing.instagram.mundial}
              onChange={(value) => updatePrice('instagram', 'mundial', value)}
            />
            <PriceInput
              label="Seguidores Brasileiros"
              value={pricing.instagram.brasileiro}
              onChange={(value) => updatePrice('instagram', 'brasileiro', value)}
            />
            <PriceInput
              label="Curtidas"
              value={pricing.instagram.curtidas}
              onChange={(value) => updatePrice('instagram', 'curtidas', value)}
            />
            <PriceInput
              label="Visualizações Reels"
              value={pricing.instagram.visualizacoes}
              onChange={(value) => updatePrice('instagram', 'visualizacoes', value)}
            />
          </div>
        </div>

        {/* TikTok */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🎵</span>
            <h3 className="text-xl font-bold text-gray-900">TikTok</h3>
          </div>
          <div className="space-y-4">
            <PriceInput
              label="Seguidores Mundiais"
              value={pricing.tiktok.mundial}
              onChange={(value) => updatePrice('tiktok', 'mundial', value)}
            />
            <PriceInput
              label="Seguidores Brasileiros"
              value={pricing.tiktok.brasileiro}
              onChange={(value) => updatePrice('tiktok', 'brasileiro', value)}
            />
            <PriceInput
              label="Curtidas"
              value={pricing.tiktok.curtidas}
              onChange={(value) => updatePrice('tiktok', 'curtidas', value)}
            />
            <PriceInput
              label="Visualizações"
              value={pricing.tiktok.visualizacoes}
              onChange={(value) => updatePrice('tiktok', 'visualizacoes', value)}
            />
          </div>
        </div>

        {/* YouTube */}
        <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">📺</span>
            <h3 className="text-xl font-bold text-gray-900">YouTube</h3>
          </div>
          <div className="space-y-4">
            <PriceInput
              label="Inscrições"
              value={pricing.youtube.inscricoes}
              onChange={(value) => updatePrice('youtube', 'inscricoes', value)}
            />
            <PriceInput
              label="Visualizações"
              value={pricing.youtube.visualizacoes}
              onChange={(value) => updatePrice('youtube', 'visualizacoes', value)}
            />
            <PriceInput
              label="Curtidas"
              value={pricing.youtube.curtidas}
              onChange={(value) => updatePrice('youtube', 'curtidas', value)}
            />
            <PriceInput
              label="Visualizações Shorts"
              value={pricing.youtube.visualizacoesShorts}
              onChange={(value) => updatePrice('youtube', 'visualizacoesShorts', value)}
            />
          </div>
        </div>

        {/* Kwai */}
        <div className="bg-gradient-to-br from-orange-50 to-yellow-50 p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🎬</span>
            <h3 className="text-xl font-bold text-gray-900">Kwai</h3>
          </div>
          <div className="space-y-4">
            <PriceInput
              label="Seguidores"
              value={pricing.kwai.seguidores}
              onChange={(value) => updatePrice('kwai', 'seguidores', value)}
            />
            <PriceInput
              label="Curtidas"
              value={pricing.kwai.curtidas}
              onChange={(value) => updatePrice('kwai', 'curtidas', value)}
            />
            <PriceInput
              label="Visualizações"
              value={pricing.kwai.visualizacoes}
              onChange={(value) => updatePrice('kwai', 'visualizacoes', value)}
            />
          </div>
        </div>

        {/* Facebook */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">👥</span>
            <h3 className="text-xl font-bold text-gray-900">Facebook</h3>
          </div>
          <div className="space-y-4">
            <PriceInput
              label="Seguidores"
              value={pricing.facebook.seguidores}
              onChange={(value) => updatePrice('facebook', 'seguidores', value)}
            />
            <PriceInput
              label="Curtidas"
              value={pricing.facebook.curtidas}
              onChange={(value) => updatePrice('facebook', 'curtidas', value)}
            />
            <PriceInput
              label="Visualizações"
              value={pricing.facebook.visualizacoes}
              onChange={(value) => updatePrice('facebook', 'visualizacoes', value)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}