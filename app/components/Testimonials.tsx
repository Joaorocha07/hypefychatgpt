'use client';

import { useEffect, useState } from 'react';

const testimonials = [
  {
    id: 1,
    name: 'Maria Silva',
    message: 'Serviço incrível! Recebi tudo rapidinho e funcionou perfeitamente. Super recomendo! 😍',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
    rating: 5
  },
  {
    id: 2,
    name: 'João Santos',
    message: 'Comprei o ChatGPT e valeu cada centavo. Atendimento nota 10! 🚀',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',
    rating: 5
  },
  {
    id: 3,
    name: 'Ana Costa',
    message: 'Netflix por esse preço é um achado! Já é minha segunda compra aqui 💕',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100',
    rating: 5
  },
  {
    id: 4,
    name: 'Pedro Oliveira',
    message: 'Canva funcionando perfeitamente há 6 meses. Equipe muito profissional! ✨',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100',
    rating: 5
  },
  {
    id: 5,
    name: 'Carla Mendes',
    message: 'Suporte incrível! Resolveram minha dúvida em minutos. Muito satisfeita! 👏',
    avatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=100',
    rating: 5
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const scrollToServices = () => {
    document.getElementById('servicos')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  return (
    <section id="depoimentos" className="py-20 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-[#ffa800]/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            O QUE NOSSOS CLIENTES DIZEM
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Conheça a opinião de nossos clientes sobre a experiência e os resultados alcançados com nosso trabalho. 
            Suas palavras refletem nosso compromisso com a qualidade e a excelência.
          </p>
        </div>

        {/* Infinite Carousel */}
        <div className="relative max-w-4xl mx-auto mb-12">
          <div className="overflow-hidden rounded-2xl">
            <div 
              className="flex transition-transform duration-1000 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={testimonial.id} className="w-full flex-shrink-0">
                  <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl shadow-xl border border-gray-100 mx-4">
                    <div className="flex items-center mb-6">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full mr-4 border-4 border-[#ffa800]/20"
                      />
                      <div>
                        <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                        <div className="flex text-[#ffa800] mt-1">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <span key={i}>⭐</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 text-lg italic leading-relaxed">
                      "{testimonial.message}"
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center space-x-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-[#ffa800] scale-125' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={scrollToServices}
            className="bg-white border-2 border-[#ffa800] text-[#ffa800] px-8 py-3 rounded-full font-semibold hover:bg-[#ffa800] hover:text-white transition-all duration-300 transform hover:scale-105"
          >
            Ver nossos serviços
          </button>
        </div>
      </div>
    </section>
  );
}