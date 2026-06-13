import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { Toaster } from '@/components/ui/toaster'
import DashboardLayout from '@/components/layout/DashboardLayout'
import AuthLayout from '@/components/layout/AuthLayout'
import LoginPage from '@/pages/LoginPage'
import DashboardPage from '@/pages/DashboardPage'
import ClientsPage from '@/pages/ClientsPage'
import ClientDetailPage from '@/pages/ClientDetailPage'
import NewClientPage from '@/pages/NewClientPage'
import CollateralPage from '@/pages/CollateralPage'
import CollateralDetailPage from '@/pages/CollateralDetailPage'
import LoansPage from '@/pages/LoansPage'
import LoanDetailPage from '@/pages/LoanDetailPage'
import NewLoanPage from '@/pages/NewLoanPage'
import PaymentsPage from '@/pages/PaymentsPage'
import CollectionsPage from '@/pages/CollectionsPage'
import ReportsPage from '@/pages/ReportsPage'
import AccountingPage from '@/pages/AccountingPage'
import UsersPage from '@/pages/UsersPage'
import SettingsPage from '@/pages/SettingsPage'

// Phase 2 — Operations
import DailyOpsDashboardPage from '@/pages/ops/DailyOpsDashboardPage'
import CashFlowPage from '@/pages/ops/CashFlowPage'
import RemindersPage from '@/pages/ops/RemindersPage'

// Phase 2 — Collateral
import CollateralAssessmentPage from '@/pages/collateral/CollateralAssessmentPage'
import CollateralReleasePage from '@/pages/collateral/CollateralReleasePage'

// Phase 2 — Finance
import ExpenseManagementPage from '@/pages/finance/ExpenseManagementPage'
import InvestorManagementPage from '@/pages/finance/InvestorManagementPage'
import InvestorReportPage from '@/pages/finance/InvestorReportPage'
import CapitalUtilizationPage from '@/pages/finance/CapitalUtilizationPage'

// Phase 2 — Analytics
import PARDashboardPage from '@/pages/analytics/PARDashboardPage'
import RiskScoringPage from '@/pages/analytics/RiskScoringPage'
import StaffPerformancePage from '@/pages/analytics/StaffPerformancePage'
import CEODashboardPage from '@/pages/analytics/CEODashboardPage'

// Phase 2 — Recovery
import RepossessionPage from '@/pages/recovery/RepossessionPage'

// Phase 2 — Communications
import CommunicationHistoryPage from '@/pages/comms/CommunicationHistoryPage'
import EmailLogPage from '@/pages/comms/EmailLogPage'
import AnnouncementsPage from '@/pages/comms/AnnouncementsPage'

// Phase 2 — Documents
import DocumentGeneratorPage from '@/pages/documents/DocumentGeneratorPage'

// Phase 2 — Tasks
import TasksPage from '@/pages/tasks/TasksPage'

// Phase 2 — Wiki
import WikiPage from '@/pages/wiki/WikiPage'
import WikiArticlePage from '@/pages/wiki/WikiArticlePage'

// Phase 2 — Administration
import AuditLogPage from '@/pages/admin/AuditLogPage'
import BranchManagementPage from '@/pages/admin/BranchManagementPage'
import SystemHealthPage from '@/pages/admin/SystemHealthPage'

function AuthGuard({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  if (!isAuthenticated) return <Navigate to="/login" replace />
  return <>{children}</>
}

function GuestGuard({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  if (isAuthenticated) return <Navigate to="/dashboard" replace />
  return <>{children}</>
}

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<GuestGuard><AuthLayout><LoginPage /></AuthLayout></GuestGuard>} />
        <Route path="/" element={<AuthGuard><DashboardLayout /></AuthGuard>}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          {/* Phase 1 */}
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="clients" element={<ClientsPage />} />
          <Route path="clients/new" element={<NewClientPage />} />
          <Route path="clients/:id" element={<ClientDetailPage />} />
          <Route path="collateral" element={<CollateralPage />} />
          <Route path="collateral/:id" element={<CollateralDetailPage />} />
          <Route path="loans" element={<LoansPage />} />
          <Route path="loans/new" element={<NewLoanPage />} />
          <Route path="loans/:id" element={<LoanDetailPage />} />
          <Route path="payments" element={<PaymentsPage />} />
          <Route path="collections" element={<CollectionsPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="accounting" element={<AccountingPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="settings" element={<SettingsPage />} />
          {/* Phase 2 — Operations */}
          <Route path="ops/daily" element={<DailyOpsDashboardPage />} />
          <Route path="ops/cashflow" element={<CashFlowPage />} />
          <Route path="ops/reminders" element={<RemindersPage />} />
          {/* Phase 2 — Collateral */}
          <Route path="collateral/assess" element={<CollateralAssessmentPage />} />
          <Route path="collateral/release" element={<CollateralReleasePage />} />
          {/* Phase 2 — Finance */}
          <Route path="finance/expenses" element={<ExpenseManagementPage />} />
          <Route path="finance/investors" element={<InvestorManagementPage />} />
          <Route path="finance/investor-report" element={<InvestorReportPage />} />
          <Route path="finance/capital" element={<CapitalUtilizationPage />} />
          {/* Phase 2 — Analytics */}
          <Route path="analytics/par" element={<PARDashboardPage />} />
          <Route path="analytics/risk" element={<RiskScoringPage />} />
          <Route path="analytics/staff" element={<StaffPerformancePage />} />
          <Route path="analytics/executive" element={<CEODashboardPage />} />
          {/* Phase 2 — Recovery */}
          <Route path="recovery/repossession" element={<RepossessionPage />} />
          {/* Phase 2 — Communications */}
          <Route path="comms/history" element={<CommunicationHistoryPage />} />
          <Route path="comms/emails" element={<EmailLogPage />} />
          <Route path="comms/announcements" element={<AnnouncementsPage />} />
          {/* Phase 2 — Documents */}
          <Route path="documents/generate" element={<DocumentGeneratorPage />} />
          {/* Phase 2 — Tasks */}
          <Route path="tasks" element={<TasksPage />} />
          {/* Phase 2 — Wiki */}
          <Route path="wiki" element={<WikiPage />} />
          <Route path="wiki/:slug" element={<WikiArticlePage />} />
          {/* Phase 2 — Administration */}
          <Route path="admin/audit" element={<AuditLogPage />} />
          <Route path="admin/branches" element={<BranchManagementPage />} />
          <Route path="admin/system-health" element={<SystemHealthPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
      <Toaster />
    </>
  )
}
