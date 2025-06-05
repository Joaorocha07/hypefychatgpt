'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Check, Crown, Diamond, Shield } from 'lucide-react'
import Link from 'next/link'

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

export default function ChatGPTPlusPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Header */}
      <header className="fixed top-0 w-full bg-[#1a1a1a]/80 backdrop-blur-sm z-50 border-b border-gray-800">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-white text-xl font-bold">
            <img
              src="/images/logo-branco.png"
              alt="Hype Fy Logo"
              className="w-28 md:w-60 h-auto object-cover"
            />
          </Link>
          <div className="space-x-4">
            <Button variant="ghost" className="text-white hover:text-[#fbc94c]" asChild>
              <Link href="/login">Entrar</Link>
            </Button>
            <Button className="bg-[#fbc94c] text-[#1a1a1a] hover:bg-[#fbc94c]/90" asChild>
              <Link href="/register">Criar conta</Link>
            </Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            ChatGPT-4 Plus
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-400 max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Desbloqueie todo o potencial da IA com nossos planos exclusivos.
            Escolha o plano ideal para suas necessidades.
          </motion.p>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 bg-[#222222]">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan) => {
              const Icon = plan.icon
              return (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
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
                      onClick={() => setSelectedPlan(plan.name)}
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

      {/* Rules Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto bg-[#2a2a2a] rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6">🚫 REGRAS IMPORTANTES</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">1️⃣ Proibido compartilhar</h3>
                <p className="text-gray-400">❌ O compartilhamento das contas com terceiros é estritamente proibido.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">2️⃣ Proibido alterar dados</h3>
                <p className="text-gray-400">❌ Alterações de senha ou qualquer outro dado das contas são terminantemente proibidas.</p>
              </div>
            </div>

            <div className="mt-8">
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
            </div>

            <div className="mt-8">
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
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}