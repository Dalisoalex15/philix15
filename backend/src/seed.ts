import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding Philix Finance database...')

  // Seed users
  const adminPassword = await bcrypt.hash('Admin@123', 12)
  const officerPassword = await bcrypt.hash('Officer@123', 12)

  await prisma.user.upsert({
    where: { email: 'admin@philix.zm' },
    update: {},
    create: { email: 'admin@philix.zm', password: adminPassword, firstName: 'Alex', lastName: 'Mwale', role: 'SUPER_ADMIN' },
  })

  const officer = await prisma.user.upsert({
    where: { email: 'p.lungu@philix.zm' },
    update: {},
    create: { email: 'p.lungu@philix.zm', password: officerPassword, firstName: 'Precious', lastName: 'Lungu', role: 'LOAN_OFFICER' },
  })

  // Seed clients
  const clients = await Promise.all([
    prisma.client.upsert({
      where: { nrcNumber: '145782/10/1' },
      update: {},
      create: { clientCode: 'CLT-2024-0001', firstName: 'Chanda', lastName: 'Mwale', nrcNumber: '145782/10/1', studentId: 'UNZA/2021/3847', university: 'University of Zambia', phone: '0977123456', email: 'chanda.mwale@students.unza.zm', address: 'Room 12B, Katete Hostel, UNZA, Lusaka', occupation: 'Student', internalScore: 78, reliabilityRating: 4 },
    }),
    prisma.client.upsert({
      where: { nrcNumber: '289034/45/1' },
      update: {},
      create: { clientCode: 'CLT-2024-0004', firstName: 'James', lastName: 'Tembo', nrcNumber: '289034/45/1', phone: '0979456789', email: 'jtembo@moh.gov.zm', address: 'House 7, Civil Servants Quarters, Woodlands', occupation: 'Civil Servant', employerName: 'Ministry of Health', salary: 18500, internalScore: 92, reliabilityRating: 5 },
    }),
  ])

  // Seed system config
  await prisma.systemConfig.upsert({
    where: { key: 'default_student_rate' },
    update: {},
    create: { key: 'default_student_rate', value: '10', description: 'Default monthly interest rate for student loans (%)' },
  })
  await prisma.systemConfig.upsert({
    where: { key: 'default_business_rate' },
    update: {},
    create: { key: 'default_business_rate', value: '8', description: 'Default monthly interest rate for business loans (%)' },
  })

  // Seed investors
  await prisma.investor.upsert({
    where: { id: 'inv-001' },
    update: {},
    create: { id: 'inv-001', name: 'Emmanuel Sakala', phone: '0977001122', email: 'e.sakala@gmail.com', amount: 500000, returnRate: 15, startDate: new Date('2024-01-01'), monthlyEarnings: 6250, capitalBalance: 500000 },
  })

  // Seed expenses
  await prisma.expense.createMany({
    data: [
      { category: 'SALARIES', description: 'Staff salaries - May 2024', amount: 85000, date: new Date('2024-05-28') },
      { category: 'RENT', description: 'Office rent - May 2024', amount: 12000, date: new Date('2024-05-01') },
      { category: 'UTILITIES', description: 'Electricity and internet', amount: 3500, date: new Date('2024-05-15') },
    ],
    skipDuplicates: true,
  })

  console.log('Seed complete! Demo login: admin@philix.zm / Admin@123')
}

main().catch(console.error).finally(() => prisma.$disconnect())
