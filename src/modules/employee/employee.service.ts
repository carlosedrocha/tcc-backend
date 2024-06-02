import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { hashPassword } from 'src/helper/hash/password.hash';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEmployeeDto, UpdateEmployeeDto } from './dto';

@Injectable()
export class EmployeeService {
  constructor(private prisma: PrismaService) {}

  async getEmployee() {
    try {
      const employee = await this.prisma.entity.findMany({
        where: {
          deletedAt: null,
          user: {
            roleId: { notIn: [0] },
          },
        },
        include: {
          user: {
            select: {
              email: true,
              role: { select: { name: true } },
            },
          },
        },
      });

      return employee;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(' Erro ao buscar os funcionários');
    }
  }

  async getEmployeeById(id: string) {
    try {
      // const employee = await this.prisma.user.findUnique({
      //   where: {
      //     id: id,
      //     deletedAt: null,
      //   },
      // });

      const employee = await this.prisma.entity.findUnique({
        where: {
          id: id,
          deletedAt: null,
          user: {
            roleId: { notIn: [0] },
          },
        },
        include: {
          user: {
            select: {
              email: true,
              role: { select: { name: true } },
            },
          },
        },
      });
      if (!employee) {
        throw new NotFoundException('Funcionário não encontrado');
      }
      return employee;
    } catch (error) {
      console.log(error);
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new BadRequestException('Erro ao buscar o funcionário');
    }
  }

  async createEmployee(dto: CreateEmployeeDto) {
    try {
      const checkRole = await this.prisma.role.findUnique({
        where: {
          id: dto.roleId,
        },
      });

      if (!checkRole) {
        throw new NotFoundException('Cargo não encontrado');
      }

      const hashedPassword = await hashPassword(dto.password);
      const employee = await this.prisma.user.create({
        data: {
          email: dto.email,
          hashedPassword: hashedPassword,
          entity: {
            create: {
              firstName: dto.firstName,
              lastName: dto.lastName,
              cpf: dto.cpf,
            },
          },
          role: {
            connect: {
              id: dto.roleId,
            },
          },
        },
      });
      // return employee;
    } catch (error) {
      console.log(dto);
      console.log(error);
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }

      throw new BadRequestException('Erro ao criar o funcionário');
    }
  }

  async updateEmployee(id: string, dto: UpdateEmployeeDto) {
    try {
      const checkEmployee = await this.prisma.user.findUnique({
        where: {
          id: id,
        },
      });

      if (!checkEmployee) {
        throw new NotFoundException('Funcionário não encontrado');
      }

      const checkRole = await this.prisma.role.findUnique({
        where: {
          id: dto.roleId,
        },
      });

      if (!checkRole) {
        throw new NotFoundException('Cargo não encontrado');
      }

      const employee = await this.prisma.user.update({
        where: {
          id: id,
        },
        data: {
          email: dto.email,
          entity: {
            update: {
              firstName: dto.firstName,
              lastName: dto.lastName,
              cpf: dto.cpf,
            },
          },
          role: {
            connect: {
              id: dto.roleId,
            },
          },
        },
      });
      return employee;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }

      throw new BadRequestException('Erro ao atualizar o funcionário');
    }
  }

  async deleteEmployee(id: string) {
    try {
      const checkEmployee = await this.prisma.user.findUnique({
        where: {
          id: id,
        },
      });

      if (!checkEmployee) {
        throw new NotFoundException('Funcionário não encontrado');
      }

      await this.prisma.user.update({
        where: {
          id: id,
        },
        data: {
          deletedAt: new Date(),
        },
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }

      throw new BadRequestException('Erro ao deletar o funcionário');
    }
  }
}
