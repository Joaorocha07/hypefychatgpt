'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Wallet, TrendingDown, AlertCircle } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode } from 'swiper/modules'
import useDashboardViewModel from './dashboardViewModel'

import 'swiper/css'
import 'swiper/css/free-mode'

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

const notices = [
  {
    title: 'Tempo de Entrega',
    description: 'Os pedidos são processados e entregues gradualmente para garantir maior naturalidade.',
    icon: AlertCircle
  },
  {
    title: 'Qualidade Garantida',
    description: 'Trabalhamos apenas com contas reais e ativas para garantir os melhores resultados.',
    icon: AlertCircle
  },
  {
    title: 'Suporte 24/7',
    description: 'Nossa equipe está disponível 24 horas por dia para ajudar você.',
    icon: AlertCircle
  }
]

export default function DashboardPage() {
  const { handlePlatformChange, handleSubmit, orderDetails, selectedPlatform, setOrderDetails } = useDashboardViewModel()

  return (
    <div className="space-y-6">
      {/* Balance Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="p-6 bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex items-center space-x-4">
            <div className="rounded-full bg-primary/10 p-3">
              <Wallet className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Saldo Disponível</p>
              <h3 className="text-2xl font-bold">R$ 1.000,00</h3>
            </div>
          </div>
          <Button className="mt-4 w-full bg-primary hover:bg-primary/90" size="sm">
            Adicionar Saldo
          </Button>
        </Card>
        <Card className="p-6 bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300">
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

      {/* Platform Filter - Desktop */}
      <div className="hidden md:flex flex-wrap gap-2">
        {socialPlatforms.map((platform) => (
          <Button
            key={platform.id}
            variant={selectedPlatform === platform.id ? 'default' : 'outline'}
            className="flex items-center space-x-2 transition-all hover:scale-105 bg-white dark:bg-gray-800 shadow-sm"
            onClick={() => handlePlatformChange(platform.id)}
          >
            <span className="text-xl">{platform.icon}</span>
            <span>{platform.name}</span>
          </Button>
        ))}
      </div>

      {/* Platform Filter - Mobile Carousel */}
      <div className="md:hidden">
        <Swiper
          modules={[FreeMode]}
          spaceBetween={10}
          slidesPerView="auto"
          freeMode={true}
          className="w-full"
        >
          {socialPlatforms.map((platform) => (
            <SwiperSlide key={platform.id} style={{ width: 'auto' }}>
              <Button
                variant={selectedPlatform === platform.id ? 'default' : 'outline'}
                className="flex items-center space-x-2 whitespace-nowrap bg-white dark:bg-gray-800 shadow-sm"
                onClick={() => handlePlatformChange(platform.id)}
              >
                <span className="text-xl">{platform.icon}</span>
                <span>{platform.name}</span>
              </Button>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="grid lg:grid-cols-[2fr,1fr] gap-6">
        {/* Order Form */}
        <Card className="p-6 bg-white dark:bg-gray-800 shadow-lg">
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
                <SelectTrigger className="w-full">
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
                <SelectTrigger className="w-full">
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

            <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
              Enviar Pedido
            </Button>
          </form>
        </Card>

        {/* Notices Section */}
        <div className="space-y-4 lg:mt-0">
          {notices.map((notice, index) => (
            <Card key={index} className="p-4 bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-300">
              <div className="flex items-start space-x-3">
                <div className="rounded-full bg-primary/10 p-2">
                  <notice.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{notice.title}</h4>
                  <p className="text-sm text-muted-foreground">{notice.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}