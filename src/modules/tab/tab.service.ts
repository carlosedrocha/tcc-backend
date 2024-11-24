import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Entity } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTransactionDto } from '../transactions/dto';
import { TransactionsService } from '../transactions/transactions.service';
import { CreateTabDto } from './dto';

@Injectable()
export class TabService {
  constructor(
    private prisma: PrismaService,
    private transaction: TransactionsService,
  ) {}

  async createTab(dto: CreateTabDto) {
    console.log(dto);
    try {
      const checkUser = await this.prisma.user.findUnique({
        where: {
          id: dto.userId,
        },
      });
      if (!checkUser) {
        throw new NotFoundException('Usuário não encontrado');
      }
      const existingTabByCpf = await this.prisma.tab.findFirst({
        where: {
          entity: {
            cpf: dto.entity.cpf,
          },
          status: 'OPEN', // Apenas verifica se a comanda está aberta
        },
      });

      if (existingTabByCpf) {
        throw new Error('CPF já está associado a uma comanda aberta.');
      }

      // Verifica se o tabNumber já existe
      const existingTabByNumber = await this.prisma.tab.findFirst({
        where: {
          tabNumber: dto.tabNumber,
          status: 'OPEN', // Apenas verifica se a comanda está aberta
        },
      });

      if (existingTabByNumber) {
        throw new Error('O número da comanda já existe.');
      }
      let createdEntity: Entity | null;
      if (dto.entity) {
        createdEntity = await this.prisma.entity.create({
          data: {
            firstName: dto.entity.firstName,
            lastName: dto.entity.lastName,
            cpf: dto.entity.cpf,
          },
        });

        if (!createdEntity) {
          throw new BadRequestException('Erro ao criar entidade');
        }
      }

      const tab = await this.prisma.tab.create({
        data: {
          tabNumber: dto.tabNumber,
          userId: dto.userId,
          entityId: createdEntity?.id ?? null,
        },
      });

      return { tab: tab, ...(createdEntity && { entity: createdEntity }) };
    } catch (error) {
      console.log(error);

      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }

      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Não foi possível criar a comanda');
    }
  }

  async getTabs() {
    //Todo build a payload obj return to not send hashedpassword attribute in user
    try {
      const tabs = await this.prisma.tab.findMany({
        where: {
          deletedAt: null,
        },
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          entity: {
            select: {
              firstName: true,
              lastName: true,
              cpf: true,
            },
          },
          orders: {
            include: {
              itemsOrder: {
                include: {
                  item: true,
                },
              },
              dishesOrder: {
                include: {
                  dish: true,
                },
              },
            },
          },
        },
      });

      return tabs;
    } catch (error) {
      throw new BadRequestException('Erro ao buscar comandas');
    }
  }

  async getTabById(id: string) {
    try {
      const tab = await this.prisma.tab.findUnique({
        where: {
          id: id,
        },
        include: {
          entity: {
            select: {
              firstName: true,
              lastName: true,
              cpf: true,
            },
          },
          orders: {
            include: {
              itemsOrder: {
                include: {
                  item: true,
                },
              },
              dishesOrder: {
                include: {
                  dish: true,
                },
              },
            },
          },
        },
      });

      if (!tab) {
        throw new NotFoundException(' get idComanda não encontrada');
      }

      return tab;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new BadRequestException('Erro ao buscar comanda');
    }
  }

  async getTabBellById(id: string) {
    try {
      const tab = await this.prisma.tab.findUnique({
        where: {
          id: id,
        },
        include: {
          entity: true,
        },
      });

      if (!tab) {
        throw new NotFoundException(' get idComanda não encontrada');
      }

      return tab;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new BadRequestException('Erro ao buscar comanda');
    }
  }
  async getEntityById(entityId: string) {
    try {
      const entity = await this.prisma.entity.findUnique({
        where: { id: entityId },
      });
      if (!entity) {
        return null;
      }
      return entity;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
    }
  }

  async getLasTabNumberTab() {
    try {
      const tabNumber = await this.prisma.tab.findFirst({
        orderBy: {
          createdAt: 'desc',
        },
        select: {
          tabNumber: true,
        },
      });
      return tabNumber;
    } catch (error) {
      throw new BadRequestException('Erro ao procurar numero da comanda');
    }
  }

  async closeTab(id: string) {
    try {
      const closedTab = await this.prisma.tab.update({
        where: {
          id: id,
        },
        data: {
          status: 'CLOSED',
          closedAt: new Date(),
        },
      });

      if (!closedTab) {
        throw new NotFoundException('Comanda não encontrada');
      }

      return { closedTab };
    } catch (error) {
      throw new BadRequestException('Erro ao fechar comanda');
    }
  }

  async tabBill(id: string) {
    try {
      const tab = await this.prisma.tab.findUnique({
        where: {
          id: id,
        },
        include: {
          orders: {
            include: {
              itemsOrder: {
                include: {
                  item: true,
                },
              },
              dishesOrder: {
                include: {
                  dish: true,
                },
              },
            },
          },
        },
      });
      if (!tab) {
        throw new NotFoundException('Comanda não encontrada');
      }

      const amount = getBillTotalValue(tab);
      //math.random() between 0 and 1
      const chancesOfSuccess = Math.random();
      console.log(chancesOfSuccess);
      const transactionDto: CreateTransactionDto = {
        amount: amount,
        category: 'FOOD',
        paymentMethod: 'CREDIT_CARD',
        status: 'PAID',
        tabId: id,
        type: 'INCOME',
        description: 'Pagamento da Comanda ' + tab.tabNumber,
      };

      if (chancesOfSuccess < 0.2) {
        throw new BadRequestException(
          'Erro ao processar pagamento, tente novamente',
        );
      }
      const processTransaction = await this.transaction.createTransaction(
        transactionDto,
      );

      const closeTab = await this.closeTab(id);
      return {
        transaction: processTransaction,
        closeTab: closeTab,
        bill: {
          amount: amount,
        },
      };
    } catch (error) {
      console.log(error);
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new BadRequestException('Erro ao gerar boleto');
    }
    function getBillTotalValue(tab) {
      let total = 0;
      const { orders } = tab;
      //todo check this
      orders.map((order) => {
        order.itemsOrder.map((item) => {
          total += item.item.cost;
        });
        order.dishesOrder.map((dish) => {
          total += dish.dish.price;
        });
      });

      return total;
    }
  }
}
