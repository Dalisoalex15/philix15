import { useState } from 'react'
import { AlertTriangle, Phone, MessageSquare, CheckCircle, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { mockOverdueLoans } from '@/data/mockData'
import { formatCurrency, formatDate } from '@/lib/utils'
import { useToast } from '@/components/ui/use-toast'

const riskColors = { RED: 'danger', ORANGE: 'warning', YELLOW: 'info', GREEN: 'success' } as Record<string, any>
const riskBg = { RED: 'bg-red-500/10 border-red-500/30', ORANGE: 'bg-orange-500/10 border-orange-500/30', YELLOW: 'bg-yellow-500/10 border-yellow-500/30', GREEN: 'bg-emerald-500/10 border-emerald-500/30' }

export default function CollectionsPage() {
  const { toast } = useToast()
  const [logOpen, setLogOpen] = useState(false)
  const [selected, setSelected] = useState<(typeof mockOverdueLoans)[0] | null>(null)
  const [contactType, setContactType] = useState('CALL')
  const [notes, setNotes] = useState('')
  const [promiseAmount, setPromiseAmount] = useState('')

  const categories = {
    RED: mockOverdueLoans.filter(l => l.riskCategory === 'RED'),
    ORANGE: mockOverdueLoans.filter(l => l.riskCategory === 'ORANGE'),
    YELLOW: mockOverdueLoans.filter(l => l.riskCategory === 'YELLOW'),
    GREEN: [],
  }

  const handleLog = () => {
    toast({ title: 'Contact Logged', description: `${contactType} logged for ${selected?.clientName}` })
    setLogOpen(false)
    setNotes('')
    setPromiseAmount('')
  }

  const openLog = (loan: typeof mockOverdueLoans[0]) => {
    setSelected(loan)
    setLogOpen(true)
  }

  const totalOutstanding = mockOverdueLoans.reduce((s, l) => s + l.outstanding, 0)

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-white">Collections & Recovery</h2>
        <p className="text-sm text-slate-400">{mockOverdueLoans.length} overdue loans · {formatCurrency(totalOutstanding)} outstanding</p>
      </div>

      {/* Risk Category Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {(['RED', 'ORANGE', 'YELLOW', 'GREEN'] as const).map(cat => {
          const loans = categories[cat]
          const total = loans.reduce((s, l) => s + l.outstanding, 0)
          const labels = { RED: 'Default (30+ days)', ORANGE: '15-30 Days Late', YELLOW: '1-14 Days Late', GREEN: 'Current' }
          return (
            <Card key={cat} className={`border ${riskBg[cat]}`}>
              <CardContent className="p-3">
                <div className="flex items-center justify-between mb-1">
                  <Badge variant={riskColors[cat]} className="text-xs">{cat}</Badge>
                  <span className="text-2xl font-bold text-white">{loans.length}</span>
                </div>
                <p className="text-xs text-slate-400">{labels[cat]}</p>
                {total > 0 && <p className="text-xs font-semibold text-white mt-1">{formatCurrency(total)}</p>}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Overdue Loans Table */}
      <Card className="bg-slate-800 border-slate-700">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Risk</TableHead>
                <TableHead>Loan #</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead className="text-right">Outstanding</TableHead>
                <TableHead>Days Overdue</TableHead>
                <TableHead>Last Contact</TableHead>
                <TableHead>Promise</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockOverdueLoans.map(loan => (
                <TableRow key={loan.id}>
                  <TableCell><Badge variant={riskColors[loan.riskCategory]} className="text-xs">{loan.riskCategory}</Badge></TableCell>
                  <TableCell className="font-mono text-xs text-slate-400">{loan.loanNumber}</TableCell>
                  <TableCell className="font-medium text-slate-200">{loan.clientName}</TableCell>
                  <TableCell className="text-xs text-slate-400">{loan.phone}</TableCell>
                  <TableCell className="text-right font-bold text-white">{formatCurrency(loan.outstanding)}</TableCell>
                  <TableCell>
                    <span className={`text-sm font-bold ${loan.daysOverdue > 30 ? 'text-red-400' : loan.daysOverdue > 14 ? 'text-orange-400' : 'text-yellow-400'}`}>
                      {loan.daysOverdue}d
                    </span>
                  </TableCell>
                  <TableCell className="text-xs">
                    <div>{formatDate(loan.lastContact)}</div>
                    <div className="text-slate-500">{loan.lastContactType}</div>
                  </TableCell>
                  <TableCell className="text-xs">
                    {loan.promisedAmount > 0 && (
                      <div>
                        <span className="text-emerald-400">{formatCurrency(loan.promisedAmount)}</span>
                        <div className="text-slate-500">{formatDate(loan.promiseDate)}</div>
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button size="xs" variant="ghost" className="text-blue-400" onClick={() => openLog(loan)} title="Log Contact">
                        <Phone className="w-3 h-3" />
                      </Button>
                      <Button size="xs" variant="ghost" className="text-emerald-400" onClick={() => openLog(loan)} title="Log SMS">
                        <MessageSquare className="w-3 h-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Contact Log Dialog */}
      <Dialog open={logOpen} onOpenChange={setLogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>Log Contact — {selected?.clientName}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="p-3 bg-slate-700/50 rounded-lg text-xs space-y-1">
              <div className="flex justify-between"><span className="text-slate-400">Loan:</span><span>{selected?.loanNumber}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Outstanding:</span><span className="text-amber-400 font-bold">{formatCurrency(selected?.outstanding ?? 0)}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Days Overdue:</span><span className="text-red-400">{selected?.daysOverdue} days</span></div>
            </div>
            <div className="space-y-1.5">
              <Label>Contact Type</Label>
              <Select value={contactType} onValueChange={setContactType}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="CALL">Phone Call</SelectItem>
                  <SelectItem value="SMS">SMS</SelectItem>
                  <SelectItem value="WHATSAPP">WhatsApp</SelectItem>
                  <SelectItem value="VISIT">Field Visit</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Notes</Label>
              <Input placeholder="Contact outcome, client response..." value={notes} onChange={e => setNotes(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Promise to Pay Amount (ZMW)</Label>
              <Input type="number" placeholder="0.00" value={promiseAmount} onChange={e => setPromiseAmount(e.target.value)} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setLogOpen(false)}>Cancel</Button>
            <Button onClick={handleLog}><CheckCircle className="w-4 h-4 mr-1.5" />Log Contact</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
