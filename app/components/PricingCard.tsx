'use client'

import { useState } from 'react'
import { ExternalLink } from 'lucide-react'

interface Service {
  name: string
  type: string
  quality: string
  priceFor1000: number
  whatsappMessage: string
}

interface PricingCardProps {
  platform: string
  icon: string
  color: string
  services: Service[]
}

export default function PricingCard({ platform, icon, color, services }: PricingCardProps) {
  const [selectedService, setSelectedService] = useState(0)
  const [customQuantity, setCustomQuantity] = useState('')

  const currentService = services[selectedService]
  
  // Calcular preço baseado na quantidade
  const calculatePrice = (quantity: number) => {
    return ((quantity / 1000) * currentService.priceFor1000).toFixed(2)
  }

  // Pacotes pré-definidos
  const predefinedPackages = [
    { quantity: 200, emoji: '🚀' },
    { quantity: 400, emoji: '🚀' },
    { quantity: 600, emoji: '🚀' },
    { quantity: 800, emoji: '🚀' },
    { quantity: 1000, emoji: '✨' },
    { quantity: 1500, emoji: '✨' },
    { quantity: 2000, emoji: '✨' },
    { quantity: 2500, emoji: '✨' },
    { quantity: 5000, emoji: '💎' },
    { quantity: 10000, emoji: '💎' },
    { quantity: 20000, emoji: '💎' },
    { quantity: 30000, emoji: '💎' }
  ]

  const handleWhatsAppRedirect = (quantity: number, price: string) => {
    const message = `Quero comprar ${quantity} ${currentService.whatsappMessage}%0A%0AValor: R$ ${price}`
    const whatsappUrl = `https://api.whatsapp.com/send/?phone=553498262737&text=${message}&type=phone_number&app_absent=0`
    window.open(whatsappUrl, '_blank')
  }

  const customPrice = customQuantity ? calculatePrice(parseInt(customQuantity) || 0) : '0.00'

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100">
      {/* Header */}
      <div className={`bg-gradient-to-r ${color} p-6 text-white`}>
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">{icon}</span>
          <h3 className="text-2xl font-bold">{platform}</h3>
        </div>
      </div>

      {/* Service Selector */}
      {services.length > 1 && (
        <div className="p-4 border-b border-gray-100">
          <div className="flex flex-wrap gap-2">
            {services.map((service, index) => (
              <button
                key={index}
                onClick={() => setSelectedService(index)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                  selectedService === index
                    ? 'bg-[#ffa800] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {service.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Current Service Info */}
      <div className="p-4 border-b border-gray-100">
        <h4 className="font-semibold text-gray-900 mb-1">{currentService.name}</h4>
        <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
          {currentService.quality}
        </span>
      </div>

      {/* Pricing Table */}
      <div className="p-4">
        <div className="space-y-2 mb-6 max-h-64 overflow-y-auto">
          {predefinedPackages.map((pkg) => (
            <div
              key={pkg.quantity}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">{pkg.emoji}</span>
                <span className="font-medium text-gray-900">
                  {pkg.quantity.toLocaleString()} {currentService.type}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-bold text-[#ffa800]">
                  R$ {calculatePrice(pkg.quantity)}
                </span>
                <button
                  onClick={() => handleWhatsAppRedirect(pkg.quantity, calculatePrice(pkg.quantity))}
                  className="bg-[#25d366] text-white px-3 py-1 rounded-lg text-sm hover:bg-[#128c7e] transition-colors flex items-center gap-1"
                >
                  <ExternalLink size={12} />
                  Comprar
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Quantity Input */}
        <div className="border-t border-gray-100 pt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quantidade personalizada:
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              value={customQuantity}
              onChange={(e) => setCustomQuantity(e.target.value)}
              placeholder="Digite a quantidade"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffa800] focus:border-transparent"
              min="1"
            />
          </div>
          
          {customQuantity && parseInt(customQuantity) > 0 && (
            <div className="mt-3 p-3 bg-[#ffa800]/10 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-900">
                  {parseInt(customQuantity).toLocaleString()} {currentService.type}
                </span>
                <span className="font-bold text-[#ffa800] text-lg">
                  R$ {customPrice}
                </span>
              </div>
              <button
                onClick={() => handleWhatsAppRedirect(parseInt(customQuantity), customPrice)}
                className="w-full bg-[#25d366] text-white py-2 rounded-lg font-semibold hover:bg-[#128c7e] transition-colors flex items-center justify-center gap-2"
              >
                <ExternalLink size={16} />
                Comprar Agora
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}