import { BadRequestException, Injectable } from '@nestjs/common';
import { hashPassword } from 'src/helper/hash/password.hash';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/auth/signup/create-user.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async localSignUp(dto: CreateUserDto) {
    try {
      const checkEmail = await this.prisma.user.findUnique({
        where: {
          email: dto.email,
        },
      });

      if (checkEmail) {
        throw new BadRequestException('Email já existente');
      }
      const hashedPassword = await hashPassword(dto.password);

      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hashedPassword: hashedPassword,
          entity: {
            create: {
              firstName: dto.firstName,
              lastName: dto.lastName,
            },
          },
        },
      });

      return user;
    } catch (error) {
      console.log(error);
      if (error instanceof BadRequestException)
        throw new BadRequestException(error.message);

      throw new BadRequestException('Não foi possível criar o usuário');
    }
  }
}
