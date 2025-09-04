'use client';

export default function About() {
  const scrollToServices = () => {
    document.getElementById('servicos')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  return (
    <section id="sobre" className="py-20 bg-gradient-to-br from-gray-900 to-black text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#ffa800]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#ffa800]/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">
            Sobre nós
          </h2>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-2xl border border-white/10">
            <p className="text-xl leading-relaxed mb-8 text-gray-200">
              A <span className="text-[#ffa800] font-semibold">Hypefy Agência</span> é uma empresa que oferece 
              soluções práticas e inovadoras para empresas e pessoas no seu dia a dia.
            </p>
            
            <p className="text-lg leading-relaxed mb-10 text-gray-300">
              De serviços de streaming para o seu entretenimento a ferramentas úteis com preços acessíveis, 
              a Hypefy torna a sua vida mais simples e conveniente, sempre com qualidade e custo-benefício.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="text-center p-4">
                <div className="w-16 h-16 bg-gradient-to-br from-[#ffa800] to-[#ff8c00] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💡</span>
                </div>
                <h3 className="font-semibold mb-2">Inovação</h3>
                <p className="text-sm text-gray-300">Sempre buscando as melhores soluções</p>
              </div>
              
              <div className="text-center p-4">
                <div className="w-16 h-16 bg-gradient-to-br from-[#ffa800] to-[#ff8c00] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="font-semibold mb-2">Agilidade</h3>
                <p className="text-sm text-gray-300">Entrega rápida e eficiente</p>
              </div>
              
              <div className="text-center p-4">
                <div className="w-16 h-16 bg-gradient-to-br from-[#ffa800] to-[#ff8c00] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="font-semibold mb-2">Qualidade</h3>
                <p className="text-sm text-gray-300">Compromisso com a excelência</p>
              </div>
            </div>

            <button
              onClick={scrollToServices}
              className="bg-gradient-to-r from-[#ffa800] to-[#ff8c00] text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Veja nossos serviços
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}