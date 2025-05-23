'use client'

import { useState } from 'react'

import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { AlertCircle, Copy, Wallet } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const predefinedAmounts = [5, 10, 50, 100, 200]
const qrCodeUrl = 'https://images.pexels.com/photos/8370752/pexels-photo-8370752.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'

export default function AddBalancePage() {
  const [amount, setAmount] = useState('')
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('')

  const handleAmountClick = (value: number) => {
    setAmount(prev => {
      const currentAmount = prev === '' 
        ? 0 
        : parseFloat(prev.replace(',', '.'))

      const newAmount = currentAmount + value

      return newAmount.toFixed(2).replace('.', ',')
    })
  }

const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  let value = e.target.value

    if (/^[\d.,]*$/.test(value)) {
      const numericString = value.replace(/\./g, '').replace(',', '.')

      const numericValue = parseFloat(numericString)

      if (!isNaN(numericValue) && numericValue <= 10000) {
        setAmount(value)
      } else if (value === '') {
        setAmount('')
      }
    }
  }

  const handleAmountBlur = () => {
    if (!amount) return

    let numericValue = parseFloat(amount.replace(/\./g, '').replace(',', '.')) || 0

    if (numericValue > 10000) numericValue = 10000

    const formatted = numericValue.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })

    setAmount(formatted)
  }

  const handlePayment = () => {
    if (!amount || !paymentMethod) return
    setIsPaymentModalOpen(true)
  }

  const copyPixKey = () => {
    navigator.clipboard.writeText('pix@hypefy.com.br')
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 space-y-4">
          <h2 className="text-2xl font-bold">Adicionar Saldo</h2>
          <p className="text-sm text-muted-foreground">
            Saldo mínimo para depósito: <strong className="text-green-600">R$ 1,00</strong>
          </p>

          <Tabs defaultValue="deposit" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="deposit" className="flex items-center gap-2">
                <Wallet className="h-4 w-4" />
                Depositar
              </TabsTrigger>
              <TabsTrigger value="history">Histórico</TabsTrigger>
            </TabsList>
            <TabsContent value="deposit">
              <Card className="p-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Método de Pagamento</label>
                    <Select onValueChange={setPaymentMethod}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o método de pagamento" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pix">PIX</SelectItem>
                        <SelectItem value="card">Cartão de Crédito</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-yellow-600 dark:text-yellow-500">
                    <AlertCircle className="h-4 w-4" />
                    <p>Caso ocorra erro na sua transação, chame o suporte</p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Valor</label>
                      <Input
                        type="text"
                        value={amount}
                        onChange={handleAmountChange}
                        onBlur={handleAmountBlur}
                        placeholder="0,00"
                        className="text-lg"
                      />
                  </div>

                  <div className="grid grid-cols-5 gap-2">
                    {predefinedAmounts.map((value) => (
                      <Button
                        key={value}
                        variant="outline"
                        onClick={() => handleAmountClick(value)}
                        className="w-full text-xs sm:text-sm"
                      >
                        R$ {value}
                      </Button>
                    ))}
                  </div>

                  <Button
                    className="w-full"
                    size="lg"
                    onClick={handlePayment}
                    disabled={!amount || !paymentMethod}
                  >
                    Pagar
                  </Button>
                </div>
              </Card>
            </TabsContent>
            <TabsContent value="history">
              <Card className="p-6">
                <p className="text-center text-muted-foreground">
                  Nenhuma transação encontrada
                </p>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <Card className="lg:w-80 p-6 bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-900">
          <div className="flex items-start gap-4">
            <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-500 mt-1" />
            <div className="space-y-1">
              <h3 className="font-medium text-yellow-900 dark:text-yellow-500">
                Suporte 24/7
              </h3>
              <p className="text-sm text-yellow-800/80 dark:text-yellow-500/80">
                Nosso suporte está disponível 24 horas por dia, 7 dias por semana para ajudar você com qualquer problema.
              </p>
              <Button variant="outline" size="sm" className="w-full mt-4" asChild>
                <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer">
                  Falar com Suporte
                </a>
              </Button>
            </div>
          </div>
        </Card>
      </div>

      <Dialog open={isPaymentModalOpen} onOpenChange={setIsPaymentModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Pagamento via {paymentMethod === 'pix' ? 'PIX' : 'Cartão'}</DialogTitle>
          </DialogHeader>
          {paymentMethod === 'pix' ? (
            <div className="space-y-4">
              <div className="flex justify-center">
                <img
                  src={qrCodeUrl}
                  alt="QR Code PIX"
                  className="w-48 h-48 object-cover rounded-lg"
                />
              </div>
              <div className="space-y-2">
                <p className="text-sm text-center text-muted-foreground">
                  Chave PIX: pix@hypefy.com.br
                </p>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={copyPixKey}
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copiar Chave PIX
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center text-muted-foreground">
              Processando pagamento...
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsPaymentModalOpen(false)}
            >
              Cancelar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}