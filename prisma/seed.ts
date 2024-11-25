import { PrismaClient } from '@prisma/client';
import { AddStockEntryDto } from 'src/modules/stock-movement/dto';

const prisma = new PrismaClient();
async function main() {
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
    { name: 'kanban:register', roleId: managerRole.id },
    { name: 'kanban:read', roleId: managerRole.id },
    { name: 'kanban:delete', roleId: managerRole.id },
    { name: 'financial-dashboard:delete', roleId: managerRole.id },
    { name: 'financial-dashboard:register', roleId: managerRole.id },
    { name: 'financial-dashboard:read', roleId: managerRole.id },
    { name: 'financial-report:read', roleId: managerRole.id },
    { name: 'financial-report:delete', roleId: managerRole.id },
    { name: 'financial-report:register', roleId: managerRole.id },
    { name: 'stock-movement:register', roleId: managerRole.id },
    { name: 'stock-movement:read', roleId: managerRole.id },
    { name: 'stock-movement:delete', roleId: managerRole.id },
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

  const waiterUser = await prisma.user.upsert({
    where: { email: 'waiter@gmail.com' },
    update: {},
    create: {
      id: 'c0923c25-99cc-4bd7-be1a-c51c8a30749e',
      email: 'waiter@gmail.com',
      hashedPassword:
        '$2b$10$1vFrYGPBJKRdEH7zhNnhAuWhEI71MbLcOendwadNkVni.H4qRTaEi',
      role: {
        connect: {
          id: waiterRole.id,
        },
      },
      entity: {
        create: {
          firstName: 'Waiter',
          lastName: 'BM',
        },
      },
    },
  });

  const chefUser = await prisma.user.upsert({
    where: { email: 'chef@gmail.com' },
    update: {},
    create: {
      id: 'c0923c25-99cc-4bd7-be1a-c51c8a30749f',
      email: 'chef@gmail.com',
      hashedPassword:
        '$2b$10$1vFrYGPBJKRdEH7zhNnhAuWhEI71MbLcOendwadNkVni.H4qRTaEi',
      role: {
        connect: {
          id: chefRole.id,
        },
      },
      entity: {
        create: {
          firstName: 'Chef',
          lastName: 'BM',
        },
      },
    },
  });

  const customerUser = await prisma.user.upsert({
    where: { email: 'customer@gmail.com' },
    update: {},
    create: {
      id: 'c0923c25-99cc-4bd7-be1a-c51c8a30749g',
      email: 'customer@gmail.com',
      hashedPassword:
        '$2b$10$1vFrYGPBJKRdEH7zhNnhAuWhEI71MbLcOendwadNkVni.H4qRTaEi',
      role: {
        connect: {
          id: clientRole.id,
        },
      },
      entity: {
        create: {
          firstName: 'Customer',
          lastName: 'BM',
        },
      },
    },
  });

  // ItemTypes
  const createItemType1 = await prisma.itemType.upsert({
    where: { id: '57a2471a-9371-4f63-adc0-cf01516e3a5b' },
    update: {},
    create: {
      id: '57a2471a-9371-4f63-adc0-cf01516e3a5b',
      name: 'Massa',
    },
  });

  const createItemType2 = await prisma.itemType.upsert({
    where: { id: 'a1b2c3d4-5678-9101-1121-31415161718a' },
    update: {},
    create: {
      id: 'a1b2c3d4-5678-9101-1121-31415161718a',
      name: 'Molho',
    },
  });

  // Items
  const createItem1 = await prisma.item.upsert({
    where: { id: '14fcefa2-8d20-4100-9ee5-fe50605437a9' },
    update: {},
    create: {
      id: '14fcefa2-8d20-4100-9ee5-fe50605437a9',
      name: 'Massa fermentada',
      description: 'Massa branca fermentada por 48 horas',
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
          id: createItemType1.id,
        },
      },
    },
  });

  const createItem2 = await prisma.item.upsert({
    where: { id: '2b3c4d5e-6789-0111-2131-415161718192' },
    update: {},
    create: {
      id: '2b3c4d5e-6789-0111-2131-415161718192',
      name: 'Molho de tomate',
      description: 'Molho de tomate artesanal',
      cost: 10,
      measurementUnit: 'L',
      measurementUnitValue: 0.25,
      stock: {
        create: {
          quantity: 10,
        },
      },
      type: {
        connect: {
          id: createItemType2.id,
        },
      },
    },
  });

  // Categories
  const createCategory1 = await prisma.category.upsert({
    where: { id: 'f7ec6ca5-a3ec-4e92-aa44-94b91e9606a9' },
    update: {},
    create: {
      id: 'f7ec6ca5-a3ec-4e92-aa44-94b91e9606a9',
      name: 'Macarrão',
      description: 'Macarrão',
      observation: 'Categoria de pratos de macarrão',
    },
  });

  const createCategory2 = await prisma.category.upsert({
    where: { id: '6d5e4f3c-2211-0012-3344-556677889900' },
    update: {},
    create: {
      id: '6d5e4f3c-2211-0012-3344-556677889900',
      name: 'Massas artesanais',
      description: 'Massas feitas à mão',
      observation: 'Categoria de massas especiais',
    },
  });

  // Dishes
  const createDish1 = await prisma.dish.upsert({
    where: { id: 'f7ec6ca5-a3ec-4e92-aa44-94b91e9606a9' },
    update: {},
    create: {
      id: 'f7ec6ca5-a3ec-4e92-aa44-94b91e9606a9',
      name: 'Macarrão ao molho artesanal',
      description: 'Macarrão com molho de tomate artesanal',
      price: 25,
      photoUrl:
        'https://cozinhalegal.com.br/wp-content/uploads/2020/03/Macarrao-molho-de-tomate-caseiro-rapido-2-1.jpg.webp',
      dishIngredients: {
        create: [
          {
            item: {
              connect: {
                id: createItem1.id,
              },
            },
            quantity: 1,
          },
          {
            item: {
              connect: {
                id: createItem2.id,
              },
            },
            quantity: 0.5,
          },
        ],
      },
      categories: {
        connect: [{ id: createCategory1.id }, { id: createCategory2.id }],
      },
    },
  });

  const createDish2 = await prisma.dish.upsert({
    where: { id: '7a8b9c0d-1112-2131-4151-617181920212' },
    update: {},
    create: {
      id: '7a8b9c0d-1112-2131-4151-617181920212',
      name: 'Fettuccine com molho branco',
      description: 'Fettuccine artesanal com molho branco especial',
      price: 30,
      dishIngredients: {
        create: [
          {
            item: {
              connect: {
                id: createItem1.id,
              },
            },
            quantity: 0.8,
          },
        ],
      },
      categories: {
        connect: [{ id: createCategory2.id }],
      },
    },
  });

  // ItemTypes
  const createItemType3 = await prisma.itemType.upsert({
    where: { id: '3f4g5h6i-7890-1121-3141-516171819202' },
    update: {},
    create: {
      id: '3f4g5h6i-7890-1121-3141-516171819202',
      name: 'Carne',
    },
  });

  const createItemType4 = await prisma.itemType.upsert({
    where: { id: '4g5h6i7j-8901-2131-4151-617181920223' },
    update: {},
    create: {
      id: '4g5h6i7j-8901-2131-4151-617181920223',
      name: 'Laticínios',
    },
  });

  // Items
  const createItem3 = await prisma.item.upsert({
    where: { id: '3h4i5j6k-9012-3141-5161-718192023242' },
    update: {},
    create: {
      id: '3h4i5j6k-9012-3141-5161-718192023242',
      name: 'Carne moída',
      description: 'Carne moída de alta qualidade',
      cost: 20,
      measurementUnit: 'Kg',
      measurementUnitValue: 1,
      stock: {
        create: {
          quantity: 8,
        },
      },
      type: {
        connect: {
          id: createItemType3.id,
        },
      },
    },
  });

  const createItem4 = await prisma.item.upsert({
    where: { id: '4i5j6k7l-0123-4151-6171-819202324253' },
    update: {},
    create: {
      id: '4i5j6k7l-0123-4151-6171-819202324253',
      name: 'Queijo parmesão',
      description: 'Queijo parmesão ralado fresco',
      cost: 18,
      measurementUnit: 'Kg',
      measurementUnitValue: 0.2,
      stock: {
        create: {
          quantity: 15,
        },
      },
      type: {
        connect: {
          id: createItemType4.id,
        },
      },
    },
  });

  // Categories
  const createCategory3 = await prisma.category.upsert({
    where: { id: '3j4k5l6m-1234-5161-7181-920232425364' },
    update: {},
    create: {
      id: '3j4k5l6m-1234-5161-7181-920232425364',
      name: 'Carnes e proteínas',
      description: 'Categoria para carnes e outros itens proteicos',
      observation: 'Inclui carnes vermelhas e brancas',
    },
  });

  const createCategory4 = await prisma.category.upsert({
    where: { id: '4k5l6m7n-2345-6171-8192-324253645475' },
    update: {},
    create: {
      id: '4k5l6m7n-2345-6171-8192-324253645475',
      name: 'Laticínios e derivados',
      description: 'Categoria de produtos lácteos',
      observation: 'Queijos, leites e derivados',
    },
  });

  // Dishes
  const createDish3 = await prisma.dish.upsert({
    where: { id: '3k4l5m6n-3456-7181-9202-324253645576' },
    update: {},
    create: {
      id: '3k4l5m6n-3456-7181-9202-324253645576',
      name: 'Macarrão à bolonhesa',
      description: 'Macarrão artesanal com molho bolonhesa de carne moída',
      price: 35,
      photoUrl:
        'https://images.mrcook.app/recipe-image/019065cb-cf5d-77b0-9e76-eb15dc9c40af?cacheKey=U2F0LCAyOSBKdW4gMjAyNCAyMDo1OTozOCBHTVQ=',
      dishIngredients: {
        create: [
          {
            item: {
              connect: {
                id: createItem1.id, // Massa fermentada
              },
            },
            quantity: 1,
          },
          {
            item: {
              connect: {
                id: createItem3.id, // Carne moída
              },
            },
            quantity: 0.5,
          },
          {
            item: {
              connect: {
                id: createItem2.id, // Molho de tomate
              },
            },
            quantity: 0.25,
          },
        ],
      },
      categories: {
        connect: [
          { id: createCategory1.id }, // Macarrão
          { id: createCategory3.id }, // Carnes e proteínas
        ],
      },
    },
  });

  const createDish4 = await prisma.dish.upsert({
    where: { id: '4l5m6n7o-4567-8192-3242-536454657687' },
    update: {},
    create: {
      id: '4l5m6n7o-4567-8192-3242-536454657687',
      name: 'Pizza de quatro queijos',
      description: 'Pizza artesanal com uma mistura de queijos especiais',
      price: 40,
      photoUrl: 'https://pubimg.band.uol.com.br/files/e7c7412c3cd54a639e21.png',
      dishIngredients: {
        create: [
          {
            item: {
              connect: {
                id: createItem1.id, // Massa fermentada
              },
            },
            quantity: 1,
          },
          {
            item: {
              connect: {
                id: createItem4.id, // Queijo parmesão
              },
            },
            quantity: 0.2,
          },
        ],
      },
      categories: {
        connect: [
          { id: createCategory2.id }, // Massas artesanais
          { id: createCategory4.id }, // Laticínios e derivados
        ],
      },
    },
  });

  // ItemTypes
  const createItemType5 = await prisma.itemType.upsert({
    where: { id: '5m6n7o8p-5678-9203-4253-645465768798' },
    update: {},
    create: {
      id: '5m6n7o8p-5678-9203-4253-645465768798',
      name: 'Carnes de Hambúrguer',
    },
  });

  const createItemType6 = await prisma.itemType.upsert({
    where: { id: '6n7o8p9q-6789-0314-5364-546576879809' },
    update: {},
    create: {
      id: '6n7o8p9q-6789-0314-5364-546576879809',
      name: 'Complementos de Hambúrguer',
    },
  });

  // Items
  const createItem5 = await prisma.item.upsert({
    where: { id: '5n6o7p8q-7890-1425-3645-657687980901' },
    update: {},
    create: {
      id: '5n6o7p8q-7890-1425-3645-657687980901',
      name: 'Hambúrguer de Carne Bovina',
      description: 'Hambúrguer suculento de carne bovina moída artesanal',
      cost: 8,
      measurementUnit: 'Unidade',
      measurementUnitValue: 1,
      stock: {
        create: {
          quantity: 50,
        },
      },
      type: {
        connect: {
          id: createItemType5.id,
        },
      },
    },
  });

  const createItem6 = await prisma.item.upsert({
    where: { id: '6o7p8q9r-8901-2536-4756-768798091012' },
    update: {},
    create: {
      id: '6o7p8q9r-8901-2536-4756-768798091012',
      name: 'Queijo Cheddar',
      description: 'Fatias de queijo cheddar cremoso',
      cost: 5,
      measurementUnit: 'Unidade',
      measurementUnitValue: 1,
      stock: {
        create: {
          quantity: 100,
        },
      },
      type: {
        connect: {
          id: createItemType6.id,
        },
      },
    },
  });

  // Categories
  const createCategory5 = await prisma.category.upsert({
    where: { id: '5o6p7q8r-9012-3645-5767-879809101223' },
    update: {},
    create: {
      id: '5o6p7q8r-9012-3645-5767-879809101223',
      name: 'Hambúrgueres Artesanais',
      description: 'Categoria dedicada a hambúrgueres artesanais',
      observation: 'Inclui hambúrgueres gourmet e tradicionais',
    },
  });

  const createCategory6 = await prisma.category.upsert({
    where: { id: '6p7q8r9s-0123-4756-6878-980910122334' },
    update: {},
    create: {
      id: '6p7q8r9s-0123-4756-6878-980910122334',
      name: 'Complementos e Molhos',
      description: 'Categoria para queijos, molhos e outros complementos',
      observation: 'Inclui todos os acompanhamentos para hambúrgueres',
    },
  });

  // Dishes
  const createDish5 = await prisma.dish.upsert({
    where: { id: '5p6q7r8s-1234-5867-7989-091012233445' },
    update: {},
    create: {
      id: '5p6q7r8s-1234-5867-7989-091012233445',
      name: 'Cheeseburger Clássico',
      description: 'Hambúrguer artesanal com queijo cheddar e pão de brioche',
      price: 25,
      photoUrl:
        'https://s2.glbimg.com/jJirZVMNK5ZsZ9UDLKQBqPu3iXk=/620x455/e.glbimg.com/og/ed/f/original/2020/10/20/hamburgueria_bob_beef_-_dia_das_criancas_-_foto_pfz_studio__norma_lima.jpg',
      dishIngredients: {
        create: [
          {
            item: {
              connect: {
                id: createItem5.id, // Hambúrguer de Carne Bovina
              },
            },
            quantity: 1,
          },
          {
            item: {
              connect: {
                id: createItem6.id, // Queijo Cheddar
              },
            },
            quantity: 1,
          },
        ],
      },
      categories: {
        connect: [
          { id: createCategory5.id }, // Hambúrgueres Artesanais
          { id: createCategory6.id }, // Complementos e Molhos
        ],
      },
    },
  });

  const createDish6 = await prisma.dish.upsert({
    where: { id: '6q7r8s9t-2345-6978-8090-910122334556' },
    update: {},
    create: {
      id: '6q7r8s9t-2345-6978-8090-910122334556',
      name: 'Hambúrguer Bacon',
      description:
        'Hambúrguer com carne bovina, cheddar e fatias de bacon crocante',
      price: 30,
      photoUrl:
        'https://www.estadao.com.br/resizer/v2/GUOGMQ4FRJIUPAWMYLE4WNA3SY.jpg?quality=80&auth=091f9aa6c57e9c295188f11d5196f17d3427722076b472e25b5d394929a9731f&width=720&height=503&focal=1185,600',
      dishIngredients: {
        create: [
          {
            item: {
              connect: {
                id: createItem5.id, // Hambúrguer de Carne Bovina
              },
            },
            quantity: 1,
          },
          {
            item: {
              connect: {
                id: createItem6.id, // Queijo Cheddar
              },
            },
            quantity: 1,
          },
          {
            item: {
              create: {
                id: '7r8s9t0u-3456-8090-9101-223344556677', // Bacon
                name: 'Bacon',
                description: 'Fatias de bacon crocante',
                cost: 7,
                measurementUnit: 'Unidade',
                measurementUnitValue: 1,
                stock: {
                  create: {
                    quantity: 100,
                  },
                },
                type: {
                  connect: {
                    id: createItemType6.id,
                  },
                },
              },
            },
            quantity: 2,
          },
        ],
      },
      categories: {
        connect: [
          { id: createCategory5.id }, // Hambúrgueres Artesanais
          { id: createCategory6.id }, // Complementos e Molhos
        ],
      },
    },
  });
  // ItemTypes
  const createItemType7 = await prisma.itemType.upsert({
    where: { id: '7s8t9u0v-1234-5678-9101-223344556778' },
    update: {},
    create: {
      id: '7s8t9u0v-1234-5678-9101-223344556778',
      name: 'Águas e Sucos',
    },
  });

  const createItemType8 = await prisma.itemType.upsert({
    where: { id: '8t9u0v1w-2345-6789-1011-334455667889' },
    update: {},
    create: {
      id: '8t9u0v1w-2345-6789-1011-334455667889',
      name: 'Refrigerantes',
    },
  });

  // Items
  const createItem7 = await prisma.item.upsert({
    where: { id: '7t8u9v0w-3456-7890-1122-445566778890' },
    update: {},
    create: {
      id: '7t8u9v0w-3456-7890-1122-445566778890',
      name: 'Água Mineral',
      description: 'Garrafa de água mineral natural 500ml',
      cost: 2,
      measurementUnit: 'Unidade',
      measurementUnitValue: 1,
      stock: {
        create: {
          quantity: 200,
        },
      },
      type: {
        connect: {
          id: createItemType7.id,
        },
      },
    },
  });

  const createItem8 = await prisma.item.upsert({
    where: { id: '8u9v0w1x-4567-8901-2233-556677889901' },
    update: {},
    create: {
      id: '8u9v0w1x-4567-8901-2233-556677889901',
      name: 'Suco de Laranja',
      description: 'Suco natural de laranja 300ml',
      cost: 5,
      measurementUnit: 'Unidade',
      measurementUnitValue: 1,
      stock: {
        create: {
          quantity: 100,
        },
      },
      type: {
        connect: {
          id: createItemType7.id,
        },
      },
    },
  });

  const createItem9 = await prisma.item.upsert({
    where: { id: '9v0w1x2y-5678-9012-3344-667788990112' },
    update: {},
    create: {
      id: '9v0w1x2y-5678-9012-3344-667788990112',
      name: 'Refrigerante Cola',
      description: 'Lata de refrigerante sabor cola 350ml',
      cost: 4,
      measurementUnit: 'Unidade',
      measurementUnitValue: 1,
      stock: {
        create: {
          quantity: 150,
        },
      },
      type: {
        connect: {
          id: createItemType8.id,
        },
      },
    },
  });

  // Categories
  const createCategory7 = await prisma.category.upsert({
    where: { id: '7u8v9w0x-6789-0123-4455-778899001223' },
    update: {},
    create: {
      id: '7u8v9w0x-6789-0123-4455-778899001223',
      name: 'Bebidas Naturais',
      description: 'Categoria para águas e sucos naturais',
      observation: 'Inclui bebidas não industrializadas',
    },
  });

  const createCategory8 = await prisma.category.upsert({
    where: { id: '8v9w0x1y-7890-1234-5566-889900112334' },
    update: {},
    create: {
      id: '8v9w0x1y-7890-1234-5566-889900112334',
      name: 'Bebidas Industrializadas',
      description: 'Categoria para refrigerantes e outras bebidas similares',
      observation: 'Inclui bebidas industrializadas e gasosas',
    },
  });

  // Dishes
  // const createDish7 = await prisma.dish.upsert({
  //   where: { id: '7v8w9x0y-8901-2345-6677-990011223445' },
  //   update: {},
  //   create: {
  //     id: '7v8w9x0y-8901-2345-6677-990011223445',
  //     name: 'Hambúrguer',
  //     description: 'Hambúrguer artesanal acompanhado de água mineral',
  //     price: 27,
  //     dishIngredients: {
  //       create: [
  //         {
  //           item: {
  //             connect: {
  //               id: createItem7.id, // Água Mineral
  //             },
  //           },
  //           quantity: 1,
  //         },
  //         {
  //           item: {
  //             connect: {
  //               id: '5n6o7p8q-7890-1425-3645-657687980901', // Hambúrguer de Carne Bovina
  //             },
  //           },
  //           quantity: 1,
  //         },
  //       ],
  //     },
  //     categories: {
  //       connect: [
  //         { id: createCategory7.id }, // Bebidas Naturais
  //         { id: '5o6p7q8r-9012-3645-5767-879809101223' }, // Hambúrgueres Artesanais
  //       ],
  //     },
  //   },
  // });

  const createDish8 = await prisma.dish.upsert({
    where: { id: '8w9x0y1z-9012-3456-7788-001122334556' },
    update: {},
    create: {
      id: '8w9x0y1z-9012-3456-7788-001122334556',
      name: 'Combo Suco e Hambúrguer',
      description:
        'Hambúrguer artesanal acompanhado de suco natural de laranja',
      price: 30,
      photoUrl:
        'https://media-cdn.tripadvisor.com/media/photo-s/17/ba/00/46/combos-com-suco-e-batatas.jpg',

      dishIngredients: {
        create: [
          {
            item: {
              connect: {
                id: createItem8.id, // Suco de Laranja
              },
            },
            quantity: 1,
          },
          {
            item: {
              connect: {
                id: '5n6o7p8q-7890-1425-3645-657687980901', // Hambúrguer de Carne Bovina
              },
            },
            quantity: 1,
          },
        ],
      },
      categories: {
        connect: [
          { id: createCategory7.id }, // Bebidas Naturais
          { id: '5o6p7q8r-9012-3645-5767-879809101223' }, // Hambúrgueres Artesanais
        ],
      },
    },
  });

  const createDish9 = await prisma.dish.upsert({
    where: { id: '9x0y1z2a-0123-4567-8899-112233445667' },
    update: {},
    create: {
      id: '9x0y1z2a-0123-4567-8899-112233445667',
      name: 'Combo Refrigerante e Hambúrguer',
      description:
        'Hambúrguer artesanal acompanhado de refrigerante sabor cola',
      price: 29,
      photoUrl:
        'https://d1muf25xaso8hp.cloudfront.net/https://img.criativodahora.com.br/2023/10/MTIvMTAvMjAyMyAxNmgzNA==65284a2ec6059.jpeg?w=1000&h=&auto=compress&dpr=1&fit=max',
      dishIngredients: {
        create: [
          {
            item: {
              connect: {
                id: createItem9.id, // Refrigerante Cola
              },
            },
            quantity: 1,
          },
          {
            item: {
              connect: {
                id: '5n6o7p8q-7890-1425-3645-657687980901', // Hambúrguer de Carne Bovina
              },
            },
            quantity: 1,
          },
        ],
      },
      categories: {
        connect: [
          { id: createCategory8.id }, // Bebidas Industrializadas
          { id: '5o6p7q8r-9012-3645-5767-879809101223' }, // Hambúrgueres Artesanais
        ],
      },
    },
  });

  // Stocks
  // Busca todos os itens no banco
  const items = await prisma.item.findMany();

  for (const item of items) {
    // Verifica se o estoque já existe para o item
    let stock = await prisma.stock.findFirst({
      where: { itemId: item.id },
    });

    // Cria um estoque, caso não exista
    if (!stock) {
      stock = await prisma.stock.create({
        data: {
          itemId: item.id,
          quantity: 0, // Inicialmente zerado
        },
      });
    }

    // Define o número de movimentações aleatórias (3 a 5)
    const randomMovementsCount = Math.floor(Math.random() * 2) + 3;

    for (let i = 0; i < randomMovementsCount; i++) {
      // Gera uma movimentação pseudo-aleatória
      const isIncrease = Math.random() > 0.5; // 50% de chance de ser entrada ou saída
      const randomQuantity = Math.floor(Math.random() * 20) + 150; // Quantidade entre 5 e 25

      const stockEntryDto: AddStockEntryDto = {
        quantity: isIncrease ? randomQuantity : randomQuantity,
        movementType: 'ENTRY',
        description: `${
          isIncrease ? 'Entrada' : 'Saída'
        } simulada para o item ${item.name}`,
        transaction: {
          amount: Math.abs(randomQuantity * item.cost), // Valor absoluto para evitar números negativos
          category: 'STOCK',
          description: `Movimentação simulada de ${
            isIncrease ? 'entrada' : 'saída'
          } para o item ${item.name}`,
          paymentMethod: isIncrease ? 'CREDIT_CARD' : 'CASH',
          type: 'EXPENSE',
          status: 'PAID',
        },
      };

      // Função de movimentação de estoque
      async function addStockEntry(stockId: string, dto: AddStockEntryDto) {
        try {
          const stock = await prisma.stock.findUnique({
            where: {
              id: stockId,
              deletedAt: null,
            },
          });

          if (!stock) {
            throw new Error('Estoque não encontrado');
          }

          let transaction;
          if (dto.transaction) {
            transaction = await prisma.transaction.create({
              data: {
                amount: dto.transaction.amount,
                category: dto.transaction.category,
                description: dto.transaction.description,
                paymentMethod: dto.transaction.paymentMethod,
                transactionType: dto.transaction.type,
                status: dto.transaction.status,
              },
            });
          }

          const stockEntry = await prisma.stockMovement.create({
            data: {
              stockId: stock.id,
              quantity: dto.quantity,
              description: dto.description ? dto.description : undefined,
              movementType: dto.movementType,
              ...(transaction && { transactionId: transaction.id }),
            },
          });

          const updateStockQuantity = await prisma.stock.update({
            where: {
              id: stock.id,
            },
            data: {
              quantity: stock.quantity + dto.quantity,
            },
          });

          return { stockEntry, updateStockQuantity };
        } catch (error) {
          console.error('Erro ao registrar entrada', error);
          throw error;
        }
      }

      try {
        await addStockEntry(stock.id, stockEntryDto);
        console.log(
          `Movimentação ${
            isIncrease ? 'Entrada' : 'Saída'
          } registrada para o item: ${item.name} | Quantidade: ${
            stockEntryDto.quantity
          }`,
        );
      } catch (error) {
        console.error(
          `Erro ao registrar movimentação para o item: ${item.name}`,
          error,
        );
      }
      console.log('Seed rodada com sucesso');
    }
  }
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
