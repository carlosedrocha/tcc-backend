import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { isPublic } from 'src/common/decorators';
import { AuthService } from './auth.service';
import { CreateUserDto, SignInDto } from './dto/auth';

@Controller('auth/')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @isPublic()
  @Post('local/signup')
  @HttpCode(HttpStatus.CREATED)
  async localSignUp(@Body() dto: CreateUserDto) {
    return this.authService.localSignUp(dto);
  }

  @isPublic()
  @Post('local/signin')
  @HttpCode(HttpStatus.OK)
  async localSignIn(@Body() dto: SignInDto) {
    return this.authService.localSignIn(dto);
  }
}
