'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Check, Crown, Diamond, Shield, Bot, Zap, FileSearch, PenTool as Tool, Link as LinkIcon, Brain } from 'lucide-react'

const features = [
  {
    icon: Bot,
    title: 'Acesso ao GPT-4',
    description: 'Utilize o modelo mais avançado da OpenAI, com suporte a texto, imagens e áudio.'
  },
  {
    icon: Zap,
    title: 'Respostas Rápidas',
    description: 'Aproveite conversas mais rápidas e eficientes, sem interrupções.'
  },
  {
    icon: Tool,
    title: 'Recursos Exclusivos',
    description: 'Geração de imagens com DALL-E 3, análise de arquivos e GPTs personalizados.'
  },
  {
    icon: Brain,
    title: 'Acesso Prioritário',
    description: 'Menos interrupções mesmo em horários de pico.'
  },
  {
    icon: LinkIcon,
    title: 'Conectividade',
    description: 'Integração com outras plataformas e ferramentas de IA.'
  },
  {
    icon: FileSearch,
    title: 'Maior Flexibilidade',
    description: 'Criação de conteúdo complexo e personalização da IA.'
  }
]

const testimonials = [
  {
    name: 'Carlos Silva',
    role: 'Desenvolvedor Full Stack',
    content: 'O ChatGPT Plus revolucionou minha forma de trabalhar. A velocidade e qualidade das respostas são impressionantes!',
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg'
  },
  {
    name: 'Ana Martins',
    role: 'Professora Universitária',
    content: 'Uso diariamente para preparar materiais didáticos. A versão Plus é muito mais eficiente que a gratuita.',
    image: 'https://images.pexels.com/photos/3796217/pexels-photo-3796217.jpeg'
  },
  {
    name: 'Roberto Santos',
    role: 'Empresário',
    content: 'Excelente para análise de dados e geração de relatórios. O suporte da equipe é fantástico!',
    image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg'
  }
]

const plans = [
  {
    name: 'Silver',
    icon: Shield,
    price: '20,00',
    color: 'bg-gradient-to-br from-gray-200 to-gray-400',
    textColor: 'text-gray-700',
    badge: '🥈 〘𝙎𝙞𝙡𝙫𝙚𝙧〙',
    features: [
      'Acesso ao ChatGPT-4 Plus com equilíbrio',
      'Ideal para uso frequente',
      'Estabilidade moderada',
      'Menos filas',
      'Menos travamentos',
      'Mais produtividade'
    ]
  },
  {
    name: 'Gold',
    icon: Crown,
    price: '25,00',
    color: 'bg-gradient-to-br from-yellow-200 to-yellow-500',
    textColor: 'text-yellow-800',
    badge: '🥇 〘𝙂𝙤𝙡𝙙〙',
    popular: true,
    features: [
      'Acesso com número reduzido de usuários',
      'Limite de mensagens atinge bem mais devagar',
      'Perfeito para respostas rápidas',
      'Maior fluidez e estabilidade',
      'Ideal para uso intenso e prolongado',
      'Respostas consistentes sem travamentos'
    ]
  },
  {
    name: 'Diamond',
    icon: Diamond,
    price: '30,00',
    color: 'bg-gradient-to-br from-blue-200 to-blue-500',
    textColor: 'text-blue-800',
    badge: '🏅 〘𝘿𝙞𝙖𝙢𝙤𝙣𝙩〙',
    features: [
      'Acesso Premium com poucos usuários ativos',
      'Limite de mensagens quase imperceptível',
      'Experiência premium sem interrupções',
      'Máximo desempenho e agilidade',
      'Perfeito para uso profissional',
      'Ideal para engenheiros e programadores'
    ]
  }
]

const beneficiaries = [
  'Profissionais que precisam de maior velocidade',
  'Empresas buscando otimizar produção de conteúdo',
  'Usuários que desejam explorar ao máximo a IA',
  'Projetos complexos que exigem personalização'
]

export default function ChatGPTPlusPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

  function handleSelectPlan(plan: string) {
    setSelectedPlan(plan)
    if (plan === 'Silver') {
      window.location.href = 'https://pay.cakto.com.br/3627vxe_425199'
    } else if (plan === 'Gold') {
      window.location.href = 'https://pay.cakto.com.br/p4ujtpb_425376'
    } else if (plan === 'Diamond') {
      window.location.href = 'https://pay.cakto.com.br/kvcjfyi_425386'
    }
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#fbc94c]/10 to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 py-20 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <img
              src="/images/logo-branco.png"
              alt="Hype Fy Logo"
              className="w-60 mx-auto mb-12"
            />
          </motion.div>
          <motion.h1 
            className="text-4xl md:text-6xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Potencialize sua Experiência com ChatGPT-4 Plus
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-400 max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Desbloqueie todo o potencial da IA mais avançada do mundo com recursos exclusivos e desempenho superior.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Button 
              size="lg"
              className="bg-[#fbc94c] text-black hover:bg-[#fbc94c]/90 text-lg px-8"
              onClick={() => {
                const pricingSection = document.getElementById('pricing')
                pricingSection?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Ver Planos <ArrowRight className="ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-[#222222]">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center text-white mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Recursos Exclusivos
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  className="bg-[#2a2a2a] rounded-xl p-6 hover:bg-[#2a2a2a]/80 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="rounded-full bg-[#fbc94c]/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-[#fbc94c]" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center text-white mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Plus vs. Gratuito
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              className="bg-[#2a2a2a] rounded-xl p-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-xl font-semibold text-[#fbc94c] mb-4">Versão Plus</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-gray-300">
                  <Check className="h-5 w-5 text-[#fbc94c]" />
                  <span>Sem limite de mensagens</span>
                </li>
                <li className="flex items-center gap-2 text-gray-300">
                  <Check className="h-5 w-5 text-[#fbc94c]" />
                  <span>Acesso ao GPT-4</span>
                </li>
                <li className="flex items-center gap-2 text-gray-300">
                  <Check className="h-5 w-5 text-[#fbc94c]" />
                  <span>Geração de imagens DALL-E 3</span>
                </li>
                <li className="flex items-center gap-2 text-gray-300">
                  <Check className="h-5 w-5 text-[#fbc94c]" />
                  <span>Acesso prioritário</span>
                </li>
              </ul>
            </motion.div>
            <motion.div
              className="bg-[#2a2a2a] rounded-xl p-6"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-xl font-semibold text-gray-400 mb-4">Versão Gratuita</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-gray-500">
                  <Check className="h-5 w-5 text-gray-500" />
                  <span>Limite diário de mensagens</span>
                </li>
                <li className="flex items-center gap-2 text-gray-500">
                  <Check className="h-5 w-5 text-gray-500" />
                  <span>Apenas GPT-3.5</span>
                </li>
                <li className="flex items-center gap-2 text-gray-500">
                  <Check className="h-5 w-5 text-gray-500" />
                  <span>Sem geração de imagens</span>
                </li>
                <li className="flex items-center gap-2 text-gray-500">
                  <Check className="h-5 w-5 text-gray-500" />
                  <span>Acesso limitado em horários de pico</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-[#222222]">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center text-white mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            O que dizem nossos clientes
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                className="bg-[#2a2a2a] rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-white">{testimonial.name}</h3>
                    <p className="text-sm text-[#fbc94c]">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-400">{testimonial.content}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4">
        <div className="container mx-auto">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center text-white mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Escolha seu Plano
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => {
              const Icon = plan.icon
              return (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative"
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <Badge className="bg-[#fbc94c] text-black">Mais Popular</Badge>
                    </div>
                  )}
                  <Card className={`p-6 ${plan.popular ? 'border-[#fbc94c]' : ''} hover:border-[#fbc94c] transition-all duration-300`}>
                    <div className="text-center mb-6">
                      <div className={`inline-flex p-3 rounded-full ${plan.color} mb-4`}>
                        <Icon className={`h-6 w-6 ${plan.textColor}`} />
                      </div>
                      <div className="text-lg font-medium text-white mb-2">{plan.badge}</div>
                      <div className="text-3xl font-bold text-white mb-1">
                        R$ {plan.price}
                      </div>
                      <div className="text-sm text-gray-400">por mês</div>
                    </div>
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2 text-gray-300">
                          <Check className="h-5 w-5 text-[#fbc94c] shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      className="w-full bg-[#fbc94c] text-black hover:bg-[#fbc94c]/90"
                      onClick={() => handleSelectPlan(plan.name)}
                    >
                      Escolher Plano
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Who Benefits Section */}
      <section className="py-20 bg-[#222222]">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center text-white mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Quem se Beneficia
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {beneficiaries.map((benefit, index) => (
              <motion.div
                key={index}
                className="bg-[#2a2a2a] rounded-xl p-6 flex items-center gap-4"
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="rounded-full bg-[#fbc94c]/10 p-3">
                  <Check className="h-5 w-5 text-[#fbc94c]" />
                </div>
                <p className="text-gray-300">{benefit}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Rules Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto bg-[#2a2a2a] rounded-xl p-8">
            <motion.h2 
              className="text-2xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              🚫 REGRAS IMPORTANTES
            </motion.h2>
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-xl font-semibold text-white mb-2">1️⃣ Proibido compartilhar</h3>
                <p className="text-gray-400">❌ O compartilhamento das contas com terceiros é estritamente proibido.</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <h3 className="text-xl font-semibold text-white mb-2">2️⃣ Proibido alterar dados</h3>
                <p className="text-gray-400">❌ Alterações de senha ou qualquer outro dado das contas são terminantemente proibidas.</p>
              </motion.div>
            </div>

            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl font-bold text-white mb-6">🤔 Por que comprar conosco?</h2>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-gray-300">
                  <div className="text-[#fbc94c]">🔷</div>
                  <span>Entrega garantida: Receba sua compra ou o seu dinheiro de volta.</span>
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <div className="text-[#fbc94c]">🔷</div>
                  <span>Suporte rápido: Atendimento ágil para resolver qualquer problema.</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl font-bold text-white mb-6">✍ Termos e Garantia</h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-gray-300">
                  <div className="text-[#fbc94c] mt-1">✔️</div>
                  <span>Verifique o produto: Antes de realizar sua compra, certifique-se de que está adquirindo o item certo e que ele atende às suas necessidades.</span>
                </li>
                <li className="flex items-start gap-3 text-gray-300">
                  <div className="text-[#fbc94c] mt-1">✔️</div>
                  <span>Aceitação dos termos: Ao efetuar a compra, você concorda com todos os termos da plataforma e do anúncio.</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}