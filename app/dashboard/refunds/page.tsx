'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Filter,
  Search,
  ArrowLeft,
  ArrowRight,
  AlertCircle
} from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface Refund {
  id: string
  orderId: string
  amount: number
  status: string
  date: string
}

// Generate 30 random refunds
const generateRefunds = (): Refund[] => {
  const statuses = ['Cancelado', 'Parcial']
  const refunds: Refund[] = []

  for (let i = 1; i <= 30; i++) {
    const date = new Date()
    date.setDate(date.getDate() - Math.floor(Math.random() * 90))

    refunds.push({
      id: `RF${String(i).padStart(6, '0')}`,
      orderId: `#${Math.floor(Math.random() * 1000000)}`,
      amount: Number((Math.random() * 1000).toFixed(2)),
      status: statuses[Math.floor(Math.random() * statuses.length)],
      date: date.toLocaleDateString('pt-BR')
    })
  }

  return refunds.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

const refunds = generateRefunds()

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Cancelado':
      return '#502438'
    case 'Parcial':
      return '#303439'
    default:
      return 'gray'
  }
}

export default function RefundsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const filteredRefunds = refunds.filter(refund => {
    const matchesSearch = refund.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         refund.orderId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || refund.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalPages = Math.ceil(filteredRefunds.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedRefunds = filteredRefunds.slice(startIndex, startIndex + itemsPerPage)

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Reembolsos</h2>

      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 flex gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <Select
                defaultValue="all"
                value={statusFilter}
                onValueChange={setStatusFilter}
              >
                <SelectTrigger className="border-0 p-0 hover:bg-transparent focus:ring-0">
                  <SelectValue placeholder="Filtrar reembolsos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="Cancelado">Cancelado</SelectItem>
                  <SelectItem value="Parcial">Parcial</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="relative flex-1 md:max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Pesquisar por ID"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
          <AlertCircle className="h-4 w-4" />
          <p>Os detalhes do reembolso estão disponíveis para os últimos 90 dias.</p>
        </div>
      </Card>

      <Card className="p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID do Reembolso</TableHead>
              <TableHead>ID do Pedido</TableHead>
              <TableHead>Valor Reembolsado</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Data</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedRefunds.map((refund) => (
              <TableRow key={refund.id}>
                <TableCell className="font-medium">{refund.id}</TableCell>
                <TableCell>{refund.orderId}</TableCell>
                <TableCell>R$ {refund.amount.toFixed(2)}</TableCell>
                <TableCell>
                  <Badge
                    style={{
                      backgroundColor: getStatusColor(refund.status),
                      color: 'white'
                    }}
                  >
                    {refund.status}
                  </Badge>
                </TableCell>
                <TableCell>{refund.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Mostrando {startIndex + 1} até {Math.min(startIndex + itemsPerPage, filteredRefunds.length)} de {filteredRefunds.length} resultados
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm">
              Página {currentPage} de {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}