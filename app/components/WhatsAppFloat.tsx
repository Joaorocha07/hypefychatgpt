'use client'

import Image from 'next/image'

import LogoWhatsApp from '@/public/images/whatssap-branco.png'

export default function WhatsAppFloat() {
  const handleWhatsAppClick = () => {
    window.open('https://wa.me/553498262737', '_blank')
  }

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-br from-[#25d366] to-[#128c7e] rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 flex items-center justify-center group hover:animate-none"
      aria-label="Entrar em contato via WhatsApp"
    >
      <Image
        src={LogoWhatsApp}
        alt="WhatsApp Logo"
        width={500}
        height={300}
        className="w-8 h-8 text-white group-hover:scale-110 transition-transform"
      />
      {/* Ripple effect */}
      <div className="absolute inset-0 rounded-full border-4 border-[#25d366]/30 animate-ping"></div>
    </button>
  )
}