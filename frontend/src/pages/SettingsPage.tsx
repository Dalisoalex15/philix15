import { Settings, Shield, Bell, Database, Zap } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

export default function SettingsPage() {
  return (
    <div className="space-y-4">
      <div><h2 className="text-lg font-semibold text-white">System Settings</h2><p className="text-sm text-slate-400">Configure Philix Finance platform</p></div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-2"><CardTitle className="text-sm flex items-center gap-2"><Zap className="w-4 h-4 text-amber-400" />Default Loan Parameters</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {[
              { label: 'Student Loan Rate', value: '10% p.m.' },
              { label: 'Campus Loan Rate', value: '12% p.m.' },
              { label: 'Business Loan Rate', value: '8% p.m.' },
              { label: 'Short-Term Rate', value: '15% p.m.' },
              { label: 'Asset-Backed Rate', value: '7% p.m.' },
              { label: 'Processing Fee', value: '5% of principal' },
              { label: 'Max Loan-to-Value', value: '70%' },
              { label: 'Penalty Rate', value: '5% per month' },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between items-center py-1 border-b border-slate-700/50">
                <span className="text-xs text-slate-400">{label}</span>
                <Badge variant="secondary" className="text-xs">{value}</Badge>
              </div>
            ))}
            <Button size="sm" variant="outline" className="w-full mt-2">Edit Parameters</Button>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-2"><CardTitle className="text-sm flex items-center gap-2"><Bell className="w-4 h-4 text-blue-400" />Notification Settings</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {[
              { label: 'SMS Reminders', status: 'Active', color: 'success' },
              { label: 'WhatsApp Messages', status: 'Active', color: 'success' },
              { label: 'Email Notifications', status: 'Active', color: 'success' },
              { label: 'Payment Reminders (3 days prior)', status: 'Active', color: 'success' },
              { label: 'Overdue Alerts', status: 'Active', color: 'success' },
              { label: 'Default Warnings', status: 'Active', color: 'success' },
              { label: 'Approval Notifications', status: 'Active', color: 'success' },
            ].map(({ label, status, color }) => (
              <div key={label} className="flex justify-between items-center py-1 border-b border-slate-700/50">
                <span className="text-xs text-slate-400">{label}</span>
                <Badge variant={color as any} className="text-xs">{status}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-2"><CardTitle className="text-sm flex items-center gap-2"><Shield className="w-4 h-4 text-red-400" />Security</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {[
              { label: 'Multi-Factor Auth', status: 'Enabled' },
              { label: 'Session Timeout', status: '30 minutes' },
              { label: 'IP Tracking', status: 'Active' },
              { label: 'Audit Logging', status: 'Active' },
              { label: 'Data Encryption', status: 'AES-256' },
            ].map(({ label, status }) => (
              <div key={label} className="flex justify-between py-1 border-b border-slate-700/50">
                <span className="text-xs text-slate-400">{label}</span>
                <Badge variant="success" className="text-xs">{status}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-2"><CardTitle className="text-sm flex items-center gap-2"><Database className="w-4 h-4 text-purple-400" />System Info</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {[
              { label: 'Platform', value: 'Philix Finance LMS v1.0' },
              { label: 'Environment', value: 'Production' },
              { label: 'Database', value: 'PostgreSQL 16' },
              { label: 'API Version', value: 'v1' },
              { label: 'Region', value: 'Zambia (Lusaka)' },
              { label: 'Currency', value: 'ZMW (Zambian Kwacha)' },
              { label: 'Timezone', value: 'Africa/Lusaka (UTC+2)' },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between py-1 border-b border-slate-700/50">
                <span className="text-xs text-slate-400">{label}</span>
                <span className="text-xs text-slate-300">{value}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* AI Features Roadmap */}
      <Card className="bg-gradient-to-r from-purple-950/50 to-slate-800 border-purple-700/30">
        <CardHeader className="pb-2"><CardTitle className="text-sm text-purple-300">AI Features Roadmap</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { name: 'Credit Scoring AI', status: 'Planned', desc: 'ML-based credit assessment' },
              { name: 'Default Prediction', status: 'Planned', desc: 'Early warning system' },
              { name: 'WhatsApp AI Bot', status: 'Planned', desc: 'Automated client comms' },
              { name: 'Fraud Detection', status: 'Planned', desc: 'Anomaly detection system' },
              { name: 'Cash Flow Forecast', status: 'Planned', desc: 'AI-powered projections' },
              { name: 'Portfolio Risk AI', status: 'Planned', desc: 'Portfolio analysis' },
              { name: 'Investor Analytics', status: 'Planned', desc: 'ROI optimization' },
              { name: 'Auto Collections', status: 'Planned', desc: 'Smart follow-up system' },
            ].map(({ name, status, desc }) => (
              <div key={name} className="p-2 bg-slate-700/30 rounded-lg border border-purple-700/20">
                <p className="text-xs font-medium text-purple-300">{name}</p>
                <p className="text-xs text-slate-500 mt-0.5">{desc}</p>
                <Badge variant="secondary" className="mt-1 text-xs">{status}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
