'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { useTheme } from 'next-themes'
import { 
  Menu,
  Home,
  Plus,
  Wallet,
  ClipboardList,
  RotateCcw,
  HeadphonesIcon,
  Settings,
  User,
  MenuIcon,
  Sun,
  Moon
} from 'lucide-react'
import Link from 'next/link'

const menuItems = [
  {
    title: 'Novo Pedido',
    icon: Home,
    href: '/dashboard'
  },
  {
    title: 'Multi Pedidos',
    icon: Plus,
    href: '/dashboard/multi-orders'
  },
  {
    title: 'Adicionar Saldo',
    icon: Wallet,
    href: '/dashboard/add-balance'
  },
  {
    title: 'Pedidos',
    icon: ClipboardList,
    href: '/dashboard/orders'
  },
  {
    title: 'Reembolsos',
    icon: RotateCcw,
    href: '/dashboard/refunds'
  },
  {
    title: 'Suporte',
    icon: HeadphonesIcon,
    href: '/dashboard/support'
  },
  {
    title: 'Serviços',
    icon: Settings,
    href: '/dashboard/services'
  }
]

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center gap-4">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <MenuIcon className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72">
                <div className="flex items-center gap-2 mb-6">
                  <img
                    src="/images/logo-preto.png"
                    alt="Hype Fy Logo"
                    className="h-8 w-auto dark:hidden"
                  />
                  <img
                    src="/images/logo-branco.png"
                    alt="Hype Fy Logo"
                    className="h-8 w-auto hidden dark:block"
                  />
                </div>
                <div className="space-y-4 py-4">
                  {menuItems.map((item) => {
                    const Icon = item.icon
                    const isActive = pathname === item.href
                    
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center space-x-2 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent ${
                          isActive ? 'bg-accent' : ''
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    )
                  })}
                </div>
              </SheetContent>
            </Sheet>
            <div className="hidden md:block">
              <img
                src="/images/logo-preto.png"
                alt="Hype Fy Logo"
                className="h-8 w-auto dark:hidden"
              />
              <img
                src="/images/logo-branco.png"
                alt="Hype Fy Logo"
                className="h-8 w-auto hidden dark:block"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="/dashboard/profile">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container grid md:grid-cols-[250px_1fr]">
        {/* Sidebar */}
        <aside className="hidden border-r md:block">
          <div className="sticky top-16 overflow-y-auto py-6 pr-4">
            <nav className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-all hover:bg-accent ${
                      isActive ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'
                    }`}
                  >
                    <Icon className={`mr-2 h-4 w-4 transition-transform group-hover:scale-110 ${
                      isActive ? 'text-foreground' : ''
                    }`} />
                    {item.title}
                  </Link>
                )
              })}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 py-6 pl-4">{children}</main>
      </div>
    </div>
  )
}