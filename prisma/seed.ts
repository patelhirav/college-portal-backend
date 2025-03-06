import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('1234', 10);

  const superAdmin = await prisma.superAdmin.upsert({
    where: { email: 'hirav.patel@wappzo.com' },
    update: {},
    create: {
      // id: "1",
      name: 'Super Admin',
      email: 'hirav.patel@wappzo.com',
      password: hashedPassword,
    },
  });

  console.log('Super Admin Seeded:', superAdmin);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
