import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-ZM', {
    style: 'currency',
    currency: 'ZMW',
    minimumFractionDigits: 2,
  }).format(amount)
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-ZM').format(value)
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('en-ZM', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date))
}

export function formatDateTime(date: string | Date): string {
  return new Intl.DateTimeFormat('en-ZM', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date))
}

export function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`
}

export function calculateLTV(marketValue: number, loanAmount: number): number {
  if (marketValue === 0) return 0
  return (loanAmount / marketValue) * 100
}

export function getDaysOverdue(dueDate: string | Date): number {
  const due = new Date(dueDate)
  const today = new Date()
  const diff = Math.floor((today.getTime() - due.getTime()) / (1000 * 60 * 60 * 24))
  return Math.max(0, diff)
}

export function getRiskCategory(daysOverdue: number): 'GREEN' | 'YELLOW' | 'ORANGE' | 'RED' {
  if (daysOverdue === 0) return 'GREEN'
  if (daysOverdue <= 7) return 'YELLOW'
  if (daysOverdue <= 30) return 'ORANGE'
  return 'RED'
}

export function getRiskColor(category: string): string {
  switch (category) {
    case 'GREEN': return 'text-emerald-400'
    case 'YELLOW': return 'text-yellow-400'
    case 'ORANGE': return 'text-orange-400'
    case 'RED': return 'text-red-400'
    default: return 'text-slate-400'
  }
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str
  return str.slice(0, length) + '...'
}

export function generateVaultId(): string {
  const year = new Date().getFullYear()
  const rand = Math.floor(1000 + Math.random() * 9000)
  return `PHX-${year}-${rand}`
}

export function generateLoanNumber(): string {
  const year = new Date().getFullYear()
  const rand = Math.floor(10000 + Math.random() * 90000)
  return `LN-${year}-${rand}`
}
