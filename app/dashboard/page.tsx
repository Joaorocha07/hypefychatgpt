'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Wallet, TrendingDown } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const socialPlatforms = [
  { id: 'all', name: 'Todos', icon: '🌐' },
  { id: 'instagram', name: 'Instagram', icon: '📸' },
  { id: 'twitter', name: 'Twitter', icon: '🐦' },
  { id: 'tiktok', name: 'TikTok', icon: '🎵' },
  { id: 'youtube', name: 'YouTube', icon: '▶️' },
  { id: 'facebook', name: 'Facebook', icon: '👤' },
  { id: 'telegram', name: 'Telegram', icon: '📱' },
  { id: 'twitch', name: 'Twitch', icon: '🎮' },
  { id: 'discord', name: 'Discord', icon: '💬' }
]

export default function DashboardPage() {
  const [selectedPlatform, setSelectedPlatform] = useState('all')
  const [orderDetails, setOrderDetails] = useState({
    category: '',
    service: '',
    description: '',
    link: '',
    quantity: '',
  })

  const handlePlatformChange = (platform: string) => {
    setSelectedPlatform(platform)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Order submitted:', orderDetails)
  }

  return (
    <div className="space-y-6">
      {/* Balance Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <div className="rounded-full bg-primary/10 p-3">
              <Wallet className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Saldo Disponível</p>
              <h3 className="text-2xl font-bold">R$ 1.000,00</h3>
            </div>
          </div>
          <Button className="mt-4 w-full" size="sm">
            Adicionar Saldo
          </Button>
        </Card>
        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <div className="rounded-full bg-destructive/10 p-3">
              <TrendingDown className="h-6 w-6 text-destructive" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Saldo Gasto</p>
              <h3 className="text-2xl font-bold">R$ 500,00</h3>
            </div>
          </div>
        </Card>
      </div>

      {/* Platform Filter */}
      <div className="flex flex-wrap gap-2">
        {socialPlatforms.map((platform) => (
          <Button
            key={platform.id}
            variant={selectedPlatform === platform.id ? 'default' : 'outline'}
            className="flex items-center space-x-2 transition-all hover:scale-105"
            onClick={() => handlePlatformChange(platform.id)}
          >
            <span>{platform.icon}</span>
            <span>{platform.name}</span>
          </Button>
        ))}
      </div>

      {/* Order Form */}
      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="search">Pesquisar Serviço</Label>
            <Input
              id="search"
              type="search"
              placeholder="Digite para pesquisar..."
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Categoria</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="followers">Seguidores</SelectItem>
                <SelectItem value="likes">Curtidas</SelectItem>
                <SelectItem value="views">Visualizações</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="service">Serviço</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um serviço" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="service1">Serviço 1</SelectItem>
                <SelectItem value="service2">Serviço 2</SelectItem>
                <SelectItem value="service3">Serviço 3</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Input
              id="description"
              placeholder="Descrição do serviço"
              value={orderDetails.description}
              onChange={(e) => setOrderDetails({ ...orderDetails, description: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="link">Link</Label>
            <Input
              id="link"
              placeholder="Link do perfil/post"
              value={orderDetails.link}
              onChange={(e) => setOrderDetails({ ...orderDetails, link: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="quantity">Quantidade</Label>
            <Input
              id="quantity"
              type="number"
              placeholder="Quantidade desejada"
              value={orderDetails.quantity}
              onChange={(e) => setOrderDetails({ ...orderDetails, quantity: e.target.value })}
            />
          </div>

          <div className="rounded-lg bg-muted p-4">
            <p className="text-sm text-muted-foreground">Tempo médio de entrega: 24-48 horas</p>
            <p className="mt-2 text-lg font-bold">Valor Total: R$ 50,00</p>
          </div>

          <Button type="submit" className="w-full">
            Enviar Pedido
          </Button>
        </form>
      </Card>
    </div>
  )
}