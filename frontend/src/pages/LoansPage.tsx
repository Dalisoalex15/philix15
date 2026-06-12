import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Search, Briefcase, DollarSign, Clock, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { mockLoans, mockDashboardStats } from '@/data/mockData'
import { formatCurrency, formatDate } from '@/lib/utils'

export default function LoansPage() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')

  const filtered = mockLoans.filter(l => {
    const q = search.toLowerCase()
    const matchSearch = !q || l.loanNumber.toLowerCase().includes(q) || l.clientName.toLowerCase().includes(q)
    const matchStatus = statusFilter === 'all' || l.status === statusFilter
    const matchType = typeFilter === 'all' || l.loanType === typeFilter
    return matchSearch && matchStatus && matchType
  })

  const statusVariant = (s: string) => ({ ACTIVE: 'success', PAID: 'info', OVERDUE: 'warning', DEFAULT: 'danger', PENDING: 'purple', APPROVED: 'info', REJECTED: 'danger' } as Record<string, any>)[s] ?? 'secondary'

  const totalActive = mockLoans.filter(l => l.status === 'ACTIVE')
  const totalOutstanding = totalActive.reduce((s, l) => s + l.outstandingBalance, 0)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div><h2 className="text-lg font-semibold text-white">Loan Portfolio</h2><p className="text-sm text-slate-400">{mockLoans.length} total loans</p></div>
        <Button size="sm" onClick={() => navigate('/loans/new')}><Plus className="w-4 h-4 mr-1.5" />New Loan</Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Active Loans', value: mockDashboardStats.activeLoans.toString(), icon: Briefcase, color: 'text-emerald-400' },
          { label: 'Outstanding', value: formatCurrency(mockDashboardStats.totalOutstanding), icon: DollarSign, color: 'text-blue-400' },
          { label: 'Pending Approval', value: mockDashboardStats.pendingApprovals.toString(), icon: Clock, color: 'text-amber-400' },
          { label: 'Overdue', value: mockDashboardStats.overdueLoans.toString(), icon: AlertTriangle, color: 'text-red-400' },
        ].map(({ label, value, icon: Icon, color }) => (
          <Card key={label} className="bg-slate-800 border-slate-700">
            <CardContent className="p-3 flex items-center gap-3">
              <Icon className={`w-5 h-5 ${color} shrink-0`} />
              <div><p className="text-base font-bold text-white">{value}</p><p className="text-xs text-slate-400">{label}</p></div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2 w-4 h-4 text-slate-400" />
          <Input placeholder="Search loan number, client..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-36"><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="ACTIVE">Active</SelectItem>
            <SelectItem value="PENDING">Pending</SelectItem>
            <SelectItem value="OVERDUE">Overdue</SelectItem>
            <SelectItem value="PAID">Paid</SelectItem>
            <SelectItem value="DEFAULT">Default</SelectItem>
          </SelectContent>
        </Select>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-40"><SelectValue placeholder="Type" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="STUDENT">Student</SelectItem>
            <SelectItem value="CAMPUS">Campus</SelectItem>
            <SelectItem value="BUSINESS">Business</SelectItem>
            <SelectItem value="SHORT_TERM">Short-Term</SelectItem>
            <SelectItem value="ASSET_BACKED">Asset-Backed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <Card className="bg-slate-800 border-slate-700">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Loan #</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Principal</TableHead>
                <TableHead className="text-right">Outstanding</TableHead>
                <TableHead>Rate</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Next Due</TableHead>
                <TableHead>Officer</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(loan => (
                <TableRow key={loan.id} className="cursor-pointer" onClick={() => navigate(`/loans/${loan.id}`)}>
                  <TableCell className="font-mono text-xs text-emerald-400">{loan.loanNumber}</TableCell>
                  <TableCell className="font-medium text-slate-200">{loan.clientName}</TableCell>
                  <TableCell><Badge variant="secondary" className="text-xs">{loan.loanType.replace('_', ' ')}</Badge></TableCell>
                  <TableCell className="text-right text-slate-300">{formatCurrency(loan.principal)}</TableCell>
                  <TableCell className="text-right font-semibold text-white">{formatCurrency(loan.outstandingBalance)}</TableCell>
                  <TableCell className="text-slate-300">{loan.interestRate}%</TableCell>
                  <TableCell><Badge variant={statusVariant(loan.status)} className="text-xs">{loan.status}</Badge></TableCell>
                  <TableCell className="text-xs text-slate-400">{loan.nextDueDate ? formatDate(loan.nextDueDate) : '—'}</TableCell>
                  <TableCell className="text-xs text-slate-400">{loan.loanOfficer}</TableCell>
                  <TableCell>
                    <Button size="xs" variant="ghost" onClick={e => { e.stopPropagation(); navigate(`/loans/${loan.id}`) }}>View</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filtered.length === 0 && (
            <div className="text-center py-10 text-slate-400">No loans match your filters</div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
