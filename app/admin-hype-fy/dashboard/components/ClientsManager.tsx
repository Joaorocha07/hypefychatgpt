'use client'

import { useState, useEffect } from 'react'
import { Plus, Search, Edit, Trash2, User } from 'lucide-react'

interface Client {
  id: string
  name: string
  email: string
  whatsapp: string
  createdAt: string
}

export default function ClientsManager() {
  const [clients, setClients] = useState<Client[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [newClient, setNewClient] = useState({
    name: '',
    email: '',
    whatsapp: ''
  })
  const [editingClient, setEditingClient] = useState<Client | null>(null)

  useEffect(() => {
    const savedClients = localStorage.getItem('hypefy-clients')
    if (savedClients) {
      setClients(JSON.parse(savedClients))
    }
  }, [])

  const saveClients = (updatedClients: Client[]) => {
    setClients(updatedClients)
    localStorage.setItem('hypefy-clients', JSON.stringify(updatedClients))
  }

  const addClient = () => {
    if (!newClient.name || !newClient.email || !newClient.whatsapp) return

    const client: Client = {
      id: Date.now().toString(),
      name: newClient.name,
      email: newClient.email,
      whatsapp: newClient.whatsapp,
      createdAt: new Date().toISOString().split('T')[0]
    }

    const updatedClients = [...clients, client]
    saveClients(updatedClients)
    setNewClient({ name: '', email: '', whatsapp: '' })
  }

  const updateClient = () => {
    if (!editingClient) return

    const updatedClients = clients.map(client =>
      client.id === editingClient.id ? editingClient : client
    )
    saveClients(updatedClients)
    setEditingClient(null)
  }

  const deleteClient = (id: string) => {
    const updatedClients = clients.filter(client => client.id !== id)
    saveClients(updatedClients)
  }

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.whatsapp.includes(searchTerm)
  )

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-8">Gerenciar Clientes</h2>
      
      {/* Add New Client */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {editingClient ? 'Editar Cliente' : 'Novo Cliente'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nome Completo
            </label>
            <input
              type="text"
              value={editingClient ? editingClient.name : newClient.name}
              onChange={(e) => editingClient 
                ? setEditingClient({...editingClient, name: e.target.value})
                : setNewClient({...newClient, name: e.target.value})
              }
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
              value={editingClient ? editingClient.email : newClient.email}
              onChange={(e) => editingClient 
                ? setEditingClient({...editingClient, email: e.target.value})
                : setNewClient({...newClient, email: e.target.value})
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffa800] focus:border-transparent"
              placeholder="joao@email.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              WhatsApp
            </label>
            <input
              type="tel"
              value={editingClient ? editingClient.whatsapp : newClient.whatsapp}
              onChange={(e) => editingClient 
                ? setEditingClient({...editingClient, whatsapp: e.target.value})
                : setNewClient({...newClient, whatsapp: e.target.value})
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffa800] focus:border-transparent"
              placeholder="(34) 99999-9999"
            />
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <button
            onClick={editingClient ? updateClient : addClient}
            className="flex items-center gap-2 bg-gradient-to-r from-[#ffa800] to-[#ff8c00] text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            <Plus size={16} />
            {editingClient ? 'Atualizar Cliente' : 'Adicionar Cliente'}
          </button>
          {editingClient && (
            <button
              onClick={() => setEditingClient(null)}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
          )}
        </div>
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
            placeholder="Buscar por nome, email ou telefone..."
          />
        </div>
      </div>

      {/* Clients List */}
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
                  Data Cadastro
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredClients.map((client) => (
                <tr key={client.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#ffa800] to-[#ff8c00] rounded-full flex items-center justify-center">
                        <User className="text-white" size={16} />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {client.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{client.email}</div>
                    <div className="text-sm text-gray-500">{client.whatsapp}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(client.createdAt).toLocaleDateString('pt-BR')}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setEditingClient(client)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => deleteClient(client.id)}
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
          {filteredClients.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              {searchTerm ? 'Nenhum cliente encontrado' : 'Nenhum cliente cadastrado'}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}