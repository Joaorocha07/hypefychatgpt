'use client'

import { useState, useEffect } from 'react'
import { 
  LogOut, 
  DollarSign, 
  MessageSquare, 
  Users, 
  Settings,
  Save,
  Trash2,
  Eye,
  EyeOff,
  Plus,
  Calendar,
  Mail,
  Phone,
  User
} from 'lucide-react'

// Tipos
interface PricingData {
  instagram: {
    mundial: number
    brasileiro: number
  }
  tiktok: {
    mundial: number
    brasileiro: number
    curtidas: number
    visualizacoes: number
  }
  youtube: {
    inscricoes: number
    visualizacoes: number
    curtidas: number
  }
  kwai: {
    seguidores: number
    curtidas: number
  }
  facebook: {
    seguidores: number
    curtidas: number
  }
}

interface ChatGPTSubscription {
  id: string
  name: string
  email: string
  phone: string
  purchaseDate: string
  expiryDate: string
  value: number
  isActive: boolean
}

const defaultPricing: PricingData = {
  instagram: { mundial: 26, brasileiro: 45 },
  tiktok: { mundial: 18, brasileiro: 30, curtidas: 15, visualizacoes: 15 },
  youtube: { inscricoes: 35, visualizacoes: 12, curtidas: 18 },
  kwai: { seguidores: 25, curtidas: 12 },
  facebook: { seguidores: 28, curtidas: 10 }
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('pricing')
  const [pricing, setPricing] = useState<PricingData>(defaultPricing)
  const [subscriptions, setSubscriptions] = useState<ChatGPTSubscription[]>([])
  const [saved, setSaved] = useState(false)

  // Estados para mensagem personalizada
  const [selectedService, setSelectedService] = useState('')
  const [orderLink, setOrderLink] = useState('')
  const [initialQuantity, setInitialQuantity] = useState('')
  const [requestedQuantity, setRequestedQuantity] = useState('')
  const [purchaseDate, setPurchaseDate] = useState(new Date().toISOString().split('T')[0])
  const [orderId, setOrderId] = useState('')
  const [generatedMessage, setGeneratedMessage] = useState('')

  // Estados para nova assinatura
  const [newSubscription, setNewSubscription] = useState({
    name: '',
    email: '',
    phone: '',
    value: 20
  })

  // Verificar autenticação
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('hypefy-admin-logged')
    if (isLoggedIn !== 'true') {
      window.location.href = '/admin'
    }
  }, [])

  // Carregar dados
  useEffect(() => {
    const savedPricing = localStorage.getItem('hypefy-pricing')
    if (savedPricing) {
      setPricing(JSON.parse(savedPricing))
    }

    const savedSubscriptions = localStorage.getItem('hypefy-subscriptions')
    if (savedSubscriptions) {
      setSubscriptions(JSON.parse(savedSubscriptions))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('hypefy-admin-logged')
    window.location.href = '/admin'
  }

  const handleSavePricing = () => {
    localStorage.setItem('hypefy-pricing', JSON.stringify(pricing))
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const updatePrice = (platform: keyof PricingData, service: string, value: number) => {
    setPricing(prev => ({
      ...prev,
      [platform]: {
        ...prev[platform],
        [service]: value
      }
    }))
  }

  // Serviços disponíveis para mensagem personalizada
  const services = [
    { value: 'instagram-mundial', label: 'Seguidores Instagram - Mundiais 🌎', price: pricing.instagram.mundial },
    { value: 'instagram-brasileiro', label: 'Seguidores Instagram - Brasileiros 🇧🇷', price: pricing.instagram.brasileiro },
    { value: 'tiktok-mundial', label: 'Seguidores TikTok - Mundiais 🌎', price: pricing.tiktok.mundial },
    { value: 'tiktok-brasileiro', label: 'Seguidores TikTok - Brasileiros 🇧🇷', price: pricing.tiktok.brasileiro },
    { value: 'tiktok-curtidas', label: 'Curtidas TikTok ❤️', price: pricing.tiktok.curtidas },
    { value: 'tiktok-visualizacoes', label: 'Visualizações TikTok 👁️', price: pricing.tiktok.visualizacoes },
    { value: 'youtube-inscricoes', label: 'Inscrições YouTube 📺', price: pricing.youtube.inscricoes },
    { value: 'youtube-visualizacoes', label: 'Visualizações YouTube 👁️', price: pricing.youtube.visualizacoes },
    { value: 'youtube-curtidas', label: 'Curtidas YouTube ❤️', price: pricing.youtube.curtidas },
    { value: 'kwai-seguidores', label: 'Seguidores Kwai 🎬', price: pricing.kwai.seguidores },
    { value: 'kwai-curtidas', label: 'Curtidas Kwai ❤️', price: pricing.kwai.curtidas },
    { value: 'facebook-seguidores', label: 'Seguidores Facebook 👥', price: pricing.facebook.seguidores },
    { value: 'facebook-curtidas', label: 'Curtidas Facebook ❤️', price: pricing.facebook.curtidas }
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

  const addSubscription = () => {
    if (!newSubscription.name || !newSubscription.email || !newSubscription.phone) return

    const today = new Date()
    const expiryDate = new Date(today)
    expiryDate.setDate(today.getDate() + 30)

    const subscription: ChatGPTSubscription = {
      id: Date.now().toString(),
      name: newSubscription.name,
      email: newSubscription.email,
      phone: newSubscription.phone,
      purchaseDate: today.toISOString().split('T')[0],
      expiryDate: expiryDate.toISOString().split('T')[0],
      value: newSubscription.value,
      isActive: true
    }

    const updatedSubscriptions = [...subscriptions, subscription]
    setSubscriptions(updatedSubscriptions)
    localStorage.setItem('hypefy-subscriptions', JSON.stringify(updatedSubscriptions))

    setNewSubscription({ name: '', email: '', phone: '', value: 20 })
  }

  const deleteSubscription = (id: string) => {
    const updatedSubscriptions = subscriptions.filter(sub => sub.id !== id)
    setSubscriptions(updatedSubscriptions)
    localStorage.setItem('hypefy-subscriptions', JSON.stringify(updatedSubscriptions))
  }

  const toggleSubscriptionStatus = (id: string) => {
    const updatedSubscriptions = subscriptions.map(sub =>
      sub.id === id ? { ...sub, isActive: !sub.isActive } : sub
    )
    setSubscriptions(updatedSubscriptions)
    localStorage.setItem('hypefy-subscriptions', JSON.stringify(updatedSubscriptions))
  }

  const isExpired = (expiryDate: string) => {
    return new Date(expiryDate) < new Date()
  }

  const PriceInput = ({ 
    label, 
    value, 
    onChange 
  }: { 
    label: string
    value: number
    onChange: (value: number) => void
  }) => (
    <div className="bg-white p-4 rounded-lg border border-gray-200 hover:border-[#ffa800] transition-colors">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="relative">
        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffa800] focus:border-transparent"
          step="0.01"
          min="0"
        />
      </div>
      <p className="text-xs text-gray-500 mt-1">
        Preço para 1000 {label.toLowerCase()}
      </p>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-[#ffa800] to-[#ff8c00] rounded-full flex items-center justify-center">
                <span className="text-xl">🚀</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">
                Painel Administrativo
              </h1>
            </div>
            
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-red-600 transition-colors"
            >
              <LogOut size={16} />
              <span>Sair</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { id: 'pricing', label: 'Preços', icon: DollarSign },
              { id: 'message', label: 'Mensagem', icon: MessageSquare },
              { id: 'subscriptions', label: 'Assinaturas', icon: Users }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-[#ffa800] text-[#ffa800]'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon size={16} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Pricing Tab */}
        {activeTab === 'pricing' && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-semibold text-gray-900">Gerenciar Preços</h2>
              <button
                onClick={handleSavePricing}
                className={`flex items-center gap-2 px-6 py-2 rounded-lg font-semibold transition-all ${
                  saved 
                    ? 'bg-green-500 text-white' 
                    : 'bg-[#ffa800] text-white hover:bg-[#ff8c00]'
                }`}
              >
                <Save size={16} />
                {saved ? 'Salvo!' : 'Salvar'}
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {/* Instagram */}
              <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-6 rounded-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl">📷</span>
                  <h3 className="text-xl font-bold text-gray-900">Instagram</h3>
                </div>
                <div className="space-y-4">
                  <PriceInput
                    label="Seguidores Mundiais"
                    value={pricing.instagram.mundial}
                    onChange={(value) => updatePrice('instagram', 'mundial', value)}
                  />
                  <PriceInput
                    label="Seguidores Brasileiros"
                    value={pricing.instagram.brasileiro}
                    onChange={(value) => updatePrice('instagram', 'brasileiro', value)}
                  />
                </div>
              </div>

              {/* TikTok */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl">🎵</span>
                  <h3 className="text-xl font-bold text-gray-900">TikTok</h3>
                </div>
                <div className="space-y-4">
                  <PriceInput
                    label="Seguidores Mundiais"
                    value={pricing.tiktok.mundial}
                    onChange={(value) => updatePrice('tiktok', 'mundial', value)}
                  />
                  <PriceInput
                    label="Seguidores Brasileiros"
                    value={pricing.tiktok.brasileiro}
                    onChange={(value) => updatePrice('tiktok', 'brasileiro', value)}
                  />
                  <PriceInput
                    label="Curtidas"
                    value={pricing.tiktok.curtidas}
                    onChange={(value) => updatePrice('tiktok', 'curtidas', value)}
                  />
                  <PriceInput
                    label="Visualizações"
                    value={pricing.tiktok.visualizacoes}
                    onChange={(value) => updatePrice('tiktok', 'visualizacoes', value)}
                  />
                </div>
              </div>

              {/* YouTube */}
              <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl">📺</span>
                  <h3 className="text-xl font-bold text-gray-900">YouTube</h3>
                </div>
                <div className="space-y-4">
                  <PriceInput
                    label="Inscrições"
                    value={pricing.youtube.inscricoes}
                    onChange={(value) => updatePrice('youtube', 'inscricoes', value)}
                  />
                  <PriceInput
                    label="Visualizações"
                    value={pricing.youtube.visualizacoes}
                    onChange={(value) => updatePrice('youtube', 'visualizacoes', value)}
                  />
                  <PriceInput
                    label="Curtidas"
                    value={pricing.youtube.curtidas}
                    onChange={(value) => updatePrice('youtube', 'curtidas', value)}
                  />
                </div>
              </div>

              {/* Kwai */}
              <div className="bg-gradient-to-br from-orange-50 to-yellow-50 p-6 rounded-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl">🎬</span>
                  <h3 className="text-xl font-bold text-gray-900">Kwai</h3>
                </div>
                <div className="space-y-4">
                  <PriceInput
                    label="Seguidores"
                    value={pricing.kwai.seguidores}
                    onChange={(value) => updatePrice('kwai', 'seguidores', value)}
                  />
                  <PriceInput
                    label="Curtidas"
                    value={pricing.kwai.curtidas}
                    onChange={(value) => updatePrice('kwai', 'curtidas', value)}
                  />
                </div>
              </div>

              {/* Facebook */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl">👥</span>
                  <h3 className="text-xl font-bold text-gray-900">Facebook</h3>
                </div>
                <div className="space-y-4">
                  <PriceInput
                    label="Seguidores"
                    value={pricing.facebook.seguidores}
                    onChange={(value) => updatePrice('facebook', 'seguidores', value)}
                  />
                  <PriceInput
                    label="Curtidas"
                    value={pricing.facebook.curtidas}
                    onChange={(value) => updatePrice('facebook', 'curtidas', value)}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Message Tab */}
        {activeTab === 'message' && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-8">Gerar Mensagem Personalizada</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Form */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Serviço
                    </label>
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Link do Pedido
                    </label>
                    <input
                      type="url"
                      value={orderLink}
                      onChange={(e) => setOrderLink(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffa800] focus:border-transparent"
                      placeholder="https://www.instagram.com/perfil"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Quantidade Inicial
                    </label>
                    <input
                      type="text"
                      value={initialQuantity}
                      onChange={(e) => setInitialQuantity(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffa800] focus:border-transparent"
                      placeholder="1.387"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Quantidade Solicitada
                    </label>
                    <input
                      type="number"
                      value={requestedQuantity}
                      onChange={(e) => setRequestedQuantity(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffa800] focus:border-transparent"
                      placeholder="800"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Data da Compra
                    </label>
                    <input
                      type="date"
                      value={purchaseDate}
                      onChange={(e) => setPurchaseDate(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffa800] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ID da Compra
                    </label>
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
              </div>

              {/* Generated Message */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Mensagem Gerada</h3>
                {generatedMessage ? (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono">
                      {generatedMessage}
                    </pre>
                    <button
                      onClick={() => navigator.clipboard.writeText(generatedMessage)}
                      className="mt-4 bg-[#ffa800] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#ff8c00] transition-colors"
                    >
                      Copiar Mensagem
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
        )}

        {/* Subscriptions Tab */}
        {activeTab === 'subscriptions' && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-8">Gerenciar Assinaturas ChatGPT</h2>
            
            {/* Add New Subscription */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Nova Assinatura</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome do Cliente
                  </label>
                  <input
                    type="text"
                    value={newSubscription.name}
                    onChange={(e) => setNewSubscription({...newSubscription, name: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffa800] focus:border-transparent"
                    placeholder="João Silva"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    E-mail
                  </label>
                  <input
                    type="email"
                    value={newSubscription.email}
                    onChange={(e) => setNewSubscription({...newSubscription, email: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffa800] focus:border-transparent"
                    placeholder="joao@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    value={newSubscription.phone}
                    onChange={(e) => setNewSubscription({...newSubscription, phone: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffa800] focus:border-transparent"
                    placeholder="(34) 99999-9999"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Valor (R$)
                  </label>
                  <input
                    type="number"
                    value={newSubscription.value}
                    onChange={(e) => setNewSubscription({...newSubscription, value: parseFloat(e.target.value) || 0})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffa800] focus:border-transparent"
                    step="0.01"
                    min="0"
                  />
                </div>
              </div>
              <button
                onClick={addSubscription}
                className="mt-4 flex items-center gap-2 bg-gradient-to-r from-[#ffa800] to-[#ff8c00] text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                <Plus size={16} />
                Adicionar Assinatura
              </button>
            </div>

            {/* Subscriptions List */}
            <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Cliente
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Contato
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Datas
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Valor
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {subscriptions.map((subscription) => (
                      <tr key={subscription.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-gradient-to-br from-[#ffa800] to-[#ff8c00] rounded-full flex items-center justify-center">
                              <User className="text-white" size={16} />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {subscription.name}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 flex items-center gap-1">
                            <Mail size={14} />
                            {subscription.email}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center gap-1">
                            <Phone size={14} />
                            {subscription.phone}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 flex items-center gap-1">
                            <Calendar size={14} />
                            Compra: {new Date(subscription.purchaseDate).toLocaleDateString('pt-BR')}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center gap-1">
                            <Calendar size={14} />
                            Expira: {new Date(subscription.expiryDate).toLocaleDateString('pt-BR')}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            R$ {subscription.value.toFixed(2)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              isExpired(subscription.expiryDate)
                                ? 'bg-red-100 text-red-800'
                                : subscription.isActive
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {isExpired(subscription.expiryDate) 
                                ? 'Expirado' 
                                : subscription.isActive 
                                ? 'Ativo' 
                                : 'Inativo'
                              }
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => toggleSubscriptionStatus(subscription.id)}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              {subscription.isActive ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                            <button
                              onClick={() => deleteSubscription(subscription.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {subscriptions.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    Nenhuma assinatura cadastrada
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}