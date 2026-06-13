import { useState } from 'react'
import { mockCollateral, mockLoans } from '@/data/mockData'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Unlock, Shield, CheckCircle, AlertTriangle, Printer } from 'lucide-react'
import { formatCurrency, formatDate } from '@/lib/utils'

export default function CollateralReleasePage() {
  const [selected, setSelected] = useState<any>(null)
  const [released, setReleased] = useState<string[]>([])

  const eligibleCollateral = (mockCollateral as any[]).filter((c: any) => {
    const loan = mockLoans.find((l: any) => l.collateralId === c.id)
    return loan?.status === 'PAID' && !released.includes(c.id)
  })

  const handleRelease = (c: any) => {
    setReleased(prev => [...prev, c.id])
    setSelected(null)
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-lg font-semibold text-slate-100">Collateral Release Queue</h1>
        <p className="text-xs text-slate-500">Process collateral releases for fully paid loans — requires manager approval</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card className="bg-slate-800 border-slate-700"><CardContent className="p-4 text-center"><p className="text-2xl font-bold text-amber-400">{eligibleCollateral.length}</p><p className="text-xs text-slate-400">Eligible for Release</p></CardContent></Card>
        <Card className="bg-slate-800 border-slate-700"><CardContent className="p-4 text-center"><p className="text-2xl font-bold text-emerald-400">{released.length}</p><p className="text-xs text-slate-400">Released Today</p></CardContent></Card>
        <Card className="bg-slate-800 border-slate-700"><CardContent className="p-4 text-center"><p className="text-2xl font-bold text-white">{(mockCollateral as any[]).filter((c: any) => c.status === 'HELD').length}</p><p className="text-xs text-slate-400">Total in Vault</p></CardContent></Card>
      </div>

      {eligibleCollateral.length === 0 ? (
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="py-12 text-center">
            <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
            <p className="text-sm text-slate-300">No collateral pending release</p>
            <p className="text-xs text-slate-500 mt-1">All eligible items have been processed</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {eligibleCollateral.map((c: any) => {
            const loan = mockLoans.find((l: any) => l.collateralId === c.id)
            return (
              <Card key={c.id} className="bg-slate-800 border-emerald-500/30">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center shrink-0">
                    <Shield className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-semibold text-slate-100">{c.brand} {c.model}</p>
                      <Badge variant="success" className="text-[10px]">LOAN PAID</Badge>
                    </div>
                    <p className="text-xs text-slate-500">{c.vaultId} · {c.assetType} · {c.serialNumber}</p>
                    <p className="text-xs text-slate-500">Client: {(loan as any)?.clientName ?? 'Unknown'} · Loan: {(loan as any)?.loanNumber}</p>
                    <p className="text-xs text-emerald-400 mt-0.5">FSV: {formatCurrency(c.forcedSaleValue)} · Shelf: {c.shelfNumber}</p>
                  </div>
                  <Button size="sm" onClick={() => setSelected(c)}>
                    <Unlock className="w-3.5 h-3.5 mr-1" /> Process Release
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="bg-slate-800 border-slate-700 max-w-md">
          <DialogHeader><DialogTitle className="text-slate-100">Confirm Collateral Release</DialogTitle></DialogHeader>
          {selected && (
            <div className="space-y-4 mt-2">
              <div className="bg-amber-500/10 border border-amber-500/30 rounded p-3">
                <p className="text-xs text-amber-300 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                  This action is irreversible. The collateral will be marked as RELEASED and removed from the vault inventory.
                </p>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-700"><span className="text-slate-400">Asset</span><span className="text-slate-200">{selected.brand} {selected.model}</span></div>
                <div className="flex justify-between py-1 border-b border-slate-700"><span className="text-slate-400">Vault ID</span><span className="text-slate-200">{selected.vaultId}</span></div>
                <div className="flex justify-between py-1 border-b border-slate-700"><span className="text-slate-400">Serial No.</span><span className="text-slate-200">{selected.serialNumber}</span></div>
                <div className="flex justify-between py-1 border-b border-slate-700"><span className="text-slate-400">Released By</span><span className="text-slate-200">Daliso Phiri (Manager)</span></div>
                <div className="flex justify-between py-1"><span className="text-slate-400">Release Date</span><span className="text-slate-200">{formatDate(new Date())}</span></div>
              </div>
              <div className="flex gap-2 justify-end">
                <Button variant="secondary" size="sm" onClick={() => setSelected(null)}>Cancel</Button>
                <Button size="sm" className="bg-emerald-600 hover:bg-emerald-500" onClick={() => handleRelease(selected)}>
                  <CheckCircle className="w-3.5 h-3.5 mr-1" /> Confirm & Release
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
