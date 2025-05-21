'use client'

import { useState } from 'react'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import {
  AlertCircle,
  CreditCard,
  DollarSign,
  Facebook,
  FileText,
  HelpCircle,
  Instagram,
  Layout,
  LogOut,
  Menu,
  MessageSquare,
  Moon,
  RefreshCcw,
  Settings,
  ShoppingCart,
  Sun,
  Twitch,
  Twitter,
  User,
  Youtube
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const socialPlatforms = [
  { name: 'Todos', icon: Layout },
  { name: 'Instagram', icon: Instagram },
  { name: 'Twitter', icon: Twitter },
  { name: 'TikTok', icon: Layout },
  { name: 'YouTube', icon: Youtube },
  { name: 'Facebook', icon: Facebook },
  { name: 'Telegram', icon: MessageSquare },
  { name: 'Twitch', icon: Twitch },
  { name: 'Discord', icon: MessageSquare }
]

export default function DashboardPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const { theme, setTheme } = useTheme()
  const [selectedPlatform, setSelectedPlatform] = useState('Todos')

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen transition-transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } bg-card border-r w-64`}
      >
        <div className="h-full px-3 py-4 flex flex-col">
          <div className="flex items-center justify-between mb-8 px-2">
            <span className="text-2xl font-bold">Hype Fy</span>
            <Button variant="ghost" size="icon" onClick={toggleSidebar}>
              <Menu className="h-5 w-5" />
            </Button>
          </div>

          <nav className="space-y-2 flex-1">
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/dashboard">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Novo Pedido
              </Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/dashboard/multi">
                <Layout className="mr-2 h-5 w-5" />
                Multi Pedidos
              </Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/dashboard/balance">
                <CreditCard className="mr-2 h-5 w-5" />
                Adicionar Saldo
              </Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/dashboard/orders">
                <FileText className="mr-2 h-5 w-5" />
                Pedidos
              </Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/dashboard/refunds">
                <RefreshCcw className="mr-2 h-5 w-5" />
                Reembolsos
              </Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/dashboard/support">
                <HelpCircle className="mr-2 h-5 w-5" />
                Suporte
              </Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/dashboard/services">
                <Settings className="mr-2 h-5 w-5" />
                Serviços
              </Link>
            </Button>
          </nav>

          <div className="border-t pt-4 space-y-2">
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/dashboard/profile">
                <User className="mr-2 h-5 w-5" />
                Perfil
              </Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
              {theme === 'dark' ? (
                <Sun className="mr-2 h-5 w-5" />
              ) : (
                <Moon className="mr-2 h-5 w-5" />
              )}
              {theme === 'dark' ? 'Modo Claro' : 'Modo Escuro'}
            </Button>
            <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-100/10">
              <LogOut className="mr-2 h-5 w-5" />
              Sair
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className={`p-4 sm:p-6 lg:p-8 ${isSidebarOpen ? 'ml-64' : '0'}`}>
        <div className="grid gap-6">
          {/* Balance Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
            <Card className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-green-100 rounded-full dark:bg-green-900">
                  <DollarSign className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Saldo Disponível</p>
                  <h3 className="text-2xl font-bold">R$ 1.500,00</h3>
                </div>
              </div>
              <Button className="w-full mt-4" asChild>
                <Link href="/dashboard/balance">Adicionar Saldo</Link>
              </Button>
            </Card>

            <Card className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-100 rounded-full dark:bg-blue-900">
                  <DollarSign className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Saldo Gasto</p>
                  <h3 className="text-2xl font-bold">R$ 3.250,00</h3>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4" asChild>
                <Link href="/dashboard/orders">Ver Histórico</Link>
              </Button>
            </Card>
          </div>

          {/* Platform Filter */}
          <div className="flex flex-wrap gap-2">
            {socialPlatforms.map((platform) => (
              <Button
                key={platform.name}
                variant={selectedPlatform === platform.name ? 'default' : 'outline'}
                className="flex items-center gap-2"
                onClick={() => setSelectedPlatform(platform.name)}
              >
                <platform.icon className="h-4 w-4" />
                {platform.name}
              </Button>
            ))}
          </div>

          {/* Order Form */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Novo Pedido</h2>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label>Categoria</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="followers">Seguidores</SelectItem>
                      <SelectItem value="likes">Curtidas</SelectItem>
                      <SelectItem value="views">Visualizações</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Serviço</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o serviço" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="service1">Seguidores Brasileiros</SelectItem>
                      <SelectItem value="service2">Seguidores Internacionais</SelectItem>
                      <SelectItem value="service3">Seguidores Premium</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Link</Label>
                  <Input placeholder="Cole o link aqui" />
                </div>

                <div className="space-y-2">
                  <Label>Quantidade</Label>
                  <Input type="number" placeholder="Digite a quantidade" min="1" />
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Tempo médio de entrega: 24-48 horas</p>
                  <p className="text-sm font-semibold">Valor: R$ 0,00</p>
                </div>

                <Button className="w-full">Enviar Pedido</Button>
              </form>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle className="h-5 w-5 text-yellow-500" />
                <h2 className="text-lg font-semibold">Informações Importantes</h2>
              </div>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>• Certifique-se de que o perfil está público</p>
                <p>• O link deve ser do perfil completo</p>
                <p>• Não altere o username durante o processo</p>
                <p>• A entrega é feita de forma gradual</p>
                <p>• Garantimos reposição em caso de queda</p>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/5511999999999"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors z-50"
      >
        <svg
          className="h-6 w-6"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
          />
        </svg>
      </a>
    </div>
  </div>