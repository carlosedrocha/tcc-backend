import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
async function main() {
  //todo add all permissions

  console.log('Rodando seed');
  const managerRole = await prisma.role.create({
    data: {
      name: 'Manager',
    },
  });
  const waiterRole = await prisma.role.create({
    data: {
      name: 'waiter',
    },
  });
  const chefRole = await prisma.role.create({
    data: {
      name: 'chef',
    },
  });
  const clientRole = await prisma.role.create({
    data: {
      name: 'client',
    },
  });

  // Lista de permissões que o Manager terá (podem ser as mesmas do admin)
  const managerPermissionsList = [
    { name: 'employee:register', roleId: managerRole.id },
    { name: 'employee:read', roleId: managerRole.id },
    { name: 'employee:delete', roleId: managerRole.id },
    { name: 'menu:register', roleId: managerRole.id },
    { name: 'menu:read', roleId: managerRole.id },
    { name: 'menu:delete', roleId: managerRole.id },
    { name: 'dish:register', roleId: managerRole.id },
    { name: 'dish:read', roleId: managerRole.id },
    { name: 'dish:delete', roleId: managerRole.id },
    { name: 'item:register', roleId: managerRole.id },
    { name: 'item:read', roleId: managerRole.id },
    { name: 'item:delete', roleId: managerRole.id },
    { name: 'itemType:register', roleId: managerRole.id },
    { name: 'itemType:read', roleId: managerRole.id },
    { name: 'itemType:delete', roleId: managerRole.id },
    { name: 'category:register', roleId: managerRole.id },
    { name: 'category:read', roleId: managerRole.id },
    { name: 'category:delete', roleId: managerRole.id },
    { name: 'role:register', roleId: managerRole.id },
    { name: 'role:read', roleId: managerRole.id },
    { name: 'role:delete', roleId: managerRole.id },
    { name: 'tab:register', roleId: managerRole.id },
    { name: 'tab:read', roleId: managerRole.id },
    { name: 'tab:delete', roleId: managerRole.id },
    { name: 'order:register', roleId: managerRole.id },
    { name: 'order:read', roleId: managerRole.id },
    { name: 'order:delete', roleId: managerRole.id },
    { name: 'spotify:register', roleId: managerRole.id },
    { name: 'spotify:read', roleId: managerRole.id },
    { name: 'spotify:delete', roleId: managerRole.id },
  ];
  const waiterPermissionsList = [
    { name: 'menu:read', roleId: waiterRole.id },
    { name: 'tab:register', roleId: waiterRole.id },
    { name: 'tab:read', roleId: waiterRole.id },
    { name: 'order:register', roleId: waiterRole.id },
    { name: 'order:read', roleId: waiterRole.id },
    { name: 'order:delete', roleId: waiterRole.id },
    { name: 'kanban:register', roleId: waiterRole.id },
    { name: 'kanban:read', roleId: waiterRole.id },
  ];
  const chefPermissionList = [
    { name: 'kanban:register', roleId: chefRole.id },
    { name: 'kanban:read', roleId: chefRole.id },
  ];
  const clientPermissionList = [
    { name: 'menu:read', roleId: clientRole.id },
    { name: 'order:register', roleId: clientRole.id },
    { name: 'order:read', roleId: clientRole.id },
    { name: 'spotify:register', roleId: managerRole.id },
    { name: 'spotify:read', roleId: managerRole.id },
  ];
  const allPermissionsList = [
    ...managerPermissionsList,
    ...waiterPermissionsList,
    ...chefPermissionList,
    ...clientPermissionList,
  ];

  await prisma.permission.createMany({
    data: allPermissionsList,
    skipDuplicates: true, // Ignora permissões que já existem
  });

  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@admin.com' },
    update: {},
    create: {
      id: 'c0923c25-99cc-4bd7-be1a-c51c8a30749d',
      email: 'admin@admin.com',
      hashedPassword:
        '$2b$10$1vFrYGPBJKRdEH7zhNnhAuWhEI71MbLcOendwadNkVni.H4qRTaEi',
      role: {
        connect: {
          id: managerRole.id,
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
  console.log('Seed rodada com sucesso');
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
