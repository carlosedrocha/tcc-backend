import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateMenuDto, UpdateMenuDto } from './dto';
import { MenuService } from './menu.service';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getMenus() {
    return this.menuService.getMenus();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async getMenuById(@Param('id') id: string) {
    return this.menuService.getMenuById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createManu(@Body() dto: CreateMenuDto) {
    return this.menuService.createManu(dto);
  }

  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  async updateMenu(@Param('id') id: string, @Body() dto: UpdateMenuDto) {
    return this.menuService.updateMenu(id, dto);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  async deleteMenu(@Param('id') id: string) {
    return this.menuService.deleteMenu(id);
  }
}
