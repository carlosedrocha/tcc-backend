import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async getUserRoleAndPermissoes(userId: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
        include: {
          entity: {
            select: { id: true, firstName: true, lastName: true },
          },
          role: {
            include: {
              permissions: { select: { id: true, name: true } },
            },
          },
        },
      });
      return user;
    } catch (error) {
      throw new NotFoundException('Usuário não encontrado');
    }
  }
  async findUserByEmail(email: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: email,
        },
      });
      return user;
    } catch (error) {
      console.log(error);
      throw new NotFoundException('Usuário não encontrado');
    }
  }
}
