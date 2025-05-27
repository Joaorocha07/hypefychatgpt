'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Filter,
  Search,
  ChevronDown,
  ChevronUp,
  Headphones
} from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface Order {
  id: string
  name: string
  date: string
  status: string
  initialCount: number
  quantity: number
  remaining: number
  value: number
}

const orders: Order[] = [
  {
    id: '798851',
    name: 'Facebook Seguidores de Perfil ou Página ➡️ [ +5K/Dia | Recarga: 30 Dias ] ♻️',
    date: '2024-03-26 14:30',
    status: 'Concluído',
    initialCount: 11589,
    quantity: 300,
    remaining: 0,
    value: 2.16
  },
  {
    id: '798852',
    name: 'Instagram Seguidores Brasileiros ➡️ [ Reais | Ativos | Rápidos ]',
    date: '2024-03-26 15:45',
    status: 'Em progresso',
    initialCount: 5000,
    quantity: 1000,
    remaining: 500,
    value: 5.99
  },
  {
    id: '798853',
    name: 'TikTok Visualizações ➡️ [ Rápidas | Garantidas ]',
    date: '2024-03-26 16:20',
    status: 'Cancelado',
    initialCount: 2000,
    quantity: 5000,
    remaining: 5000,
    value: 3.50
  }
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Concluído':
    case 'Em progresso':
      return '#104238'
    case 'Cancelado':
      return '#502438'
    case 'Parcial':
      return '#303439'
    default:
      return 'gray'
  }
}

export default function OrdersPage() {
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const toggleOrder = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId)
  }

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.includes(searchTerm)
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Pedidos</h2>

      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 flex gap-4">
            <Button
              variant="outline"
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              <Select
                value={statusFilter}
                onValueChange={setStatusFilter}
              >
                <SelectTrigger className="border-0 p-0 hover:bg-transparent focus:ring-0">
                  <SelectValue placeholder="Filtrar pedidos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tudo</SelectItem>
                  <SelectItem value="Pendente">Pendente</SelectItem>
                  <SelectItem value="Em progresso">Em progresso</SelectItem>
                  <SelectItem value="Concluído">Concluído</SelectItem>
                  <SelectItem value="Parcial">Parcial</SelectItem>
                  <SelectItem value="Processando">Processando</SelectItem>
                  <SelectItem value="Cancelado">Cancelado</SelectItem>
                </SelectContent>
              </Select>
            </Button>
          </div>
          <div className="relative flex-1 md:max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Pesquisar"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </Card>

      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <Card key={order.id} className="p-4">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="flex-1">
                <div className="flex items-start gap-4">
                  <span className="text-sm font-medium text-muted-foreground">
                    #{order.id}
                  </span>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium">{order.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(order.date).toLocaleString('pt-BR')}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Badge
                  style={{
                    backgroundColor: getStatusColor(order.status),
                    color: 'white'
                  }}
                >
                  {order.status}
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleOrder(order.id)}
                >
                  {expandedOrder === order.id ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            {expandedOrder === order.id && (
              <div className="mt-4 pt-4 border-t">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Valor</p>
                    <p className="text-sm font-medium">R$ {order.value.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Contagem inicial</p>
                    <p className="text-sm font-medium">{order.initialCount}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Quantidade</p>
                    <p className="text-sm font-medium">{order.quantity}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Restam</p>
                    <p className="text-sm font-medium">{order.remaining}</p>
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <Button variant="destructive" size="sm">
                    Cancelar
                  </Button>
                  <Button
                    size="sm"
                    className="bg-[#fbc94c] text-black hover:bg-[#fbc94c]/90"
                  >
                    <Headphones className="h-4 w-4 mr-2" />
                    Suporte
                  </Button>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}