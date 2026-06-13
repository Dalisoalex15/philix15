import { useState } from 'react'
import { CreditCard, DollarSign, TrendingUp, Plus, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { mockPayments, mockLoans } from '@/data/mockData'
import { formatCurrency, formatDate } from '@/lib/utils'
import { useToast } from '@/components/ui/use-toast'

export default function PaymentsPage() {
  const { toast } = useToast()
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [loanId, setLoanId] = useState('')
  const [amount, setAmount] = useState('')
  const [method, setMethod] = useState('CASH')
  const [ref, setRef] = useState('')

  const filtered = mockPayments.filter(p => {
    const q = search.toLowerCase()
    return !q || p.loanNumber.toLowerCase().includes(q) || p.clientName.toLowerCase().includes(q)
  })

  const totalToday = mockPayments.slice(0, 3).reduce((s, p) => s + p.amount, 0)
  const totalMonth = mockPayments.reduce((s, p) => s + p.amount, 0)

  const handleRecord = () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast({ title: 'Invalid amount', variant: 'destructive' })
      return
    }
    toast({ title: 'Payment Recorded', description: `${formatCurrency(parseFloat(amount))} recorded.` })
    setOpen(false)
    setAmount('')
    setRef('')
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div><h2 className="text-lg font-semibold text-white">Payment Processing</h2><p className="text-sm text-slate-400">{mockPayments.length} payments recorded</p></div>
        <Button size="sm" onClick={() => setOpen(true)}><Plus className="w-4 h-4 mr-1.5" />Record Payment</Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Today's Collections", value: formatCurrency(totalToday), icon: DollarSign, color: 'text-emerald-400' },
          { label: "Monthly Collections", value: formatCurrency(totalMonth), icon: TrendingUp, color: 'text-blue-400' },
          { label: "Total Transactions", value: mockPayments.length.toString(), icon: CreditCard, color: 'text-purple-400' },
          { label: "Avg Payment", value: formatCurrency(totalMonth / mockPayments.length), icon: DollarSign, color: 'text-amber-400' },
        ].map(({ label, value, icon: Icon, color }) => (
          <Card key={label} className="bg-slate-800 border-slate-700">
            <CardContent className="p-3 flex items-center gap-3">
              <Icon className={`w-5 h-5 ${color} shrink-0`} />
              <div><p className="text-base font-bold text-white">{value}</p><p className="text-xs text-slate-400">{label}</p></div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="relative">
        <Search className="absolute left-2.5 top-2 w-4 h-4 text-slate-400" />
        <Input placeholder="Search by loan number or client..." className="pl-9 max-w-md" value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      <Card className="bg-slate-800 border-slate-700">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Loan #</TableHead>
                <TableHead>Client</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">Principal</TableHead>
                <TableHead className="text-right">Interest</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Reference</TableHead>
                <TableHead>Officer</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(p => (
                <TableRow key={p.id}>
                  <TableCell className="text-xs">{formatDate(p.paymentDate)}</TableCell>
                  <TableCell className="font-mono text-xs text-emerald-400">{p.loanNumber}</TableCell>
                  <TableCell className="font-medium text-slate-200">{p.clientName}</TableCell>
                  <TableCell className="text-right font-bold text-emerald-400">{formatCurrency(p.amount)}</TableCell>
                  <TableCell className="text-right text-slate-300">{formatCurrency(p.principalPaid)}</TableCell>
                  <TableCell className="text-right text-slate-300">{formatCurrency(p.interestPaid)}</TableCell>
                  <TableCell><Badge variant="secondary" className="text-xs">{p.paymentMethod.replace('_', ' ')}</Badge></TableCell>
                  <TableCell className="font-mono text-xs text-slate-400">{p.referenceNumber}</TableCell>
                  <TableCell className="text-xs text-slate-400">{p.recordedBy}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>Record Payment</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label>Select Loan</Label>
              <Select value={loanId} onValueChange={setLoanId}>
                <SelectTrigger><SelectValue placeholder="Choose a loan..." /></SelectTrigger>
                <SelectContent>
                  {mockLoans.filter(l => l.status === 'ACTIVE' || l.status === 'OVERDUE').map(l => (
                    <SelectItem key={l.id} value={l.id}>{l.loanNumber} — {l.clientName}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {loanId && (
              <div className="p-3 bg-slate-700/50 rounded-lg text-xs">
                <p className="text-slate-400">Outstanding: <span className="text-amber-400 font-bold">{formatCurrency(mockLoans.find(l => l.id === loanId)?.outstandingBalance ?? 0)}</span></p>
              </div>
            )}
            <div className="space-y-1.5">
              <Label>Amount (ZMW)</Label>
              <Input type="number" placeholder="0.00" value={amount} onChange={e => setAmount(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Payment Method</Label>
              <Select value={method} onValueChange={setMethod}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="CASH">Cash</SelectItem>
                  <SelectItem value="MOBILE_MONEY">Mobile Money (MTN/Airtel)</SelectItem>
                  <SelectItem value="BANK_TRANSFER">Bank Transfer</SelectItem>
                  <SelectItem value="CHEQUE">Cheque</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Reference Number</Label>
              <Input placeholder="Transaction reference..." value={ref} onChange={e => setRef(e.target.value)} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={handleRecord}><CreditCard className="w-4 h-4 mr-1.5" />Record Payment</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
