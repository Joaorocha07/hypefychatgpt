'use client';


export default function Testimonials() {

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

        {/* Vertical Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto mb-12">
          {/* Card 1 */}
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div 
              className="w-full bg-gray-100 flex items-center justify-center text-gray-400 text-sm"
              style={{ aspectRatio: '1080/1920' }}
            >
              Avaliação 1
              <br />
              (1080x1920)
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div 
              className="w-full bg-gray-100 flex items-center justify-center text-gray-400 text-sm"
              style={{ aspectRatio: '1080/1920' }}
            >
              Avaliação 2
              <br />
              (1080x1920)
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div 
              className="w-full bg-gray-100 flex items-center justify-center text-gray-400 text-sm"
              style={{ aspectRatio: '1080/1920' }}
            >
              Avaliação 3
              <br />
              (1080x1920)
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div 
              className="w-full bg-gray-100 flex items-center justify-center text-gray-400 text-sm"
              style={{ aspectRatio: '1080/1920' }}
            >
              Avaliação 4
              <br />
              (1080x1920)
            </div>
          </div>

          {/* Card 5 */}
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div 
              className="w-full bg-gray-100 flex items-center justify-center text-gray-400 text-sm"
              style={{ aspectRatio: '1080/1920' }}
            >
              Avaliação 5
              <br />
              (1080x1920)
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
  );
}