import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
  ssl: false,
})

const prisma = new PrismaClient({ adapter })

async function main() {
  const userId = 1

  await prisma.task.createMany({
    data: [
      {
        activity: 'Fix login bug',
        priority: 'HIGH',
        deadline: new Date('2026-03-25'),
        userId,
      },
      {
        activity: 'Review design mockups',
        priority: 'MEDIUM',
        deadline: new Date('2026-03-28'),
        userId,
      },
      {
        activity: 'Update documentation',
        priority: 'LOW',
        deadline: new Date('2026-04-05'),
        userId,
      },
      {
        activity: 'Call client about project',
        priority: 'HIGH',
        deadline: new Date('2026-03-24'),
        userId,
      },
      {
        activity: 'Refactor authentication code',
        priority: 'MEDIUM',
        deadline: new Date('2026-03-30'),
        userId,
      },
    ],
  })
    console.log('Tasks seeded')

  await prisma.routineItem.createMany({
   data: [
    { activity: 'Morning Meditation', time: '08:00', duration: 30, order: 1, completed: false, userId },
    { activity: 'Gym Session', time: '19:00', duration: 60, order: 2, completed: false, userId },
    { activity: 'Evening Reading', time: '21:00', duration: 20, order: 3, completed: false, userId },
    { activity: 'Plan Next Day', time: '22:00', duration: 15, order: 4, completed: false, userId },
  ],
  })
  console.log('Routines seeded')

}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())