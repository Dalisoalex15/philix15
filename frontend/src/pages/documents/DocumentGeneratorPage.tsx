import { useState } from 'react'
import { mockLoans, mockClients, mockCollateral } from '@/data/mockData'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { PrintableDocument } from '@/components/ui/PrintableDocument'
import { FileText, FileCheck, Receipt, ShieldCheck } from 'lucide-react'
import { formatCurrency, formatDate } from '@/lib/utils'

const docTypes = [
  { id: 'LOAN_AGREEMENT', label: 'Loan Agreement', icon: FileText, desc: 'Signed loan contract between borrower and Philix Finance' },
  { id: 'COLLATERAL_RECEIPT', label: 'Collateral Receipt', icon: ShieldCheck, desc: 'Acknowledgement of collateral received into vault' },
  { id: 'PAYMENT_RECEIPT', label: 'Payment Receipt', icon: Receipt, desc: 'Official receipt for loan repayment' },
  { id: 'CLEARANCE_LETTER', label: 'Clearance Letter', icon: FileCheck, desc: 'Certificate confirming loan fully repaid' },
]

export default function DocumentGeneratorPage() {
  const [docType, setDocType] = useState('LOAN_AGREEMENT')
  const [loanId, setLoanId] = useState((mockLoans[0] as any)?.id ?? '')
  const [generated, setGenerated] = useState(false)

  const loan = mockLoans.find((l: any) => l.id === loanId) as any
  const client = mockClients.find((c: any) => c.id === loan?.clientId) as any
  const collateral = mockCollateral.find((c: any) => c.id === loan?.collateralId) as any

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-lg font-semibold text-slate-100">Document Generator</h1>
        <p className="text-xs text-slate-500">Generate official Philix Finance documents — print or save as PDF</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-3">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="pb-2"><CardTitle className="text-sm text-slate-200">Select Document Type</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {docTypes.map(dt => (
                <div key={dt.id} onClick={() => { setDocType(dt.id); setGenerated(false) }}
                  className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer border transition-colors ${docType === dt.id ? 'border-emerald-500 bg-emerald-500/10' : 'border-slate-700 hover:border-slate-500'}`}>
                  <dt.icon className={`w-5 h-5 shrink-0 ${docType === dt.id ? 'text-emerald-400' : 'text-slate-400'}`} />
                  <div>
                    <p className="text-xs font-medium text-slate-200">{dt.label}</p>
                    <p className="text-[10px] text-slate-500">{dt.desc}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="pb-2"><CardTitle className="text-sm text-slate-200">Select Loan</CardTitle></CardHeader>
            <CardContent>
              <select value={loanId} onChange={e => { setLoanId(e.target.value); setGenerated(false) }} className="w-full h-9 rounded-md border border-slate-600 bg-slate-700/50 text-slate-100 text-sm px-3">
                {(mockLoans as any[]).map((l: any) => (
                  <option key={l.id} value={l.id}>{l.loanNumber} — {l.clientName ?? 'Client'} — {formatCurrency(l.principal)}</option>
                ))}
              </select>
              {loan && (
                <div className="mt-3 space-y-1.5 text-xs">
                  <div className="flex justify-between"><span className="text-slate-500">Client</span><span className="text-slate-300">{client ? `${client.firstName} ${client.lastName}` : loan.clientName}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Loan Amount</span><span className="text-slate-300">{formatCurrency(loan.principal)}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Status</span><span className="text-slate-300">{loan.status}</span></div>
                </div>
              )}
              <Button className="w-full mt-3" onClick={() => setGenerated(true)} disabled={!loan}>
                <FileText className="w-4 h-4 mr-2" /> Generate Document
              </Button>
            </CardContent>
          </Card>
        </div>

        {generated && loan && (
          <PrintableDocument title={`${docType} — ${loan.loanNumber}`}>
            <div style={{ fontFamily: 'Arial, sans-serif', fontSize: '13px', color: '#1a1a1a' }}>
              {/* Header */}
              <div style={{ textAlign: 'center', borderBottom: '2px solid #059669', paddingBottom: '16px', marginBottom: '20px' }}>
                <h1 style={{ color: '#059669', margin: 0 }}>PHILIX FINANCE</h1>
                <p style={{ color: '#6b7280', margin: '4px 0 0', fontSize: '11px' }}>Cairo Road, Lusaka, Zambia · admin@philix.zm · Creating a Future Together</p>
                <h2 style={{ margin: '12px 0 0', color: '#374151' }}>{docTypes.find(d => d.id === docType)?.label.toUpperCase()}</h2>
              </div>

              {docType === 'LOAN_AGREEMENT' && (
                <>
                  <p>This Loan Agreement is entered into on <strong>{formatDate(loan.startDate ?? new Date())}</strong> between:</p>
                  <p><strong>Lender:</strong> Philix Finance, Cairo Road, Lusaka, Zambia</p>
                  <p><strong>Borrower:</strong> {client ? `${client.firstName} ${client.lastName}` : loan.clientName}, NRC: {client?.nrcNumber ?? 'N/A'}</p>
                  <table style={{ width: '100%', borderCollapse: 'collapse', margin: '16px 0', fontSize: '12px' }}>
                    <tbody>
                      {[
                        ['Loan Number', loan.loanNumber],
                        ['Loan Amount', formatCurrency(loan.principal)],
                        ['Interest Rate', `${loan.interestRate}% per month`],
                        ['Processing Fee', formatCurrency(loan.processingFee ?? 0)],
                        ['Total Amount Payable', formatCurrency(loan.totalAmount ?? 0)],
                        ['Repayment Frequency', loan.repaymentFrequency],
                        ['Duration', `${loan.durationMonths} months`],
                        ['Collateral', collateral ? `${collateral.brand} ${collateral.model} (${collateral.vaultId})` : 'See attached'],
                      ].map(([k, v]) => (
                        <tr key={k} style={{ borderBottom: '1px solid #e5e7eb' }}>
                          <td style={{ padding: '6px 8px', color: '#6b7280', width: '40%' }}>{k}</td>
                          <td style={{ padding: '6px 8px', fontWeight: 500 }}>{v}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p style={{ fontSize: '11px', color: '#6b7280' }}>The borrower agrees to the above terms and conditions. Failure to repay will result in forfeiture of collateral.</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '40px' }}>
                    <div style={{ textAlign: 'center' }}><div style={{ borderTop: '1px solid #374151', width: '150px', paddingTop: '4px', fontSize: '11px' }}>Borrower Signature</div></div>
                    <div style={{ textAlign: 'center' }}><div style={{ borderTop: '1px solid #374151', width: '150px', paddingTop: '4px', fontSize: '11px' }}>Philix Finance (Manager)</div></div>
                  </div>
                </>
              )}

              {docType === 'CLEARANCE_LETTER' && (
                <>
                  <p>To Whom It May Concern,</p>
                  <p>This is to certify that <strong>{client ? `${client.firstName} ${client.lastName}` : loan.clientName}</strong> has fully repaid Loan <strong>{loan.loanNumber}</strong> with Philix Finance.</p>
                  <table style={{ width: '100%', borderCollapse: 'collapse', margin: '16px 0', fontSize: '12px' }}>
                    <tbody>
                      {[['Loan Number', loan.loanNumber], ['Original Amount', formatCurrency(loan.principal)], ['Status', 'FULLY PAID'], ['Clearance Date', formatDate(new Date())]].map(([k, v]) => (
                        <tr key={k} style={{ borderBottom: '1px solid #e5e7eb' }}>
                          <td style={{ padding: '6px 8px', color: '#6b7280', width: '40%' }}>{k}</td>
                          <td style={{ padding: '6px 8px', fontWeight: 500, color: k === 'Status' ? '#059669' : 'inherit' }}>{v}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p>The collateral held by Philix Finance is hereby authorized for release to the borrower.</p>
                  <div style={{ marginTop: '40px', textAlign: 'center' }}>
                    <div style={{ borderTop: '1px solid #374151', width: '200px', margin: '0 auto', paddingTop: '4px', fontSize: '11px' }}>Daliso Phiri — Director, Philix Finance</div>
                  </div>
                </>
              )}

              {(docType === 'PAYMENT_RECEIPT' || docType === 'COLLATERAL_RECEIPT') && (
                <>
                  <p><strong>Receipt Number:</strong> RCT-{Date.now().toString().slice(-6)}</p>
                  <p><strong>Date:</strong> {formatDate(new Date())}</p>
                  <p><strong>Received From:</strong> {client ? `${client.firstName} ${client.lastName}` : loan.clientName}</p>
                  {docType === 'PAYMENT_RECEIPT' && <p><strong>Amount Received:</strong> {formatCurrency(loan.principal * 0.1)} (Installment Payment)</p>}
                  {docType === 'COLLATERAL_RECEIPT' && collateral && <p><strong>Collateral Received:</strong> {collateral.brand} {collateral.model} — {collateral.vaultId}</p>}
                  <p><strong>Loan Reference:</strong> {loan.loanNumber}</p>
                  <p style={{ marginTop: '20px', fontSize: '11px', color: '#6b7280' }}>This is an official receipt from Philix Finance. Please retain for your records.</p>
                </>
              )}

              <p style={{ fontSize: '10px', color: '#9ca3af', borderTop: '1px solid #e5e7eb', paddingTop: '12px', marginTop: '24px', textAlign: 'center' }}>
                Philix Finance — Cairo Road, Lusaka · admin@philix.zm · Generated {new Date().toLocaleString()}
              </p>
            </div>
          </PrintableDocument>
        )}
      </div>
    </div>
  )
}
