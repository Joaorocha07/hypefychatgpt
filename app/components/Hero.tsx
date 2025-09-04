'use client';

export default function Hero() {
  const scrollToServices = () => {
    document.getElementById('servicos')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  return (
    <section id="inicio" className="pt-16 min-h-screen bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-[#ffa800]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#ffa800]/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="max-w-4xl mx-auto text-center py-20">
          <div className="mb-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Ajudamos a{' '}
              <span className="text-[#ffa800] relative">
                crescer
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[#ffa800] to-[#ff8c00] rounded-full transform scale-x-0 animate-pulse"></div>
              </span>
              {' '}suas redes sociais
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Somos uma agência que vendemos serviços de streaming e de engajamento até ferramentas úteis para o dia a dia
            </p>
          </div>

          <button
            onClick={scrollToServices}
            className="group bg-gradient-to-r from-[#ffa800] to-[#ff8c00] text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 relative overflow-hidden"
          >
            <span className="relative z-10">Conhecer nossos serviços</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#ff8c00] to-[#ffa800] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-3xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-3xl font-bold text-[#ffa800] mb-2">1000+</div>
              <div className="text-gray-600">Clientes satisfeitos</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-3xl font-bold text-[#ffa800] mb-2">24h</div>
              <div className="text-gray-600">Suporte disponível</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-3xl font-bold text-[#ffa800] mb-2">98%</div>
              <div className="text-gray-600">Taxa de satisfação</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}