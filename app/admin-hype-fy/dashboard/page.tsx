'use client'

import { useState, useEffect } from 'react'
import { LogOut, DollarSign, MessageSquare, Users, UserPlus, Tv } from 'lucide-react'

import PricingManager from './components/PricingManager'
import MessageGenerator from './components/MessageGenerator'
import ChatGPTManager from './components/ChatGPTManager'
import ClientsManager from './components/ClientsManager'
import StreamingManager from './components/StreamingManager'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('clients')

  // Verificar autenticação
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('hypefy-admin-logged')
    if (isLoggedIn !== 'true') {
      window.location.href = '/admin-hype-fy'
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('hypefy-admin-logged')
    window.location.href = '/admin-hype-fy'
  }

  const tabs = [
    { id: 'clients', label: 'Clientes', icon: UserPlus },
    { id: 'pricing', label: 'Preços', icon: DollarSign },
    { id: 'message', label: 'Mensagens', icon: MessageSquare },
    { id: 'chatgpt', label: 'ChatGPT', icon: Users },
    { id: 'streaming', label: 'Streaming', icon: Tv }
  ]

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
          <div className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
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
        {activeTab === 'clients' && <ClientsManager />}
        {activeTab === 'pricing' && <PricingManager />}
        {activeTab === 'message' && <MessageGenerator />}
        {activeTab === 'chatgpt' && <ChatGPTManager />}
        {activeTab === 'streaming' && <StreamingManager />}
      </div>
    </div>
  )
}