'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

const faqs = [
  {
    question: 'Os seguidores demoram a chegarem',
    answer: 'Os seguidores pode chegar em média de 24h a 48h qualquer coisa só nos chamar no WhatsApp para suporte'
  },
  {
    question: 'Os serviços de streaming podem cair antes do prazo estipulado?',
    answer: 'Sim, talvez a mude a senha ou e-mail da sua conta, nos mande mensagem para suporte'
  },
  {
    question: 'O chat GPT é muito lento?',
    answer: 'Não, trabalhamos com limite de usuários por pessoas para não ficar lento'
  },
  {
    question: 'O canva pode mudar a senha ou e-mail?',
    answer: 'Não, mandamos o convite para o e-mail informado na hora da compra'
  },
  {
    question: 'Caso passe o E-mail errado do canva o que acontece?',
    answer: 'Sempre pedimos para mandar o e-mail corretamente antes de mandarmos o convite, caso aconteça terá que fazer o pedido novamente'
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const scrollToServices = () => {
    document.getElementById('servicos')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Perguntas Frequentes
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#ffa800] to-[#ff8c00] mx-auto rounded-full"></div>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="space-y-4 mb-12">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <button
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                  onClick={() => toggleFAQ(index)}
                >
                  <h3 className="font-semibold text-gray-900 pr-4">
                    {index + 1}. {faq.question}
                  </h3>
                  <div className="flex-shrink-0">
                    {openIndex === index ? (
                      <ChevronUp className="w-5 h-5 text-[#ffa800]" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </button>

                <div className={cn(
                  "overflow-hidden transition-all duration-300 ease-in-out",
                  openIndex === index 
                    ? "max-h-96 opacity-100" 
                    : "max-h-0 opacity-0"
                )}>
                  <div className="p-6 pt-0">
                    <p className="text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-lg">
                      <span className="font-medium text-[#ffa800]">R:</span> {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
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