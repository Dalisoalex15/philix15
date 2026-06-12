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
        </Route>
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
      <Toaster />
    </>
  )
}
