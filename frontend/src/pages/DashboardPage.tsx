import {
  TrendingUp, DollarSign, Briefcase, Users, AlertTriangle,
  ShieldCheck, Clock, BarChart2, CheckCircle, Percent,
  Calendar, Target, ArrowUpRight
} from 'lucide-react'
import KPICard from '@/components/dashboard/KPICard'
import LoanStatusChart from '@/components/dashboard/LoanStatusChart'
import DisbursementChart from '@/components/dashboard/DisbursementChart'
import RepaymentChart from '@/components/dashboard/RepaymentChart'
import TopOfficersLeaderboard from '@/components/dashboard/TopOfficersLeaderboard'
import UpcomingCollections from '@/components/dashboard/UpcomingCollections'
import { mockDashboardStats } from '@/data/mockData'
import { formatCurrency } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function DashboardPage() {
  const s = mockDashboardStats

  return (
    <div className="space-y-5">
      {/* Row 1 KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <KPICard title="Capital Deployed" value={formatCurrency(s.totalCapitalDeployed)} change={12.4} icon={DollarSign} iconColor="text-emerald-400" iconBg="bg-emerald-500/10" />
        <KPICard title="Outstanding Balance" value={formatCurrency(s.totalOutstanding)} change={8.1} icon={TrendingUp} iconColor="text-blue-400" iconBg="bg-blue-500/10" />
        <KPICard title="Active Loans" value={s.activeLoans.toString()} change={4.3} icon={Briefcase} iconColor="text-purple-400" iconBg="bg-purple-500/10" />
        <KPICard title="Loans Today" value={s.loansToday.toString()} subtitle={formatCurrency(s.disbursedToday) + ' disbursed'} icon={Calendar} iconColor="text-cyan-400" iconBg="bg-cyan-500/10" />
        <KPICard title="Overdue Loans" value={s.overdueLoans.toString()} change={-2.1} icon={AlertTriangle} iconColor="text-amber-400" iconBg="bg-amber-500/10" variant="warning" />
        <KPICard title="Default Rate" value={`${s.defaultRate}%`} change={-0.5} icon={Percent} iconColor="text-red-400" iconBg="bg-red-500/10" variant="danger" />
      </div>

      {/* Row 2 KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <KPICard title="Recovery Rate" value={`${s.recoveryRate}%`} change={1.2} icon={CheckCircle} iconColor="text-emerald-400" iconBg="bg-emerald-500/10" variant="success" />
        <KPICard title="Pending Approvals" value={s.pendingApprovals.toString()} subtitle="Awaiting review" icon={Clock} iconColor="text-amber-400" iconBg="bg-amber-500/10" variant="warning" />
        <KPICard title="Collateral Held" value={s.collateralHeld.toString()} subtitle={formatCurrency(s.collateralValue) + ' value'} icon={ShieldCheck} iconColor="text-slate-400" iconBg="bg-slate-500/10" />
        <KPICard title="7-Day Collections" value={formatCurrency(s.next7DayCollections)} subtitle="Expected" icon={Target} iconColor="text-blue-400" iconBg="bg-blue-500/10" />
        <KPICard title="Interest Revenue" value={formatCurrency(s.expectedInterestRevenue)} subtitle="This month" icon={BarChart2} iconColor="text-emerald-400" iconBg="bg-emerald-500/10" />
        <KPICard title="Total Clients" value={s.totalClients.toString()} change={5.2} icon={Users} iconColor="text-purple-400" iconBg="bg-purple-500/10" />
      </div>

      {/* Row 3 Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-2">
          <LoanStatusChart />
        </div>
        <div className="lg:col-span-3">
          <DisbursementChart />
        </div>
      </div>

      {/* Row 4 Charts + Leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <RepaymentChart />
        </div>
        <div className="lg:col-span-1">
          <TopOfficersLeaderboard />
        </div>
      </div>

      {/* Row 5 Upcoming Collections */}
      <UpcomingCollections />

      {/* AI Placeholder */}
      <Card className="bg-slate-800/50 border-slate-700 border-dashed">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
              <ArrowUpRight className="w-4 h-4 text-purple-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-300">AI Features — Coming Soon</p>
              <p className="text-xs text-slate-500">Credit Scoring AI · Default Prediction · Cash Flow Forecasting · WhatsApp AI Assistant · Fraud Detection</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
