import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { JwtPayloadType } from '../../types';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(config: ConfigService, prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // secretOrKey: process.env.ACCESS_TOKEN_SECRET,
      secretOrKey: config.get<string>('ACCESS_TOKEN_SECRET'),
    });
  }

  async validate(payload: JwtPayloadType) {
    // Here you can perform additional validation or fetch user information from the payload
    // For example, you might fetch user information from the database based on payload.sub (assuming sub is the user identifier in the token)
    // If the token is invalid or the user doesn't exist, you can throw an UnauthorizedException
    if (!payload) {
      throw new UnauthorizedException('Invalid token');
    }

    // Assuming you have a service to fetch user information based on payload.sub
    // const user = await this.userService.findByUserId(payload.sub);

    return payload;
    // const user = await this.prisma.user.findUnique({
    //   where: {
    //     email: payload.email,
    //   },
    // })
    // if (!user) {
    //   throw new UnauthorizedException('User not found');
    // }

    // return user; // Return the validated user
  }
}
