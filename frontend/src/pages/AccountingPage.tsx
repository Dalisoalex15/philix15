import { useState } from 'react'
import { DollarSign, TrendingUp, TrendingDown, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { mockExpenses, mockInvestors, mockPayments } from '@/data/mockData'
import { formatCurrency, formatDate } from '@/lib/utils'
import { useToast } from '@/components/ui/use-toast'

export default function AccountingPage() {
  const { toast } = useToast()
  const [expenseOpen, setExpenseOpen] = useState(false)
  const [investorOpen, setInvestorOpen] = useState(false)
  const [expCategory, setExpCategory] = useState('SALARIES')
  const [expDesc, setExpDesc] = useState('')
  const [expAmount, setExpAmount] = useState('')

  const totalIncome = mockPayments.reduce((s, p) => s + p.interestPaid + p.penaltyPaid, 0)
  const processingFees = 16525
  const totalRevenue = totalIncome + processingFees
  const totalExpenses = mockExpenses.reduce((s, e) => s + e.amount, 0)
  const netProfit = totalRevenue - totalExpenses
  const totalInvested = mockInvestors.reduce((s, i) => s + i.amount, 0)
  const totalMonthlyEarnings = mockInvestors.reduce((s, i) => s + i.monthlyEarnings, 0)

  const handleAddExpense = () => {
    if (!expAmount) { toast({ title: 'Enter amount', variant: 'destructive' }); return }
    toast({ title: 'Expense Recorded', description: `${formatCurrency(parseFloat(expAmount))} added to ${expCategory}.` })
    setExpenseOpen(false)
    setExpDesc('')
    setExpAmount('')
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div><h2 className="text-lg font-semibold text-white">Accounting</h2><p className="text-sm text-slate-400">Financial overview for Philix Finance</p></div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => setExpenseOpen(true)}><Plus className="w-4 h-4 mr-1.5" />Expense</Button>
          <Button size="sm" onClick={() => setInvestorOpen(true)}><Plus className="w-4 h-4 mr-1.5" />Investor</Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Total Revenue', value: formatCurrency(totalRevenue), icon: TrendingUp, color: 'text-emerald-400', variant: 'success' },
          { label: 'Total Expenses', value: formatCurrency(totalExpenses), icon: TrendingDown, color: 'text-red-400', variant: 'danger' },
          { label: 'Net Profit', value: formatCurrency(netProfit), icon: DollarSign, color: netProfit > 0 ? 'text-emerald-400' : 'text-red-400', variant: 'default' },
          { label: 'Total Invested', value: formatCurrency(totalInvested), icon: DollarSign, color: 'text-blue-400', variant: 'info' },
        ].map(({ label, value, icon: Icon, color }) => (
          <Card key={label} className="bg-slate-800 border-slate-700">
            <CardContent className="p-3 flex items-center gap-3">
              <Icon className={`w-5 h-5 ${color} shrink-0`} />
              <div><p className="text-base font-bold text-white">{value}</p><p className="text-xs text-slate-400">{label}</p></div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="income">
        <TabsList>
          <TabsTrigger value="income">Income</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="investors">Investors</TabsTrigger>
        </TabsList>

        <TabsContent value="income">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
            {[
              { label: 'Interest Income', value: formatCurrency(totalIncome), note: 'From loan repayments' },
              { label: 'Processing Fees', value: formatCurrency(processingFees), note: 'Loan origination fees' },
              { label: 'Penalties', value: formatCurrency(0), note: 'Late payment penalties' },
            ].map(({ label, value, note }) => (
              <Card key={label} className="bg-slate-800 border-slate-700">
                <CardContent className="p-4">
                  <p className="text-xs text-slate-400">{label}</p>
                  <p className="text-xl font-bold text-emerald-400 mt-1">{value}</p>
                  <p className="text-xs text-slate-500 mt-1">{note}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-0">
              <Table>
                <TableHeader><TableRow><TableHead>Date</TableHead><TableHead>Loan #</TableHead><TableHead>Client</TableHead><TableHead className="text-right">Interest</TableHead><TableHead className="text-right">Total Paid</TableHead><TableHead>Method</TableHead></TableRow></TableHeader>
                <TableBody>
                  {mockPayments.map(p => (
                    <TableRow key={p.id}>
                      <TableCell className="text-xs">{formatDate(p.paymentDate)}</TableCell>
                      <TableCell className="font-mono text-xs text-emerald-400">{p.loanNumber}</TableCell>
                      <TableCell className="text-slate-200">{p.clientName}</TableCell>
                      <TableCell className="text-right text-emerald-400">{formatCurrency(p.interestPaid)}</TableCell>
                      <TableCell className="text-right font-bold text-white">{formatCurrency(p.amount)}</TableCell>
                      <TableCell><Badge variant="secondary" className="text-xs">{p.paymentMethod}</Badge></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="expenses">
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-0">
              <Table>
                <TableHeader><TableRow><TableHead>Date</TableHead><TableHead>Category</TableHead><TableHead>Description</TableHead><TableHead className="text-right">Amount</TableHead><TableHead>Recorded By</TableHead></TableRow></TableHeader>
                <TableBody>
                  {mockExpenses.map(e => (
                    <TableRow key={e.id}>
                      <TableCell className="text-xs">{formatDate(e.date)}</TableCell>
                      <TableCell><Badge variant="secondary" className="text-xs">{e.category}</Badge></TableCell>
                      <TableCell className="text-slate-200">{e.description}</TableCell>
                      <TableCell className="text-right font-medium text-red-400">{formatCurrency(e.amount)}</TableCell>
                      <TableCell className="text-xs text-slate-400">{e.recordedBy}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="bg-slate-700/30">
                    <TableCell colSpan={3} className="font-bold text-slate-200">Total Expenses</TableCell>
                    <TableCell className="text-right font-bold text-red-400">{formatCurrency(totalExpenses)}</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="investors">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
            {[
              { label: 'Total Capital', value: formatCurrency(totalInvested) },
              { label: 'Monthly Payouts', value: formatCurrency(totalMonthlyEarnings) },
              { label: 'Active Investors', value: mockInvestors.length.toString() },
            ].map(({ label, value }) => (
              <Card key={label} className="bg-slate-800 border-slate-700">
                <CardContent className="p-4"><p className="text-xs text-slate-400">{label}</p><p className="text-xl font-bold text-blue-400 mt-1">{value}</p></CardContent>
              </Card>
            ))}
          </div>
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-0">
              <Table>
                <TableHeader><TableRow><TableHead>Investor</TableHead><TableHead>Contact</TableHead><TableHead className="text-right">Amount</TableHead><TableHead className="text-right">Rate</TableHead><TableHead className="text-right">Monthly Return</TableHead><TableHead>Since</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
                <TableBody>
                  {mockInvestors.map(inv => (
                    <TableRow key={inv.id}>
                      <TableCell className="font-medium text-slate-200">{inv.name}</TableCell>
                      <TableCell className="text-xs text-slate-400">{inv.phone}</TableCell>
                      <TableCell className="text-right font-bold text-white">{formatCurrency(inv.amount)}</TableCell>
                      <TableCell className="text-right text-slate-300">{inv.returnRate}%</TableCell>
                      <TableCell className="text-right text-emerald-400 font-medium">{formatCurrency(inv.monthlyEarnings)}</TableCell>
                      <TableCell className="text-xs text-slate-400">{formatDate(inv.startDate)}</TableCell>
                      <TableCell><Badge variant="success" className="text-xs">{inv.status}</Badge></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Expense Dialog */}
      <Dialog open={expenseOpen} onOpenChange={setExpenseOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>Record Expense</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label>Category</Label>
              <Select value={expCategory} onValueChange={setExpCategory}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {['SALARIES', 'UTILITIES', 'MARKETING', 'RENT', 'OFFICE', 'OTHER'].map(c => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Description</Label>
              <Input placeholder="Expense description..." value={expDesc} onChange={e => setExpDesc(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Amount (ZMW)</Label>
              <Input type="number" placeholder="0.00" value={expAmount} onChange={e => setExpAmount(e.target.value)} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setExpenseOpen(false)}>Cancel</Button>
            <Button onClick={handleAddExpense}>Record Expense</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Investor Dialog */}
      <Dialog open={investorOpen} onOpenChange={setInvestorOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>Add Investor</DialogTitle></DialogHeader>
          <div className="space-y-4">
            {['Investor Name', 'Phone', 'Email', 'Amount (ZMW)', 'Return Rate (%)'].map(label => (
              <div key={label} className="space-y-1.5"><Label>{label}</Label><Input placeholder={label} /></div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setInvestorOpen(false)}>Cancel</Button>
            <Button onClick={() => { toast({ title: 'Investor Added' }); setInvestorOpen(false) }}>Add Investor</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
