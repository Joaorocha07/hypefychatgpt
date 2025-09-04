'use client'

import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'

import avaliacao01 from '@/public/images/avaliacao-01.jpg'
import avaliacao02 from '@/public/images/avaliacao-02.jpg'
import avaliacao03 from '@/public/images/avaliacao-03.jpg'
import avaliacao04 from '@/public/images/avaliacao-04.jpg'
import avaliacao05 from '@/public/images/avaliacao-05.jpg'
import Image from 'next/image'

export default function Testimonials() {
  const scrollToServices = () => {
    document.getElementById('servicos')?.scrollIntoView({ 
      behavior: 'smooth' 
    })
  }

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true,
      align: 'center',
      slidesToScroll: 1,
      breakpoints: {
        '(min-width: 768px)': { slidesToScroll: 2 },
        '(min-width: 1024px)': { slidesToScroll: 3 },
      }
    },
    [Autoplay({ delay: 3000, stopOnInteraction: false })]
  )


  const testimonials = [
    {
      id: 1,
      title: 'Cliente 1',
      image: avaliacao01,
    },
    {
      id: 2,
      title: 'Cliente 2',
      image: avaliacao02,
    },
    {
      id: 3,
      title: 'Cliente 3',
      image: avaliacao03,
    },
    {
      id: 4,
      title: 'Cliente 4',
      image: avaliacao04,
    },
    {
      id: 5,
      title: 'Cliente 5',
      image: avaliacao05,
    }
  ]
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

        {/* Carousel Container */}
        <div className="relative max-w-7xl mx-auto mb-12">
          {/* Embla Carousel */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="flex-none w-64 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div 
                    className="w-full bg-gray-100 flex items-center justify-center text-gray-400 text-sm font-medium"
                    style={{ aspectRatio: '1080/1920' }}
                  >
                    <Image
                      src={testimonial.image}
                      alt={testimonial.title}
                      className="object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
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
  )
}