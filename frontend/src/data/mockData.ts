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
