'use client'

import { useState, useEffect } from 'react'
import { Plus, Eye, EyeOff, Trash2, User, Calendar, Mail, Phone, DollarSign } from 'lucide-react'

interface Client {
  id: string
  name: string
  email: string
  whatsapp: string
}

interface ChatGPTAccount {
  id: string
  email: string
  emailPassword: string
  chatGPTPassword: string
  accountName: string
  isAvailable: boolean
  createdAt: string
}

interface ChatGPTSubscription {
  id: string
  clientId: string
  clientName: string
  clientPhone: string
  accountId: string
  accountEmail: string
  purchaseDate: string
  expiryDate: string
  value: number
  isActive: boolean
}

export default function ChatGPTManager() {
  const [clients, setClients] = useState<Client[]>([])
  const [accounts, setAccounts] = useState<ChatGPTAccount[]>([])
  const [subscriptions, setSubscriptions] = useState<ChatGPTSubscription[]>([])
  const [activeTab, setActiveTab] = useState('accounts')

  // New account form
  const [newAccount, setNewAccount] = useState({
    email: '',
    emailPassword: '',
    chatGPTPassword: '',
    accountName: ''
  })

  // New subscription form
  const [newSubscription, setNewSubscription] = useState({
    clientSearch: '',
    selectedClient: null as Client | null,
    accountId: '',
    value: 20
  })

  useEffect(() => {
    const savedClients = localStorage.getItem('hypefy-clients')
    if (savedClients) {
      setClients(JSON.parse(savedClients))
    }

    const savedAccounts = localStorage.getItem('hypefy-chatgpt-accounts')
    if (savedAccounts) {
      setAccounts(JSON.parse(savedAccounts))
    }

    const savedSubscriptions = localStorage.getItem('hypefy-chatgpt-subscriptions')
    if (savedSubscriptions) {
      setSubscriptions(JSON.parse(savedSubscriptions))
    }
  }, [])

  const addAccount = () => {
    if (!newAccount.email || !newAccount.emailPassword || !newAccount.chatGPTPassword || !newAccount.accountName) return

    const account: ChatGPTAccount = {
      id: Date.now().toString(),
      email: newAccount.email,
      emailPassword: newAccount.emailPassword,
      chatGPTPassword: newAccount.chatGPTPassword,
      accountName: newAccount.accountName,
      isAvailable: true,
      createdAt: new Date().toISOString().split('T')[0]
    }

    const updatedAccounts = [...accounts, account]
    setAccounts(updatedAccounts)
    localStorage.setItem('hypefy-chatgpt-accounts', JSON.stringify(updatedAccounts))
    setNewAccount({ email: '', emailPassword: '', chatGPTPassword: '', accountName: '' })
  }

  const deleteAccount = (id: string) => {
    const updatedAccounts = accounts.filter(account => account.id !== id)
    setAccounts(updatedAccounts)
    localStorage.setItem('hypefy-chatgpt-accounts', JSON.stringify(updatedAccounts))
  }

  const toggleAccountAvailability = (id: string) => {
    const updatedAccounts = accounts.map(account =>
      account.id === id ? { ...account, isAvailable: !account.isAvailable } : account
    )
    setAccounts(updatedAccounts)
    localStorage.setItem('hypefy-chatgpt-accounts', JSON.stringify(updatedAccounts))
  }

  const addSubscription = () => {
    if (!newSubscription.selectedClient || !newSubscription.accountId) return

    const selectedAccount = accounts.find(acc => acc.id === newSubscription.accountId)
    if (!selectedAccount) return

    const today = new Date()
    const expiryDate = new Date(today)
    expiryDate.setDate(today.getDate() + 30)

    const subscription: ChatGPTSubscription = {
      id: Date.now().toString(),
      clientId: newSubscription.selectedClient.id,
      clientName: newSubscription.selectedClient.name,
      clientPhone: newSubscription.selectedClient.whatsapp,
      accountId: newSubscription.accountId,
      accountEmail: selectedAccount.email,
      purchaseDate: today.toISOString().split('T')[0],
      expiryDate: expiryDate.toISOString().split('T')[0],
      value: newSubscription.value,
      isActive: true
    }

    const updatedSubscriptions = [...subscriptions, subscription]
    setSubscriptions(updatedSubscriptions)
    localStorage.setItem('hypefy-chatgpt-subscriptions', JSON.stringify(updatedSubscriptions))

    // Mark account as unavailable
    toggleAccountAvailability(newSubscription.accountId)

    setNewSubscription({
      clientSearch: '',
      selectedClient: null,
      accountId: '',
      value: 20
    })
  }

  const deleteSubscription = (id: string) => {
    const subscription = subscriptions.find(sub => sub.id === id)
    if (subscription) {
      // Mark account as available again
      const updatedAccounts = accounts.map(account =>
        account.id === subscription.accountId ? { ...account, isAvailable: true } : account
      )
      setAccounts(updatedAccounts)
      localStorage.setItem('hypefy-chatgpt-accounts', JSON.stringify(updatedAccounts))
    }

    const updatedSubscriptions = subscriptions.filter(sub => sub.id !== id)
    setSubscriptions(updatedSubscriptions)
    localStorage.setItem('hypefy-chatgpt-subscriptions', JSON.stringify(updatedSubscriptions))
  }

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(newSubscription.clientSearch.toLowerCase()) ||
    client.whatsapp.includes(newSubscription.clientSearch)
  )

  const availableAccounts = accounts.filter(account => account.isAvailable)

  const isExpired = (expiryDate: string) => {
    return new Date(expiryDate) < new Date()
  }

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-8">Gerenciar ChatGPT</h2>
      
      {/* Tabs */}
      <div className="flex space-x-4 mb-8">
        <button
          onClick={() => setActiveTab('accounts')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === 'accounts'
              ? 'bg-[#ffa800] text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Contas ChatGPT ({accounts.length})
        </button>
        <button
          onClick={() => setActiveTab('subscriptions')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === 'subscriptions'
              ? 'bg-[#ffa800] text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Assinaturas ({subscriptions.length})
        </button>
      </div>

      {/* Accounts Tab */}
      {activeTab === 'accounts' && (
        <div>
          {/* Add New Account */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Nova Conta ChatGPT</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  E-mail da Conta
                </label>
                <input
                  type="email"
                  value={newAccount.email}
                  onChange={(e) => setNewAccount({...newAccount, email: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffa800] focus:border-transparent"
                  placeholder="conta@gmail.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Senha do E-mail
                </label>
                <input
                  type="password"
                  value={newAccount.emailPassword}
                  onChange={(e) => setNewAccount({...newAccount, emailPassword: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffa800] focus:border-transparent"
                  placeholder="senha123"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Senha do ChatGPT
                </label>
                <input
                  type="password"
                  value={newAccount.chatGPTPassword}
                  onChange={(e) => setNewAccount({...newAccount, chatGPTPassword: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffa800] focus:border-transparent"
                  placeholder="chatgpt123"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome da Conta
                </label>
                <input
                  type="text"
                  value={newAccount.accountName}
                  onChange={(e) => setNewAccount({...newAccount, accountName: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffa800] focus:border-transparent"
                  placeholder="Conta Premium 1"
                />
              </div>
            </div>
            <button
              onClick={addAccount}
              className="mt-4 flex items-center gap-2 bg-gradient-to-r from-[#ffa800] to-[#ff8c00] text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              <Plus size={16} />
              Adicionar Conta
            </button>
          </div>

          {/* Accounts List */}
          <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Conta
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Credenciais
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
                  {accounts.map((account) => (
                    <tr key={account.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {account.accountName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {account.email}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          E-mail: ••••••••
                        </div>
                        <div className="text-sm text-gray-500">
                          ChatGPT: ••••••••
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          account.isAvailable
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {account.isAvailable ? 'Disponível' : 'Em uso'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => toggleAccountAvailability(account.id)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            {account.isAvailable ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                          <button
                            onClick={() => deleteAccount(account.id)}
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
              {accounts.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  Nenhuma conta cadastrada
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Subscriptions Tab */}
      {activeTab === 'subscriptions' && (
        <div>
          {/* Add New Subscription */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Nova Assinatura</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                  Conta ChatGPT
                </label>
                <select
                  value={newSubscription.accountId}
                  onChange={(e) => setNewSubscription({...newSubscription, accountId: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffa800] focus:border-transparent"
                >
                  <option value="">Selecione uma conta</option>
                  {availableAccounts.map((account) => (
                    <option key={account.id} value={account.id}>
                      {account.accountName} - {account.email}
                    </option>
                  ))}
                </select>
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
                      Conta
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
                              {subscription.clientName}
                            </div>
                            <div className="text-sm text-gray-500">
                              {subscription.clientPhone}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {subscription.accountEmail}
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
  )
}