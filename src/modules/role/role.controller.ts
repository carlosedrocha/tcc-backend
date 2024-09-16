import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { RoleService } from './role.service';

@Controller('role')
export class RoleController {
  constructor(private role: RoleService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getRoles() {
    return this.role.getRoles();
  }
}
