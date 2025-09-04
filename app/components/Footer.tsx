'use client';

import { Instagram, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contato" className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Logo */}
          <div className="flex items-center justify-center mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-[#ffa800] to-[#ff8c00] rounded-lg flex items-center justify-center shadow-lg mr-3">
              <span className="text-white font-bold text-2xl">H</span>
            </div>
            <span className="text-2xl font-bold">Hypefy</span>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center space-x-8 mb-8">
            <a
              href="#"
              className="group flex items-center justify-center w-14 h-14 bg-white/10 rounded-full hover:bg-[#ffa800] transition-all duration-300 transform hover:scale-110"
            >
              <Instagram className="w-6 h-6 group-hover:text-white transition-colors duration-300" />
            </a>
            
            <a
              href="#"
              className="group flex items-center justify-center w-14 h-14 bg-white/10 rounded-full hover:bg-[#ffa800] transition-all duration-300 transform hover:scale-110"
            >
              <MessageCircle className="w-6 h-6 group-hover:text-white transition-colors duration-300" />
            </a>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-800 pt-8">
            <p className="text-gray-400">
              © 2025 Hypefy Agência. Todos os direitos reservados.
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Transformando seu dia a dia com soluções práticas e inovadoras
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}