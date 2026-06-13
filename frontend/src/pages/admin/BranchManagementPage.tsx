import { mockBranches } from '@/data/mockData'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Building2, Users, Briefcase, DollarSign, Plus, MapPin, Phone } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

export default function BranchManagementPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-slate-100">Branch Management</h1>
          <p className="text-xs text-slate-500">Manage Philix Finance locations — built for future expansion</p>
        </div>
        <Button size="sm"><Plus className="w-4 h-4 mr-1" /> Add Branch</Button>
      </div>

      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
        <p className="text-xs text-blue-300">
          <strong>Future Expansion Ready:</strong> This module is built to support multiple branches. When Philix Finance opens new locations, add them here and assign managers and staff.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockBranches.map(branch => (
          <Card key={branch.id} className={`bg-slate-800 ${branch.isActive ? 'border-emerald-500/30' : 'border-slate-700'}`}>
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <Building2 className={`w-5 h-5 ${branch.isActive ? 'text-emerald-400' : 'text-slate-500'}`} />
                  <CardTitle className="text-sm text-slate-200">{branch.name}</CardTitle>
                </div>
                <Badge variant={branch.isActive ? 'success' : 'secondary'} className="text-[10px]">{branch.isActive ? 'ACTIVE' : 'PLANNED'}</Badge>
              </div>
              <p className="text-[10px] text-slate-500">Branch Code: {branch.code}</p>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center gap-2 text-slate-400">
                  <MapPin className="w-3.5 h-3.5 shrink-0" />{branch.address}, {branch.city}
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <Phone className="w-3.5 h-3.5 shrink-0" />{branch.phone}
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <Users className="w-3.5 h-3.5 shrink-0" />Manager: {branch.managerName}
                </div>
              </div>
              {branch.isActive && (
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-700">
                  <div className="text-center">
                    <p className="text-sm font-semibold text-white">{branch.staffCount}</p>
                    <p className="text-[10px] text-slate-500">Staff</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-semibold text-white">{branch.activeLoans}</p>
                    <p className="text-[10px] text-slate-500">Active Loans</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-semibold text-white">{formatCurrency(branch.totalPortfolio)}</p>
                    <p className="text-[10px] text-slate-500">Portfolio</p>
                  </div>
                </div>
              )}
              {!branch.isActive && (
                <div className="pt-2 border-t border-slate-700">
                  <p className="text-xs text-slate-500">Branch setup pending. No staff or loans assigned yet.</p>
                  <Button variant="outline" size="xs" className="mt-2">Setup Branch</Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
