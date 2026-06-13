import { useState } from 'react'
import { mockCollateralRules } from '@/data/mockData'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calculator, Shield, DollarSign, Info } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

const conditionMultiplier: Record<string, number> = { EXCELLENT: 1.0, GOOD: 0.85, FAIR: 0.70, POOR: 0.50 }

export default function CollateralAssessmentPage() {
  const [form, setForm] = useState({ assetType: 'SMARTPHONE', brand: '', model: '', ageYears: '0', condition: 'GOOD', batteryHealth: '90', hasCharger: true, hasBox: true })
  const [result, setResult] = useState<any>(null)

  const rules = mockCollateralRules[form.assetType as keyof typeof mockCollateralRules]

  const calculate = () => {
    const rule = mockCollateralRules[form.assetType as keyof typeof mockCollateralRules]
    const baseValues = rule.baseValues as Record<string, number>
    const baseKey = Object.keys(baseValues).find(k => k.toLowerCase().includes(form.brand.toLowerCase()) || k.toLowerCase().includes(form.model.toLowerCase()))
    const baseValue = baseKey ? baseValues[baseKey] : (Object.values(baseValues).reduce((a, b) => a + b, 0) / Object.values(baseValues).length)
    const age = parseFloat(form.ageYears) || 0
    const condMult = (conditionMultiplier as Record<string, number>)[form.condition] ?? 0.7
    const ageDep = Math.max(0, 1 - (age * rule.depreciationPerYear))
    let marketValue = Math.round(baseValue * ageDep * condMult)
    if (form.assetType === 'SMARTPHONE') {
      const battHealth = parseInt(form.batteryHealth) || 80
      if (battHealth < 80) marketValue = Math.round(marketValue * (battHealth / 100))
    }
    if (!form.hasCharger) marketValue = Math.round(marketValue * 0.95)
    if (!form.hasBox) marketValue = Math.round(marketValue * 0.97)
    const fsv = Math.round(marketValue * 0.65)
    const maxLoan = Math.round(fsv * rule.maxLTV)
    setResult({ marketValue, fsv, maxLoan, ltv: rule.maxLTV * 100 })
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-lg font-semibold text-slate-100">Collateral Assessment Engine</h1>
        <p className="text-xs text-slate-500">Calculate market value, forced sale value, and maximum loan amount before intake</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-2"><CardTitle className="text-sm text-slate-200 flex items-center gap-2"><Calculator className="w-4 h-4 text-emerald-400" /> Device Details</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Asset Type</Label>
                <select value={form.assetType} onChange={e => setForm(f => ({...f, assetType: e.target.value, brand: '', model: ''}))} className="w-full h-9 rounded-md border border-slate-600 bg-slate-700/50 text-slate-100 text-sm px-3">
                  {Object.keys(mockCollateralRules).map(k => <option key={k} value={k}>{k.replace('_', ' ')}</option>)}
                </select>
              </div>
              <div className="space-y-1.5">
                <Label>Brand</Label>
                <select value={form.brand} onChange={e => setForm(f => ({...f, brand: e.target.value}))} className="w-full h-9 rounded-md border border-slate-600 bg-slate-700/50 text-slate-100 text-sm px-3">
                  <option value="">Select brand</option>
                  {rules.brands.map((b: string) => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
              <div className="space-y-1.5">
                <Label>Model</Label>
                <Input value={form.model} onChange={e => setForm(f => ({...f, model: e.target.value}))} placeholder="e.g. Galaxy S22" />
              </div>
              <div className="space-y-1.5">
                <Label>Age (Years)</Label>
                <Input type="number" value={form.ageYears} onChange={e => setForm(f => ({...f, ageYears: e.target.value}))} placeholder="0" min="0" max="5" />
              </div>
              <div className="space-y-1.5">
                <Label>Condition</Label>
                <select value={form.condition} onChange={e => setForm(f => ({...f, condition: e.target.value}))} className="w-full h-9 rounded-md border border-slate-600 bg-slate-700/50 text-slate-100 text-sm px-3">
                  <option value="EXCELLENT">Excellent</option>
                  <option value="GOOD">Good</option>
                  <option value="FAIR">Fair</option>
                  <option value="POOR">Poor</option>
                </select>
              </div>
              {form.assetType === 'SMARTPHONE' && (
                <div className="space-y-1.5">
                  <Label>Battery Health %</Label>
                  <Input type="number" value={form.batteryHealth} onChange={e => setForm(f => ({...f, batteryHealth: e.target.value}))} placeholder="90" min="1" max="100" />
                </div>
              )}
            </div>

            <div className="flex items-center gap-4 pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.hasCharger} onChange={e => setForm(f => ({...f, hasCharger: e.target.checked}))} className="rounded border-slate-600" />
                <span className="text-xs text-slate-300">Charger included</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.hasBox} onChange={e => setForm(f => ({...f, hasBox: e.target.checked}))} className="rounded border-slate-600" />
                <span className="text-xs text-slate-300">Original box</span>
              </label>
            </div>

            <Button onClick={calculate} className="w-full">
              <Calculator className="w-4 h-4 mr-2" /> Calculate Valuation
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-3">
          {result ? (
            <Card className="bg-slate-800 border-emerald-500/30">
              <CardHeader className="pb-2"><CardTitle className="text-sm text-emerald-400 flex items-center gap-2"><Shield className="w-4 h-4" /> Valuation Result</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-1 gap-3">
                  {[
                    { label: 'Estimated Market Value', value: formatCurrency(result.marketValue), color: 'text-white', bg: 'bg-slate-700/50', desc: 'Current fair market price' },
                    { label: 'Forced Sale Value (FSV)', value: formatCurrency(result.fsv), color: 'text-amber-400', bg: 'bg-amber-500/10', desc: 'Value if liquidated quickly (65% of market)' },
                    { label: 'Maximum Loan Amount', value: formatCurrency(result.maxLoan), color: 'text-emerald-400', bg: 'bg-emerald-500/10', desc: `${result.ltv}% LTV on FSV` },
                  ].map(item => (
                    <div key={item.label} className={`rounded-lg p-4 ${item.bg}`}>
                      <p className="text-xs text-slate-400">{item.label}</p>
                      <p className={`text-2xl font-bold mt-1 ${item.color}`}>{item.value}</p>
                      <p className="text-[10px] text-slate-500 mt-0.5">{item.desc}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-blue-500/10 border border-blue-500/20 rounded p-3 flex gap-2">
                  <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <p className="text-xs text-blue-300">This is a system estimate. Final value must be confirmed by physical inspection and manager sign-off before loan approval.</p>
                </div>
                <Button className="w-full" variant="outline">Use This Valuation in Loan Wizard</Button>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-slate-800 border-slate-700 h-full flex items-center justify-center">
              <CardContent className="text-center py-12">
                <Calculator className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                <p className="text-sm text-slate-400">Fill in device details and click Calculate</p>
                <p className="text-xs text-slate-500 mt-1">The system will estimate market value, FSV, and max loan amount</p>
              </CardContent>
            </Card>
          )}

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="pb-2"><CardTitle className="text-sm text-slate-200">Depreciation Rules — {form.assetType.replace('_', ' ')}</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between"><span className="text-slate-400">Max age accepted</span><span className="text-white">{rules.maxAgeYears} years</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Annual depreciation</span><span className="text-white">{(rules.depreciationPerYear * 100).toFixed(0)}%</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Maximum LTV</span><span className="text-white">{(rules.maxLTV * 100).toFixed(0)}% of FSV</span></div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
