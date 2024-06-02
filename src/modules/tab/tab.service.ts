import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Entity } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTabDto } from './dto';

@Injectable()
export class TabService {
  constructor(private prisma: PrismaService) {}

  async createTab(dto: CreateTabDto) {
    try {
      const checkUser = await this.prisma.user.findUnique({
        where: {
          id: dto.userId,
        },
      });
      console.log(dto.userId);
      if (!checkUser) {
        throw new NotFoundException('Usuário não encontrado');
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
          entityId: createdEntity.id,
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
    try {
      const tabs = await this.prisma.tab.findMany({
        where: {
          deletedAt: null,
        },
        orderBy:{
          createdAt: "desc"
        },
        include: {
          user: {
            include: {
              entity: {
                select: {
                  firstName: true,
                  lastName: true,
                  cpf: true,
                },
              },
            },
          },
          orders: {
            include: {
              items: true,
              dishs: true,
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

  async getOpenTabs() {
    //Todo build a payload obj return to not send hashedpassword attribute in user
    try {
      const tabs = await this.prisma.tab.findMany({
        where: {
          status: 'OPEN',
          deletedAt: null,
        },
        include: {
          user: {
            include: {
              entity: {
                select: {
                  firstName: true,
                  lastName: true,
                  cpf: true,
                },
              },
            },
          },
          orders: {
            include: {
              items: true,
              dishs: true,
            },
          },
        },
      });

      return tabs;
    } catch (error) {
      throw new BadRequestException('Erro ao buscar comandas');
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
      console.log(tabNumber);
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
        include: {
          orders: {
            include: {
              items: true,
              dishs: true,
            },
          },
        },
      });

      if (!closedTab) {
        throw new NotFoundException('Comanda não encontrada');
      }

      let total = 0;
      const { orders } = closedTab;
      //todo check this
      orders.map((order) => {
        order.items.map((item) => {
          total += item.cost;
        });
        order.dishs.map((dish) => {
          total += dish.price;
        });
      });

      return { closedTab, total };
    } catch (error) {
      throw new BadRequestException('Erro ao fechar comanda');
    }
  }
}
