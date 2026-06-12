import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, CheckCircle, XCircle, Send, Plus, CreditCard } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { mockLoans, mockLoanSchedule, mockPayments } from '@/data/mockData'
import { formatCurrency, formatDate, formatDateTime } from '@/lib/utils'
import { useToast } from '@/components/ui/use-toast'

export default function LoanDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { toast } = useToast()
  const [paymentOpen, setPaymentOpen] = useState(false)
  const [payAmount, setPayAmount] = useState('')
  const [payMethod, setPayMethod] = useState('CASH')
  const [payRef, setPayRef] = useState('')

  const loan = mockLoans.find(l => l.id === id) ?? mockLoans[0]
  const schedule = mockLoanSchedule.filter(s => s.loanId === loan.id)
  const payments = mockPayments.filter(p => p.loanId === loan.id)

  const statusVariant = (s: string) => ({ ACTIVE: 'success', PAID: 'info', OVERDUE: 'warning', DEFAULT: 'danger', PENDING: 'purple', APPROVED: 'info' } as Record<string, any>)[s] ?? 'secondary'
  const scheduleStatusVariant = (s: string) => ({ PAID: 'success', PARTIAL: 'warning', OVERDUE: 'danger', PENDING: 'secondary' } as Record<string, any>)[s] ?? 'secondary'

  const handleRecordPayment = () => {
    if (!payAmount || parseFloat(payAmount) <= 0) {
      toast({ title: 'Invalid amount', description: 'Please enter a valid payment amount.', variant: 'destructive' })
      return
    }
    toast({ title: 'Payment Recorded', description: `${formatCurrency(parseFloat(payAmount))} recorded successfully.`, variant: 'default' })
    setPaymentOpen(false)
    setPayAmount('')
  }

  const handleApprove = () => toast({ title: 'Loan Approved', description: `Loan ${loan.loanNumber} has been approved.` })
  const handleReject = () => toast({ title: 'Loan Rejected', description: `Loan ${loan.loanNumber} has been rejected.`, variant: 'destructive' })
  const handleDisburse = () => toast({ title: 'Loan Disbursed', description: `${formatCurrency(loan.principal)} disbursed successfully.` })

  return (
    <div className="space-y-4">
      <Button variant="ghost" size="sm" onClick={() => navigate(-1)}><ArrowLeft className="w-4 h-4 mr-1.5" />Back to Loans</Button>

      {/* Loan Header */}
      <Card className="bg-slate-800 border-slate-700">
        <CardContent className="p-5">
          <div className="flex items-start justify-between flex-wrap gap-3">
            <div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-emerald-400 font-bold text-lg">{loan.loanNumber}</span>
                <Badge variant={statusVariant(loan.status)}>{loan.status}</Badge>
                <Badge variant="secondary">{loan.loanType.replace('_', ' ')}</Badge>
              </div>
              <h2 className="text-xl font-bold text-white mt-1">{loan.clientName}</h2>
              <p className="text-sm text-slate-400">Officer: {loan.loanOfficer} · Collateral: {loan.collateralDesc}</p>
            </div>
            <div className="flex gap-2">
              {loan.status === 'PENDING' && (
                <>
                  <Button size="sm" variant="destructive" onClick={handleReject}><XCircle className="w-4 h-4 mr-1" />Reject</Button>
                  <Button size="sm" onClick={handleApprove}><CheckCircle className="w-4 h-4 mr-1" />Approve</Button>
                </>
              )}
              {loan.status === 'APPROVED' && (
                <Button size="sm" onClick={handleDisburse}><Send className="w-4 h-4 mr-1" />Disburse</Button>
              )}
              {(loan.status === 'ACTIVE' || loan.status === 'OVERDUE') && (
                <Button size="sm" onClick={() => setPaymentOpen(true)}><CreditCard className="w-4 h-4 mr-1" />Record Payment</Button>
              )}
            </div>
          </div>

          {/* Key Metrics */}
          <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-3">
            {[
              { label: 'Principal', value: formatCurrency(loan.principal) },
              { label: 'Total Amount', value: formatCurrency(loan.totalAmount), highlight: true },
              { label: 'Outstanding', value: formatCurrency(loan.outstandingBalance), variant: loan.outstandingBalance > 0 ? 'text-amber-400' : 'text-emerald-400' },
              { label: 'Interest Rate', value: `${loan.interestRate}% p.m.` },
              { label: 'Duration', value: `${loan.durationMonths} months · ${loan.repaymentFrequency}` },
            ].map(({ label, value, highlight, variant }) => (
              <div key={label} className="bg-slate-700/50 rounded-lg p-3">
                <p className="text-xs text-slate-400">{label}</p>
                <p className={`text-sm font-bold mt-0.5 ${variant ?? (highlight ? 'text-emerald-400' : 'text-white')}`}>{value}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="schedule">Schedule ({schedule.length})</TabsTrigger>
          <TabsTrigger value="payments">Payments ({payments.length})</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader className="pb-2"><CardTitle className="text-sm">Loan Terms</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                {[
                  { label: 'Principal Amount', value: formatCurrency(loan.principal) },
                  { label: 'Processing Fee', value: formatCurrency(loan.processingFee) },
                  { label: 'Net Disbursed', value: formatCurrency(loan.disbursedAmount) },
                  { label: 'Total Interest', value: formatCurrency(loan.totalInterest) },
                  { label: 'Total Payable', value: formatCurrency(loan.totalAmount) },
                  { label: 'Start Date', value: loan.startDate ? formatDate(loan.startDate) : 'Not disbursed' },
                  { label: 'End Date', value: loan.endDate ? formatDate(loan.endDate) : '—' },
                  { label: 'Approved By', value: loan.approvedBy ?? 'Pending' },
                  { label: 'Approved At', value: loan.approvedAt ? formatDate(loan.approvedAt) : '—' },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between">
                    <span className="text-xs text-slate-400">{label}</span>
                    <span className="text-xs text-slate-200 font-medium">{value}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader className="pb-2"><CardTitle className="text-sm">Collateral</CardTitle></CardHeader>
              <CardContent>
                <div className="p-4 bg-slate-700/50 rounded-lg border border-slate-600">
                  <p className="font-medium text-slate-200">{loan.collateralDesc}</p>
                  <p className="text-xs text-slate-400 mt-1">Collateral held in Philix vault</p>
                  <Button size="xs" variant="outline" className="mt-3" onClick={() => navigate(`/collateral/${loan.collateralId}`)}>View Collateral</Button>
                </div>
                <div className="mt-3 p-4 bg-slate-700/50 rounded-lg border border-slate-600">
                  <p className="text-xs text-slate-400 mb-1">Client</p>
                  <p className="font-medium text-slate-200">{loan.clientName}</p>
                  <Button size="xs" variant="outline" className="mt-2" onClick={() => navigate(`/clients/${loan.clientId}`)}>View Client Profile</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="schedule">
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-0">
              {schedule.length === 0 ? (
                <div className="text-center py-10 text-slate-400">No schedule generated yet</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>#</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead className="text-right">Principal</TableHead>
                      <TableHead className="text-right">Interest</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                      <TableHead className="text-right">Paid</TableHead>
                      <TableHead className="text-right">Balance</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {schedule.map(s => (
                      <TableRow key={s.id}>
                        <TableCell className="text-slate-400">{s.installmentNumber}</TableCell>
                        <TableCell className="text-xs">{formatDate(s.dueDate)}</TableCell>
                        <TableCell className="text-right text-slate-300">{formatCurrency(s.principalAmount)}</TableCell>
                        <TableCell className="text-right text-slate-300">{formatCurrency(s.interestAmount)}</TableCell>
                        <TableCell className="text-right font-medium text-white">{formatCurrency(s.totalAmount)}</TableCell>
                        <TableCell className="text-right text-emerald-400">{formatCurrency(s.paidAmount)}</TableCell>
                        <TableCell className="text-right text-amber-400">{formatCurrency(s.balance)}</TableCell>
                        <TableCell><Badge variant={scheduleStatusVariant(s.status)} className="text-xs">{s.status}</Badge></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments">
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-0">
              {payments.length === 0 ? (
                <div className="text-center py-10 text-slate-400">No payments recorded yet</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                      <TableHead className="text-right">Principal</TableHead>
                      <TableHead className="text-right">Interest</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead>Reference</TableHead>
                      <TableHead>Recorded By</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payments.map(p => (
                      <TableRow key={p.id}>
                        <TableCell className="text-xs">{formatDate(p.paymentDate)}</TableCell>
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
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents">
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6 text-center">
              <p className="text-slate-400">No documents attached</p>
              <Button size="sm" className="mt-4"><Plus className="w-4 h-4 mr-1.5" />Upload Document</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Payment Dialog */}
      <Dialog open={paymentOpen} onOpenChange={setPaymentOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>Record Payment</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="p-3 bg-slate-700/50 rounded-lg text-sm">
              <div className="flex justify-between"><span className="text-slate-400">Loan:</span><span className="text-white">{loan.loanNumber}</span></div>
              <div className="flex justify-between mt-1"><span className="text-slate-400">Outstanding:</span><span className="text-amber-400 font-bold">{formatCurrency(loan.outstandingBalance)}</span></div>
            </div>
            <div className="space-y-1.5">
              <Label>Payment Amount (ZMW)</Label>
              <Input type="number" placeholder="0.00" value={payAmount} onChange={e => setPayAmount(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Payment Method</Label>
              <Select value={payMethod} onValueChange={setPayMethod}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="CASH">Cash</SelectItem>
                  <SelectItem value="MOBILE_MONEY">Mobile Money</SelectItem>
                  <SelectItem value="BANK_TRANSFER">Bank Transfer</SelectItem>
                  <SelectItem value="CHEQUE">Cheque</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Reference Number</Label>
              <Input placeholder="Transaction reference..." value={payRef} onChange={e => setPayRef(e.target.value)} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPaymentOpen(false)}>Cancel</Button>
            <Button onClick={handleRecordPayment}><CreditCard className="w-4 h-4 mr-1.5" />Record Payment</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
