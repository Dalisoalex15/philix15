export const mockDashboardStats = {
  totalCapitalDeployed: 2450000,
  totalOutstanding: 1876340,
  activeLoans: 47,
  loansToday: 3,
  loansThisMonth: 24,
  overdueLoans: 12,
  defaultRate: 4.2,
  recoveryRate: 87.3,
  pendingApprovals: 8,
  collateralHeld: 63,
  collateralValue: 3120000,
  next7DayCollections: 187650,
  expectedInterestRevenue: 234500,
  totalClients: 183,
  disbursedToday: 45000,
  collectedToday: 67800,
}

export const mockClients = [
  { id: '1', clientCode: 'CLT-2024-0001', firstName: 'Chanda', lastName: 'Mwale', fullName: 'Chanda Mwale', nrcNumber: '145782/10/1', studentId: 'UNZA/2021/3847', university: 'University of Zambia', phone: '0977123456', whatsapp: '0977123456', email: 'chanda.mwale@students.unza.zm', address: 'Room 12B, Katete Hostel, UNZA, Lusaka', occupation: 'Student', internalScore: 78, reliabilityRating: 4, status: 'ACTIVE', activeLoans: 1, totalBorrowed: 5000, createdAt: '2024-01-15' },
  { id: '2', clientCode: 'CLT-2024-0002', firstName: 'Memory', lastName: 'Phiri', fullName: 'Memory Phiri', nrcNumber: '234891/72/1', phone: '0966234567', whatsapp: '0966234567', email: 'memory.phiri@gmail.com', address: 'Plot 45, Mtendere Township, Lusaka', occupation: 'Small Business Owner', businessName: 'Memory General Dealers', businessType: 'Retail', marketLocation: 'Mtendere Market', monthlyRevenue: 12000, internalScore: 85, reliabilityRating: 5, status: 'ACTIVE', activeLoans: 1, totalBorrowed: 25000, createdAt: '2024-02-01' },
  { id: '3', clientCode: 'CLT-2024-0003', firstName: 'Mwamba', lastName: 'Kasonde', fullName: 'Mwamba Kasonde', nrcNumber: '378294/62/1', studentId: 'CBU/2022/1293', university: 'Copperbelt University', phone: '0955345678', whatsapp: '0955345678', email: 'mwamba.k@cbu.ac.zm', address: 'CBU Campus, Kitwe', occupation: 'Student', internalScore: 71, reliabilityRating: 3, status: 'ACTIVE', activeLoans: 1, totalBorrowed: 3500, createdAt: '2024-02-10' },
  { id: '4', clientCode: 'CLT-2024-0004', firstName: 'James', lastName: 'Tembo', fullName: 'James Tembo', nrcNumber: '289034/45/1', phone: '0979456789', whatsapp: '0979456789', email: 'jtembo@moh.gov.zm', address: 'House 7, Civil Servants Quarters, Woodlands, Lusaka', occupation: 'Civil Servant', employerName: 'Ministry of Health', salary: 18500, payDate: 25, internalScore: 92, reliabilityRating: 5, status: 'ACTIVE', activeLoans: 1, totalBorrowed: 50000, createdAt: '2024-01-20' },
  { id: '5', clientCode: 'CLT-2024-0005', firstName: 'Grace', lastName: 'Banda', fullName: 'Grace Banda', nrcNumber: '401827/83/1', phone: '0964567890', whatsapp: '0964567890', email: 'grace.banda@gmail.com', address: 'Plot 23, Kalingalinga, Lusaka', occupation: 'Market Trader', businessName: 'Grace Fashion Boutique', businessType: 'Clothing', marketLocation: 'Soweto Market', monthlyRevenue: 6500, internalScore: 68, reliabilityRating: 3, status: 'ACTIVE', activeLoans: 1, totalBorrowed: 8000, createdAt: '2024-03-05' },
  { id: '6', clientCode: 'CLT-2024-0006', firstName: 'Bwalya', lastName: 'Mutale', fullName: 'Bwalya Mutale', nrcNumber: '512938/21/1', phone: '0977678901', whatsapp: '0977678901', email: 'bwalya.mutale@gmail.com', address: 'Stand 456, Kalulushi, Copperbelt', occupation: 'Entrepreneur', businessName: 'BM Catering Services', businessType: 'Food & Catering', monthlyRevenue: 22000, internalScore: 88, reliabilityRating: 4, status: 'ACTIVE', activeLoans: 0, totalBorrowed: 35000, createdAt: '2024-01-08' },
  { id: '7', clientCode: 'CLT-2024-0007', firstName: 'Mutinta', lastName: 'Nkumbula', fullName: 'Mutinta Nkumbula', nrcNumber: '623847/54/1', studentId: 'ZCAS/2023/2847', university: 'ZCAS University', phone: '0966789012', whatsapp: '0966789012', email: 'mutinta.n@zcas.ac.zm', address: 'Stand 12, Chaisa Compound, Lusaka', occupation: 'Student', internalScore: 65, reliabilityRating: 3, status: 'ACTIVE', activeLoans: 1, totalBorrowed: 4000, createdAt: '2024-03-15' },
  { id: '8', clientCode: 'CLT-2024-0008', firstName: 'Kelvin', lastName: 'Zulu', fullName: 'Kelvin Zulu', nrcNumber: '734956/67/1', phone: '0955890123', whatsapp: '0955890123', email: 'kelvin.zulu@zra.org.zm', address: 'Plot 89, Kabulonga, Lusaka', occupation: 'Civil Servant', employerName: 'Zambia Revenue Authority', salary: 25000, payDate: 28, internalScore: 95, reliabilityRating: 5, status: 'ACTIVE', activeLoans: 1, totalBorrowed: 75000, createdAt: '2024-02-20' },
  { id: '9', clientCode: 'CLT-2024-0009', firstName: 'Thandiwe', lastName: 'Siachitema', fullName: 'Thandiwe Siachitema', nrcNumber: '845063/78/1', phone: '0979901234', whatsapp: '0979901234', email: 'thandiwe@gmail.com', address: 'House 34, Matero, Lusaka', occupation: 'Market Trader', businessName: 'Thandie Cosmetics', businessType: 'Beauty & Cosmetics', marketLocation: 'Chelstone Market', monthlyRevenue: 9500, internalScore: 74, reliabilityRating: 4, status: 'ACTIVE', activeLoans: 0, totalBorrowed: 12000, createdAt: '2024-01-30' },
  { id: '10', clientCode: 'CLT-2024-0010', firstName: 'Fredrick', lastName: 'Mbewe', fullName: 'Fredrick Mbewe', nrcNumber: '956174/89/1', phone: '0964012345', whatsapp: '0964012345', email: 'f.mbewe@gmail.com', address: 'Plot 78, Kabwata, Lusaka', occupation: 'Entrepreneur', businessName: 'FM Electronics', businessType: 'Electronics Retail', monthlyRevenue: 45000, internalScore: 91, reliabilityRating: 5, status: 'ACTIVE', activeLoans: 1, totalBorrowed: 120000, createdAt: '2024-01-05' },
]

export const mockCollateral = [
  { id: '1', vaultId: 'PHX-2024-1001', clientId: '1', clientName: 'Chanda Mwale', loanId: '1', assetType: 'SMARTPHONE', brand: 'Samsung', model: 'Galaxy A54', serialNumber: 'R58N12ABC34', imei: '358123456789012', color: 'Graphite', condition: 'GOOD', marketValue: 8500, forcedSaleValue: 5950, loanToValueRatio: 58.8, shelfNumber: 'A', vaultPosition: 'A-12', lockerNumber: 'L-004', status: 'HELD', heldAt: '2024-01-15', createdAt: '2024-01-15' },
  { id: '2', vaultId: 'PHX-2024-1002', clientId: '2', clientName: 'Memory Phiri', loanId: '2', assetType: 'LAPTOP', brand: 'Lenovo', model: 'ThinkPad E15 Gen 4', serialNumber: 'PF3XABCD12', color: 'Black', condition: 'EXCELLENT', marketValue: 38000, forcedSaleValue: 26600, loanToValueRatio: 65.8, shelfNumber: 'B', vaultPosition: 'B-03', lockerNumber: 'L-002', status: 'HELD', heldAt: '2024-02-01', createdAt: '2024-02-01' },
  { id: '3', vaultId: 'PHX-2024-1003', clientId: '3', clientName: 'Mwamba Kasonde', loanId: '3', assetType: 'TABLET', brand: 'Apple', model: 'iPad Air (5th Gen)', serialNumber: 'DMPXQ8K1ABC', color: 'Space Gray', condition: 'GOOD', marketValue: 9500, forcedSaleValue: 6650, loanToValueRatio: 36.8, shelfNumber: 'A', vaultPosition: 'A-07', lockerNumber: 'L-004', status: 'HELD', heldAt: '2024-02-10', createdAt: '2024-02-10' },
  { id: '4', vaultId: 'PHX-2024-1004', clientId: '4', clientName: 'James Tembo', loanId: '4', assetType: 'LAPTOP', brand: 'Apple', model: 'MacBook Pro 14" M2', serialNumber: 'C02XK0ABCDE', color: 'Silver', condition: 'EXCELLENT', marketValue: 95000, forcedSaleValue: 66500, loanToValueRatio: 52.6, shelfNumber: 'C', vaultPosition: 'C-01', lockerNumber: 'L-001', status: 'HELD', heldAt: '2024-01-20', createdAt: '2024-01-20' },
  { id: '5', vaultId: 'PHX-2024-1005', clientId: '5', clientName: 'Grace Banda', loanId: '5', assetType: 'GAMING_CONSOLE', brand: 'Sony', model: 'PlayStation 5', serialNumber: 'CFI-1102A-12345', color: 'White', condition: 'GOOD', marketValue: 16000, forcedSaleValue: 11200, loanToValueRatio: 50.0, shelfNumber: 'B', vaultPosition: 'B-08', lockerNumber: 'L-003', status: 'HELD', heldAt: '2024-03-05', createdAt: '2024-03-05' },
  { id: '6', vaultId: 'PHX-2024-1006', clientId: '9', clientName: 'Thandiwe Siachitema', loanId: null, assetType: 'SMARTPHONE', brand: 'Apple', model: 'iPhone 15 Pro', serialNumber: 'F2LLNABCDE', imei: '352098765432101', color: 'Natural Titanium', condition: 'EXCELLENT', marketValue: 28000, forcedSaleValue: 19600, loanToValueRatio: 0, shelfNumber: 'A', vaultPosition: 'A-15', lockerNumber: 'L-004', status: 'RELEASED', heldAt: '2024-01-30', releasedAt: '2024-04-30', createdAt: '2024-01-30' },
]

export const mockLoans = [
  { id: '1', loanNumber: 'LN-2024-10001', clientId: '1', clientName: 'Chanda Mwale', collateralId: '1', collateralDesc: 'Samsung Galaxy A54', loanType: 'STUDENT', principal: 5000, interestRate: 10, processingFee: 250, totalInterest: 1500, totalAmount: 6750, disbursedAmount: 4750, outstandingBalance: 3400, repaymentFrequency: 'MONTHLY', durationMonths: 3, startDate: '2024-01-15', endDate: '2024-04-15', nextDueDate: '2024-06-15', status: 'ACTIVE', loanOfficer: 'Precious Lungu', approvedBy: 'Alex Mwale', approvedAt: '2024-01-14', disbursedAt: '2024-01-15', createdAt: '2024-01-13' },
  { id: '2', loanNumber: 'LN-2024-10002', clientId: '2', clientName: 'Memory Phiri', collateralId: '2', collateralDesc: 'Lenovo ThinkPad E15', loanType: 'BUSINESS', principal: 25000, interestRate: 8, processingFee: 750, totalInterest: 6000, totalAmount: 31750, disbursedAmount: 24250, outstandingBalance: 19200, repaymentFrequency: 'MONTHLY', durationMonths: 6, startDate: '2024-02-01', endDate: '2024-08-01', nextDueDate: '2024-06-01', status: 'ACTIVE', loanOfficer: 'Precious Lungu', approvedBy: 'Alex Mwale', approvedAt: '2024-01-31', disbursedAt: '2024-02-01', createdAt: '2024-01-29' },
  { id: '3', loanNumber: 'LN-2024-10003', clientId: '3', clientName: 'Mwamba Kasonde', collateralId: '3', collateralDesc: 'Apple iPad Air', loanType: 'CAMPUS', principal: 3500, interestRate: 12, processingFee: 175, totalInterest: 700, totalAmount: 4375, disbursedAmount: 3325, outstandingBalance: 2100, repaymentFrequency: 'WEEKLY', durationMonths: 2, startDate: '2024-02-10', endDate: '2024-04-10', nextDueDate: '2024-03-30', status: 'OVERDUE', loanOfficer: 'Chisomo Banda', approvedBy: 'Alex Mwale', approvedAt: '2024-02-09', disbursedAt: '2024-02-10', createdAt: '2024-02-07' },
  { id: '4', loanNumber: 'LN-2024-10004', clientId: '4', clientName: 'James Tembo', collateralId: '4', collateralDesc: 'Apple MacBook Pro 14"', loanType: 'ASSET_BACKED', principal: 50000, interestRate: 7, processingFee: 1500, totalInterest: 21000, totalAmount: 72500, disbursedAmount: 48500, outstandingBalance: 43500, repaymentFrequency: 'MONTHLY', durationMonths: 12, startDate: '2024-01-20', endDate: '2025-01-20', nextDueDate: '2024-06-20', status: 'ACTIVE', loanOfficer: 'Precious Lungu', approvedBy: 'Alex Mwale', approvedAt: '2024-01-18', disbursedAt: '2024-01-20', createdAt: '2024-01-16' },
  { id: '5', loanNumber: 'LN-2024-10005', clientId: '5', clientName: 'Grace Banda', collateralId: '5', collateralDesc: 'Sony PlayStation 5', loanType: 'SHORT_TERM', principal: 8000, interestRate: 15, processingFee: 400, totalInterest: 1200, totalAmount: 9600, disbursedAmount: 7600, outstandingBalance: 6800, repaymentFrequency: 'WEEKLY', durationMonths: 2, startDate: '2024-03-05', endDate: '2024-05-05', nextDueDate: '2024-04-02', status: 'OVERDUE', loanOfficer: 'Chisomo Banda', approvedBy: 'Alex Mwale', approvedAt: '2024-03-04', disbursedAt: '2024-03-05', createdAt: '2024-03-02' },
  { id: '6', loanNumber: 'LN-2023-10006', clientId: '6', clientName: 'Bwalya Mutale', collateralId: null, collateralDesc: 'Dell XPS 15 Laptop', loanType: 'BUSINESS', principal: 35000, interestRate: 8, processingFee: 1050, totalInterest: 8400, totalAmount: 44450, disbursedAmount: 33950, outstandingBalance: 0, repaymentFrequency: 'MONTHLY', durationMonths: 6, startDate: '2023-07-08', endDate: '2024-01-08', nextDueDate: null, status: 'PAID', loanOfficer: 'Precious Lungu', approvedBy: 'Alex Mwale', approvedAt: '2023-07-06', disbursedAt: '2023-07-08', createdAt: '2023-07-05' },
  { id: '7', loanNumber: 'LN-2024-10007', clientId: '8', clientName: 'Kelvin Zulu', collateralId: null, collateralDesc: 'HP Spectre x360', loanType: 'ASSET_BACKED', principal: 75000, interestRate: 7, processingFee: 2250, totalInterest: 26250, totalAmount: 103500, disbursedAmount: 72750, outstandingBalance: 68000, repaymentFrequency: 'MONTHLY', durationMonths: 18, startDate: '2024-02-20', endDate: '2025-08-20', nextDueDate: '2024-06-20', status: 'ACTIVE', loanOfficer: 'Chisomo Banda', approvedBy: 'Alex Mwale', approvedAt: '2024-02-18', disbursedAt: '2024-02-20', createdAt: '2024-02-16' },
  { id: '8', loanNumber: 'LN-2024-10008', clientId: '10', clientName: 'Fredrick Mbewe', collateralId: null, collateralDesc: 'MacBook Pro + iPad Bundle', loanType: 'BUSINESS', principal: 120000, interestRate: 7.5, processingFee: 3600, totalInterest: 27000, totalAmount: 150600, disbursedAmount: 0, outstandingBalance: 120000, repaymentFrequency: 'MONTHLY', durationMonths: 12, startDate: null, endDate: null, nextDueDate: null, status: 'PENDING', loanOfficer: 'Precious Lungu', approvedBy: null, approvedAt: null, disbursedAt: null, createdAt: '2024-05-28' },
]

export const mockLoanSchedule = [
  { id: 's1', loanId: '1', installmentNumber: 1, dueDate: '2024-02-15', principalAmount: 1666.67, interestAmount: 500, totalAmount: 2166.67, paidAmount: 2166.67, balance: 3333.33, status: 'PAID', paidAt: '2024-02-14' },
  { id: 's2', loanId: '1', installmentNumber: 2, dueDate: '2024-03-15', principalAmount: 1666.67, interestAmount: 333.33, totalAmount: 2000, paidAmount: 1100, balance: 1666.67, status: 'PARTIAL', paidAt: '2024-03-15' },
  { id: 's3', loanId: '1', installmentNumber: 3, dueDate: '2024-04-15', principalAmount: 1666.67, interestAmount: 166.67, totalAmount: 1833.33, paidAmount: 0, balance: 1666.67, status: 'OVERDUE', paidAt: null },
]

export const mockPayments = [
  { id: 'p1', loanId: '1', loanNumber: 'LN-2024-10001', clientName: 'Chanda Mwale', amount: 2166.67, principalPaid: 1666.67, interestPaid: 500, penaltyPaid: 0, paymentMethod: 'MOBILE_MONEY', referenceNumber: 'MTN-2024-001', paymentDate: '2024-02-14', recordedBy: 'Precious Lungu' },
  { id: 'p2', loanId: '1', loanNumber: 'LN-2024-10001', clientName: 'Chanda Mwale', amount: 1100, principalPaid: 833.33, interestPaid: 266.67, penaltyPaid: 0, paymentMethod: 'CASH', referenceNumber: 'CASH-001', paymentDate: '2024-03-15', recordedBy: 'Precious Lungu' },
  { id: 'p3', loanId: '2', loanNumber: 'LN-2024-10002', clientName: 'Memory Phiri', amount: 5291.67, principalPaid: 4166.67, interestPaid: 1125, penaltyPaid: 0, paymentMethod: 'BANK_TRANSFER', referenceNumber: 'ZNB-2024-0234', paymentDate: '2024-03-01', recordedBy: 'Precious Lungu' },
  { id: 'p4', loanId: '2', loanNumber: 'LN-2024-10002', clientName: 'Memory Phiri', amount: 5291.67, principalPaid: 4166.67, interestPaid: 1125, penaltyPaid: 0, paymentMethod: 'MOBILE_MONEY', referenceNumber: 'AIRTEL-2024-567', paymentDate: '2024-04-01', recordedBy: 'Precious Lungu' },
  { id: 'p5', loanId: '4', loanNumber: 'LN-2024-10004', clientName: 'James Tembo', amount: 6041.67, principalPaid: 4166.67, interestPaid: 1875, penaltyPaid: 0, paymentMethod: 'BANK_TRANSFER', referenceNumber: 'ABSA-2024-1122', paymentDate: '2024-02-20', recordedBy: 'Precious Lungu' },
  { id: 'p6', loanId: '4', loanNumber: 'LN-2024-10004', clientName: 'James Tembo', amount: 6041.67, principalPaid: 4166.67, interestPaid: 1875, penaltyPaid: 0, paymentMethod: 'BANK_TRANSFER', referenceNumber: 'ABSA-2024-2234', paymentDate: '2024-03-20', recordedBy: 'Precious Lungu' },
  { id: 'p7', loanId: '7', loanNumber: 'LN-2024-10007', clientName: 'Kelvin Zulu', amount: 5750, principalPaid: 4166.67, interestPaid: 1583.33, penaltyPaid: 0, paymentMethod: 'BANK_TRANSFER', referenceNumber: 'ZNCB-2024-4456', paymentDate: '2024-03-20', recordedBy: 'Chisomo Banda' },
  { id: 'p8', loanId: '5', loanNumber: 'LN-2024-10005', clientName: 'Grace Banda', amount: 1200, principalPaid: 800, interestPaid: 400, penaltyPaid: 0, paymentMethod: 'MOBILE_MONEY', referenceNumber: 'MTN-2024-009', paymentDate: '2024-03-12', recordedBy: 'Chisomo Banda' },
]

export const mockMonthlyDisbursements = [
  { month: 'Jun 23', amount: 145000, count: 8 },
  { month: 'Jul 23', amount: 198000, count: 12 },
  { month: 'Aug 23', amount: 167000, count: 10 },
  { month: 'Sep 23', amount: 221000, count: 14 },
  { month: 'Oct 23', amount: 189000, count: 11 },
  { month: 'Nov 23', amount: 243000, count: 15 },
  { month: 'Dec 23', amount: 312000, count: 19 },
  { month: 'Jan 24', amount: 278000, count: 17 },
  { month: 'Feb 24', amount: 334000, count: 21 },
  { month: 'Mar 24', amount: 289000, count: 18 },
  { month: 'Apr 24', amount: 356000, count: 22 },
  { month: 'May 24', amount: 412000, count: 24 },
]

export const mockWeeklyCollections = [
  { week: 'W1 Apr', collected: 45600, target: 52000 },
  { week: 'W2 Apr', collected: 62300, target: 58000 },
  { week: 'W3 Apr', collected: 48900, target: 55000 },
  { week: 'W4 Apr', collected: 71200, target: 65000 },
  { week: 'W1 May', collected: 55400, target: 60000 },
  { week: 'W2 May', collected: 68700, target: 62000 },
  { week: 'W3 May', collected: 59800, target: 58000 },
  { week: 'W4 May', collected: 74300, target: 70000 },
]

export const mockLoanStatusDistribution = [
  { name: 'Active', value: 47, color: '#10b981' },
  { name: 'Paid', value: 23, color: '#3b82f6' },
  { name: 'Overdue', value: 12, color: '#f59e0b' },
  { name: 'Default', value: 3, color: '#ef4444' },
  { name: 'Pending', value: 8, color: '#8b5cf6' },
]

export const mockTopOfficers = [
  { id: '1', name: 'Precious Lungu', role: 'Loan Officer', loansIssued: 28, totalDisbursed: 876000, collectionRate: 94.2 },
  { id: '2', name: 'Chisomo Banda', role: 'Loan Officer', loansIssued: 19, totalDisbursed: 594000, collectionRate: 91.8 },
  { id: '3', name: 'David Phiri', role: 'Collections Officer', loansIssued: 15, totalDisbursed: 412000, collectionRate: 88.5 },
  { id: '4', name: 'Ruth Kabwe', role: 'Accountant', loansIssued: 12, totalDisbursed: 345000, collectionRate: 96.1 },
]

export const mockUpcomingCollections = [
  { id: '1', loanNumber: 'LN-2024-10002', clientName: 'Memory Phiri', phone: '0966234567', amount: 5291.67, dueDate: '2024-06-01', daysUntilDue: 1, status: 'ACTIVE' },
  { id: '2', loanNumber: 'LN-2024-10001', clientName: 'Chanda Mwale', phone: '0977123456', amount: 2083.33, dueDate: '2024-06-15', daysUntilDue: 3, status: 'ACTIVE' },
  { id: '3', loanNumber: 'LN-2024-10004', clientName: 'James Tembo', phone: '0979456789', amount: 6041.67, dueDate: '2024-06-20', daysUntilDue: 8, status: 'ACTIVE' },
  { id: '4', loanNumber: 'LN-2024-10007', clientName: 'Kelvin Zulu', phone: '0955890123', amount: 5750, dueDate: '2024-06-20', daysUntilDue: 8, status: 'ACTIVE' },
  { id: '5', loanNumber: 'LN-2024-10003', clientName: 'Mwamba Kasonde', phone: '0955345678', amount: 875, dueDate: '2024-03-30', daysUntilDue: -72, status: 'OVERDUE' },
  { id: '6', loanNumber: 'LN-2024-10005', clientName: 'Grace Banda', phone: '0964567890', amount: 1200, dueDate: '2024-04-02', daysUntilDue: -69, status: 'OVERDUE' },
]

export const mockUsers = [
  { id: '1', firstName: 'Alex', lastName: 'Mwale', email: 'admin@philix.zm', role: 'SUPER_ADMIN', branch: 'Head Office', isActive: true, lastLogin: '2024-05-28T08:30:00Z', createdAt: '2024-01-01' },
  { id: '2', firstName: 'Patricia', lastName: 'Mutenda', email: 'p.mutenda@philix.zm', role: 'MANAGER', branch: 'Head Office', isActive: true, lastLogin: '2024-05-28T07:45:00Z', createdAt: '2024-01-05' },
  { id: '3', firstName: 'Precious', lastName: 'Lungu', email: 'p.lungu@philix.zm', role: 'LOAN_OFFICER', branch: 'Head Office', isActive: true, lastLogin: '2024-05-28T09:00:00Z', createdAt: '2024-01-10' },
  { id: '4', firstName: 'Chisomo', lastName: 'Banda', email: 'c.banda@philix.zm', role: 'LOAN_OFFICER', branch: 'Kitwe Branch', isActive: true, lastLogin: '2024-05-27T16:20:00Z', createdAt: '2024-01-10' },
  { id: '5', firstName: 'David', lastName: 'Phiri', email: 'd.phiri@philix.zm', role: 'COLLECTIONS_OFFICER', branch: 'Head Office', isActive: true, lastLogin: '2024-05-28T08:15:00Z', createdAt: '2024-01-15' },
  { id: '6', firstName: 'Ruth', lastName: 'Kabwe', email: 'r.kabwe@philix.zm', role: 'ACCOUNTANT', branch: 'Head Office', isActive: true, lastLogin: '2024-05-27T14:30:00Z', createdAt: '2024-02-01' },
]

export const mockExpenses = [
  { id: '1', category: 'SALARIES', description: 'Staff salaries - May 2024', amount: 85000, date: '2024-05-28', recordedBy: 'Ruth Kabwe' },
  { id: '2', category: 'RENT', description: 'Office rent - May 2024', amount: 12000, date: '2024-05-01', recordedBy: 'Ruth Kabwe' },
  { id: '3', category: 'UTILITIES', description: 'Electricity and internet', amount: 3500, date: '2024-05-15', recordedBy: 'Ruth Kabwe' },
  { id: '4', category: 'MARKETING', description: 'Social media ads - May', amount: 8000, date: '2024-05-20', recordedBy: 'Ruth Kabwe' },
  { id: '5', category: 'OFFICE', description: 'Stationery and supplies', amount: 2200, date: '2024-05-10', recordedBy: 'Ruth Kabwe' },
]

export const mockInvestors = [
  { id: '1', name: 'Emmanuel Sakala', phone: '0977001122', email: 'e.sakala@gmail.com', amount: 500000, returnRate: 15, startDate: '2024-01-01', monthlyEarnings: 6250, capitalBalance: 500000, status: 'ACTIVE' },
  { id: '2', name: 'Chanda Investment Group', phone: '0966334455', email: 'invest@chandag.zm', amount: 1200000, returnRate: 14, startDate: '2023-07-01', monthlyEarnings: 14000, capitalBalance: 1200000, status: 'ACTIVE' },
  { id: '3', name: 'Patricia Nkosi', phone: '0955667788', email: 'p.nkosi@gmail.com', amount: 250000, returnRate: 16, startDate: '2024-03-01', monthlyEarnings: 3333, capitalBalance: 250000, status: 'ACTIVE' },
]

export const mockOverdueLoans = [
  { id: '3', loanNumber: 'LN-2024-10003', clientName: 'Mwamba Kasonde', phone: '0955345678', outstanding: 2100, daysOverdue: 72, riskCategory: 'RED', lastContact: '2024-05-20', lastContactType: 'CALL', promisedAmount: 875, promiseDate: '2024-05-25' },
  { id: '5', loanNumber: 'LN-2024-10005', clientName: 'Grace Banda', phone: '0964567890', outstanding: 6800, daysOverdue: 69, riskCategory: 'RED', lastContact: '2024-05-22', lastContactType: 'SMS', promisedAmount: 1200, promiseDate: '2024-05-30' },
  { id: '9', loanNumber: 'LN-2024-10009', clientName: 'Mutinta Nkumbula', phone: '0966789012', outstanding: 2800, daysOverdue: 22, riskCategory: 'ORANGE', lastContact: '2024-05-25', lastContactType: 'WHATSAPP', promisedAmount: 700, promiseDate: '2024-06-05' },
  { id: '10', loanNumber: 'LN-2024-10010', clientName: 'Solomon Mwanza', phone: '0979112233', outstanding: 4500, daysOverdue: 14, riskCategory: 'ORANGE', lastContact: '2024-05-26', lastContactType: 'CALL', promisedAmount: 1500, promiseDate: '2024-06-01' },
  { id: '11', loanNumber: 'LN-2024-10011', clientName: 'Agnes Chirwa', phone: '0964445566', outstanding: 1800, daysOverdue: 5, riskCategory: 'YELLOW', lastContact: '2024-05-27', lastContactType: 'SMS', promisedAmount: 900, promiseDate: '2024-05-30' },
]

// ─── PHASE 2 MOCK DATA ──────────────────────────────────────────────────────

export const mockTasks = [
  { id: 't1', title: 'Call Mwamba Chipata about overdue payment', description: 'Loan LN-2024-10012 is 14 days overdue. Remind about K2,400 due.', assignedTo: 'Mutale Banda', assignedBy: 'Daliso Phiri', assignedToId: 'u2', priority: 'HIGH', status: 'PENDING', dueDate: '2026-06-14', relatedClientId: 'c1', relatedLoanId: 'l1', createdAt: '2026-06-12' },
  { id: 't2', title: 'Verify iPhone 14 serial number', description: 'Cross-check IMEI on collateral record PHX-2024-1002 against the physical device.', assignedTo: 'Chileshe Mwansa', assignedBy: 'Daliso Phiri', assignedToId: 'u3', priority: 'MEDIUM', status: 'IN_PROGRESS', dueDate: '2026-06-13', relatedClientId: 'c2', createdAt: '2026-06-11' },
  { id: 't3', title: 'Follow up on Nakamba loan application', description: 'Business loan application pending credit assessment. Client submitted documents.', assignedTo: 'Mutale Banda', assignedBy: 'Daliso Phiri', assignedToId: 'u2', priority: 'HIGH', status: 'PENDING', dueDate: '2026-06-15', relatedClientId: 'c3', createdAt: '2026-06-12' },
  { id: 't4', title: 'Collect payment receipt from Bwalya', description: 'Client paid via mobile money. Collect physical receipt and update system.', assignedTo: 'Mwape Lungu', assignedBy: 'Mutale Banda', assignedToId: 'u4', priority: 'LOW', status: 'COMPLETED', dueDate: '2026-06-12', relatedClientId: 'c4', completedAt: '2026-06-12', createdAt: '2026-06-10' },
  { id: 't5', title: 'Review collateral photos for Samsung Galaxy', description: 'New collateral intake. All 4 photos must be uploaded before loan approval.', assignedTo: 'Chileshe Mwansa', assignedBy: 'Daliso Phiri', assignedToId: 'u3', priority: 'URGENT', status: 'PENDING', dueDate: '2026-06-13', createdAt: '2026-06-12' },
  { id: 't6', title: 'Update investor payout for May 2026', description: 'Monthly payouts due for 3 investors. Process transfers and update records.', assignedTo: 'Daliso Phiri', assignedBy: 'Daliso Phiri', assignedToId: 'u1', priority: 'HIGH', status: 'IN_PROGRESS', dueDate: '2026-06-15', createdAt: '2026-06-10' },
  { id: 't7', title: 'Print loan agreements for Tuesday disbursements', description: 'Prepare signed copies of loan agreements for 3 new loans being disbursed.', assignedTo: 'Mwape Lungu', assignedBy: 'Mutale Banda', assignedToId: 'u4', priority: 'MEDIUM', status: 'PENDING', dueDate: '2026-06-17', createdAt: '2026-06-12' },
  { id: 't8', title: 'Staff meeting - Q2 targets review', description: 'Prepare quarterly performance data. Meeting at 10am Monday.', assignedTo: 'Daliso Phiri', assignedBy: 'Daliso Phiri', assignedToId: 'u1', priority: 'MEDIUM', status: 'PENDING', dueDate: '2026-06-16', createdAt: '2026-06-12' },
]

export const mockAnnouncements = [
  { id: 'a1', title: 'New Loan Interest Rates Effective 1st July 2026', body: 'Management has reviewed and updated loan interest rates. Student loans will reduce from 10% to 9% per month. Business loans remain at 8%. Please refer to the updated rate card in the wiki.', priority: 'HIGH', isActive: true, createdBy: 'Daliso Phiri', createdAt: '2026-06-10', expiresAt: '2026-07-01' },
  { id: 'a2', title: 'Monthly Collections Target: K450,000', body: 'For June 2026, our collections target is K450,000. Current collections stand at K312,400 (69.4%). All loan officers must intensify follow-ups this week. Collections leaderboard will be updated daily.', priority: 'MEDIUM', isActive: true, createdBy: 'Daliso Phiri', createdAt: '2026-06-01', expiresAt: '2026-06-30' },
  { id: 'a3', title: 'Reminder: Collateral Photo Policy', body: 'Effective immediately, all new collateral must have minimum 4 photos (front, back, side, serial number) uploaded to the system before any loan can be approved. No exceptions.', priority: 'HIGH', isActive: true, createdBy: 'Mutale Banda', createdAt: '2026-06-08' },
]

export const mockCommunicationLogs = [
  { id: 'cl1', clientId: 'c1', clientName: 'Mwamba Chipata', loanId: 'l1', channel: 'CALL', summary: 'Client answered. Promised to pay K2,400 by Friday 14th June.', outcome: 'PROMISE_TO_PAY', followUpDate: '2026-06-14', loggedBy: 'Mutale Banda', loggedAt: '2026-06-12T09:30:00Z' },
  { id: 'cl2', clientId: 'c1', clientName: 'Mwamba Chipata', loanId: 'l1', channel: 'CALL', summary: 'Client did not answer. Left voicemail.', outcome: 'NO_ANSWER', loggedBy: 'Mutale Banda', loggedAt: '2026-06-11T14:15:00Z' },
  { id: 'cl3', clientId: 'c2', clientName: 'Thandiwe Mwale', loanId: 'l2', channel: 'EMAIL', summary: 'Sent payment reminder for installment due 15th June. K3,200 outstanding.', outcome: 'SENT', loggedBy: 'System', loggedAt: '2026-06-12T08:00:00Z' },
  { id: 'cl4', clientId: 'c3', clientName: 'Bwalya Mutale', channel: 'VISIT', summary: 'Client visited office to discuss loan restructuring. Meeting with manager scheduled.', outcome: 'MEETING_SCHEDULED', followUpDate: '2026-06-16', loggedBy: 'Chileshe Mwansa', loggedAt: '2026-06-11T11:00:00Z' },
  { id: 'cl5', clientId: 'c4', clientName: 'Chanda Phiri', loanId: 'l4', channel: 'WHATSAPP', summary: 'Sent payment schedule summary via WhatsApp. Client acknowledged receipt.', outcome: 'ACKNOWLEDGED', loggedBy: 'Mwape Lungu', loggedAt: '2026-06-10T16:45:00Z' },
  { id: 'cl6', clientId: 'c5', clientName: 'Mutale Nkandu', loanId: 'l5', channel: 'CALL', summary: 'Client says she is in Ndola, will pay on Monday via mobile money.', outcome: 'PROMISE_TO_PAY', followUpDate: '2026-06-17', loggedBy: 'Mutale Banda', loggedAt: '2026-06-12T13:20:00Z' },
  { id: 'cl7', clientId: 'c1', clientName: 'Mwamba Chipata', channel: 'CALL', summary: 'Initial loan inquiry. Discussed terms, interest, and collateral requirements.', outcome: 'INTERESTED', loggedBy: 'Chileshe Mwansa', loggedAt: '2026-05-20T10:00:00Z' },
  { id: 'cl8', clientId: 'c2', clientName: 'Thandiwe Mwale', loanId: 'l2', channel: 'EMAIL', summary: 'Loan approval notification sent.', outcome: 'SENT', loggedBy: 'System', loggedAt: '2026-04-01T09:00:00Z' },
  { id: 'cl9', clientId: 'c6', clientName: 'Namwinga Sikazwe', loanId: 'l6', channel: 'CALL', summary: 'Warning call — 3 days overdue. Client says salary delayed by employer.', outcome: 'EXCUSED', followUpDate: '2026-06-15', loggedBy: 'Mwape Lungu', loggedAt: '2026-06-12T11:30:00Z' },
  { id: 'cl10', clientId: 'c3', clientName: 'Bwalya Mutale', loanId: 'l3', channel: 'SMS', summary: 'Automated overdue SMS sent.', outcome: 'SENT', loggedBy: 'System', loggedAt: '2026-06-10T08:00:00Z' },
  { id: 'cl11', clientId: 'c4', clientName: 'Chanda Phiri', channel: 'VISIT', summary: 'Client visited to request early repayment. Confirmed final balance K4,800.', outcome: 'COMPLETED', loggedBy: 'Mutale Banda', loggedAt: '2026-06-09T14:00:00Z' },
  { id: 'cl12', clientId: 'c5', clientName: 'Mutale Nkandu', loanId: 'l5', channel: 'CALL', summary: 'Loan application follow-up. Client submitted remaining documents.', outcome: 'DOCUMENTS_RECEIVED', loggedBy: 'Chileshe Mwansa', loggedAt: '2026-06-05T09:45:00Z' },
]

export const mockFollowUpReminders = [
  { id: 'r1', clientId: 'c1', clientName: 'Mwamba Chipata', loanId: 'l1', note: 'Client promised to pay K2,400. Confirm payment received.', dueAt: '2026-06-14T09:00:00Z', status: 'PENDING', createdBy: 'Mutale Banda', createdAt: '2026-06-12' },
  { id: 'r2', clientId: 'c5', clientName: 'Mutale Nkandu', loanId: 'l5', note: 'Follow up on Monday mobile money payment promise.', dueAt: '2026-06-17T08:00:00Z', status: 'PENDING', createdBy: 'Mutale Banda', createdAt: '2026-06-12' },
  { id: 'r3', clientId: 'c3', clientName: 'Bwalya Mutale', note: 'Restructuring meeting with manager. Prepare loan history summary.', dueAt: '2026-06-16T10:00:00Z', status: 'PENDING', createdBy: 'Chileshe Mwansa', createdAt: '2026-06-11' },
  { id: 'r4', clientId: 'c2', clientName: 'Thandiwe Mwale', loanId: 'l2', note: 'Check if payment landed. Send receipt.', dueAt: '2026-06-12T17:00:00Z', status: 'DISMISSED', createdBy: 'Mwape Lungu', createdAt: '2026-06-10' },
  { id: 'r5', clientId: 'c6', clientName: 'Namwinga Sikazwe', loanId: 'l6', note: 'Salary delay excused. Call again if no payment by 15th.', dueAt: '2026-06-15T09:00:00Z', status: 'PENDING', createdBy: 'Mwape Lungu', createdAt: '2026-06-12' },
]

export const mockEmailLogs = [
  { id: 'e1', templateType: 'LOAN_APPROVAL', recipientEmail: 'mwamba@email.zm', recipientName: 'Mwamba Chipata', subject: 'Your Loan Application Has Been Approved — Philix Finance', status: 'SENT', loanId: 'l1', clientId: 'c1', sentAt: '2026-05-15T09:05:00Z' },
  { id: 'e2', templateType: 'PAYMENT_REMINDER', recipientEmail: 'thandiwe@email.zm', recipientName: 'Thandiwe Mwale', subject: 'Payment Reminder: K3,200 Due on 15th June — Philix Finance', status: 'SENT', loanId: 'l2', clientId: 'c2', sentAt: '2026-06-12T08:00:00Z' },
  { id: 'e3', templateType: 'OVERDUE_NOTICE', recipientEmail: 'bwalya@email.zm', recipientName: 'Bwalya Mutale', subject: 'URGENT: Your Loan Payment is Overdue — Philix Finance', status: 'SENT', loanId: 'l3', clientId: 'c3', sentAt: '2026-06-10T08:00:00Z' },
  { id: 'e4', templateType: 'LOAN_REJECTION', recipientEmail: 'joseph@email.zm', recipientName: 'Joseph Tembo', subject: 'Update on Your Loan Application — Philix Finance', status: 'SENT', clientId: 'c7', sentAt: '2026-06-08T14:30:00Z' },
  { id: 'e5', templateType: 'PAYMENT_REMINDER', recipientEmail: 'mutale@email.zm', recipientName: 'Mutale Nkandu', subject: 'Payment Reminder: K1,850 Due on 18th June — Philix Finance', status: 'FAILED', loanId: 'l5', clientId: 'c5', sentAt: '2026-06-12T08:00:00Z', error: 'Invalid email address' },
  { id: 'e6', templateType: 'COLLATERAL_RELEASE', recipientEmail: 'chanda@email.zm', recipientName: 'Chanda Phiri', subject: 'Collateral Release Notice — Philix Finance', status: 'SENT', clientId: 'c4', sentAt: '2026-06-09T15:00:00Z' },
  { id: 'e7', templateType: 'LOAN_CLOSURE', recipientEmail: 'chanda@email.zm', recipientName: 'Chanda Phiri', subject: 'Congratulations! Your Loan is Fully Paid — Philix Finance', status: 'SENT', loanId: 'l4', clientId: 'c4', sentAt: '2026-06-09T14:50:00Z' },
  { id: 'e8', templateType: 'OVERDUE_NOTICE', recipientEmail: 'namwinga@email.zm', recipientName: 'Namwinga Sikazwe', subject: 'URGENT: Your Loan Payment is Overdue — Philix Finance', status: 'SENT', loanId: 'l6', clientId: 'c6', sentAt: '2026-06-10T08:00:00Z' },
  { id: 'e9', templateType: 'LOAN_APPROVAL', recipientEmail: 'grace@email.zm', recipientName: 'Grace Mwale', subject: 'Your Loan Application Has Been Approved — Philix Finance', status: 'FAILED', clientId: 'c8', sentAt: '2026-06-11T10:00:00Z', error: 'SMTP connection timeout' },
  { id: 'e10', templateType: 'PAYMENT_REMINDER', recipientEmail: 'mwamba@email.zm', recipientName: 'Mwamba Chipata', subject: 'Payment Reminder: K2,400 Overdue — Philix Finance', status: 'SENT', loanId: 'l1', clientId: 'c1', sentAt: '2026-06-11T08:00:00Z' },
]

export const mockBranches = [
  { id: 'b1', name: 'Head Office — Lusaka', code: 'LSK-HQ', address: 'Plot 4567, Cairo Road', city: 'Lusaka', managerName: 'Daliso Phiri', managerEmail: 'admin@philix.zm', phone: '+260 977 123456', isActive: true, staffCount: 6, activeLoans: 34, totalPortfolio: 1245000 },
  { id: 'b2', name: 'Kitwe Branch', code: 'KTW-01', address: 'Shop 12, Obote Avenue', city: 'Kitwe', managerName: 'Pending Appointment', managerEmail: '', phone: '+260 966 987654', isActive: false, staffCount: 0, activeLoans: 0, totalPortfolio: 0 },
]

export const mockRepossessions = [
  { id: 'rep1', collateralId: 'col3', vaultId: 'PHX-2024-1003', assetType: 'LAPTOP', brand: 'HP', model: 'Pavilion 15', loanId: 'l3', clientName: 'Bwalya Mutale', daysOverdue: 67, outstandingBalance: 8400, status: 'HELD', initiatedBy: 'Mutale Banda', initiatedAt: '2026-05-20', notes: 'Client unreachable. Device held in vault pending auction.', recoveryAmount: null },
  { id: 'rep2', collateralId: 'col5', vaultId: 'PHX-2024-1005', assetType: 'SMARTPHONE', brand: 'Samsung', model: 'Galaxy S22', loanId: 'l7', clientName: 'Joseph Tembo', daysOverdue: 94, outstandingBalance: 3200, status: 'AT_AUCTION', initiatedBy: 'Daliso Phiri', initiatedAt: '2026-04-10', auctionDate: '2026-06-20', auctionHouse: 'Lusaka Electronics Market', notes: 'Listed for auction. Reserve price K2,800.', recoveryAmount: null },
  { id: 'rep3', collateralId: 'col1', vaultId: 'PHX-2023-1001', assetType: 'LAPTOP', brand: 'Lenovo', model: 'ThinkPad E14', loanId: 'l8', clientName: 'Mutale Nkandu (prev)', daysOverdue: 120, outstandingBalance: 0, status: 'SOLD', initiatedBy: 'Daliso Phiri', initiatedAt: '2026-02-01', auctionDate: '2026-04-15', recoveryAmount: 5500, notes: 'Sold at auction for K5,500. Loan recovered in full.' },
]

export const mockWikiArticles = [
  { id: 'w1', title: 'Loan Approval Process — Standard Operating Procedure', slug: 'loan-approval-sop', category: 'Procedures', body: '## Overview\nAll loan applications at Philix Finance follow a structured 5-step approval process.\n\n## Steps\n1. **Client Registration** — Capture NRC, photo, employment details\n2. **Collateral Assessment** — Physical inspection, photo documentation, valuation\n3. **Credit Assessment** — Review payment history, calculate risk score\n4. **Manager Approval** — Loans above K10,000 require manager sign-off\n5. **Disbursement** — Transfer via mobile money or cash with signed agreement\n\n## Turnaround Time\nStandard loans: 24 hours. Business loans: 48-72 hours.', authorId: 'u1', authorName: 'Daliso Phiri', isPublished: true, publishedAt: '2026-01-15', updatedAt: '2026-05-20' },
  { id: 'w2', title: 'Collateral Acceptance Policy', slug: 'collateral-policy', category: 'Policies', body: '## Accepted Collateral\n- Smartphones (min value K800)\n- Laptops (min value K3,000)\n- Tablets (min value K1,500)\n- Gaming Consoles (min value K2,000)\n\n## Rejected Collateral\n- Devices older than 4 years\n- Cracked screens (unless documented and price adjusted)\n- Devices without IMEI or serial number\n- Stolen devices (blacklisted IMEI)\n\n## Valuation Rule\nForced Sale Value = Market Value × 0.65\nMaximum Loan = Forced Sale Value × 0.80', authorId: 'u1', authorName: 'Daliso Phiri', isPublished: true, publishedAt: '2026-01-10', updatedAt: '2026-04-01' },
  { id: 'w3', title: 'Collections Best Practices', slug: 'collections-guide', category: 'Training', body: '## Communication Hierarchy\n1. SMS reminder — 3 days before due\n2. WhatsApp message — 1 day before due\n3. Phone call — on due date if not paid\n4. Follow-up call — 3 days overdue\n5. Manager notification — 7 days overdue\n6. Field visit — 14 days overdue\n7. Legal notice — 30 days overdue\n\n## Do Not\n- Call before 8am or after 7pm\n- Discuss client debt with family members\n- Make threats or use aggressive language\n\n## Recording Contacts\nAll contacts MUST be logged in the Collections Center within 1 hour.', authorId: 'u2', authorName: 'Mutale Banda', isPublished: true, publishedAt: '2026-02-01', updatedAt: '2026-06-01' },
  { id: 'w4', title: 'Interest Rate Schedule — 2026', slug: 'interest-rates-2026', category: 'Policies', body: '## Current Rates (Effective June 2026)\n\n| Loan Type | Monthly Rate | Processing Fee |\n|-----------|-------------|----------------|\n| Student | 9% | 5% |\n| Campus | 12% | 5% |\n| Business | 8% | 5% |\n| Short-Term | 15% | 5% |\n| Asset-Backed | 7% | 5% |\n\n## Penalty Rate\nOverdue penalty: 2% per week on overdue balance (max 30% per annum)\n\n## Review Schedule\nRates reviewed quarterly.', authorId: 'u1', authorName: 'Daliso Phiri', isPublished: true, publishedAt: '2026-01-01', updatedAt: '2026-06-01' },
  { id: 'w5', title: 'New Staff Onboarding Guide', slug: 'onboarding', category: 'Training', body: '## Week 1\n- System access setup (get credentials from admin)\n- Shadow senior loan officer for 3 days\n- Read all policies in the Knowledge Base\n- Complete collateral assessment training\n\n## Week 2\n- Handle first 5 client registrations under supervision\n- Assist with loan application processing\n- Learn collections procedures\n\n## Key Contacts\n- System issues: admin@philix.zm\n- Policy questions: manager@philix.zm\n- Urgent client issues: Always escalate to manager', authorId: 'u1', authorName: 'Daliso Phiri', isPublished: true, publishedAt: '2026-03-01', updatedAt: '2026-03-01' },
  { id: 'w6', title: 'Handling Collateral Disputes', slug: 'collateral-disputes', category: 'Procedures', body: '## When a Client Claims Wrong Valuation\n1. Review original assessment photos and condition notes\n2. Do not argue — escalate to manager\n3. If market value genuinely changed, re-assess with manager present\n4. Update system records with justification\n\n## When Collateral is Damaged in Vault\n1. Photograph damage immediately\n2. File internal incident report\n3. Notify manager within 24 hours\n4. Client must be notified in writing within 48 hours', authorId: 'u2', authorName: 'Mutale Banda', isPublished: true, publishedAt: '2026-02-15', updatedAt: '2026-02-15' },
  { id: 'w7', title: 'Mobile Money Payment Processing', slug: 'mobile-money-guide', category: 'Procedures', body: '## Accepted Networks\n- MTN Mobile Money\n- Airtel Money\n- Zamtel Kwacha\n\n## Receiving Payments\n1. Client sends to Philix Finance business number\n2. Verify transaction SMS received\n3. Record in system immediately\n4. Send confirmation to client via WhatsApp\n\n## Common Issues\n- Wrong reference number: Contact client, match manually with amount + date\n- Partial payment: Record as partial, note remaining balance\n- Reversed payment: Mark as failed, contact client same day', authorId: 'u3', authorName: 'Chileshe Mwansa', isPublished: true, publishedAt: '2026-04-01', updatedAt: '2026-04-01' },
  { id: 'w8', title: 'Investor Reporting Requirements', slug: 'investor-reporting', category: 'Policies', body: '## Monthly Reports Due By 5th of Each Month\n- Capital utilization rate\n- Portfolio at Risk (PAR30, PAR60, PAR90)\n- Total interest earned\n- Net profit/loss\n- List of defaulted loans\n\n## Quarterly Reports\n- Full portfolio audit\n- Capital growth analysis\n- Projections for next quarter\n\n## Investor Meetings\n- Scheduled quarterly (January, April, July, October)\n- CEO presents results personally\n- All figures must reconcile with system data', authorId: 'u1', authorName: 'Daliso Phiri', isPublished: true, publishedAt: '2026-01-05', updatedAt: '2026-01-05' },
]

export const mockInvestorPayouts = [
  { id: 'ip1', investorId: 'inv1', investorName: 'Mulenga Capital Partners', month: '2026-05', amount: 12500, paidAt: '2026-06-05', status: 'PAID' },
  { id: 'ip2', investorId: 'inv2', investorName: 'Chisenga Family Trust', month: '2026-05', amount: 9750, paidAt: '2026-06-05', status: 'PAID' },
  { id: 'ip3', investorId: 'inv3', investorName: 'Zambia Micro Ventures', month: '2026-05', amount: 8200, paidAt: '2026-06-05', status: 'PAID' },
  { id: 'ip4', investorId: 'inv1', investorName: 'Mulenga Capital Partners', month: '2026-06', amount: 12500, paidAt: null, status: 'PENDING' },
  { id: 'ip5', investorId: 'inv2', investorName: 'Chisenga Family Trust', month: '2026-06', amount: 9750, paidAt: null, status: 'PENDING' },
  { id: 'ip6', investorId: 'inv3', investorName: 'Zambia Micro Ventures', month: '2026-06', amount: 8200, paidAt: null, status: 'PENDING' },
  { id: 'ip7', investorId: 'inv1', investorName: 'Mulenga Capital Partners', month: '2026-04', amount: 12500, paidAt: '2026-05-04', status: 'PAID' },
  { id: 'ip8', investorId: 'inv2', investorName: 'Chisenga Family Trust', month: '2026-04', amount: 9750, paidAt: '2026-05-04', status: 'PAID' },
]

export const mockCashFlow = {
  daily: [
    { date: '2026-05-31', inflow: 45200, outflow: 12000, net: 33200 },
    { date: '2026-06-01', inflow: 38400, outflow: 25000, net: 13400 },
    { date: '2026-06-02', inflow: 12000, outflow: 5000, net: 7000 },
    { date: '2026-06-03', inflow: 52600, outflow: 18000, net: 34600 },
    { date: '2026-06-04', inflow: 41200, outflow: 30000, net: 11200 },
    { date: '2026-06-05', inflow: 68400, outflow: 8500, net: 59900 },
    { date: '2026-06-06', inflow: 29800, outflow: 42000, net: -12200 },
    { date: '2026-06-07', inflow: 35600, outflow: 15000, net: 20600 },
    { date: '2026-06-08', inflow: 0, outflow: 0, net: 0 },
    { date: '2026-06-09', inflow: 44200, outflow: 28000, net: 16200 },
    { date: '2026-06-10', inflow: 56800, outflow: 12500, net: 44300 },
    { date: '2026-06-11', inflow: 39400, outflow: 65000, net: -25600 },
    { date: '2026-06-12', inflow: 31200, outflow: 9800, net: 21400 },
    { date: '2026-06-13', inflow: 28600, outflow: 14200, net: 14400 },
  ],
  weekly: [
    { week: 'W47 2025', inflow: 198400, outflow: 145200, net: 53200 },
    { week: 'W48 2025', inflow: 212600, outflow: 168000, net: 44600 },
    { week: 'W49 2025', inflow: 245800, outflow: 195400, net: 50400 },
    { week: 'W50 2025', inflow: 189200, outflow: 142600, net: 46600 },
    { week: 'W01 2026', inflow: 234400, outflow: 180000, net: 54400 },
    { week: 'W02 2026', inflow: 256800, outflow: 198000, net: 58800 },
    { week: 'W03 2026', inflow: 198600, outflow: 155400, net: 43200 },
    { week: 'W22 2026', inflow: 312400, outflow: 234500, net: 77900 },
  ],
  monthly: [
    { month: 'Jul 2025', inflow: 820000, outflow: 645000, net: 175000 },
    { month: 'Aug 2025', inflow: 890000, outflow: 710000, net: 180000 },
    { month: 'Sep 2025', inflow: 845000, outflow: 680000, net: 165000 },
    { month: 'Oct 2025', inflow: 920000, outflow: 750000, net: 170000 },
    { month: 'Nov 2025', inflow: 965000, outflow: 790000, net: 175000 },
    { month: 'Dec 2025', inflow: 1050000, outflow: 870000, net: 180000 },
    { month: 'Jan 2026', inflow: 880000, outflow: 720000, net: 160000 },
    { month: 'Feb 2026', inflow: 910000, outflow: 745000, net: 165000 },
    { month: 'Mar 2026', inflow: 975000, outflow: 800000, net: 175000 },
    { month: 'Apr 2026', inflow: 1020000, outflow: 840000, net: 180000 },
    { month: 'May 2026', inflow: 1085000, outflow: 895000, net: 190000 },
    { month: 'Jun 2026', inflow: 562000, outflow: 460000, net: 102000 },
  ],
}

export const mockStaffPerformance = [
  { userId: 'u2', name: 'Mutale Banda', role: 'LOAN_OFFICER', loansIssued: 18, totalDisbursed: 425000, activeClients: 34, collectionsTarget: 180000, collectionsActual: 162400, collectionRate: 90.2, defaults: 1, avgLoanSize: 23611, rank: 1 },
  { userId: 'u3', name: 'Chileshe Mwansa', role: 'LOAN_OFFICER', loansIssued: 14, totalDisbursed: 312000, activeClients: 28, collectionsTarget: 145000, collectionsActual: 124800, collectionRate: 86.1, defaults: 2, avgLoanSize: 22286, rank: 2 },
  { userId: 'u4', name: 'Mwape Lungu', role: 'COLLECTIONS_OFFICER', loansIssued: 0, totalDisbursed: 0, activeClients: 22, collectionsTarget: 125000, collectionsActual: 98200, collectionRate: 78.6, defaults: 3, avgLoanSize: 0, rank: 3 },
  { userId: 'u5', name: 'Bupe Tembo', role: 'LOAN_OFFICER', loansIssued: 9, totalDisbursed: 198000, activeClients: 18, collectionsTarget: 98000, collectionsActual: 71400, collectionRate: 72.9, defaults: 2, avgLoanSize: 22000, rank: 4 },
  { userId: 'u6', name: 'Namwinga Chanda', role: 'COLLECTIONS_OFFICER', loansIssued: 0, totalDisbursed: 0, activeClients: 15, collectionsTarget: 85000, collectionsActual: 56200, collectionRate: 66.1, defaults: 4, avgLoanSize: 0, rank: 5 },
]

export const mockCapitalUtilization = {
  totalCapital: 1950000,
  activeLoansValue: 1342800,
  availableCapital: 607200,
  utilizationPct: 68.9,
  reservedForApproved: 145000,
  effectiveAvailable: 462200,
  trend: [
    { month: 'Jan', utilization: 62.4 },
    { month: 'Feb', utilization: 65.1 },
    { month: 'Mar', utilization: 67.8 },
    { month: 'Apr', utilization: 71.2 },
    { month: 'May', utilization: 69.5 },
    { month: 'Jun', utilization: 68.9 },
  ],
}

export const mockPARData = {
  PAR1: { count: 11, amount: 48200, percentage: 2.51, previousMonth: 2.84 },
  PAR7: { count: 8, amount: 34600, percentage: 1.80, previousMonth: 2.12 },
  PAR30: { count: 5, amount: 21400, percentage: 1.11, previousMonth: 1.45 },
  PAR60: { count: 3, amount: 12800, percentage: 0.67, previousMonth: 0.89 },
  PAR90: { count: 1, amount: 4200, percentage: 0.22, previousMonth: 0.38 },
  trend: [
    { month: 'Jul 2025', PAR30: 1.82, PAR60: 0.94, PAR90: 0.41 },
    { month: 'Aug 2025', PAR30: 2.10, PAR60: 1.12, PAR90: 0.52 },
    { month: 'Sep 2025', PAR30: 1.95, PAR60: 1.04, PAR90: 0.48 },
    { month: 'Oct 2025', PAR30: 2.34, PAR60: 1.28, PAR90: 0.61 },
    { month: 'Nov 2025', PAR30: 2.18, PAR60: 1.15, PAR90: 0.54 },
    { month: 'Dec 2025', PAR30: 1.76, PAR60: 0.98, PAR90: 0.42 },
    { month: 'Jan 2026', PAR30: 1.62, PAR60: 0.91, PAR90: 0.38 },
    { month: 'Feb 2026', PAR30: 1.88, PAR60: 1.05, PAR90: 0.46 },
    { month: 'Mar 2026', PAR30: 1.54, PAR60: 0.87, PAR90: 0.35 },
    { month: 'Apr 2026', PAR30: 1.45, PAR60: 0.89, PAR90: 0.38 },
    { month: 'May 2026', PAR30: 1.45, PAR60: 0.89, PAR90: 0.38 },
    { month: 'Jun 2026', PAR30: 1.11, PAR60: 0.67, PAR90: 0.22 },
  ],
}

export const mockSystemHealth = {
  dbStatus: 'ONLINE',
  dbSizeMB: 128.4,
  lastBackup: '2026-06-13T00:00:00Z',
  backupStatus: 'SUCCESS',
  activeUsers: 4,
  totalUsers: 8,
  serverUptime: '14d 6h 22m',
  apiResponseMs: 42,
  totalRecords: { clients: 847, loans: 1243, payments: 4821, collateral: 934 },
  recentErrors: [],
  nodeVersion: 'v22.22.2',
  dbVersion: 'PostgreSQL 16.2',
}

export const mockCollateralRules = {
  SMARTPHONE: {
    brands: ['Samsung', 'Apple', 'Xiaomi', 'Tecno', 'Infinix', 'Itel', 'Huawei'],
    baseValues: { 'Apple iPhone 15 Pro': 12000, 'Apple iPhone 14': 9000, 'Samsung Galaxy S24': 10500, 'Samsung Galaxy S22': 7500, 'Samsung Galaxy A54': 4500, 'Xiaomi 13': 5500, 'Tecno Phantom': 3500 },
    depreciationPerYear: 0.25,
    maxLTV: 0.70,
    minAge: 0, maxAgeYears: 3,
  },
  LAPTOP: {
    brands: ['Apple', 'Lenovo', 'Dell', 'HP', 'Asus', 'Acer', 'Microsoft'],
    baseValues: { 'Apple MacBook Pro M3': 28000, 'Apple MacBook Air M2': 18000, 'Lenovo ThinkPad X1': 15000, 'Dell XPS 15': 14000, 'HP Spectre': 13000, 'Lenovo IdeaPad': 8000, 'HP Pavilion': 7000 },
    depreciationPerYear: 0.20,
    maxLTV: 0.65,
    minAge: 0, maxAgeYears: 4,
  },
  TABLET: {
    brands: ['Apple', 'Samsung', 'Lenovo', 'Huawei'],
    baseValues: { 'Apple iPad Pro': 14000, 'Apple iPad Air': 9500, 'Samsung Galaxy Tab S8': 8000, 'Samsung Galaxy Tab A8': 4500 },
    depreciationPerYear: 0.22,
    maxLTV: 0.65,
    minAge: 0, maxAgeYears: 3,
  },
  GAMING_CONSOLE: {
    brands: ['Sony', 'Microsoft'],
    baseValues: { 'Sony PlayStation 5': 9500, 'Microsoft Xbox Series X': 8500, 'Sony PlayStation 4 Pro': 4500, 'Microsoft Xbox Series S': 5500 },
    depreciationPerYear: 0.18,
    maxLTV: 0.60,
    minAge: 0, maxAgeYears: 4,
  },
}

export const mockDailyOpsStats = {
  date: '2026-06-13',
  loansIssuedToday: 2,
  disbursedToday: 48000,
  collectionsToday: 31200,
  expectedTodayCollections: 67400,
  collectionsCompletionPct: 46.3,
  newClientsToday: 3,
  overdueCount: 11,
  totalOverdueAmount: 87400,
  pendingApprovals: 4,
  pendingDisbursements: 2,
  staffOnDuty: 5,
  collateralItemsIn: 1,
  collateralItemsOut: 0,
}

export const mockAuditLogs = [
  { id: 'al1', action: 'LOAN_APPROVED', tableName: 'Loan', recordId: 'l2', description: 'Loan LN-2026-10012 approved — K25,000 for Thandiwe Mwale', userId: 'u1', userName: 'Daliso Phiri', ipAddress: '192.168.1.10', createdAt: '2026-06-12T14:32:00Z' },
  { id: 'al2', action: 'PAYMENT_RECORDED', tableName: 'Payment', recordId: 'p8', description: 'Payment of K3,200 recorded for Loan LN-2026-10008', userId: 'u2', userName: 'Mutale Banda', ipAddress: '192.168.1.12', createdAt: '2026-06-12T11:15:00Z' },
  { id: 'al3', action: 'CLIENT_CREATED', tableName: 'Client', recordId: 'c10', description: 'New client registered: Grace Mwale (NRC: 342156/78/1)', userId: 'u3', userName: 'Chileshe Mwansa', ipAddress: '192.168.1.14', createdAt: '2026-06-12T09:48:00Z' },
  { id: 'al4', action: 'COLLATERAL_INTAKE', tableName: 'Collateral', recordId: 'col6', description: 'Collateral PHX-2026-1008 (Samsung Galaxy S23) logged into vault', userId: 'u3', userName: 'Chileshe Mwansa', ipAddress: '192.168.1.14', createdAt: '2026-06-12T09:52:00Z' },
  { id: 'al5', action: 'USER_LOGIN', tableName: 'Session', recordId: 's12', description: 'User login: admin@philix.zm from 192.168.1.10', userId: 'u1', userName: 'Daliso Phiri', ipAddress: '192.168.1.10', createdAt: '2026-06-12T08:05:00Z' },
  { id: 'al6', action: 'LOAN_DISBURSED', tableName: 'Loan', recordId: 'l9', description: 'Loan LN-2026-10013 disbursed — K12,000 to Mwamba Chipata', userId: 'u1', userName: 'Daliso Phiri', ipAddress: '192.168.1.10', createdAt: '2026-06-11T15:20:00Z' },
  { id: 'al7', action: 'CLIENT_BLACKLISTED', tableName: 'Client', recordId: 'c7', description: 'Client Joseph Tembo blacklisted — 3 consecutive defaults', userId: 'u1', userName: 'Daliso Phiri', ipAddress: '192.168.1.10', createdAt: '2026-06-11T13:00:00Z' },
  { id: 'al8', action: 'EXPENSE_APPROVED', tableName: 'Expense', recordId: 'exp5', description: 'Expense K4,500 (Fuel — June) approved by manager', userId: 'u1', userName: 'Daliso Phiri', ipAddress: '192.168.1.10', createdAt: '2026-06-11T10:30:00Z' },
  { id: 'al9', action: 'COLLATERAL_RELEASED', tableName: 'Collateral', recordId: 'col1', description: 'Collateral PHX-2024-1001 released to Chanda Phiri — loan fully paid', userId: 'u1', userName: 'Daliso Phiri', ipAddress: '192.168.1.10', createdAt: '2026-06-09T15:05:00Z' },
  { id: 'al10', action: 'LOAN_PAID', tableName: 'Loan', recordId: 'l4', description: 'Loan LN-2025-10004 marked as PAID — final payment received', userId: 'u4', userName: 'Mwape Lungu', ipAddress: '192.168.1.15', createdAt: '2026-06-09T14:45:00Z' },
  { id: 'al11', action: 'USER_PASSWORD_CHANGED', tableName: 'User', recordId: 'u3', description: 'Password changed for Chileshe Mwansa', userId: 'u3', userName: 'Chileshe Mwansa', ipAddress: '192.168.1.14', createdAt: '2026-06-08T09:00:00Z' },
  { id: 'al12', action: 'SETTINGS_UPDATED', tableName: 'SystemConfig', recordId: 'sc1', description: 'System config updated: max_loan_amount changed from K50,000 to K75,000', userId: 'u1', userName: 'Daliso Phiri', ipAddress: '192.168.1.10', createdAt: '2026-06-07T16:00:00Z' },
  { id: 'al13', action: 'REPOSSESSION_INITIATED', tableName: 'Repossession', recordId: 'rep1', description: 'Repossession initiated for PHX-2024-1003 — Bwalya Mutale 67 days overdue', userId: 'u2', userName: 'Mutale Banda', ipAddress: '192.168.1.12', createdAt: '2026-05-20T11:00:00Z' },
  { id: 'al14', action: 'INVESTOR_PAYOUT', tableName: 'InvestorPayout', recordId: 'ip1', description: 'K12,500 payout processed for Mulenga Capital Partners (May 2026)', userId: 'u1', userName: 'Daliso Phiri', ipAddress: '192.168.1.10', createdAt: '2026-06-05T10:00:00Z' },
  { id: 'al15', action: 'LOAN_REJECTED', tableName: 'Loan', recordId: 'l_rej1', description: 'Loan application rejected — Joseph Tembo, insufficient collateral value', userId: 'u1', userName: 'Daliso Phiri', ipAddress: '192.168.1.10', createdAt: '2026-06-08T13:45:00Z' },
  { id: 'al16', action: 'USER_CREATED', tableName: 'User', recordId: 'u6', description: 'New user created: Namwinga Chanda (COLLECTIONS_OFFICER)', userId: 'u1', userName: 'Daliso Phiri', ipAddress: '192.168.1.10', createdAt: '2026-06-01T09:00:00Z' },
  { id: 'al17', action: 'PAYMENT_RECORDED', tableName: 'Payment', recordId: 'p9', description: 'Payment of K1,850 recorded for Loan LN-2026-10011', userId: 'u4', userName: 'Mwape Lungu', ipAddress: '192.168.1.15', createdAt: '2026-06-12T16:00:00Z' },
  { id: 'al18', action: 'COLLATERAL_INTAKE', tableName: 'Collateral', recordId: 'col7', description: 'Collateral PHX-2026-1009 (HP Laptop) logged into vault Shelf B-12', userId: 'u2', userName: 'Mutale Banda', ipAddress: '192.168.1.12', createdAt: '2026-06-11T14:30:00Z' },
  { id: 'al19', action: 'LOAN_APPROVED', tableName: 'Loan', recordId: 'l10', description: 'Loan LN-2026-10014 approved — K8,500 for Bupe Mwamba', userId: 'u1', userName: 'Daliso Phiri', ipAddress: '192.168.1.10', createdAt: '2026-06-10T11:20:00Z' },
  { id: 'al20', action: 'USER_LOGIN', tableName: 'Session', recordId: 's13', description: 'User login: officer@philix.zm from 192.168.1.12', userId: 'u2', userName: 'Mutale Banda', ipAddress: '192.168.1.12', createdAt: '2026-06-13T08:10:00Z' },
]

export const mockExpensesDetailed = [
  { id: 'exp1', category: 'Fuel', description: 'Fuel for client visits — North Lusaka route', amount: 2400, date: '2026-06-12', status: 'APPROVED', submittedBy: 'Mutale Banda', approvedBy: 'Daliso Phiri', approvedAt: '2026-06-12T14:00:00Z', createdAt: '2026-06-12' },
  { id: 'exp2', category: 'Internet', description: 'Monthly office internet — Liquid Telecom', amount: 1800, date: '2026-06-01', status: 'APPROVED', submittedBy: 'Daliso Phiri', approvedBy: 'Daliso Phiri', approvedAt: '2026-06-01T09:00:00Z', createdAt: '2026-06-01' },
  { id: 'exp3', category: 'Airtime', description: 'Staff airtime — collections team (3 staff)', amount: 900, date: '2026-06-10', status: 'APPROVED', submittedBy: 'Mwape Lungu', approvedBy: 'Mutale Banda', approvedAt: '2026-06-10T11:00:00Z', createdAt: '2026-06-10' },
  { id: 'exp4', category: 'Rent', description: 'Office rent — June 2026', amount: 12000, date: '2026-06-01', status: 'APPROVED', submittedBy: 'Daliso Phiri', approvedBy: 'Daliso Phiri', approvedAt: '2026-06-01T09:00:00Z', createdAt: '2026-06-01' },
  { id: 'exp5', category: 'Fuel', description: 'Fuel for repossession trip — Chilenje', amount: 4500, date: '2026-06-11', status: 'APPROVED', submittedBy: 'Mutale Banda', approvedBy: 'Daliso Phiri', approvedAt: '2026-06-11T10:30:00Z', createdAt: '2026-06-11' },
  { id: 'exp6', category: 'Marketing', description: 'Printed flyers distribution — UNZA campus', amount: 3200, date: '2026-06-08', status: 'PENDING', submittedBy: 'Chileshe Mwansa', createdAt: '2026-06-08' },
  { id: 'exp7', category: 'Transport', description: 'Taxi — client document collection', amount: 350, date: '2026-06-11', status: 'PENDING', submittedBy: 'Mwape Lungu', createdAt: '2026-06-11' },
  { id: 'exp8', category: 'Salaries', description: 'Staff salaries — June 2026 advance', amount: 45000, date: '2026-06-10', status: 'APPROVED', submittedBy: 'Daliso Phiri', approvedBy: 'Daliso Phiri', approvedAt: '2026-06-10T09:00:00Z', createdAt: '2026-06-10' },
  { id: 'exp9', category: 'Internet', description: 'Mobile data — field officers (2 SIMs)', amount: 600, date: '2026-06-05', status: 'APPROVED', submittedBy: 'Chileshe Mwansa', approvedBy: 'Mutale Banda', approvedAt: '2026-06-05T14:00:00Z', createdAt: '2026-06-05' },
  { id: 'exp10', category: 'Marketing', description: 'Social media boost — Facebook ads June', amount: 1500, date: '2026-06-03', status: 'REJECTED', submittedBy: 'Chileshe Mwansa', rejectionReason: 'Exceeds monthly marketing budget. Resubmit in July.', createdAt: '2026-06-03' },
]
