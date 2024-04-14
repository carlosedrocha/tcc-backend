//local.auth.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../../auth.service';
import { SignInDto } from '../../dto/auth';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(dto: SignInDto): Promise<any> {
    const user = await this.authService.localSignIn(dto);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
