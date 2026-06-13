import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Plus, Users, Star, TrendingUp, Phone, Mail, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { mockClients } from '@/data/mockData'
import { formatCurrency } from '@/lib/utils'

export default function ClientsPage() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  const filtered = mockClients.filter(c => {
    const q = search.toLowerCase()
    const matchSearch = !q || c.fullName.toLowerCase().includes(q) || c.nrcNumber.includes(q) || c.phone.includes(q) || c.clientCode.toLowerCase().includes(q)
    const matchFilter = filter === 'all' || (filter === 'active' && c.activeLoans > 0) || (filter === 'students' && c.occupation === 'Student') || (filter === 'business' && (c.occupation === 'Small Business Owner' || c.occupation === 'Entrepreneur' || c.occupation === 'Market Trader'))
    return matchSearch && matchFilter
  })

  const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  const getScoreColor = (score: number) => score >= 80 ? 'text-emerald-400' : score >= 60 ? 'text-amber-400' : 'text-red-400'

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">Client Registry</h2>
          <p className="text-sm text-slate-400">{mockClients.length} registered clients</p>
        </div>
        <Button onClick={() => navigate('/clients/new')} size="sm">
          <Plus className="w-4 h-4 mr-1.5" />New Client
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Total Clients', value: mockClients.length, icon: Users, color: 'text-blue-400' },
          { label: 'Active Borrowers', value: mockClients.filter(c => c.activeLoans > 0).length, icon: TrendingUp, color: 'text-emerald-400' },
          { label: 'Students', value: mockClients.filter(c => c.occupation === 'Student').length, icon: Users, color: 'text-purple-400' },
          { label: 'Business Owners', value: mockClients.filter(c => c.occupation !== 'Student' && c.occupation !== 'Civil Servant').length, icon: Star, color: 'text-amber-400' },
        ].map(({ label, value, icon: Icon, color }) => (
          <Card key={label} className="bg-slate-800 border-slate-700">
            <CardContent className="p-3 flex items-center gap-3">
              <Icon className={`w-5 h-5 ${color}`} />
              <div><p className="text-xl font-bold text-white">{value}</p><p className="text-xs text-slate-400">{label}</p></div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2 w-4 h-4 text-slate-400" />
          <Input placeholder="Search by name, NRC, phone..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-44">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Clients</SelectItem>
            <SelectItem value="active">Active Borrowers</SelectItem>
            <SelectItem value="students">Students</SelectItem>
            <SelectItem value="business">Business Owners</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Client Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {filtered.map(client => (
          <Card key={client.id} className="bg-slate-800 border-slate-700 hover:border-slate-500 transition-colors cursor-pointer" onClick={() => navigate(`/clients/${client.id}`)}>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Avatar className="w-10 h-10 shrink-0">
                  <AvatarFallback className="bg-slate-700 text-slate-200 text-sm">{getInitials(client.fullName)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-slate-100 text-sm truncate">{client.fullName}</p>
                    <Badge variant={client.activeLoans > 0 ? 'success' : 'secondary'} className="text-xs ml-1 shrink-0">
                      {client.activeLoans > 0 ? `${client.activeLoans} active` : 'No loans'}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-400 truncate">{client.clientCode} · {client.occupation}</p>
                  {client.university && <p className="text-xs text-blue-400 truncate">{client.university}</p>}
                  {client.businessName && <p className="text-xs text-amber-400 truncate">{client.businessName}</p>}
                </div>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center gap-1.5 text-slate-400">
                  <Phone className="w-3 h-3" /><span>{client.phone}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-400">
                  <TrendingUp className="w-3 h-3" />
                  <span className={getScoreColor(client.internalScore)}>Score: {client.internalScore}/100</span>
                </div>
              </div>

              {client.totalBorrowed > 0 && (
                <div className="mt-2 pt-2 border-t border-slate-700 flex items-center justify-between">
                  <span className="text-xs text-slate-500">Total Borrowed</span>
                  <span className="text-xs font-semibold text-emerald-400">{formatCurrency(client.totalBorrowed)}</span>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <p className="text-slate-400">No clients found</p>
          <Button className="mt-4" onClick={() => navigate('/clients/new')}><Plus className="w-4 h-4 mr-1.5" />Register First Client</Button>
        </div>
      )}
    </div>
  )
}
