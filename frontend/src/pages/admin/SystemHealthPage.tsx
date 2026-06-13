import { mockSystemHealth } from '@/data/mockData'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Server, Database, Users, Clock, HardDrive, Zap, CheckCircle, Shield } from 'lucide-react'
import { formatDateTime } from '@/lib/utils'

export default function SystemHealthPage() {
  const h = mockSystemHealth
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-lg font-semibold text-slate-100">System Health Center</h1>
        <p className="text-xs text-slate-500">Infrastructure status and database diagnostics</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { title: 'Database', value: h.dbStatus, icon: Database, ok: h.dbStatus === 'ONLINE', iconBg: 'bg-emerald-500/10', iconColor: 'text-emerald-400' },
          { title: 'Active Users', value: `${h.activeUsers} / ${h.totalUsers}`, icon: Users, ok: true, iconBg: 'bg-blue-500/10', iconColor: 'text-blue-400' },
          { title: 'Server Uptime', value: h.serverUptime, icon: Clock, ok: true, iconBg: 'bg-purple-500/10', iconColor: 'text-purple-400' },
          { title: 'API Response', value: `${h.apiResponseMs}ms`, icon: Zap, ok: h.apiResponseMs < 200, iconBg: 'bg-amber-500/10', iconColor: 'text-amber-400' },
        ].map(item => (
          <Card key={item.title} className={`bg-slate-800 border-slate-700`}>
            <CardContent className="p-4 flex items-start gap-3">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${item.iconBg}`}>
                <item.icon className={`w-4 h-4 ${item.iconColor}`} />
              </div>
              <div>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider">{item.title}</p>
                <p className="text-base font-bold text-white">{item.value}</p>
                <Badge variant={item.ok ? 'success' : 'danger'} className="text-[10px] mt-0.5">{item.ok ? 'OK' : 'ISSUE'}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-2"><CardTitle className="text-sm text-slate-200">Database Statistics</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between py-2 border-b border-slate-700">
              <span className="text-xs text-slate-400">Database Version</span>
              <span className="text-xs text-slate-200 font-medium">{h.dbVersion}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-700">
              <span className="text-xs text-slate-400">Database Size</span>
              <span className="text-xs text-slate-200 font-medium">{h.dbSizeMB} MB</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-700">
              <span className="text-xs text-slate-400">Last Backup</span>
              <div className="text-right">
                <p className="text-xs text-slate-200 font-medium">{formatDateTime(h.lastBackup)}</p>
                <Badge variant={h.backupStatus === 'SUCCESS' ? 'success' : 'danger'} className="text-[10px]">{h.backupStatus}</Badge>
              </div>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-700">
              <span className="text-xs text-slate-400">Node.js Version</span>
              <span className="text-xs text-slate-200 font-medium">{h.nodeVersion}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-2"><CardTitle className="text-sm text-slate-200">Record Counts</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {Object.entries(h.totalRecords).map(([k, v]) => (
              <div key={k} className="flex items-center justify-between py-2 border-b border-slate-700 last:border-0">
                <span className="text-xs text-slate-400 capitalize">{k}</span>
                <span className="text-sm font-semibold text-white">{(v as number).toLocaleString()}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="bg-slate-800 border-emerald-500/30">
        <CardContent className="p-4 flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-emerald-400" />
          <div>
            <p className="text-sm font-medium text-emerald-300">All Systems Operational</p>
            <p className="text-xs text-slate-500">No errors detected in the last 24 hours. Database backup completed successfully.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
