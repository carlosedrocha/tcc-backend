import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
async function main() {
  //todo add all permissions
  const adminPermissionsList = [
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
    {
      name: 'tab:register',
    },
    {
      name: 'tab:read',
    },
    {
      name: 'tab:delete',
    },
    {
      name: 'order:register',
    },
    {
      name: 'order:read',
    },
    {
      name: 'order:delete',
    },
  ];

  const waiterPermissionsList = [
    {
      name: 'menu:read',
    },
    {
      name: 'tab:register',
    },
    {
      name: 'tab:read',
    },
    {
      name: 'tab:delete',
    },
    {
      name: 'order:register',
    },
    {
      name: 'order:read',
    },
    {
      name: 'order:delete',
    },
  ];

  const adminRole = await prisma.role.upsert({
    where: { id: 0 },
    update: { id: 0 },
    create: {
      id: 0,
      name: 'Admin',
      permissions: {
        createMany: {
          data: adminPermissionsList,
          skipDuplicates: true,
        },
      },
    },
  });

  const getWaiterPermissions = await prisma.permission.findMany({
    where: {
      OR: waiterPermissionsList.map((permission) => ({
        name: permission.name,
      })),
    },
  });
  const waiterRole = await prisma.role.upsert({
    where: { id: 1 },
    update: { id: 1 },
    create: {
      id: 1,
      name: 'Waiter',
      permissions: {
        connect: getWaiterPermissions.map((permission) => ({
          id: permission.id,
        })),
      },
    },
  });

  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@admin.com' },
    update: {},
    create: {
      id: 'c0923c25-99cc-4bd7-be1a-c51c8a30749d',
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
          lastName: 'BM',
        },
      },
    },
  });

  const createItemType = await prisma.itemType.upsert({
    where: { id: '57a2471a-9371-4f63-adc0-cf01516e3a5b0' },
    update: { id: '57a2471a-9371-4f63-adc0-cf01516e3a5b' },
    create: {
      id: '57a2471a-9371-4f63-adc0-cf01516e3a5b',
      name: 'Massa',
    },
  });

  const createItem = await prisma.item.upsert({
    where: { id: '14fcefa2-8d20-4100-9ee5-fe50605437a9' },
    update: { id: '14fcefa2-8d20-4100-9ee5-fe50605437a9' },
    create: {
      id: '14fcefa2-8d20-4100-9ee5-fe50605437a9',
      name: 'Massa fermentada',
      description: 'Massa branca fermentada por 48horas',
      cost: 15,
      measurementUnit: 'Kg',
      measurementUnitValue: 0.5,
      stock: {
        create: {
          quantity: 5,
        },
      },
      type: {
        connect: {
          id: createItemType.id,
        },
      },
    },
  });

  const createCategory = await prisma.category.upsert({
    where: { id: 'f7ec6ca5-a3ec-4e92-aa44-94b91e9606a9' },
    update: { id: 'f7ec6ca5-a3ec-4e92-aa44-94b91e9606a9' },
    create: {
      id: 'f7ec6ca5-a3ec-4e92-aa44-94b91e9606a9',
      name: 'Macarrão',
      description: 'Macarrão',
      observation: 'Macarrão',
    },
  });

  const createDish = await prisma.dish.upsert({
    where: { id: 'f7ec6ca5-a3ec-4e92-aa44-94b91e9606a9' },
    update: { id: 'f7ec6ca5-a3ec-4e92-aa44-94b91e9606a9' },
    create: {
      id: 'f7ec6ca5-a3ec-4e92-aa44-94b91e9606a9',
      name: 'Macarrão',
      description: 'Macarrão',
      price: 15,
      dishIngredients: {
        create: [
          {
            item: {
              connect: {
                id: createItem.id,
              },
            },
            quantity: 1,
          },
        ],
      },
      categories: {
        connect: [
          {
            id: createCategory.id,
          },
        ],
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
