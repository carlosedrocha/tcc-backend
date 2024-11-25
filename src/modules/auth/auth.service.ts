import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { hashPassword, verifyPassword } from 'src/helper/hash/password.hash';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';
import { SignInDto } from './dto/auth';
import { CreateUserDto } from './dto/auth/signup/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private config: ConfigService,
  ) {}
  async localSignIn(dto: SignInDto): Promise<any> {
    try {
      // Find the user by email
      const user = await this.userService.findUserByEmail(dto.email);
      if (!user) {
        console.log('Usuário Inválido');
        throw new UnauthorizedException('Usuário Inválido');
      }

      // Check if the password is valid
      const isPasswordValid = await verifyPassword(
        dto.password,
        user.hashedPassword,
      );
      if (!isPasswordValid) {
        console.log('Senha Inválida');
        throw new UnauthorizedException('Senha Inválida');
      }

      // Generate access token
      const accessToken = await this.generateToken(user);

      // Fetch user role and permissions
      const userWithRole = await this.userService.getUserRoleAndPermissoes(
        user.id,
      );

      // Return the access token and user role
      return {
        ...accessToken,
        user: userWithRole || null, // Fallback to null if no role is found
      };
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException(
        'Usuário ou Senha Inválidos ' + error.message,
      );
    }
  }
  async generateToken(payload: User) {
    return {
      userId: payload.id,
      bearer_token: this.jwtService.sign(
        { email: payload.email, sub: payload.id },
        {
          secret: this.config.get<string>('ACCESS_TOKEN_SECRET'),
          expiresIn: '6h',
        },
      ),
    };
  }
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

  async customerLocalSignUp(dto: CreateUserDto) {
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

      const clientRole = await this.prisma.role.findFirst({
        where: {
          name: 'client',
        },
      });

      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hashedPassword: hashedPassword,
          roleId: clientRole?.id ?? null,
          entity: {
            create: {
              firstName: dto.firstName,
              lastName: dto.lastName,
              cpf: dto.cpf,
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
