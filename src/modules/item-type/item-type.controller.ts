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
import { CreateItemTypeDto, UpdateItemTypeDto } from '../item-type/dto';
import { ItemTypeService } from './item-type.service';

@Controller('item-type')
export class ItemTypeController {
  constructor(private readonly itemTypeService: ItemTypeService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createItemType(@Body() dto: CreateItemTypeDto) {
    return this.itemTypeService.createItemType(dto);
  }

  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  async updateItemType(
    @Param('id') id: string,
    @Body() dto: UpdateItemTypeDto,
  ) {
    return this.itemTypeService.updateItemType(id, dto);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  async deleteItemType(@Param('id') id: string) {
    return this.itemTypeService.deleteItemType(id);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getCategories() {
    return this.itemTypeService.getItemTypes();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async getItemTypeById(@Param('id') id: string) {
    return this.itemTypeService.getItemTypeById(id);
  }
}
