import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
async function main() {
  const permissionsList = [
    {
      name: 'employee:register',
    },
    {
      name: 'employee:read',
    },
    {
      name: 'employee:delete',
    },
    {
      name: 'menu:register',
    },
    {
      name: 'menu:read',
    },
    {
      name: 'menu:delete',
    },
    {
      name: 'dish:register',
    },
    {
      name: 'dish:read',
    },
    {
      name: 'dish:delete',
    },
    {
      name: 'item:register',
    },
    {
      name: 'item:read',
    },
    {
      name: 'item:delete',
    },
    {
      name: 'itemType:register',
    },
    {
      name: 'itemType:read',
    },
    {
      name: 'itemType:delete',
    },
    {
      name: 'category:register',
    },
    {
      name: 'category:read',
    },
    {
      name: 'category:delete',
    },
    {
      name: 'role:register',
    },
    {
      name: 'role:read',
    },
    {
      name: 'role:delete',
    },
  ];

  const adminRole = await prisma.role.upsert({
    where: { id: 0 },
    update: { id: 0 },
    create: {
      name: 'Admin',
      permissions: {
        createMany: {
          data: permissionsList,
          skipDuplicates: true,
        },
      },
    },
  });

  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@admin.com' },
    update: {},
    create: {
      email: 'admin@admin.com',
      hashedPassword:
        '$2b$10$K19JB1KW7OL2MNziH4Sn7u0P/ANseoWqYMNS1gHv10CnUQwcJXc/O',
      role: {
        connect: {
          id: adminRole.id,
        },
      },
      entity: {
        create: {
          firstName: 'Admin',
          lastName: 'Admin',
        },
      },
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
