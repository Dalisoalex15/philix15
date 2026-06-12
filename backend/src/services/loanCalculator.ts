import { addDays, addWeeks, addMonths } from 'date-fns'

export interface InstallmentSchedule {
  installmentNumber: number
  dueDate: Date
  principalAmount: number
  interestAmount: number
  totalAmount: number
  balance: number
}

export function calculateLoanSchedule(
  principal: number,
  monthlyRate: number,
  durationMonths: number,
  frequency: 'WEEKLY' | 'BIWEEKLY' | 'MONTHLY',
  startDate: Date
): InstallmentSchedule[] {
  const schedule: InstallmentSchedule[] = []
  const totalInstallments = frequency === 'WEEKLY' ? durationMonths * 4 : frequency === 'BIWEEKLY' ? durationMonths * 2 : durationMonths
  const totalInterest = principal * (monthlyRate / 100) * durationMonths
  const installmentPrincipal = principal / totalInstallments
  const installmentInterest = totalInterest / totalInstallments
  let balance = principal

  for (let i = 1; i <= totalInstallments; i++) {
    let dueDate: Date
    if (frequency === 'WEEKLY') dueDate = addWeeks(startDate, i)
    else if (frequency === 'BIWEEKLY') dueDate = addWeeks(startDate, i * 2)
    else dueDate = addMonths(startDate, i)

    balance -= installmentPrincipal
    schedule.push({
      installmentNumber: i,
      dueDate,
      principalAmount: Number(installmentPrincipal.toFixed(2)),
      interestAmount: Number(installmentInterest.toFixed(2)),
      totalAmount: Number((installmentPrincipal + installmentInterest).toFixed(2)),
      balance: Number(Math.max(0, balance).toFixed(2)),
    })
  }
  return schedule
}

export function calculateTotalInterest(principal: number, monthlyRate: number, durationMonths: number): number {
  return principal * (monthlyRate / 100) * durationMonths
}

export function calculateProcessingFee(principal: number, feePercent = 5): number {
  return principal * (feePercent / 100)
}
