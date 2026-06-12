import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, Phone, Mail, MapPin, Building, Star, CreditCard, FileText, MessageSquare, Plus, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { mockClients, mockLoans, mockCollateral } from '@/data/mockData'
import { formatCurrency, formatDate } from '@/lib/utils'

export default function ClientDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const client = mockClients.find(c => c.id === id) ?? mockClients[0]
  const loans = mockLoans.filter(l => l.clientId === client.id)
  const collaterals = mockCollateral.filter(c => c.clientId === client.id)
  const initials = client.fullName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  const scoreColor = client.internalScore >= 80 ? 'text-emerald-400' : client.internalScore >= 60 ? 'text-amber-400' : 'text-red-400'

  const getLoanStatusVariant = (status: string) => {
    const map: Record<string, any> = { ACTIVE: 'success', PAID: 'info', OVERDUE: 'warning', DEFAULT: 'danger', PENDING: 'purple' }
    return map[status] ?? 'secondary'
  }

  return (
    <div className="space-y-4">
      <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
        <ArrowLeft className="w-4 h-4 mr-1.5" />Back to Clients
      </Button>

      {/* Profile Header */}
      <Card className="bg-slate-800 border-slate-700">
        <CardContent className="p-5">
          <div className="flex items-start gap-4">
            <Avatar className="w-16 h-16 shrink-0">
              <AvatarFallback className="bg-slate-700 text-slate-200 text-xl font-bold">{initials}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-start justify-between flex-wrap gap-2">
                <div>
                  <h2 className="text-xl font-bold text-white">{client.fullName}</h2>
                  <p className="text-sm text-slate-400">{client.clientCode} · {client.occupation}</p>
                  {client.university && <p className="text-sm text-blue-400">{client.university}{client.studentId ? ` · ${client.studentId}` : ''}</p>}
                  {client.businessName && <p className="text-sm text-amber-400">{client.businessName}</p>}
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={client.status === 'ACTIVE' ? 'success' : 'danger'}>{client.status}</Badge>
                  <Button size="sm" onClick={() => navigate('/loans/new')}><Plus className="w-4 h-4 mr-1" />New Loan</Button>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap gap-4 text-sm text-slate-400">
                <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" />{client.phone}</span>
                {client.email && <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" />{client.email}</span>}
                <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />{client.address}</span>
              </div>
            </div>
          </div>

          {/* Risk score bar */}
          <div className="mt-4 grid grid-cols-3 gap-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-slate-400">Credit Score</span>
                <span className={`text-sm font-bold ${scoreColor}`}>{client.internalScore}/100</span>
              </div>
              <Progress value={client.internalScore} className="h-1.5" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-slate-400">Reliability</span>
                <div className="flex items-center gap-0.5">
                  {[1,2,3,4,5].map(i => <Star key={i} className={`w-3 h-3 ${i <= client.reliabilityRating ? 'text-amber-400 fill-amber-400' : 'text-slate-600'}`} />)}
                </div>
              </div>
              <Progress value={client.reliabilityRating * 20} className="h-1.5" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-slate-400">Total Borrowed</span>
                <span className="text-sm font-bold text-white">{formatCurrency(client.totalBorrowed)}</span>
              </div>
              <Progress value={Math.min((client.totalBorrowed / 150000) * 100, 100)} className="h-1.5" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="loans">Loans ({loans.length})</TabsTrigger>
          <TabsTrigger value="collateral">Collateral ({collaterals.length})</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader className="pb-2"><CardTitle className="text-sm">Personal Information</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                {[
                  { label: 'Full Name', value: client.fullName },
                  { label: 'NRC Number', value: client.nrcNumber },
                  { label: 'Phone', value: client.phone },
                  { label: 'WhatsApp', value: client.whatsapp },
                  { label: 'Email', value: client.email },
                  { label: 'Address', value: client.address },
                  { label: 'Occupation', value: client.occupation },
                ].map(({ label, value }) => value && (
                  <div key={label} className="flex justify-between items-start gap-4">
                    <span className="text-xs text-slate-400 shrink-0 w-24">{label}</span>
                    <span className="text-xs text-slate-200 text-right">{value}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {(client.employerName || client.businessName) && (
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader className="pb-2"><CardTitle className="text-sm">{client.employerName ? 'Employment' : 'Business'} Information</CardTitle></CardHeader>
                <CardContent className="space-y-2">
                  {client.employerName && [
                    { label: 'Employer', value: client.employerName },
                    { label: 'Monthly Salary', value: client.salary ? formatCurrency(client.salary) : undefined },
                    { label: 'Pay Date', value: client.payDate ? `${client.payDate}th of month` : undefined },
                  ].map(({ label, value }) => value && (
                    <div key={label} className="flex justify-between"><span className="text-xs text-slate-400">{label}</span><span className="text-xs text-slate-200">{value}</span></div>
                  ))}
                  {client.businessName && [
                    { label: 'Business Name', value: client.businessName },
                    { label: 'Type', value: client.businessType },
                    { label: 'Location', value: client.marketLocation },
                    { label: 'Monthly Revenue', value: client.monthlyRevenue ? formatCurrency(client.monthlyRevenue) : undefined },
                  ].map(({ label, value }) => value && (
                    <div key={label} className="flex justify-between"><span className="text-xs text-slate-400">{label}</span><span className="text-xs text-slate-200">{value}</span></div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="loans">
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-0">
              {loans.length === 0 ? (
                <div className="text-center py-10 text-slate-400">No loans found for this client</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Loan #</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead className="text-right">Principal</TableHead>
                      <TableHead className="text-right">Outstanding</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loans.map(loan => (
                      <TableRow key={loan.id}>
                        <TableCell className="font-mono text-xs text-slate-400">{loan.loanNumber}</TableCell>
                        <TableCell><Badge variant="secondary" className="text-xs">{loan.loanType.replace('_', ' ')}</Badge></TableCell>
                        <TableCell className="text-right text-slate-200">{formatCurrency(loan.principal)}</TableCell>
                        <TableCell className="text-right font-medium text-white">{formatCurrency(loan.outstandingBalance)}</TableCell>
                        <TableCell><Badge variant={getLoanStatusVariant(loan.status)} className="text-xs">{loan.status}</Badge></TableCell>
                        <TableCell className="text-xs text-slate-400">{loan.disbursedAt ? formatDate(loan.disbursedAt) : '—'}</TableCell>
                        <TableCell>
                          <Button size="xs" variant="ghost" onClick={() => navigate(`/loans/${loan.id}`)}>View</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="collateral">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {collaterals.length === 0 ? (
              <p className="text-slate-400 col-span-2 text-center py-8">No collateral registered</p>
            ) : collaterals.map(c => (
              <Card key={c.id} className="bg-slate-800 border-slate-700">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs text-emerald-400">{c.vaultId}</span>
                    <Badge variant={c.status === 'HELD' ? 'warning' : c.status === 'RELEASED' ? 'success' : 'danger'} className="text-xs">{c.status}</Badge>
                  </div>
                  <p className="font-medium text-slate-200 text-sm">{c.brand} {c.model}</p>
                  <p className="text-xs text-slate-400 mt-1">{c.assetType} · {c.condition} · {c.color}</p>
                  <div className="mt-2 flex justify-between text-xs">
                    <span className="text-slate-400">Market Value: <span className="text-white">{formatCurrency(c.marketValue)}</span></span>
                    <span className="text-slate-400">LTV: <span className="text-amber-400">{c.loanToValueRatio}%</span></span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="documents">
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6 text-center">
              <FileText className="w-10 h-10 text-slate-600 mx-auto mb-3" />
              <p className="text-slate-400 text-sm">No documents uploaded yet</p>
              <Button size="sm" className="mt-4"><Plus className="w-4 h-4 mr-1.5" />Upload Document</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notes">
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6 text-center">
              <MessageSquare className="w-10 h-10 text-slate-600 mx-auto mb-3" />
              <p className="text-slate-400 text-sm">No notes yet</p>
              <Button size="sm" className="mt-4"><Plus className="w-4 h-4 mr-1.5" />Add Note</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
