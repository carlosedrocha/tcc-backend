import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService) {}

  async getRoles() {
    try {
      return await this.prisma.role.findMany({
        where: {
          deletedAt: null,
          name: { not: 'Admin' },
        },
      });
    } catch (e) {
      console.log(e);
      throw new BadRequestException('Erro ao buscar os cargos');
    }
  }
}
