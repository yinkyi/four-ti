import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create some users
  await prisma.user.upsert({
    where: { email: 'yinyinkyi90@gmail.com' },
    update: {},
    create: {
      id: 'ec74f929-12e6-5248-8aa0-2d6f1e0f4e6c',
      auth0UserId: 'google-oauth2|107163367946670487684',
      name: 'yin',
      email: 'yinyinkyi90@gmail.com',
      todos: {
        create: [
          {
            title: 'First Task',
            content: 'Content of the first task',
            completed: false,
          },
          {
            title: 'Second Task',
            content: 'Content of the second task',
            completed: true,
          },
        ],
      },
    },
  });
  console.log('Seeding Done!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
