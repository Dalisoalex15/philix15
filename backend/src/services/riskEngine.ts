export type RiskCategory = 'GREEN' | 'YELLOW' | 'ORANGE' | 'RED'

export function categorizeRisk(daysOverdue: number): RiskCategory {
  if (daysOverdue === 0) return 'GREEN'
  if (daysOverdue <= 7) return 'YELLOW'
  if (daysOverdue <= 30) return 'ORANGE'
  return 'RED'
}

export function calculateClientScore(params: {
  previousLoans: number
  defaults: number
  onTimePayments: number
  totalPayments: number
  employment: 'CIVIL_SERVANT' | 'BUSINESS' | 'STUDENT' | 'OTHER'
  monthlyIncome?: number
}): number {
  let score = 50
  if (params.previousLoans > 0) {
    const repaymentRatio = params.onTimePayments / (params.totalPayments || 1)
    score += repaymentRatio * 30
    if (params.defaults > 0) score -= params.defaults * 15
  }
  if (params.employment === 'CIVIL_SERVANT') score += 15
  else if (params.employment === 'BUSINESS') score += 10
  else if (params.employment === 'STUDENT') score += 5
  if (params.monthlyIncome && params.monthlyIncome > 10000) score += 10
  return Math.max(0, Math.min(100, Math.round(score)))
}

export function calculatePAR(loans: { outstandingBalance: number; daysOverdue: number }[], threshold: number): number {
  const total = loans.reduce((s, l) => s + l.outstandingBalance, 0)
  if (total === 0) return 0
  const atRisk = loans.filter(l => l.daysOverdue >= threshold).reduce((s, l) => s + l.outstandingBalance, 0)
  return (atRisk / total) * 100
}
