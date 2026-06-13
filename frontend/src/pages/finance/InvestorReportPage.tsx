import { mockInvestors, mockInvestorPayouts, mockPARData, mockCapitalUtilization, mockDashboardStats } from '@/data/mockData'
import { PrintableDocument } from '@/components/ui/PrintableDocument'
import { formatCurrency, formatDate } from '@/lib/utils'

export default function InvestorReportPage() {
  const month = 'June 2026'
  const totalCapital = (mockInvestors as any[]).reduce((s: number, i: any) => s + i.amount, 0)
  const totalPayouts = mockInvestorPayouts.filter(p => p.month === '2026-05').reduce((s, p) => s + p.amount, 0)

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-lg font-semibold text-slate-100">Investment & Shareholder Report</h1>
        <p className="text-xs text-slate-500">Monthly report for investors — {month}</p>
      </div>
      <PrintableDocument title={`Philix Finance — Investor Report ${month}`}>
        <div style={{ fontFamily: 'Arial, sans-serif', color: '#1a1a1a', maxWidth: '800px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '3px solid #059669', paddingBottom: '16px', marginBottom: '24px' }}>
            <div>
              <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 'bold', color: '#059669' }}>PHILIX FINANCE</h1>
              <p style={{ margin: '4px 0 0', color: '#6b7280', fontSize: '12px' }}>Creating a Future Together</p>
              <p style={{ margin: '4px 0 0', color: '#6b7280', fontSize: '12px' }}>Cairo Road, Lusaka, Zambia · admin@philix.zm</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <h2 style={{ margin: 0, fontSize: '16px', color: '#374151' }}>INVESTOR REPORT</h2>
              <p style={{ margin: '4px 0 0', color: '#6b7280', fontSize: '12px' }}>{month}</p>
              <p style={{ margin: '4px 0 0', color: '#6b7280', fontSize: '12px' }}>Generated: {formatDate(new Date())}</p>
            </div>
          </div>

          {/* Portfolio Summary */}
          <h3 style={{ color: '#059669', borderBottom: '1px solid #e5e7eb', paddingBottom: '8px' }}>Portfolio Summary</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '24px', fontSize: '13px' }}>
            <tbody>
              {[
                ['Total Capital Under Management', formatCurrency(totalCapital)],
                ['Active Loan Portfolio', formatCurrency(mockCapitalUtilization.activeLoansValue)],
                ['Capital Utilization Rate', `${mockCapitalUtilization.utilizationPct}%`],
                ['Total Active Loans', (mockDashboardStats as any).activeLoans ?? 34],
                ['Portfolio at Risk (PAR30)', `${mockPARData.PAR30.percentage.toFixed(2)}%`],
                ['Portfolio at Risk (PAR90)', `${mockPARData.PAR90.percentage.toFixed(2)}%`],
              ].map(([k, v]) => (
                <tr key={k as string} style={{ borderBottom: '1px solid #f3f4f6' }}>
                  <td style={{ padding: '8px 0', color: '#6b7280' }}>{k}</td>
                  <td style={{ padding: '8px 0', fontWeight: 'bold', textAlign: 'right' }}>{v}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Investor Payouts */}
          <h3 style={{ color: '#059669', borderBottom: '1px solid #e5e7eb', paddingBottom: '8px' }}>Investor Payouts — {month}</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '24px', fontSize: '13px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f9fafb' }}>
                <th style={{ padding: '10px 8px', textAlign: 'left', color: '#374151' }}>Investor</th>
                <th style={{ padding: '10px 8px', textAlign: 'right', color: '#374151' }}>Capital</th>
                <th style={{ padding: '10px 8px', textAlign: 'right', color: '#374151' }}>Rate</th>
                <th style={{ padding: '10px 8px', textAlign: 'right', color: '#374151' }}>Monthly Return</th>
                <th style={{ padding: '10px 8px', textAlign: 'center', color: '#374151' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {(mockInvestors as any[]).map((inv: any) => (
                <tr key={inv.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                  <td style={{ padding: '8px' }}>{inv.name}</td>
                  <td style={{ padding: '8px', textAlign: 'right' }}>{formatCurrency(inv.amount)}</td>
                  <td style={{ padding: '8px', textAlign: 'right' }}>{inv.returnRate}% p.a.</td>
                  <td style={{ padding: '8px', textAlign: 'right', fontWeight: 'bold' }}>{formatCurrency(inv.monthlyEarnings)}</td>
                  <td style={{ padding: '8px', textAlign: 'center', color: '#059669' }}>PENDING</td>
                </tr>
              ))}
              <tr style={{ backgroundColor: '#f9fafb', fontWeight: 'bold' }}>
                <td style={{ padding: '8px' }}>TOTAL</td>
                <td style={{ padding: '8px', textAlign: 'right' }}>{formatCurrency(totalCapital)}</td>
                <td></td>
                <td style={{ padding: '8px', textAlign: 'right' }}>{formatCurrency((mockInvestors as any[]).reduce((s: number, i: any) => s + i.monthlyEarnings, 0))}</td>
                <td></td>
              </tr>
            </tbody>
          </table>

          {/* PAR */}
          <h3 style={{ color: '#059669', borderBottom: '1px solid #e5e7eb', paddingBottom: '8px' }}>Portfolio Quality Indicators</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '24px', fontSize: '13px' }}>
            <tbody>
              {[
                ['PAR 1 (1+ days overdue)', `${mockPARData.PAR1.percentage.toFixed(2)}%`, mockPARData.PAR1.count, formatCurrency(mockPARData.PAR1.amount)],
                ['PAR 7 (7+ days overdue)', `${mockPARData.PAR7.percentage.toFixed(2)}%`, mockPARData.PAR7.count, formatCurrency(mockPARData.PAR7.amount)],
                ['PAR 30 (30+ days overdue)', `${mockPARData.PAR30.percentage.toFixed(2)}%`, mockPARData.PAR30.count, formatCurrency(mockPARData.PAR30.amount)],
                ['PAR 60 (60+ days overdue)', `${mockPARData.PAR60.percentage.toFixed(2)}%`, mockPARData.PAR60.count, formatCurrency(mockPARData.PAR60.amount)],
                ['PAR 90 (90+ days — write-off risk)', `${mockPARData.PAR90.percentage.toFixed(2)}%`, mockPARData.PAR90.count, formatCurrency(mockPARData.PAR90.amount)],
              ].map(([label, pct, count, amount]) => (
                <tr key={label as string} style={{ borderBottom: '1px solid #f3f4f6' }}>
                  <td style={{ padding: '8px 0', color: '#6b7280' }}>{label}</td>
                  <td style={{ padding: '8px 0', textAlign: 'right', fontWeight: 'bold' }}>{pct}</td>
                  <td style={{ padding: '8px 0', textAlign: 'right', color: '#6b7280' }}>{count} loans</td>
                  <td style={{ padding: '8px 0', textAlign: 'right' }}>{amount}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <p style={{ fontSize: '11px', color: '#9ca3af', borderTop: '1px solid #e5e7eb', paddingTop: '16px', marginTop: '24px' }}>
            This report is confidential and intended solely for authorized investors of Philix Finance. All figures in Zambian Kwacha (ZMW). 
            Generated automatically by Philix Finance Management System on {new Date().toLocaleDateString()}.
          </p>
        </div>
      </PrintableDocument>
    </div>
  )
}
