'use client'

import { useState, useEffect } from 'react'
import { Plus, Search, Trash2, User, Calendar, DollarSign, TrendingUp } from 'lucide-react'

interface Client {
  id: string
  name: string
  email: string
  whatsapp: string
}

interface StreamingSubscription {
  id: string
  clientId: string
  clientName: string
  clientPhone: string
  service: string
  purchaseSource: string
  purchaseCost: number
  salePrice: number
  purchaseDate: string
  expiryDate: string
  isActive: boolean
}

const streamingServices = [
  'Netflix',
  'Prime Video',
  'HBO Max',
  'Disney+',
  'Paramount+',
  'IPTV',
  'Crunchyroll',
  'Spotify',
  'YouTube Premium',
  'Apple TV+',
  'Globoplay',
  'Amazon Music'
]

export default function StreamingManager() {
  const [clients, setClients] = useState<Client[]>([])
  const [subscriptions, setSubscriptions] = useState<StreamingSubscription[]>([])
  const [searchTerm, setSearchTerm] = useState('')

  const [newSubscription, setNewSubscription] = useState({
    clientSearch: '',
    selectedClient: null as Client | null,
    service: '',
    purchaseSource: '',
    purchaseCost: 0,
    salePrice: 0
  })

  useEffect(() => {
    const savedClients = localStorage.getItem('hypefy-clients')
    if (savedClients) {
      setClients(JSON.parse(savedClients))
    }

    const savedSubscriptions = localStorage.getItem('hypefy-streaming-subscriptions')
    if (savedSubscriptions) {
      setSubscriptions(JSON.parse(savedSubscriptions))
    }
  }, [])

  const addSubscription = () => {
    if (!newSubscription.selectedClient || !newSubscription.service || !newSubscription.purchaseSource) return

    const today = new Date()
    const expiryDate = new Date(today)
    expiryDate.setDate(today.getDate() + 30)

    const subscription: StreamingSubscription = {
      id: Date.now().toString(),
      clientId: newSubscription.selectedClient.id,
      clientName: newSubscription.selectedClient.name,
      clientPhone: newSubscription.selectedClient.whatsapp,
      service: newSubscription.service,
      purchaseSource: newSubscription.purchaseSource,
      purchaseCost: newSubscription.purchaseCost,
      salePrice: newSubscription.salePrice,
      purchaseDate: today.toISOString().split('T')[0],
      expiryDate: expiryDate.toISOString().split('T')[0],
      isActive: true
    }

    const updatedSubscriptions = [...subscriptions, subscription]
    setSubscriptions(updatedSubscriptions)
    localStorage.setItem('hypefy-streaming-subscriptions', JSON.stringify(updatedSubscriptions))

    setNewSubscription({
      clientSearch: '',
      selectedClient: null,
      service: '',
      purchaseSource: '',
      purchaseCost: 0,
      salePrice: 0
    })
  }

  const deleteSubscription = (id: string) => {
    const updatedSubscriptions = subscriptions.filter(sub => sub.id !== id)
    setSubscriptions(updatedSubscriptions)
    localStorage.setItem('hypefy-streaming-subscriptions', JSON.stringify(updatedSubscriptions))
  }

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(newSubscription.clientSearch.toLowerCase()) ||
    client.whatsapp.includes(newSubscription.clientSearch)
  )

  const filteredSubscriptions = subscriptions.filter(sub =>
    sub.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sub.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sub.clientPhone.includes(searchTerm)
  )

  const isExpired = (expiryDate: string) => {
    return new Date(expiryDate) < new Date()
  }

  const totalProfit = subscriptions.reduce((total, sub) => total + (sub.salePrice - sub.purchaseCost), 0)
  const totalRevenue = subscriptions.reduce((total, sub) => total + sub.salePrice, 0)
  const totalCosts = subscriptions.reduce((total, sub) => total + sub.purchaseCost, 0)

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-8">Gerenciar Assinaturas de Streaming</h2>
      
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Assinaturas</p>
              <p className="text-2xl font-bold text-gray-900">{subscriptions.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="text-blue-600" size={24} />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Receita Total</p>
              <p className="text-2xl font-bold text-green-600">R$ {totalRevenue.toFixed(2)}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <DollarSign className="text-green-600" size={24} />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Custos Totais</p>
              <p className="text-2xl font-bold text-red-600">R$ {totalCosts.toFixed(2)}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <DollarSign className="text-red-600" size={24} />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Lucro Total</p>
              <p className="text-2xl font-bold text-[#ffa800]">R$ {totalProfit.toFixed(2)}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <TrendingUp className="text-[#ffa800]" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Add New Subscription */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Nova Assinatura</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Buscar Cliente
            </label>
            <input
              type="text"
              value={newSubscription.clientSearch}
              onChange={(e) => setNewSubscription({...newSubscription, clientSearch: e.target.value, selectedClient: null})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffa800] focus:border-transparent"
              placeholder="Nome ou telefone do cliente"
            />
            {newSubscription.clientSearch && (
              <div className="mt-2 max-h-32 overflow-y-auto border border-gray-200 rounded-lg">
                {filteredClients.map((client) => (
                  <button
                    key={client.id}
                    onClick={() => setNewSubscription({...newSubscription, selectedClient: client, clientSearch: client.name})}
                    className="w-full text-left px-3 py-2 hover:bg-gray-50 text-sm"
                  >
                    {client.name} - {client.whatsapp}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Serviço
            </label>
            <select
              value={newSubscription.service}
              onChange={(e) => setNewSubscription({...newSubscription, service: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffa800] focus:border-transparent"
            >
              <option value="">Selecione um serviço</option>
              {streamingServices.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Onde Comprei
            </label>
            <input
              type="text"
              value={newSubscription.purchaseSource}
              onChange={(e) => setNewSubscription({...newSubscription, purchaseSource: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffa800] focus:border-transparent"
              placeholder="Ex: Mercado Livre, Site oficial..."
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Valor que Paguei (R$)
            </label>
            <input
              type="number"
              value={newSubscription.purchaseCost}
              onChange={(e) => setNewSubscription({...newSubscription, purchaseCost: parseFloat(e.target.value) || 0})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffa800] focus:border-transparent"
              step="0.01"
              min="0"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Valor que Vendi (R$)
            </label>
            <input
              type="number"
              value={newSubscription.salePrice}
              onChange={(e) => setNewSubscription({...newSubscription, salePrice: parseFloat(e.target.value) || 0})}
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

      {/* Search */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffa800] focus:border-transparent"
            placeholder="Buscar por cliente, serviço ou telefone..."
          />
        </div>
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
                  Serviço
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Valores
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Datas
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lucro
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
              {filteredSubscriptions.map((subscription) => (
                <tr key={subscription.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#ffa800] to-[#ff8c00] rounded-full flex items-center justify-center">
                        <User className="text-white" size={16} />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {subscription.clientName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {subscription.clientPhone}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {subscription.service}
                    </div>
                    <div className="text-sm text-gray-500">
                      {subscription.purchaseSource}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      Pago: R$ {subscription.purchaseCost.toFixed(2)}
                    </div>
                    <div className="text-sm text-gray-900">
                      Vendido: R$ {subscription.salePrice.toFixed(2)}
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
                    <div className={`text-sm font-medium ${
                      (subscription.salePrice - subscription.purchaseCost) > 0 
                        ? 'text-green-600' 
                        : 'text-red-600'
                    }`}>
                      R$ {(subscription.salePrice - subscription.purchaseCost).toFixed(2)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
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
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => deleteSubscription(subscription.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredSubscriptions.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              {searchTerm ? 'Nenhuma assinatura encontrada' : 'Nenhuma assinatura cadastrada'}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}