import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Shield, Search, Plus, Package, DollarSign, Lock, Unlock, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { mockCollateral, mockDashboardStats } from '@/data/mockData'
import { formatCurrency } from '@/lib/utils'

const assetIcons: Record<string, string> = {
  SMARTPHONE: '📱', LAPTOP: '💻', TABLET: '📱', GAMING_CONSOLE: '🎮',
  ELECTRONICS: '⚡', EQUIPMENT: '🔧', OTHER: '📦'
}

export default function CollateralPage() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')

  const filtered = mockCollateral.filter(c => {
    const q = search.toLowerCase()
    const matchSearch = !q || c.vaultId.toLowerCase().includes(q) || c.brand.toLowerCase().includes(q) || c.model.toLowerCase().includes(q) || (c.serialNumber ?? '').toLowerCase().includes(q) || c.clientName.toLowerCase().includes(q)
    const matchStatus = statusFilter === 'all' || c.status === statusFilter
    const matchType = typeFilter === 'all' || c.assetType === typeFilter
    return matchSearch && matchStatus && matchType
  })

  const held = mockCollateral.filter(c => c.status === 'HELD')
  const released = mockCollateral.filter(c => c.status === 'RELEASED')
  const totalValue = mockCollateral.reduce((sum, c) => sum + c.marketValue, 0)

  const getStatusVariant = (status: string) => {
    const map: Record<string, any> = { HELD: 'warning', RELEASED: 'success', AUCTIONED: 'danger', LOST: 'danger' }
    return map[status] ?? 'secondary'
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">Collateral Vault</h2>
          <p className="text-sm text-slate-400">{mockCollateral.length} items registered</p>
        </div>
        <Button size="sm"><Plus className="w-4 h-4 mr-1.5" />Register Item</Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-3 flex items-center gap-3">
            <Package className="w-5 h-5 text-blue-400" />
            <div><p className="text-xl font-bold text-white">{mockDashboardStats.collateralHeld}</p><p className="text-xs text-slate-400">Total Items</p></div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-3 flex items-center gap-3">
            <DollarSign className="w-5 h-5 text-emerald-400" />
            <div><p className="text-lg font-bold text-white">{formatCurrency(mockDashboardStats.collateralValue)}</p><p className="text-xs text-slate-400">Total Value</p></div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-3 flex items-center gap-3">
            <Lock className="w-5 h-5 text-amber-400" />
            <div><p className="text-xl font-bold text-white">{held.length}</p><p className="text-xs text-slate-400">Currently Held</p></div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-3 flex items-center gap-3">
            <Unlock className="w-5 h-5 text-emerald-400" />
            <div><p className="text-xl font-bold text-white">{released.length}</p><p className="text-xs text-slate-400">Released</p></div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2 w-4 h-4 text-slate-400" />
          <Input placeholder="Search by vault ID, brand, serial, client..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-36"><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="HELD">Held</SelectItem>
            <SelectItem value="RELEASED">Released</SelectItem>
            <SelectItem value="AUCTIONED">Auctioned</SelectItem>
          </SelectContent>
        </Select>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-40"><SelectValue placeholder="Asset Type" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="SMARTPHONE">Smartphones</SelectItem>
            <SelectItem value="LAPTOP">Laptops</SelectItem>
            <SelectItem value="TABLET">Tablets</SelectItem>
            <SelectItem value="GAMING_CONSOLE">Gaming Consoles</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Vault Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {filtered.map(item => (
          <Card key={item.id} className="bg-slate-800 border-slate-700 hover:border-slate-500 transition-colors cursor-pointer" onClick={() => navigate(`/collateral/${item.id}`)}>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center text-2xl shrink-0">
                  {assetIcons[item.assetType] ?? '📦'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-emerald-400 font-bold">{item.vaultId}</span>
                    <Badge variant={getStatusVariant(item.status)} className="text-xs">{item.status}</Badge>
                  </div>
                  <p className="font-semibold text-slate-100 text-sm mt-0.5 truncate">{item.brand} {item.model}</p>
                  <p className="text-xs text-slate-400">{item.assetType.replace('_', ' ')} · {item.condition}</p>
                </div>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                <div><span className="text-slate-500">Market Value</span><p className="font-semibold text-white">{formatCurrency(item.marketValue)}</p></div>
                <div><span className="text-slate-500">FSV</span><p className="font-semibold text-amber-400">{formatCurrency(item.forcedSaleValue)}</p></div>
              </div>

              <div className="mt-2 pt-2 border-t border-slate-700 flex items-center justify-between text-xs">
                <span className="text-slate-500">{item.vaultPosition} · {item.lockerNumber}</span>
                <span className="text-slate-400">Client: <span className="text-slate-300">{item.clientName}</span></span>
              </div>

              {item.serialNumber && (
                <p className="text-xs text-slate-500 mt-1 font-mono">SN: {item.serialNumber}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <Shield className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <p className="text-slate-400">No collateral items found</p>
        </div>
      )}
    </div>
  )
}
