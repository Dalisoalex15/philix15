import { useState } from 'react'
import { BarChart2, Download, FileText, TrendingUp, Users, Shield, DollarSign, AlertTriangle, Percent, Award } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { mockLoans, mockPayments, mockCollateral, mockTopOfficers } from '@/data/mockData'
import { formatCurrency, formatDate } from '@/lib/utils'
import { useToast } from '@/components/ui/use-toast'

const reportTypes = [
  { id: 'loans_issued', label: 'Loans Issued', icon: FileText, color: 'text-blue-400', bg: 'bg-blue-500/10' },
  { id: 'collections', label: 'Collections', icon: DollarSign, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  { id: 'outstanding', label: 'Outstanding Balance', icon: TrendingUp, color: 'text-amber-400', bg: 'bg-amber-500/10' },
  { id: 'defaults', label: 'Default Report', icon: AlertTriangle, color: 'text-red-400', bg: 'bg-red-500/10' },
  { id: 'par', label: 'Portfolio At Risk', icon: Percent, color: 'text-purple-400', bg: 'bg-purple-500/10' },
  { id: 'interest', label: 'Interest Revenue', icon: BarChart2, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
  { id: 'collateral', label: 'Collateral Inventory', icon: Shield, color: 'text-slate-400', bg: 'bg-slate-500/10' },
  { id: 'officer_perf', label: 'Officer Performance', icon: Award, color: 'text-amber-400', bg: 'bg-amber-500/10' },
]

export default function ReportsPage() {
  const { toast } = useToast()
  const [selected, setSelected] = useState('loans_issued')
  const [from, setFrom] = useState('2024-01-01')
  const [to, setTo] = useState('2024-05-31')

  const handleExport = (format: string) => {
    toast({ title: `Exporting ${format}`, description: `Report exported as ${format} successfully.` })
  }

  const renderReport = () => {
    switch (selected) {
      case 'loans_issued':
        return (
          <Table>
            <TableHeader><TableRow><TableHead>Loan #</TableHead><TableHead>Client</TableHead><TableHead>Type</TableHead><TableHead className="text-right">Amount</TableHead><TableHead>Status</TableHead><TableHead>Date</TableHead><TableHead>Officer</TableHead></TableRow></TableHeader>
            <TableBody>
              {mockLoans.map(l => (
                <TableRow key={l.id}>
                  <TableCell className="font-mono text-xs text-emerald-400">{l.loanNumber}</TableCell>
                  <TableCell className="text-slate-200">{l.clientName}</TableCell>
                  <TableCell><Badge variant="secondary" className="text-xs">{l.loanType.replace('_', ' ')}</Badge></TableCell>
                  <TableCell className="text-right text-white font-medium">{formatCurrency(l.principal)}</TableCell>
                  <TableCell><Badge variant={({ ACTIVE: 'success', PAID: 'info', OVERDUE: 'warning', DEFAULT: 'danger', PENDING: 'purple' } as any)[l.status] ?? 'secondary'} className="text-xs">{l.status}</Badge></TableCell>
                  <TableCell className="text-xs text-slate-400">{l.disbursedAt ? formatDate(l.disbursedAt) : 'Not disbursed'}</TableCell>
                  <TableCell className="text-xs text-slate-400">{l.loanOfficer}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )
      case 'collections':
        return (
          <Table>
            <TableHeader><TableRow><TableHead>Date</TableHead><TableHead>Loan #</TableHead><TableHead>Client</TableHead><TableHead className="text-right">Amount</TableHead><TableHead>Method</TableHead><TableHead>Reference</TableHead></TableRow></TableHeader>
            <TableBody>
              {mockPayments.map(p => (
                <TableRow key={p.id}>
                  <TableCell className="text-xs">{formatDate(p.paymentDate)}</TableCell>
                  <TableCell className="font-mono text-xs text-emerald-400">{p.loanNumber}</TableCell>
                  <TableCell className="text-slate-200">{p.clientName}</TableCell>
                  <TableCell className="text-right font-bold text-emerald-400">{formatCurrency(p.amount)}</TableCell>
                  <TableCell><Badge variant="secondary" className="text-xs">{p.paymentMethod}</Badge></TableCell>
                  <TableCell className="font-mono text-xs text-slate-400">{p.referenceNumber}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )
      case 'collateral':
        return (
          <Table>
            <TableHeader><TableRow><TableHead>Vault ID</TableHead><TableHead>Item</TableHead><TableHead>Client</TableHead><TableHead className="text-right">Market Value</TableHead><TableHead className="text-right">FSV</TableHead><TableHead>Status</TableHead><TableHead>Location</TableHead></TableRow></TableHeader>
            <TableBody>
              {mockCollateral.map(c => (
                <TableRow key={c.id}>
                  <TableCell className="font-mono text-xs text-emerald-400">{c.vaultId}</TableCell>
                  <TableCell className="text-slate-200">{c.brand} {c.model}</TableCell>
                  <TableCell className="text-xs text-slate-400">{c.clientName}</TableCell>
                  <TableCell className="text-right text-white">{formatCurrency(c.marketValue)}</TableCell>
                  <TableCell className="text-right text-amber-400">{formatCurrency(c.forcedSaleValue)}</TableCell>
                  <TableCell><Badge variant={({ HELD: 'warning', RELEASED: 'success' } as any)[c.status] ?? 'secondary'} className="text-xs">{c.status}</Badge></TableCell>
                  <TableCell className="text-xs text-slate-400">{c.vaultPosition} · {c.lockerNumber}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )
      case 'officer_perf':
        return (
          <Table>
            <TableHeader><TableRow><TableHead>#</TableHead><TableHead>Officer</TableHead><TableHead>Role</TableHead><TableHead className="text-right">Loans Issued</TableHead><TableHead className="text-right">Total Disbursed</TableHead><TableHead className="text-right">Collection Rate</TableHead></TableRow></TableHeader>
            <TableBody>
              {mockTopOfficers.map((o, i) => (
                <TableRow key={o.id}>
                  <TableCell className="text-slate-400">{i + 1}</TableCell>
                  <TableCell className="font-medium text-slate-200">{o.name}</TableCell>
                  <TableCell className="text-xs text-slate-400">{o.role}</TableCell>
                  <TableCell className="text-right text-white">{o.loansIssued}</TableCell>
                  <TableCell className="text-right text-white">{formatCurrency(o.totalDisbursed)}</TableCell>
                  <TableCell className="text-right"><Badge variant="success" className="text-xs">{o.collectionRate}%</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )
      default:
        return <div className="text-center py-12 text-slate-400">Select a report type to view data</div>
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div><h2 className="text-lg font-semibold text-white">Reports & Analytics</h2><p className="text-sm text-slate-400">Generate and export financial reports</p></div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => handleExport('PDF')}><Download className="w-4 h-4 mr-1.5" />PDF</Button>
          <Button size="sm" variant="outline" onClick={() => handleExport('Excel')}><Download className="w-4 h-4 mr-1.5" />Excel</Button>
          <Button size="sm" variant="outline" onClick={() => handleExport('CSV')}><Download className="w-4 h-4 mr-1.5" />CSV</Button>
        </div>
      </div>

      {/* Report Type Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {reportTypes.map(({ id, label, icon: Icon, color, bg }) => (
          <Card
            key={id}
            className={`cursor-pointer transition-all border ${selected === id ? 'border-emerald-500 bg-emerald-500/5' : 'border-slate-700 bg-slate-800 hover:border-slate-500'}`}
            onClick={() => setSelected(id)}
          >
            <CardContent className="p-3 flex items-center gap-2">
              <div className={`w-8 h-8 rounded-lg ${bg} flex items-center justify-center shrink-0`}>
                <Icon className={`w-4 h-4 ${color}`} />
              </div>
              <span className="text-xs font-medium text-slate-300">{label}</span>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-3 items-end">
        <div className="space-y-1.5">
          <Label className="text-xs">Date From</Label>
          <Input type="date" value={from} onChange={e => setFrom(e.target.value)} className="w-40" />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">Date To</Label>
          <Input type="date" value={to} onChange={e => setTo(e.target.value)} className="w-40" />
        </div>
        <Button size="sm" variant="outline">Apply Filter</Button>
      </div>

      {/* Report Data */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">{reportTypes.find(r => r.id === selected)?.label ?? 'Report'}</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {renderReport()}
        </CardContent>
      </Card>
    </div>
  )
}
