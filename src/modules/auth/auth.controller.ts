import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/auth';

@Controller('auth/')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('local/signup')
  @HttpCode(HttpStatus.CREATED)
  async localSignUp(@Body() dto: CreateUserDto) {
    return this.authService.localSignUp(dto);
  }

  @Post('local/signin')
  @HttpCode(HttpStatus.OK)
  async localSignIn(@Body() dto: CreateUserDto) {
    return this.authService.localSignIn(dto);
  }
}
