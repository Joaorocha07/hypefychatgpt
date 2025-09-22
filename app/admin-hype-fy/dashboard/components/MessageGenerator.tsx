'use client'

import { useState } from 'react'
import { MessageSquare, Copy, Check } from 'lucide-react'

export default function MessageGenerator() {
  const [activeCard, setActiveCard] = useState<string | null>(null)

  const messageTypes = [
    {
      id: 'instagram',
      title: 'Mensagem Instagram',
      description: 'Gerar mensagens para vendas de seguidores, curtidas e visualizações',
      icon: '📷',
      color: 'from-pink-500 to-purple-600'
    },
    {
      id: 'subscription',
      title: 'Mensagem Assinaturas',
      description: 'Gerar mensagens para ChatGPT, Netflix, HBO e outros serviços',
      icon: '📺',
      color: 'from-blue-500 to-indigo-600'
    }
  ]

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-8">Gerador de Mensagens</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {messageTypes.map((type) => (
          <div
            key={type.id}
            onClick={() => setActiveCard(type.id)}
            className="group cursor-pointer bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-[#ffa800]/20 transform hover:-translate-y-2"
          >
            <div className={`bg-gradient-to-r ${type.color} p-6 text-white`}>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">{type.icon}</span>
                <h3 className="text-xl font-bold">{type.title}</h3>
              </div>
            </div>
            
            <div className="p-6">
              <p className="text-gray-600 mb-4">{type.description}</p>
              <button className="w-full bg-gradient-to-r from-[#ffa800] to-[#ff8c00] text-white py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
                <MessageSquare size={16} />
                Acessar Gerador
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Instagram Message Generator */}
      {activeCard === 'instagram' && <InstagramMessageGenerator />}
      
      {/* Subscription Message Generator */}
      {activeCard === 'subscription' && <SubscriptionMessageGenerator />}
    </div>
  )
}

function InstagramMessageGenerator() {
  const [selectedService, setSelectedService] = useState('')
  const [orderLink, setOrderLink] = useState('')
  const [initialQuantity, setInitialQuantity] = useState('')
  const [requestedQuantity, setRequestedQuantity] = useState('')
  const [purchaseDate, setPurchaseDate] = useState(new Date().toISOString().split('T')[0])
  const [orderId, setOrderId] = useState('')
  const [generatedMessage, setGeneratedMessage] = useState('')
  const [copied, setCopied] = useState(false)

  const services = [
    { value: 'instagram-mundial', label: 'Seguidores Instagram - Mundiais 🌎', price: 26 },
    { value: 'instagram-brasileiro', label: 'Seguidores Instagram - Brasileiros 🇧🇷', price: 45 },
    { value: 'instagram-curtidas', label: 'Curtidas Instagram ❤️', price: 15 },
    { value: 'instagram-visualizacoes', label: 'Visualizações Instagram Reels 👁️', price: 15 },
    { value: 'tiktok-mundial', label: 'Seguidores TikTok - Mundiais 🌎', price: 18 },
    { value: 'tiktok-brasileiro', label: 'Seguidores TikTok - Brasileiros 🇧🇷', price: 30 },
    { value: 'tiktok-curtidas', label: 'Curtidas TikTok ❤️', price: 15 },
    { value: 'tiktok-visualizacoes', label: 'Visualizações TikTok 👁️', price: 15 }
  ]

  const generateMessage = () => {
    const service = services.find(s => s.value === selectedService)
    if (!service || !requestedQuantity || !orderId) return

    const quantity = parseInt(requestedQuantity)
    const calculatedValue = ((quantity / 1000) * service.price).toFixed(2)

    const message = `🔰 COMPRA EFETUADA COM SUCESSO 🔰
├🎟 ${service.label}
├🔗 Link do Pedido: ${orderLink}
├⭕ Quantidade inicial: ${initialQuantity} Seguidores
├🔢 Quantidade: ${quantity.toLocaleString()} ${service.label.includes('Seguidores') ? 'Seguidores' : service.label.includes('Curtidas') ? 'Curtidas' : service.label.includes('Visualizações') ? 'Visualizações' : 'Inscrições'}
├ 📅 Data da compra: ${new Date(purchaseDate).toLocaleDateString('pt-BR')}
└💸 Valor: R$ ${calculatedValue}

🛠 ID da Compra: ${orderId}

🙏 Agradecemos pela sua compra!
Sua confiança é essencial para nós. Aproveite nossos serviços e, se gostou, compartilhe com mais pessoas para impulsionarem seus perfis com qualidade!

⚠ Aviso importante: a reposição é válida apenas por 30 dias a partir do pedido.

🛑 SALVE ESSA MENSAGEM CASO PRECISE DE ALGUM SUPORTE 🛑`

    setGeneratedMessage(message)
  }

  const copyMessage = () => {
    navigator.clipboard.writeText(generatedMessage)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="mt-8 bg-white p-6 rounded-2xl shadow-sm border">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Gerador de Mensagem - Instagram/TikTok</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Serviço</label>
            <select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffa800] focus:border-transparent"
            >
              <option value="">Selecione um serviço</option>
              {services.map((service) => (
                <option key={service.value} value={service.value}>
                  {service.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Link do Pedido</label>
            <input
              type="url"
              value={orderLink}
              onChange={(e) => setOrderLink(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffa800] focus:border-transparent"
              placeholder="https://www.instagram.com/perfil"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Quantidade Inicial</label>
            <input
              type="text"
              value={initialQuantity}
              onChange={(e) => setInitialQuantity(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffa800] focus:border-transparent"
              placeholder="1.387"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Quantidade Solicitada</label>
            <input
              type="number"
              value={requestedQuantity}
              onChange={(e) => setRequestedQuantity(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffa800] focus:border-transparent"
              placeholder="800"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Data da Compra</label>
            <input
              type="date"
              value={purchaseDate}
              onChange={(e) => setPurchaseDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffa800] focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">ID da Compra</label>
            <input
              type="text"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffa800] focus:border-transparent"
              placeholder="355521"
            />
          </div>

          <button
            onClick={generateMessage}
            className="w-full bg-gradient-to-r from-[#ffa800] to-[#ff8c00] text-white py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            Gerar Mensagem
          </button>
        </div>

        {/* Generated Message */}
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Mensagem Gerada</h4>
          {generatedMessage ? (
            <div className="bg-gray-50 p-4 rounded-lg">
              <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono mb-4">
                {generatedMessage}
              </pre>
              <button
                onClick={copyMessage}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  copied 
                    ? 'bg-green-500 text-white' 
                    : 'bg-[#ffa800] text-white hover:bg-[#ff8c00]'
                }`}
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? 'Copiado!' : 'Copiar Mensagem'}
              </button>
            </div>
          ) : (
            <div className="text-gray-500 text-center py-8">
              Preencha os campos e clique em "Gerar Mensagem"
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function SubscriptionMessageGenerator() {
  const [selectedService, setSelectedService] = useState('ChatGPT')
  const [value, setValue] = useState('20.00')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [generatedMessage, setGeneratedMessage] = useState('')
  const [copied, setCopied] = useState(false)

  const services = [
    'ChatGPT',
    'Netflix',
    'Prime Video',
    'HBO Max',
    'Disney+',
    'Paramount+',
    'IPTV',
    'Crunchyroll',
    'Spotify',
    'YouTube Premium'
  ]

  const generateMessage = () => {
    if (!selectedService || !value || !email || !password) return

    const today = new Date()
    const expiryDate = new Date(today)
    expiryDate.setDate(today.getDate() + 30)

    const message = `✅ 𝗖𝗢𝗠𝗣𝗥𝗔 𝗖𝗢𝗡𝗙𝗜𝗥𝗠𝗔𝗗𝗔! ✅

🛍️ •|𝗣𝗥𝗢𝗗𝗨𝗧𝗢: ${selectedService.toUpperCase()} PREMIUM
💸 •|𝗩𝗔𝗟𝗢𝗥: R$${value}

━━━━━━━━━━━━━━━━━

🔓 𝗗𝗔𝗗𝗢𝗦 𝗗𝗘 𝗔𝗖𝗘𝗦𝗦𝗢: ⇩⇩

📧 ┌𝗘𝗠𝗔𝗜𝗟: ${email}
🔑 └𝗦𝗘𝗡𝗛𝗔: ${password}

⏰ •|𝗩𝗔𝗟𝗜𝗗𝗔𝗗𝗘: 30 DIAS
📅 •|𝗗𝗔𝗧𝗔 𝗗𝗔 𝗖𝗢𝗠𝗣𝗥𝗔: ${today.toLocaleDateString('pt-BR')}
🗓️ •|𝗩𝗘𝗡𝗖𝗜𝗠𝗘𝗡𝗧𝗢: ${expiryDate.toLocaleDateString('pt-BR')}

━━━━━━━━━━━━━━━━━
ℹ️ 𝗜𝗡𝗙𝗢𝗥𝗠𝗔𝗖‌𝗢‌𝗘𝗦 ⇩⇩

${selectedService === 'Netflix' ? 'Tela 4' : 'Conta compartilhada'}

OBRIGADO PELA COMPRA, HYPE FY AGENCIA AGRADECE A PREFERÊNCIA VOCÊ É MUITO IMPORTANTE PARA NÓS 😁♥️

GRUPO PARA CLIENTES: https://chat.whatsapp.com/IAmbFdKs2Od3FLkAUkUvQj`

    setGeneratedMessage(message)
  }

  const copyMessage = () => {
    navigator.clipboard.writeText(generatedMessage)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="mt-8 bg-white p-6 rounded-2xl shadow-sm border">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Gerador de Mensagem - Assinaturas</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Produto</label>
            <select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffa800] focus:border-transparent"
            >
              {services.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Valor (R$)</label>
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffa800] focus:border-transparent"
              placeholder="20.00"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffa800] focus:border-transparent"
              placeholder="haor178@boxfi.uk"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Senha</label>
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffa800] focus:border-transparent"
              placeholder="nayzinha123"
            />
          </div>

          <button
            onClick={generateMessage}
            className="w-full bg-gradient-to-r from-[#ffa800] to-[#ff8c00] text-white py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            Gerar Mensagem
          </button>
        </div>

        {/* Generated Message */}
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Mensagem Gerada</h4>
          {generatedMessage ? (
            <div className="bg-gray-50 p-4 rounded-lg">
              <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono mb-4">
                {generatedMessage}
              </pre>
              <button
                onClick={copyMessage}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  copied 
                    ? 'bg-green-500 text-white' 
                    : 'bg-[#ffa800] text-white hover:bg-[#ff8c00]'
                }`}
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? 'Copiado!' : 'Copiar Mensagem'}
              </button>
            </div>
          ) : (
            <div className="text-gray-500 text-center py-8">
              Preencha os campos e clique em "Gerar Mensagem"
            </div>
          )}
        </div>
      </div>
    </div>
  )
}