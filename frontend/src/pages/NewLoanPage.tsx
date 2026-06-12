import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, CheckCircle, Calculator } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { mockClients, mockCollateral } from '@/data/mockData'
import { formatCurrency } from '@/lib/utils'
import { useToast } from '@/components/ui/use-toast'

const steps = ['Select Client', 'Select Collateral', 'Loan Parameters', 'Review & Submit']

export default function NewLoanPage() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [step, setStep] = useState(0)
  const [clientId, setClientId] = useState('')
  const [collateralId, setCollateralId] = useState('')
  const [loanType, setLoanType] = useState('STUDENT')
  const [principal, setPrincipal] = useState('5000')
  const [rate, setRate] = useState('10')
  const [duration, setDuration] = useState('3')
  const [frequency, setFrequency] = useState('MONTHLY')

  const client = mockClients.find(c => c.id === clientId)
  const collateral = mockCollateral.find(c => c.id === collateralId)
  const p = parseFloat(principal) || 0
  const r = parseFloat(rate) || 0
  const d = parseInt(duration) || 1
  const totalInterest = (p * r / 100) * d
  const processingFee = p * 0.05
  const totalAmount = p + totalInterest + processingFee
  const disbursed = p - processingFee
  const installments = frequency === 'WEEKLY' ? d * 4 : frequency === 'BIWEEKLY' ? d * 2 : d
  const installmentAmount = totalAmount / installments

  const handleSubmit = () => {
    toast({ title: 'Loan Application Submitted', description: 'Loan is pending approval by a manager.' })
    navigate('/loans')
  }

  const canNext = () => {
    if (step === 0) return !!clientId
    if (step === 1) return !!collateralId
    if (step === 2) return p > 0 && r > 0 && d > 0
    return true
  }

  return (
    <div className="space-y-4 max-w-3xl">
      <Button variant="ghost" size="sm" onClick={() => navigate(-1)}><ArrowLeft className="w-4 h-4 mr-1.5" />Back</Button>

      <div>
        <h2 className="text-lg font-semibold text-white">New Loan Application</h2>
        <p className="text-sm text-slate-400">Step {step + 1} of {steps.length}</p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center gap-2">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center gap-2 flex-1">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${i < step ? 'bg-emerald-600 text-white' : i === step ? 'bg-slate-600 text-white border-2 border-emerald-500' : 'bg-slate-700 text-slate-400'}`}>
              {i < step ? <CheckCircle className="w-4 h-4" /> : i + 1}
            </div>
            <span className={`text-xs hidden md:block ${i === step ? 'text-slate-200' : 'text-slate-500'}`}>{s}</span>
            {i < steps.length - 1 && <div className={`flex-1 h-px ${i < step ? 'bg-emerald-600' : 'bg-slate-700'}`} />}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader className="pb-2"><CardTitle className="text-sm">{steps[step]}</CardTitle></CardHeader>
        <CardContent>
          {step === 0 && (
            <div className="space-y-2">
              {mockClients.map(c => (
                <div
                  key={c.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${clientId === c.id ? 'border-emerald-500 bg-emerald-500/10' : 'border-slate-700 hover:border-slate-500'}`}
                  onClick={() => setClientId(c.id)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-slate-200">{c.fullName}</p>
                      <p className="text-xs text-slate-400">{c.clientCode} · {c.occupation} · Score: {c.internalScore}</p>
                    </div>
                    <Badge variant={c.activeLoans > 0 ? 'warning' : 'success'} className="text-xs">
                      {c.activeLoans > 0 ? `${c.activeLoans} active loans` : 'No active loans'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}

          {step === 1 && (
            <div className="space-y-2">
              {mockCollateral.filter(c => c.status === 'RELEASED' || !c.loanId).map(c => (
                <div
                  key={c.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${collateralId === c.id ? 'border-emerald-500 bg-emerald-500/10' : 'border-slate-700 hover:border-slate-500'}`}
                  onClick={() => setCollateralId(c.id)}
                >
                  <div className="flex justify-between">
                    <div>
                      <p className="font-mono text-xs text-emerald-400">{c.vaultId}</p>
                      <p className="font-medium text-slate-200">{c.brand} {c.model}</p>
                      <p className="text-xs text-slate-400">{c.assetType} · {c.condition}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-white">{formatCurrency(c.marketValue)}</p>
                      <p className="text-xs text-slate-400">FSV: {formatCurrency(c.forcedSaleValue)}</p>
                    </div>
                  </div>
                </div>
              ))}
              <p className="text-xs text-slate-400 text-center pt-2">Or register new collateral — use the Collateral Vault page</p>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>Loan Type</Label>
                  <Select value={loanType} onValueChange={setLoanType}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="STUDENT">Student Loan</SelectItem>
                      <SelectItem value="CAMPUS">Campus Loan</SelectItem>
                      <SelectItem value="BUSINESS">Business Loan</SelectItem>
                      <SelectItem value="SHORT_TERM">Short-Term Loan</SelectItem>
                      <SelectItem value="ASSET_BACKED">Asset-Backed Loan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label>Principal Amount (ZMW)</Label>
                  <Input type="number" value={principal} onChange={e => setPrincipal(e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label>Interest Rate (% per month)</Label>
                  <Input type="number" value={rate} onChange={e => setRate(e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label>Duration (months)</Label>
                  <Input type="number" value={duration} onChange={e => setDuration(e.target.value)} />
                </div>
                <div className="space-y-1.5 col-span-2">
                  <Label>Repayment Frequency</Label>
                  <Select value={frequency} onValueChange={setFrequency}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="WEEKLY">Weekly</SelectItem>
                      <SelectItem value="BIWEEKLY">Bi-Weekly</SelectItem>
                      <SelectItem value="MONTHLY">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {p > 0 && (
                <div className="p-4 bg-slate-700/50 rounded-lg border border-slate-600">
                  <p className="text-xs font-semibold text-slate-300 mb-3 flex items-center gap-1"><Calculator className="w-3 h-3" />Loan Calculation</p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {[
                      { label: 'Principal', value: formatCurrency(p) },
                      { label: 'Processing Fee (5%)', value: formatCurrency(processingFee) },
                      { label: 'Net Disbursed', value: formatCurrency(disbursed) },
                      { label: 'Total Interest', value: formatCurrency(totalInterest) },
                      { label: 'Total Payable', value: formatCurrency(totalAmount), bold: true },
                      { label: `Per ${frequency.toLowerCase()} installment (${installments})`, value: formatCurrency(installmentAmount), bold: true },
                    ].map(({ label, value, bold }) => (
                      <div key={label} className="flex justify-between border-b border-slate-700/50 pb-1">
                        <span className="text-slate-400">{label}</span>
                        <span className={bold ? 'text-emerald-400 font-bold' : 'text-white'}>{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-slate-700/50 rounded-lg">
                  <p className="text-xs text-slate-400">Client</p>
                  <p className="font-medium text-slate-200">{client?.fullName}</p>
                  <p className="text-xs text-slate-500">{client?.clientCode}</p>
                </div>
                <div className="p-3 bg-slate-700/50 rounded-lg">
                  <p className="text-xs text-slate-400">Collateral</p>
                  <p className="font-medium text-slate-200">{collateral?.brand} {collateral?.model}</p>
                  <p className="text-xs text-slate-500">{collateral?.vaultId}</p>
                </div>
                <div className="p-3 bg-slate-700/50 rounded-lg">
                  <p className="text-xs text-slate-400">Loan Type</p>
                  <p className="font-medium text-slate-200">{loanType.replace('_', ' ')}</p>
                  <p className="text-xs text-slate-500">{rate}% p.m. · {duration} months</p>
                </div>
                <div className="p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                  <p className="text-xs text-slate-400">Total Payable</p>
                  <p className="text-lg font-bold text-emerald-400">{formatCurrency(totalAmount)}</p>
                  <p className="text-xs text-slate-500">{formatCurrency(installmentAmount)}/{frequency.toLowerCase()}</p>
                </div>
              </div>
              <div className="p-3 bg-amber-500/10 rounded-lg border border-amber-500/30">
                <p className="text-xs text-amber-400 font-medium">⚠️ This application will be sent for approval</p>
                <p className="text-xs text-slate-400 mt-1">A manager will review and approve this loan before disbursement.</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => step === 0 ? navigate('/loans') : setStep(s => s - 1)}>
          <ArrowLeft className="w-4 h-4 mr-1.5" />{step === 0 ? 'Cancel' : 'Back'}
        </Button>
        {step < steps.length - 1 ? (
          <Button onClick={() => setStep(s => s + 1)} disabled={!canNext()}>
            Next<ArrowRight className="w-4 h-4 ml-1.5" />
          </Button>
        ) : (
          <Button onClick={handleSubmit}><CheckCircle className="w-4 h-4 mr-1.5" />Submit Application</Button>
        )}
      </div>
    </div>
  )
}
